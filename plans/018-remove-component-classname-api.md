# Plan 018: Remove invented component style APIs and migrate styling to `cn`

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report; do
> not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 65633137..HEAD -- package.json registry scripts src/lib docs/product/component-entry-contract.md docs/product/style-lane-contract-audit.md apps/docs/public plans/018-remove-component-classname-api.md plans/README.md`
>
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding. On a
> mismatch that changes `cn`, registry install target rules, component style
> export conventions, or public registry JSON shape, treat it as a STOP
> condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: HIGH
- **Depends on**: plans/017-add-base-ui-shadcn-compatibility-foundation.md
- **Category**: migration
- **Planned at**: commit `65633137`, 2026-06-21
- **Execution status**: DONE on 2026-06-22. Commit `97d2c0a`
  landed the guard/contract pilot on branch
  `codex/018-remove-component-classname-api`; continuation commit `529ee767`
  completed the migration and passed the verification gates.
- **Correction**: Plan 019 narrows this policy. Upstream-compatible
  `className` extension points are allowed for shadcn/Base UI origin-backed
  components when the origin source or type surface exposes `className`.
  Invented exported `*ClassName` constants, local `classNames` helpers, and
  `classes` replacement props remain forbidden.

## Why this matters

Plan 017 added the shared shadcn-compatible `cn` utility and source-derived
style contracts. The component surface still exposes hundreds of old
`*ClassName` constants and local `classNames` helpers that invite every
component to compose styles differently. Plan 019 corrected the overbroad part
of this policy: public `className` props are allowed when the upstream shadcn or
Base UI origin exposes the same extension point. The enforceable direction is
that component styling should flow through lane-appropriate `cn` helpers and
typed variant/part APIs, with origin-compatible `className` composed through
`cn`, not through exported `*ClassName` symbols or ad hoc joiners.

This is a breaking API cleanup across the registry. Do it as a single explicit
migration so generated registry JSON, docs, examples, Scene tests, and smoke
checks all move together.

## Current state

Relevant files and roles:

- `src/lib/utils.ts` - canonical `cn` implementation from Plan 017.
- `registry/**/ui/**` - installable component source. This is the primary
  migration target.
- `registry/**/examples/**` - example programs that import/use component style
  constants and pass upstream-compatible `className` options.
- `src/docsExamplePreviews*.ts` and `src/openstory/generated/**` - generated or
  preview-facing story surfaces that may reference old component exports.
- `registry/**/registry.json` and `apps/docs/public/**` - source manifests and
  generated public registry JSON.
- `docs/product/component-entry-contract.md` - currently still documents the old
  `*ClassName` policy.
- `scripts/check-upstream-reference-contract.mjs` - current guard proving
  upstream refs and forbidden runtime imports.
- `scripts/check-registry-metadata.mjs` and `scripts/check-example-tests.mjs` -
  examples of read-only guard scripts wired into `check:registry`.

Current `cn` utility:

```ts
// src/lib/utils.ts:1
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ReadonlyArray<ClassValue>): string =>
  twMerge(clsx(inputs));
```

The current component contract still requires the API this plan removes:

```md
// docs/product/component-entry-contract.md:302
### `view.ts`

`view.ts` owns presentation helpers and default styling constants.

Required:

- Export default class constants per anatomy part:
  `{component}RootClassName`, `{component}LabelClassName`, etc.

// docs/product/component-entry-contract.md:318
Default styling policy:

- `*ClassName` props append to default registry classes.
- `*Style` props apply inline styles to the same anatomy element.
```

The new Plan 017 contract points the other way:

```md
// docs/product/component-entry-contract.md:107
For shadcn-origin source, `src/lib/utils.ts` is the canonical local
shadcn-style utility module. Registry source may import it as
`@/src/lib/utils`; the project and generated consumer template both map `@/*`
to the repository root so the same path resolves locally and after install.
Use `cn` for shadcn class composition whenever a consumer `className` should be
able to override default Tailwind classes.
```

`shadcn-button` is the newest style pilot. It already uses `cn`, but still
exports many `*ClassName` symbols and accepts a `className` override:

```ts
// registry/shadcn/ui/shadcn-button/view.ts:1
import { cn } from "@/src/lib/utils";

// registry/shadcn/ui/shadcn-button/view.ts:20
export type ButtonVariantConfig = Readonly<{
  variant?: ShadcnButtonVariant | undefined;
  size?: ShadcnButtonSize | undefined;
  className?: string | undefined;
}>;

// registry/shadcn/ui/shadcn-button/view.ts:25
export const shadcnButtonBaseClassName =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

// registry/shadcn/ui/shadcn-button/view.ts:78
export const buttonVariants = ({
  variant = "default",
  size = "default",
  className,
}: ButtonVariantConfig = {}): string =>
  cn(
    shadcnButtonBaseClassName,
    shadcnButtonVariantClassNames[variant],
    shadcnButtonSizeClassNames[size],
    className,
  );
```

The public `shadcn-button` re-export also preserves the old constants:

```ts
// registry/shadcn/ui/shadcn-button/index.ts:5
export {
  buttonVariants,
  shadcnButtonBaseClassName,
  shadcnButtonClassName,
  shadcnButtonDefaultSizeClassName,
  shadcnButtonExtraSmallSizeClassName,
  shadcnButtonIconSizeClassName,
  shadcnButtonLargeSizeClassName,
  shadcnButtonSmallSizeClassName,
  shadcnButtonVariantClassName,
  shadcnDestructiveButtonClassName,
  shadcnDestructiveButtonVariantClassName,
  shadcnGhostButtonClassName,
  shadcnGhostButtonVariantClassName,
  shadcnIconButtonClassName,
  shadcnLinkButtonClassName,
  shadcnLinkButtonVariantClassName,
  shadcnOutlineButtonClassName,
  shadcnOutlineButtonVariantClassName,
  shadcnSecondaryButtonClassName,
  shadcnSecondaryButtonVariantClassName,
} from "./view";
```

Base UI components have many local class joiners. Example:

```ts
// registry/base-ui/ui/avatar/index.ts:73
const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

// registry/base-ui/ui/avatar/index.ts:81
export const rootView = <ParentMessage>({
  size = "Default",
  children,
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.DataAttribute("slot", "avatar"),
      h.Class(classNames(avatarClassNameBySize(size), className)),
      h.Style(style ?? {}),
    ],
    children,
  );
};
```

An initial inventory on 2026-06-21 found:

- 378 live `registry/*/ui` files contain `className` or `*ClassName`.
- 770 `export const ...ClassName` matches in `registry/*/ui`.
- 429 `className?:` prop declarations in `registry/*/ui`.
- 84 local `classNames` helper declarations in `registry/*/ui`.

These counts are intentionally included as drift clues, not exact done
criteria; the final guard script is the source of truth.

Foldkit conventions to preserve:

- Model fields must be Schema types.
- Messages are facts, verb-first and past-tense. Do not use `NoOp`.
- Use `evo()` for immutable updates when touching Foldkit app state.
- Bind `const h = html<Message>()` inside view functions.
- Use `empty` for conditional rendering.
- Do not import from `repos/foldkit/`.
- Do not introduce React runtime components into installable registry source.
- Do not change component behavior or accessible semantics just to rename style
  helpers.

## Blocked execution note

A 2026-06-22 execute attempt stopped after Step 2. The first commit,
`97d2c0a Add component classname guard`, changed only:

- `package.json`
- `docs/product/component-entry-contract.md`
- `scripts/check-no-component-classname-api.mjs`

The executor then performed a broad uncommitted migration and `bun run
typecheck` failed twice. The reproduced errors were:

```text
src/ui/view/toast.ts(155,11): error TS2561: Object literal may only specify known properties, but 'entryClasses' does not exist ... Did you mean to write 'entryClassName'?
src/ui/view/virtualList.ts(308,19): error TS2561: Object literal may only specify known properties, but 'containerClasses' does not exist ... Did you mean to write 'containerClassName'?
src/ui/view/virtualList.ts(350,19): error TS2561: Object literal may only specify known properties, but 'containerClasses' does not exist ... Did you mean to write 'containerClassName'?
```

Those errors come from external Foldkit primitive input types in
`foldkit@0.104.0`. This plan removes `className`/`*ClassName` from installable
registry component APIs; it does not rename every call-site key required by the
current external Foldkit primitive package. A retry must start from a clean
checkout or deliberately salvage the dirty branch, and it must not use a global
rename over all `src/**`.

Continuation result: commit `529ee767 Remove component classname APIs` salvaged
the dirty branch by reverting the broad external primitive call-site rename
fallout, keeping current `foldkit@0.104.0` primitive keys where required, and
finishing the registry migration. The approved implementation preserves
`classes` as the new string extension hook in many component configs, composed
through `cn`. That is an intentional deviation from the stricter "typed options
only" wording above, accepted because the concrete execution target was to
remove `className`/`*ClassName` naming and centralize composition through `cn`.

## Commands you will need

Use Bun. If your shell cannot find `bun`, use:

`env PATH=/Users/richardmcandrews/.bun/bin:/Users/richardmcandrews/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/usr/bin:/bin:/usr/sbin:/sbin <command>`

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Inventory old API | `bun scripts/check-no-component-classname-api.mjs` | exit 0 after migration; before migration it should report matches |
| Generate registry | `bun run build:registry` | exit 0; public JSON updates |
| Registry checks | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0, no TypeScript errors |
| Full tests | `bun run test` | exit 0, all Vitest/Scene tests pass |
| Origin parity coverage | `bun run origin:parity:coverage` | exit 0 |
| Focused visual parity | `bun run origin:parity:test -- --grep base-ui-button` | exit 0 |
| Install smoke | `PUBLIC_REGISTRY_BASE_URL=http://127.0.0.1:<port> bun run smoke:public-install` | exit 0 against a local static server for `apps/docs/public` |

`bun run lint` may report broad pre-existing lint debt. Fix new lint issues in
files you touch, but do not mass-format unrelated files.

## Scope

**In scope**:

- `docs/product/component-entry-contract.md` - replace the old `*ClassName`
  contract with the new `cn`/typed style helper contract.
- `docs/product/style-lane-contract-audit.md` - document this migration as the
  next registry-wide style-surface cleanup.
- `src/lib/utils.ts` - only if a minor type tweak is needed for registry-wide
  `cn` usage.
- `registry/**/ui/**/*.ts` - remove public `className` props, exported
  `*ClassName` constants, local `classNames` joiners, and usages from
  installable component source.
- `registry/**/examples/**/*.ts` - update example code that imports old
  constants or passes `className` config.
- `src/docsExamplePreviews*.ts`, `src/openstory/generated/**`, and docs/story
  source that imports old component style exports.
- `registry/**/registry.json` - update dependencies/files only if the component
  source now imports `cn` and needs `src/lib/utils.ts` included for install.
- `apps/docs/public/**` - generated output from `bun run build:registry`.
- `scripts/check-no-component-classname-api.mjs` - new read-only guard that
  fails if component source or generated public registry JSON reintroduces the
  old API surface.
- `package.json` - wire the new guard into `check:registry`.
- `scripts/smoke-public-install.mjs` - only if additional install smoke coverage
  is needed for representative migrated items.

**Out of scope**:

- Changing Foldkit runtime primitives or Elm Architecture behavior.
- Rewriting visual design tokens, spacing, colors, or accessibility behavior.
- Removing `h.Class(...)`; Foldkit views still apply class attributes through
  `h.Class`. The ban is on public/local API symbols named `className` or
  `*ClassName`, not on class attributes themselves.
- Renaming non-component app internals outside `registry/**/ui/**`, such as
  `src/themePlayground.ts`, unless they import migrated component symbols.
- Renaming keys that are required by the currently installed external Foldkit
  primitive APIs, such as `entryClassName` and `containerClassName`, in
  unrelated `src/ui/view/**` callers. If the product wants those external
  primitive API fields renamed too, write a separate Foldkit API/adapter plan.
- Editing historical plan files except this new plan and `plans/README.md`.
- Importing React, `@base-ui/react`, shadcn source files, `repos/`, or
  `apps/docs/` from installable registry source.

## Git workflow

- Branch: `codex/018-remove-component-classname-api`
- Commit per logical unit:
  1. contract and guard script
  2. shadcn component migration
  3. Base UI component migration
  4. Foldkit/AI Elements registry component migration
  5. examples/generated registry output/smoke fixes
- Commit message style is short imperative prose, for example
  `Fix shadcn Button install smoke`.
- Do not push or open a PR unless the operator explicitly asks.

## Steps

### Step 1: Update the product contract and add the guard

Edit `docs/product/component-entry-contract.md` so it no longer requires:

- exported default class constants named `{component}RootClassName`,
  `{component}LabelClassName`, etc.;
- public `*ClassName` props;
- invented public style props that diverge from the upstream origin.

Replace that policy with:

- components expose typed style helpers or variant helpers with semantic names,
  for example `buttonVariants({ variant, size })`, `avatarRoot({ size })`, or
  `{component}{Part}Classes(config)`;
- those helpers compose defaults with `cn`;
- public style extension should use typed variant/size/tone/part options, plus
  `className` where that spelling exists in the upstream shadcn/Base UI origin;
- one-off consumer classes belong in caller-owned wrapper markup via `h.Class`,
  not in component config;
- any replacement styling that is not upstream-compatible should use an
  explicit documented option such as `unstyled`, not a new ad hoc spelling;
- `h.Class` remains the internal Foldkit view attribute for applying the helper
  output.

Create `scripts/check-no-component-classname-api.mjs`. It must be read-only and
fail on all of these in live component source:

- any exported identifier ending in `ClassName` in
  `registry/*/ui/**/*.{ts,tsx}`;
- local helper names such as `classNames` in `registry/*/ui/**/*.{ts,tsx}`;
- generated public registry item content that exports `*ClassName` constants in
  `apps/docs/public/*.json`;
- `classes?:` public config in shadcn/Base UI origin-backed components when the
  origin spelling is `className`.

Guard details:

- Exclude `node_modules`, `registry/upstream`, and `apps/docs/public/r/**` if
  those paths ever appear.
- Do not flag `h.Class`; this is the Foldkit attribute constructor and must
  remain allowed.
- Do not scan historical `plans/**`.
- Print each match as `path:line:snippet` and a final count.
- Add the script to `package.json` as
  `"check:no-component-classname-api": "bun scripts/check-no-component-classname-api.mjs"`.
- Wire it into `check:registry` after `check-upstream-reference-contract.mjs`
  and before the broader registry/story checks.

**Verify**: before the migration, `bun run check:no-component-classname-api`
should exit 1 and report the current matches.

### Step 2: Define the replacement style API pattern

Before bulk editing, create or update one representative component in each lane
to establish the pattern:

- shadcn: `registry/shadcn/ui/shadcn-button/view.ts`
- Base UI: `registry/base-ui/ui/base-ui-button/view.ts`
- Foldkit: `registry/foldkit/ui/button/view.ts`
- AI Elements: `registry/ai-elements/ui/ai-elements-attachments/view.ts`

Target pattern:

```ts
import { cn } from "@/src/lib/utils";

const buttonBase = "...";
const buttonVariantClasses = {
  default: "...",
  destructive: "...",
} as const;

export const buttonVariants = ({
  variant = "default",
  size = "default",
}: ButtonVariantConfig = {}): string =>
  cn(buttonBase, buttonVariantClasses[variant], buttonSizeClasses[size]);
```

Rules:

- Do not export identifiers ending in `ClassName`.
- Do not introduce public config names that diverge from the upstream origin.
- Do not name local constants `*ClassName`; use names like `buttonBase`,
  `rootClasses`, `triggerClasses`, `panelClasses`, `classesByVariant`, or
  `partClasses`.
- If a component currently exports many anatomy constants, replace them with
  grouped helpers such as `avatarClasses.root({ size })`,
  `dialogClasses.panel()`, or individually named functions such as
  `avatarRootClasses({ size })`. The final identifier must not end in
  `ClassName`.
- Use `cn` instead of string interpolation for style composition.
- If a component source imports `cn`, ensure its registry item installs
  `src/lib/utils.ts` and declares `clsx` plus `tailwind-merge`.

Update each representative component's Scene tests to assert the new helper
names and to prove old exports are gone with runtime/type-level imports where
practical.

**Verify**:
`bun run test registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts registry/base-ui/ui/base-ui-button/base-ui-button.scene.test.ts registry/foldkit/ui/button/button.scene.test.ts` ->
exit 0.

**Verify**: `bun run typecheck` -> exit 0.

### Step 3: Migrate all shadcn registry components

Update every file under `registry/shadcn/ui/**`:

- remove exported `*ClassName` constants from `view.ts` and `index.ts`;
- remove `className?: ...` from public config types;
- remove local `classNames` helpers;
- use `cn` and semantic helper names for all composition;
- update component examples and Scene tests that import old constants;
- update `registry/shadcn/registry.json` item dependencies/files for every item
  that now imports `@/src/lib/utils`.

For generated or alias components such as `shadcn-alert-dialog`, prefer
renaming re-exported Base UI helpers to semantic helper names that do not end in
`ClassName`. Do not preserve old names for compatibility; this plan is the
breaking cleanup.

**Verify**:
`rg -n "\\b(className|[A-Za-z0-9_]+ClassName|classNames)\\b" registry/shadcn/ui --glob '*.{ts,tsx}'` ->
prints no matches.

**Verify**: `bun run test registry/shadcn/ui` -> exits 0 for discovered shadcn
tests. If Vitest cannot discover all shadcn tests, update `vitest.config.ts`
narrowly rather than weakening this command.

### Step 4: Migrate all Base UI registry components

Update every file under `registry/base-ui/ui/**`:

- remove exported `*ClassName` constants from `view.ts` and `index.ts`;
- remove `className?: ...` public config properties;
- remove local `classNames` helpers;
- use `cn` and Base UI part/anatomy helper names for all composition;
- update component examples and Scene tests that import old constants;
- update `registry/base-ui/registry.json` item dependencies/files for every item
  that now imports `@/src/lib/utils`.

Prefer Base UI part vocabulary in helper names, for example:

- `dialogParts.panel()`
- `selectParts.trigger()`
- `popoverParts.positioner()`
- `avatarParts.root({ size })`

Do not add React or `@base-ui/react` imports to component source.

**Verify**:
`rg -n "\\b(className|[A-Za-z0-9_]+ClassName|classNames)\\b" registry/base-ui/ui --glob '*.{ts,tsx}'` ->
prints no matches.

**Verify**: `bun run test registry/base-ui/ui` -> exits 0 for discovered Base UI
tests. If Vitest does not discover Base UI tests, update `vitest.config.ts`
narrowly.

### Step 5: Migrate Foldkit and AI Elements registry components

Update `registry/foldkit/ui/**` and `registry/ai-elements/ui/**` with the same
policy:

- remove `*ClassName` exports;
- remove public `className` config props;
- remove local `classNames` helpers;
- compose styles through `cn`;
- update examples and tests.

This lane still owns Foldkit-native primitives, so keep helper names
domain-specific and behavior-neutral. For LiveTrace and AI Elements components,
prefer semantic names such as `traceCardParts.root()`,
`attachmentParts.preview({ variant })`, or `selectParts.wrapper()`.

**Verify**:
`rg -n "\\b(className|[A-Za-z0-9_]+ClassName|classNames)\\b" registry/foldkit/ui registry/ai-elements/ui --glob '*.{ts,tsx}'` ->
prints no matches.

**Verify**: `bun run test registry/foldkit/ui registry/ai-elements/ui` -> exits
0 for discovered tests. If Vitest does not discover these tests, update
`vitest.config.ts` narrowly.

### Step 6: Update examples, generated stories, docs, and registry output

Run through dependent source that imports old style constants or passes
`className` component config:

- `registry/**/examples/**/*.ts`
- `src/docsExamplePreviews*.ts`
- `src/openstory/generated/**/*.stories.ts`
- `src/main.story.test.ts`
- `docs/product/**/*.md`
- `scripts/scaffold-component-slice.ts`
- `scripts/generate-registry-project.test.ts`

For each use:

- replace imported old constants with the new helper names;
- replace `className: "..."` component config with a typed style option if the
  component now exposes one;
- otherwise move caller-owned layout classes into local wrapper markup with
  `h.Class(...)`;
- update docs so they teach the new `cn` helper pattern and do not recommend
  `*ClassName` exports or `className` overrides.

Run `bun run openstory:generate` only if generated stories are stale and the
generator owns the files. Otherwise update generated imports through the source
that generates them.

Run `bun run build:registry` after source changes.

**Verify**:
`rg -n "\\b(className|[A-Za-z0-9_]+ClassName|classNames)\\b" registry scripts docs/product src/docsExamplePreviews*.ts src/openstory src/main.story.test.ts --glob '*.{ts,tsx,js,mjs,md}'` ->
only allowed matches are:

- `src/lib/utils.ts` import/type names from `clsx`;
- `docs/product` historical notes explicitly explaining the removed API;
- this plan file.

Do not run a global rename or a global failure gate across all `src/**` for this
step. `src/ui/view/**` includes app/demo callers of the current external
Foldkit primitive package, which may still require `*ClassName` input keys until
a separate Foldkit primitive API or adapter migration lands.

**Verify**: `bun run build:registry` -> exit 0.

### Step 7: Run the final guard and full verification

Run the new guard:

```sh
bun run check:no-component-classname-api
```

It must exit 0 and report zero old component API matches.

Then run:

```sh
bun run typecheck
bun run check:registry
bun run test
bun run origin:parity:coverage
bun run origin:parity:test -- --grep base-ui-button
```

Finally run a branch-local public install smoke:

```sh
python3 -m http.server <free-port> --bind 127.0.0.1 --directory apps/docs/public
PUBLIC_REGISTRY_BASE_URL=http://127.0.0.1:<free-port> bun run smoke:public-install
```

Stop the local static server after the smoke command.

**Verify**: all commands above exit 0.

## Test plan

- Extend representative Scene tests in each lane to assert new helper exports:
  - `registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts`
  - `registry/base-ui/ui/base-ui-button/base-ui-button.scene.test.ts`
  - `registry/foldkit/ui/button/button.scene.test.ts`
  - one AI Elements component test, creating one if no suitable test exists.
- Update all tests that import old `*ClassName` exports to import the new
  helper functions/objects instead.
- Add `scripts/check-no-component-classname-api.mjs` as the regression test for
  the old API surface.
- Keep existing behavior Scene tests intact; this migration should not remove
  accessibility or message-flow coverage.

## Done criteria

ALL must hold:

- [ ] `docs/product/component-entry-contract.md` no longer requires `*ClassName`
      exports or non-origin component config props.
- [ ] `registry/**/ui/**/*.{ts,tsx}` has no exported identifier ending in
      `ClassName`, no local `classNames` helper, and no `classes?:` replacement
      prop where the upstream origin uses `className`.
- [ ] Generated `apps/docs/public/*.json` component content has no old
      component `className`/`*ClassName` API references.
- [ ] Component source that composes Tailwind classes uses `cn` or a helper that
      calls `cn`.
- [ ] Every registry item whose source imports `@/src/lib/utils` installs
      `src/lib/utils.ts` and declares `clsx` plus `tailwind-merge`.
- [ ] `bun run check:no-component-classname-api` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run origin:parity:coverage` exits 0.
- [ ] `bun run origin:parity:test -- --grep base-ui-button` exits 0.
- [ ] Branch-local `PUBLIC_REGISTRY_BASE_URL=... bun run smoke:public-install`
      exits 0.
- [ ] `plans/README.md` status row updated.

Review on 2026-06-22 verified these gates on
`codex/018-remove-component-classname-api` at `529ee767`.

## STOP conditions

Stop and report back without improvising if:

- The drift check shows plan 017's `cn` utility or registry install shape has
  changed in a way that invalidates this plan.
- Removing `className` props requires changing component behavior, accessibility
  semantics, message names, model shape, or Foldkit primitive APIs.
- Any migrated component cannot express a documented upstream variant/part
  contract without a string `className` escape hatch; report the component and
  propose a typed option.
- The migration requires touching more than `registry/**/ui`, examples,
  generated registry/story output, docs, and guard scripts.
- `bun run typecheck` asks for an external Foldkit primitive input key such as
  `entryClassName` or `containerClassName` after a broad rename outside the
  registry component surface; revert that approach in the executor branch and
  report the primitive API boundary instead of changing Foldkit primitives in
  this plan.
- More than 20 public examples need semantic redesign rather than mechanical
  wrapper/helper updates; split the migration by lane instead of pushing a
  risky mega-change.
- A verification command fails twice after a reasonable focused fix attempt.

## Maintenance notes

This is a breaking style API migration. Reviewers should scrutinize generated
registry JSON and install smoke results, not just local tests. Future component
plans should not introduce `*ClassName` constants or `className` config props;
they should add typed variant/size/tone/part options and compose their final
classes through `cn`. If a future component truly needs arbitrary style
replacement, require an explicit documented `unstyled` or `style`-specific API
instead of reopening the ambiguous `className` escape hatch.
