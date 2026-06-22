# Plan 019: Restore upstream-compatible className interfaces

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report - do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 529ee767..HEAD -- registry/shadcn registry/base-ui registry/upstream scripts apps/docs/public docs/product src/openstory src/docsView.ts src/docsExamplePreviews*.ts plans/018-remove-component-classname-api.md plans/019-restore-upstream-classname-parity.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/018-remove-component-classname-api.md
- **Category**: migration
- **Planned at**: commit `529ee767`, 2026-06-22

## Why this matters

Plan 018 removed the old `className`/`*ClassName` styling API too broadly. The
correct product rule is narrower: remove Foldkit CN's invented style hooks that
do not exist upstream, but preserve `className` wherever the originating
library exposes it as part of its public interface. shadcn Button is the clearest
pilot: upstream accepts `className` in `buttonVariants` and in the React
component props, while Foldkit CN currently exposes `classes` instead. That
breaks the source-parity goal from Plan 017 and makes future upstream updates
harder to compare mechanically.

## Current state

- `registry/upstream/snapshots/shadcn/button.tsx` - pinned shadcn Button source.
  It accepts `className`, combines it with `buttonVariants`, and exports
  `Button` plus `buttonVariants`.
- `registry/shadcn/ui/shadcn-button/view.ts` - Foldkit CN shadcn Button style
  helper. It currently uses `classes` instead of upstream's `className`.
- `registry/base-ui/ui/base-ui-button/*` - Base UI Button pilot. Base UI is a
  source/type reference, not a runtime React renderer.
- `scripts/check-no-component-classname-api.mjs` - current guard bans every
  `className`, every `*ClassName`, and every `classNames` helper in registry UI
  source and generated public JSON.
- `plans/018-remove-component-classname-api.md` and `plans/README.md` - record
  the now-overbroad policy and must be corrected so future executors do not
  remove upstream-compatible interfaces again.

Relevant current excerpts:

```tsx
// registry/upstream/snapshots/shadcn/button.tsx:41
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

```ts
// registry/shadcn/ui/shadcn-button/view.ts:21
export type ButtonVariantConfig = Readonly<{
  variant?: ShadcnButtonVariant | undefined;
  size?: ShadcnButtonSize | undefined;
  classes?: string | undefined;
}>;

// registry/shadcn/ui/shadcn-button/view.ts:81
export const buttonVariants = ({
  variant = "default",
  size = "default",
  classes,
}: ButtonVariantConfig = {}): string =>
  cn(
    shadcnButtonBaseClasses,
    shadcnButtonClassesByVariant[variant],
    shadcnButtonClassesBySize[size],
    classes,
  );
```

```ts
// scripts/check-no-component-classname-api.mjs:9
const oldApiWord = `class${"Name"}`;
const oldApiSuffix = `Class${"Name"}`;
const oldHelperWord = `class${"Names"}`;
const sourcePattern = new RegExp(
  `\\b(${oldApiWord}|[A-Za-z0-9_]+${oldApiSuffix}|${oldHelperWord})\\b`,
  "g",
);
```

Repo conventions to preserve:

- This is a Foldkit app. Registry views must remain Foldkit-native and must not
  import React, `radix-ui`, or `@base-ui/react` runtime components.
- Use `cn` from `src/lib/utils.ts` or the installed registry alias wherever
  shadcn-style class composition is needed.
- Keep `*Classes` constants if the current implementation needs named internal
  class strings, but do not restore exported identifiers ending in `ClassName`
  merely for backwards compatibility. shadcn exports `buttonVariants`, not
  `shadcnButtonBaseClassName`.
- `classes` is not the upstream shadcn/Button spelling. Use `className` for
  upstream-compatible public style extension hooks unless the upstream origin
  demonstrably uses a different property name.

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Upstream refs | `bun run check:upstream-refs` | exit 0 |
| Upstream contracts | `bun run sync:upstream-contracts -- --check` | exit 0 |
| Focused Button tests | `bun run test registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts registry/base-ui/ui/base-ui-button/base-ui-button.scene.test.ts` | all tests pass |
| Typecheck | `bun run typecheck` | exit 0, no errors |
| Registry build | `bun run build:registry` | exit 0 |
| Registry checks | `bun run check:registry` | exit 0 |
| Full tests | `bun run test` | all tests pass |

## Scope

**In scope**:

- `registry/shadcn/ui/**`
- `registry/shadcn/examples/**`
- `registry/base-ui/ui/**`
- `registry/base-ui/examples/**`
- `registry/upstream/**` and `scripts/sync-upstream-component-contracts.mjs`
  only if you need additional derived metadata for className parity checks.
- `scripts/check-no-component-classname-api.mjs` or a replacement guard script.
- `package.json` only if a script name changes.
- `apps/docs/public/**` generated registry output.
- Docs/source references that describe the component entry contract:
  `docs/product/component-entry-contract.md`,
  `docs/product/upstream-source-references.md` if present,
  `plans/018-remove-component-classname-api.md`, and `plans/README.md`.
- OpenStory/docs generated source files only where they contain the renamed
  `classes` public API and must compile after the restore:
  `src/docsView.ts`, `src/docsExamplePreviews*.ts`, and `src/openstory/**`.

**Out of scope**:

- Do not add React wrappers or a React `Button` export.
- Do not add `asChild` to Foldkit views in this plan. Upstream's `asChild`
  maps to React Slot composition and needs a separate Foldkit design decision.
- Do not restore exported `*ClassName` constants.
- Do not rename unrelated internal variables that are not public style API.
- Do not change Foldkit-origin or AI Elements-origin component APIs unless
  typecheck reveals a direct call to an existing external API that still requires
  `className`.
- Do not import directly from `registry/upstream/**` in installable component
  source.

## Git workflow

- Branch: continue from the current branch or create
  `codex/019-restore-upstream-classname-parity`.
- Commit one logical unit: source/API restore, guard/doc update, generated
  registry output.
- Do not push or open a PR unless the operator explicitly asks.

## Steps

### Step 1: Change the policy from word-ban to origin parity

Update `plans/018-remove-component-classname-api.md` and `plans/README.md` so
they no longer describe `className` itself as forbidden. The corrected rule:

- forbid exported `*ClassName` constants and local `classNames` joiners that are
  Foldkit CN inventions;
- forbid `classes` as a replacement spelling when upstream exposes `className`;
- allow `className` when the shadcn/Base UI origin source or type surface has a
  matching `className` extension point;
- continue using `cn` to compose the default classes and the caller-provided
  className.

**Verify**:
`rg -n "forbid.*className|no identifier named \`className\`|bans every|classes as the new string extension hook" plans/018-remove-component-classname-api.md plans/README.md`
should return no stale policy statement that says all `className` identifiers
are forbidden.

### Step 2: Restore shadcn Button's upstream-compatible className helper

In `registry/shadcn/ui/shadcn-button/view.ts`, change
`ButtonVariantConfig.classes` back to `ButtonVariantConfig.className`, destructure
`className`, and pass it to `cn(...)`. Keep the current `*Classes` constant names
unless a later step removes unused exports; do not restore `*ClassName`
constant names.

Update `registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts` so the
merge-conflict test calls:

```ts
Button.buttonVariants({ className: "h-12" })
```

and names local variables `className` where that matches the tested API.

**Verify**:
`bun run test registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts` ->
all tests pass, including the custom Tailwind conflict merge test.

### Step 3: Restore className in shadcn/Base UI origin-backed component APIs

Audit the current `classes?: string` public config properties in
`registry/shadcn/ui/**` and `registry/base-ui/ui/**`. For every public styling
extension hook that corresponds to an upstream shadcn/Base UI `className`
prop, rename it to `className` and compose it through `cn`. Update call sites in
matching examples and tests.

Use this search to drive the pass:

```bash
rg -n "\\bclasses\\??:" registry/shadcn/ui registry/base-ui/ui registry/shadcn/examples registry/base-ui/examples --glob '*.{ts,tsx}'
```

For each match:

- if the parameter/config is the public style override for a component or part
  whose origin library accepts `className`, rename to `className`;
- if the name is not public API and is purely local, prefer a clearer local name
  or leave it alone only when it is not part of the style override contract;
- if upstream demonstrably uses `classes` instead of `className`, keep `classes`
  and add the upstream evidence to the plan execution notes in
  `plans/README.md`.

**Verify**:
`rg -n "\\bclasses\\??:" registry/shadcn/ui registry/base-ui/ui --glob '*.{ts,tsx}'`
should either return no matches or only matches with a nearby comment/evidence
showing upstream uses `classes`.

### Step 4: Replace the className guard with a parity guard

Refactor `scripts/check-no-component-classname-api.mjs` or replace it with a
better-named guard such as `scripts/check-origin-style-api-parity.mjs`. Update
`package.json` if the script name changes.

The guard must fail on:

- any exported identifier ending in `ClassName` in registry UI source;
- any helper named `classNames`;
- any generated public registry output that exports `*ClassName` constants;
- any `classes?:` public config in shadcn/Base UI origin-backed components when
  upstream evidence says the spelling should be `className`.

The guard must not fail merely because a shadcn/Base UI component exposes a
public `className` compatible with its origin library.

If you add derived upstream metadata, keep it under `registry/upstream/derived`
and update `scripts/sync-upstream-component-contracts.mjs` so
`bun run sync:upstream-contracts -- --check` verifies it.

**Verify**:
`bun run check:no-component-classname-api` -> exit 0, or if renamed,
`bun run check:registry` must invoke the replacement guard and exit 0.

### Step 5: Regenerate and repair generated docs/registry output

Run the registry generator after source changes:

```bash
bun run build:registry
```

Then update any generated docs/OpenStory source that still passes `classes`
into a restored `className` API. Do not hand-edit generated public JSON if the
build command owns it; fix the source and rerun the generator.

**Verify**:
`rg -n "\\bclasses\\??:|\\bclasses:" apps/docs/public src/docsView.ts src/docsExamplePreviews*.ts src/openstory registry/shadcn/examples registry/base-ui/examples --glob '*.{ts,tsx,json}'`
should return no stale call sites for restored origin-backed APIs, except for
documented upstream `classes` exceptions.

### Step 6: Run the full verification gates

Run the gates in this order:

```bash
bun run check:upstream-refs
bun run sync:upstream-contracts -- --check
bun run test registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts registry/base-ui/ui/base-ui-button/base-ui-button.scene.test.ts
bun run typecheck
bun run check:registry
bun run test
```

If a broad test fails for an unrelated pre-existing OpenStory/docs-shell issue,
capture the exact failing command and evidence in `plans/README.md`, but do not
silently mark this plan done unless the focused shadcn/Base UI className parity
tests, typecheck, and registry checks pass.

## Test plan

- Update `registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts` to prove
  `buttonVariants({ className: "h-12" })` still merges through `cn` and removes
  the conflicting default `h-9` class.
- Add or update guard tests only if the repo already has a script test pattern
  for registry checks. If not, the executable guard plus `bun run
  check:registry` is sufficient for this plan.
- Use the existing Button scene tests as the structural pattern; do not create a
  new test framework.

## Done criteria

All must hold:

- [ ] shadcn Button exposes `className` in `ButtonVariantConfig` and accepts
      `buttonVariants({ className: ... })`.
- [ ] shadcn/Button `*Classes` exports may remain, but no exported
      `*ClassName` constants are restored.
- [ ] shadcn/Base UI origin-backed public style extension hooks use `className`
      when upstream uses `className`.
- [ ] The registry guard allows upstream-compatible `className` and still fails
      on invented `*ClassName` exports or local `classNames` helpers.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run test registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts registry/base-ui/ui/base-ui-button/base-ui-button.scene.test.ts`
      exits 0.
- [ ] `plans/README.md` status row for Plan 019 is updated.

## STOP conditions

Stop and report back if:

- The upstream shadcn Button snapshot no longer accepts `className` in
  `buttonVariants` or component props.
- Restoring `className` appears to require adding React runtime wrappers,
  importing from `radix-ui`, or importing from `@base-ui/react` in installable
  Foldkit component source.
- A component's origin source cannot be identified well enough to decide whether
  `className` is part of the public interface.
- Typecheck failures require changing external `foldkit@0.104.0` package types.
- A step's verification fails twice after a reasonable fix attempt.

## Maintenance notes

This plan intentionally corrects Plan 018 rather than reverting it. Reviewers
should scrutinize the distinction: upstream-compatible `className` is allowed;
invented `*ClassName` exports and ad hoc class helper APIs remain out of scope.
Future origin-sync work should derive className/interface facts from upstream
snapshots or package types wherever possible so the guard can evolve from
allowlists toward source-derived checks.
