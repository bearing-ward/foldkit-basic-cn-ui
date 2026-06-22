# Plan 017: Add source-derived Base UI and shadcn compatibility foundation

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report; do
> not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 24a06119..HEAD -- package.json bun.lock tsconfig.json vite.aliases.ts vitest.config.ts src/styles.css src/lib src/preview.ts src/openstory scripts registry/upstream registry/templates/components.json registry/shadcn/ui/shadcn-button registry/base-ui/ui/base-ui-button docs/product/component-entry-contract.md docs/product/style-lane-contract-audit.md plans/017-add-base-ui-shadcn-compatibility-foundation.md plans/README.md`
>
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding. On a
> mismatch that changes package dependencies, path aliases, registry target path
> rules, shadcn button exports, Base UI button exports, or theme token names,
> treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/016-add-origin-visual-parity-regression-suite.md
- **Category**: migration
- **Planned at**: commit `24a06119`, 2026-06-21
- **Execution refinement**: on 2026-06-21, the first executor stopped at Step 6
  because `bun run test registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts`
  reported "No test files found"; live `vitest.config.ts` only included `src`,
  `scripts`, and `registry/default` tests. This plan now includes the narrow
  Vitest include-glob update needed to make the planned shadcn Button test gate
  executable.
- **Second execution refinement**: a later Step 9 run showed the OpenStory e2e
  timeout was actually an OpenStory dev-server startup failure:
  `UNLOADABLE_DEPENDENCY Could not load */src/lib/utils` from the
  `@/src/lib/utils` import. Avoid a bare Vite alias key of `"@"` here because
  `vite.config.ts` feeds `Object.keys(optimizedSourceAliases)` into
  `optimizeDeps.include`, which makes Vite try to optimize `@` as a package.
  Prefer an exact local alias for `"@/src/lib/utils"` or another resolver shape
  that passes OpenStory dev without touching OpenStory shell internals.
- **Blocked review**: BLOCKED on 2026-06-21 after two executor revision rounds.
  The stacked branch reached green upstream/theme/Button/typecheck/registry/test
  gates, and branch-local public install smoke passed for the existing
  `button`/`slider` smoke path. Final review found the shadcn Button pilot still
  fails this plan's installability intent: `apps/docs/public/shadcn-button.json`
  installs `src/lib/utils.ts` but its dependencies omit `clsx` and
  `tailwind-merge`; those dependencies were accidentally added to `badge.json`
  instead. The smoke command also does not install `shadcn-button`, so it cannot
  prove the new pilot resolves `src/lib/utils.ts`.
- **Approval**: APPROVED on 2026-06-21 in
  `/Volumes/Sync/Development/Bearing-Ward/foldkit-basic-cn-ui-origin-parity-final`
  at commit `65633137` (`Fix shadcn Button install smoke`), stacked on plan 016
  commit `da3f474f`. Reviewer reran upstream refs, upstream sync check, shadcn
  theme tests, OpenStory theme e2e, shadcn Button Scene test, typecheck,
  registry checks, full Vitest, dependency placement checks, and branch-local
  public install smoke with `shadcn-button`; all exited 0.

## Why this matters

The registry now has broad Base UI and shadcn coverage, but many components
still expose local Foldkit-shaped interfaces and handwritten class-string
helpers. That makes parity fragile: upstream shadcn theme options, `cn`
semantics, variant names, and Base UI part/API vocabulary have to be copied by
memory instead of enforced by code. This plan adds a compatibility foundation so
future component work can build directly against the same utility, token, and
interface vocabulary as Base UI and shadcn while preserving Foldkit's Elm-style
runtime architecture.

It also makes upstream source derivation explicit. The goal is not merely to
cite Base UI and shadcn; it is to capture their current source/docs payloads,
derive component examples, variant contracts, theme tokens, and style names from
those payloads, and make drift visible when upstream changes. OpenStory should
then expose a top-level shadcn theme selector so every shadcn story can be
previewed against the selected shadcn style/theme without editing individual
stories.

This plan intentionally does not wrap React components from `@base-ui/react` or
the shadcn source. Base UI and shadcn are direct development references and
contract sources here; installed registry components must remain Foldkit-native
source that consumers can own.

## Current state

Relevant files and roles:

- `package.json` - Bun app/package manifest; currently has `clsx` but not
  `tailwind-merge`, `class-variance-authority`, `@base-ui/react`, or a pinned
  shadcn CLI/reference dependency.
- `bun.lock` - Bun lockfile that must change only through `bun install`.
- `tsconfig.json` and `vite.aliases.ts` - module resolution currently does not
  expose the `@/src/lib/utils` alias advertised by the install template.
  If choosing alias support, do not add a bare `"@"` Vite alias unless
  `vite.config.ts` is also made to exclude it from `optimizeDeps.include`; the
  narrower `"@/src/lib/utils"` alias is preferred for this pilot.
- `vitest.config.ts` - Vitest currently includes `src`, `scripts`, and
  `registry/default` tests, but not `registry/shadcn`; add the narrow include
  needed for the shadcn Button pilot test command if the exact command reports
  "No test files found".
- `registry/templates/components.json` - generated shadcn-compatible consumer
  config already advertises `utils: "@/src/lib/utils"`.
- `src/styles.css` - current shadcn-like CSS variables and Tailwind v4 `@theme`
  bridge.
- `src/lib/` - currently absent; no local `cn` utility exists.
- `src/preview.ts` - OpenStory preview surface; currently has no globalTypes,
  initial globals, or decorators.
- `src/openstory/generated/*.stories.ts` - generated OpenStory catalog modules
  that already group stories under titles such as `shadcn/Button`.
- `scripts/generate-openstory-stories.mjs` - generates the OpenStory story
  files and can be taught to add shadcn-only metadata/decorators if needed.
- `registry/upstream/` - currently absent; no local source snapshots or derived
  component/theme contracts are checked in.
- `registry/shadcn/ui/shadcn-button/*` - good pilot for shadcn interface parity
  because upstream shadcn button has variants and sizes.
- `registry/base-ui/ui/base-ui-button/*` - good pilot for Base UI source
  reference guardrails because it wraps the Foldkit Button primitive.
- `scripts/build-registry.mjs` - allows registry items to install files under
  `src/lib/`.
- `docs/product/component-entry-contract.md` - canonical component contract.
- `docs/product/style-lane-contract-audit.md` - current style-lane follow-up
  queue.

The current package manifest has `clsx`, but not the shadcn `cn` stack or direct
upstream reference dependencies:

```json
// package.json:31
"dependencies": {
  "@effect/platform-browser": "4.0.0-beta.66",
  "@effect/platform-node": "4.0.0-beta.66",
  "@tailwindcss/vite": "^4.2.4",
  "clsx": "^2.1.1",
  "effect": "4.0.0-beta.66",
  "embla-carousel": "^8.6.0",
  "foldkit": "0.104.0",
  "tailwindcss": "^4.2.4"
}
```

The generated `components.json` template already tells consumers to expect a
shadcn-style utility path:

```json
// registry/templates/components.json:15
"aliases": {
  "components": "@/src/components",
  "utils": "@/src/lib/utils",
  "ui": "@/src/ui",
  "lib": "@/src/lib",
  "hooks": "@/src/hooks"
}
```

Local styles already use shadcn-compatible CSS variable names and Tailwind v4
theme bindings:

```css
/* src/styles.css:5 */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --destructive: 0 84.2% 60.2%;
  --radius: 0.5rem;
}

/* src/styles.css:55 */
@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}
```

Current shadcn Button style exports are manually assembled constants, not a
variant helper shaped like upstream shadcn:

```ts
// registry/shadcn/ui/shadcn-button/view.ts:1
export const shadcnButtonBaseClassName =
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4";

// registry/shadcn/ui/shadcn-button/view.ts:35
export const shadcnButtonClassName = `${shadcnButtonBaseClassName} ${shadcnButtonVariantClassName} ${shadcnButtonDefaultSizeClassName}`;
```

The shadcn Button public surface currently re-exports the Foldkit Button
primitive with local class constants:

```ts
// registry/shadcn/ui/shadcn-button/index.ts:1
export { view } from "../../../foldkit/ui/button";
export type { ButtonAttributes, ViewConfig } from "../../../foldkit/ui/button";
```

Base UI Button has the same primitive-backed shape:

```ts
// registry/base-ui/ui/base-ui-button/index.ts:1
import { Ui } from "foldkit";

export const { view } = Ui.Button;
```

Several components already have local `classNames` helpers:

```ts
// registry/base-ui/ui/base-ui-avatar/index.ts:73
const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");
```

The registry builder already permits install targets in `src/lib/`, so adding a
shared installed utility is compatible with the existing output contract:

```js
// scripts/build-registry.mjs:90
const approved =
  target.startsWith("src/ui/") ||
  target.startsWith("src/lib/") ||
  target.startsWith("src/examples/");
```

The local OpenStory preview has no higher-level globals or decorator today:

```ts
// src/preview.ts:5
const preview: Preview = {
    parameters: { layout: "centered" },
    decorators: [],
}
```

Generated shadcn stories are pure generated modules; shadcn Button currently
has many example stories, but none receive theme metadata:

```ts
// src/openstory/generated/shadcn-button.stories.ts:20
const meta = {
  title: "shadcn/Button",
} satisfies Meta
```

OpenStory supports the high-level control surface needed here. `Preview` can
declare globals and global toolbar items:

```ts
// ../openstory/packages/openstory/src/types.ts:212
export interface Preview {
  decorators?: Decorator<unknown>[];
  parameters?: StoryParameters;
  globalTypes?: Record<string, GlobalType>;
  initialGlobals?: Record<string, unknown>;
  tags?: string[];
}
```

The OpenStory shell renders `globalTypes` toolbar controls in its top bar and
passes changes back as globals:

```tsx
// ../openstory/packages/openstory/src/shell/src/components/top-bar.tsx:34
const globalEntries = Object.entries(manifest.globalTypes);

// ../openstory/packages/openstory/src/shell/src/components/top-bar.tsx:61
<Select
  key={key}
  value={currentValue}
  onValueChange={(next) => onGlobalChange(key, next)}
>
```

The story iframe receives changed globals and remounts the story:

```ts
// ../openstory/packages/openstory/src/boot/boot.ts:364
case "set-globals": {
  globals = { ...globals, ...message.globals };
  await mountOnce();
  break;
}
```

The canonical component contract already requires Base UI and shadcn components
to compare against upstream docs and source:

```md
// docs/product/component-entry-contract.md:99
Base UI and shadcn are open-source source references, not inspiration boards.
When implementing or reviewing a Base UI or shadcn-origin component, compare
against the upstream docs and source code.
```

Current product direction says Base UI is the behavior/accessibility reference
and shadcn is the styled example-parity target:

```md
// docs/product/base-ui-shadcn-expansion-plan.md:10
Foldkit CN should grow from "styled coverage for current Foldkit UI primitives"
into a shadcn-style registry that covers the common Base UI and shadcn component
surface area. Base UI is the preferred primitive and accessibility reference for
new behavior work. shadcn remains the styled registry and example-parity target.
```

Current upstream facts to preserve in the implementation:

- shadcn's `apps/v4/lib/utils.ts` exports `cn(...inputs)` implemented as
  `twMerge(clsx(inputs))`.
  Source: https://github.com/shadcn-ui/ui/blob/main/apps/v4/lib/utils.ts
- shadcn Button uses `class-variance-authority`, `VariantProps`, `cn`, and
  named `variant`/`size` options.
  Source: https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx
- shadcn docs recommend CSS variables through `tailwind.cssVariables: true` and
  semantic tokens such as `background`, `foreground`, and `primary`.
  Source: https://ui.shadcn.com/docs/components-json
- Current shadcn theming docs say CSS variables are recommended, semantic tokens
  such as `background`, `foreground`, `primary`, `border`, `input`, `ring`,
  chart tokens, sidebar tokens, and `radius` are the theme contract, and
  `tailwind.cssVariables: true` is the default. They list current base colors:
  Neutral, Stone, Zinc, Mauve, Olive, Mist, and Taupe.
  Source: https://ui.shadcn.com/docs/theming
- shadcn CLI v4 adds presets, `--diff`, `--view`, `docs`, and registry base
  payloads; use those as source/update surfaces before scraping rendered docs.
  Source: https://ui.shadcn.com/docs/changelog/2026-03-cli-v4
- Rhea is a current shadcn style option, not just a spacing tweak; the theme
  catalog must allow style names to come from upstream source instead of a
  hard-coded legacy list.
  Source: https://ui.shadcn.com/docs/changelog/2026-05-rhea
- Base UI is unstyled and compatible with Tailwind, CSS Modules, CSS-in-JS, or
  plain CSS. It should inform behavior and anatomy without imposing visual CSS.
  Source: https://base-ui.com/react/handbook/styling
- `@base-ui/react` publishes component entry points such as `./accordion`,
  `./avatar`, `./button`, `./dialog`, `./select`, and `./tabs`.
  Source: https://github.com/mui/base-ui/blob/master/packages/react/package.json

Foldkit conventions to follow:

- Model fields must be Schema types.
- Messages are facts, verb-first and past-tense. Do not use `NoOp`.
- Use `evo()` for immutable updates when touching Foldkit app state.
- Bind `const h = html<Message>()` inside view functions.
- Use `empty` for conditional rendering.
- Do not import from `repos/foldkit/`; it is read-only reference when present.
- Do not introduce React runtime components into Foldkit registry code.

## Commands you will need

Use Bun. If your shell cannot find `bun`, use:

`env PATH=/Users/richardmcandrews/.bun/bin:/Users/richardmcandrews/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/usr/bin:/bin:/usr/sbin:/sbin <command>`

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Install dependency changes | `bun install` | exit 0; `bun.lock` updates only for the new dependencies |
| Verify direct upstream refs | `bun run check:upstream-refs` | exit 0; reports Base UI package metadata, shadcn utility URL, and shadcn Button URL are readable or locally pinned |
| Sync upstream contracts | `bun run sync:upstream-contracts -- --check` | exit 0; local source snapshots and derived contracts match pinned upstream references |
| OpenStory theme tests | `bun run test src/openstory/shadcnTheme.story.test.ts` | exit 0; shadcn theme globals and token wrappers are pure and deterministic |
| OpenStory theme e2e | `bun run test:e2e -- tests/e2e/openstory-shadcn-theme.spec.ts` | exit 0; top-bar shadcn theme selection changes the story iframe token values |
| Focused shadcn Button tests | `bun run test registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts` | exit 0; tests cover variant helper output and Foldkit view compatibility |
| Registry generation | `bun run build:registry` | exit 0; public registry JSON includes the new utility file when needed |
| Registry checks | `bun run check:registry` | exit 0; includes the new compatibility guard |
| Typecheck | `bun run typecheck` | exit 0, no TypeScript errors |
| Full tests | `bun run test` | exit 0, all Vitest/Scene tests pass |
| Public install smoke | `bun run smoke:public-install` | exit 0; installed shadcn Button can resolve `src/lib/utils` |

`bun run lint` may report broad pre-existing lint debt on this branch. Fix new
lint issues in files you touch, but do not mass-format unrelated files.

## Suggested executor toolkit

- Use the upstream shadcn URLs above when shaping `cn`, Button variants, and
  theme token expectations.
- Prefer source-producing upstream commands such as `shadcn docs`, `shadcn add
  --view`, and `shadcn add --diff` before scraping prose pages. Store the exact
  command/URL/ref in the local source manifest so future updates can be repeated.
- Use Base UI docs/source for part names, state attributes, and behavior
  vocabulary. Do not use `@base-ui/react` as a runtime renderer in Foldkit
  component source.
- Use Foldkit examples and existing registry components for Elm Architecture
  shape, update functions, Scene tests, and `html<Message>()` usage.

## Scope

**In scope**:

- `package.json` and `bun.lock` - add dependency support for `tailwind-merge`,
  `class-variance-authority`, `@base-ui/react`, and a pinned shadcn CLI/reference
  package or documented shadcn source URL check. Keep React packages out of app
  runtime dependencies unless Bun requires peer metadata in devDependencies.
- `src/lib/utils.ts` - create the shadcn-compatible `cn` helper.
- `tsconfig.json` and `vite.aliases.ts` - add an `@/*` alias only if needed for
  local typecheck/runtime. If a relative import strategy works better for
  registry source and installed output, document that decision in the new
  compatibility contract instead.
- `vitest.config.ts` - add only the registry test include needed for
  `registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts` to run under
  the planned command. Do not broaden test discovery to e2e, generated output,
  `repos/`, or unrelated build artifacts.
- `registry/templates/components.json` - keep the existing `utils` alias and
  align any new assumptions with generated output.
- `registry/upstream/**` - create local pinned source snapshots and derived
  contracts for shadcn Button, shadcn theme tokens/styles, and Base UI Button.
  Keep upstream source as data/reference only; never import these files from
  installable component source.
- `docs/product/upstream-source-references.md` - create or update the human
  source map for upstream URLs, pinned refs, source commands, and refresh
  procedure.
- `scripts/sync-upstream-component-contracts.mjs` - create a check/update
  command that refreshes local upstream snapshots and derived contracts.
- `scripts/smoke-public-install.mjs` - update only if needed so the public
  install smoke actually installs the shadcn Button pilot and verifies the
  installed `src/lib/utils.ts` dependency path.
- `src/openstory/shadcnTheme.ts` - create the Foldkit/OpenStory theme catalog,
  token-to-class wrapper helpers, and preview decorator support.
- `src/openstory/shadcnTheme.story.test.ts` - create pure tests for the theme
  catalog and wrapper behavior.
- `src/preview.ts` - add `globalTypes`, `initialGlobals`, and a decorator that
  applies the selected shadcn theme/style to shadcn stories.
- `scripts/generate-openstory-stories.mjs` - only change if generated shadcn
  stories need explicit `parameters` or tags to identify shadcn stories for the
  preview decorator. Prefer title-prefix detection in the decorator if it is
  reliable.
- `tests/e2e/openstory-shadcn-theme.spec.ts` - create a browser test proving
  the OpenStory top-bar theme selector changes shadcn story CSS variables inside
  the iframe.
- `registry/shadcn/ui/shadcn-button/index.ts`,
  `registry/shadcn/ui/shadcn-button/view.ts`, and
  `registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts` - refactor as
  the shadcn compatibility pilot.
- `registry/base-ui/ui/base-ui-button/index.ts`,
  `registry/base-ui/ui/base-ui-button/view.ts`, and
  `registry/base-ui/ui/base-ui-button/base-ui-button.scene.test.ts` - add direct
  source-reference guardrails only if needed for the pilot; do not change Button
  behavior just to mirror React-specific APIs.
- `registry/shadcn/registry.json` - add `src/lib/utils.ts` to shadcn Button's
  files or add a separate `registry:lib`/utility dependency if that is the
  cleaner registry shape.
- `scripts/check-upstream-reference-contract.mjs` - create a read-only guard for
  direct upstream reference configuration.
- `scripts/check-registry-metadata.mjs` or a new check script - wire the guard
  into `check:registry` without weakening existing checks.
- `docs/product/component-entry-contract.md` - document the compatibility rule:
  Base UI/shadcn source is a development contract, not a React runtime wrapper.
- `docs/product/style-lane-contract-audit.md` - add the next migration queue for
  components that should adopt the compatibility foundation after Button.

**Out of scope**:

- Refactoring every Base UI and shadcn component in this pass.
- Importing `@base-ui/react/*`, `radix-ui`, React, or shadcn React components
  from installable Foldkit component source.
- Changing public registry names, origin URLs, or lane grouping.
- Replacing Foldkit messages/update functions with imperative event handlers.
- Changing OpenStory shell internals. Use `src/preview.ts` globals/decorators
  and generated story metadata instead.
- Running live upstream website screenshots in normal `check:registry`; plan
  016 owns visual parity capture/fixtures.

## Git workflow

- Branch: `codex/017-base-ui-shadcn-compat-foundation`
- Commit per logical unit:
  1. dependencies and `src/lib/utils`
  2. compatibility guard/docs
  3. upstream source snapshots and derived contracts
  4. OpenStory shadcn theme globals/decorator
  5. shadcn Button pilot
  6. registry/check updates
- Match existing short imperative commit style, for example
  `Add Avatar API reference widget`.
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add direct development dependencies and the `cn` utility

Add `tailwind-merge` to `dependencies` because installed component source may
depend on `src/lib/utils.ts` at runtime. Add `class-variance-authority` to
`dependencies` if the shadcn Button pilot will export a `buttonVariants` helper
that installed consumers can call. Add `@base-ui/react` to `devDependencies` as
a direct source/type reference for scripts and parity checks, not as a runtime
renderer. Add a pinned shadcn reference in one of these two acceptable forms:

- preferred: a devDependency on the published `shadcn` CLI package plus a
  source URL manifest used by `check:upstream-refs`;
- acceptable fallback: a local `docs/product/upstream-source-references.md`
  with pinned GitHub blob URLs and a check script that fetches or validates
  those URLs on demand.

Create `src/lib/utils.ts` with the shadcn-compatible helper:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ReadonlyArray<ClassValue>): string =>
  twMerge(clsx(inputs));
```

If `ReadonlyArray<ClassValue>` is rejected by the `clsx` type signature, use
the exact upstream-compatible rest parameter shape instead:

```ts
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
```

Do not add `absoluteUrl`; it depends on `NEXT_PUBLIC_APP_URL` and is not useful
in this Vite/Foldkit registry.

**Verify**: `bun install` -> exit 0 and `bun.lock` changes only for the new
dependency graph.

**Verify**: `bun run typecheck` -> exit 0 or only fails on an alias/import issue
introduced by this step. If it fails for alias/import resolution, fix that in
Step 2 before continuing.

### Step 2: Make the utility import path work locally and after install

Choose one import strategy and document it in
`docs/product/component-entry-contract.md`:

1. Add an `@/*` path alias in `tsconfig.json` and `vite.aliases.ts`, then use
   `@/src/lib/utils` in registry source to match `registry/templates/components.json`.
2. Keep registry source relative imports and ensure generated installed files
   also resolve relative to `src/ui/**` and `src/lib/**`.

Prefer the strategy that passes both local `bun run typecheck` and public
install smoke without special per-component hacks. If choosing alias support,
the alias must map `@/*` to the repository root so `@/src/lib/utils` resolves in
TypeScript for this repo and in generated consumer projects that copy the same
template. For Vite/OpenStory runtime resolution in this repo, prefer an exact
`"@/src/lib/utils"` alias unless the shared Vite optimizer configuration is also
updated to avoid optimizing the bare `"@"` key. If choosing relative imports,
update `registry/templates/components.json` only if that template would
otherwise advertise a path no installed file uses.

**Verify**: `bun run typecheck` -> exit 0, no module resolution errors for
`src/lib/utils`.

**Verify**:
`node -e "const fs=require('fs'); process.exit(fs.existsSync('src/lib/utils.ts') ? 0 : 1)"` ->
exit 0.

### Step 3: Add an upstream reference contract guard

Create `scripts/check-upstream-reference-contract.mjs`. It must be read-only and
must not write fixtures or source files. It should verify:

- `package.json` contains `@base-ui/react` in `devDependencies`.
- `package.json` contains either a `shadcn` devDependency or a documented
  `docs/product/upstream-source-references.md` entry for shadcn source URLs.
- `src/lib/utils.ts` exports `cn`.
- `src/lib/utils.ts` imports both `clsx` and `tailwind-merge`.
- shadcn Button source references include the upstream Button URL.
- Base UI source references include either `@base-ui/react` package metadata or
  the Base UI Button docs/source URL.
- no installable registry file imports from `repos/`, `apps/docs/`,
  `@base-ui/react`, `react`, `react-dom`, `radix-ui`, or a shadcn GitHub path.
- `registry/upstream/source-manifest.json` exists and records every source used
  by the Button pilot and shadcn theme catalog: source kind, URL or command,
  pinned ref/version, local snapshot path, and derived contract path.
- every derived contract declares the upstream snapshot digest it came from.
- OpenStory shadcn theme names and token names come from the derived shadcn
  theme contract, not a handwritten list in `src/preview.ts`.

Add a script to `package.json`:

```json
"check:upstream-refs": "bun scripts/check-upstream-reference-contract.mjs"
```

Wire this check into `check:registry` after the existing metadata checks and
before expensive story/parity checks.

**Verify**: `bun run check:upstream-refs` -> exit 0 and prints a concise success
message naming the checked upstream references.

**Verify**: `bun run check:registry` -> exit 0, or fails only on unrelated
pre-existing generated output drift. If generated output is stale because of
this plan, run `bun run build:registry` once and re-run the check.

### Step 4: Add source-derived upstream snapshots and contracts

Create `registry/upstream/source-manifest.json` and a source-sync script at
`scripts/sync-upstream-component-contracts.mjs`. The script must support:

- `bun run sync:upstream-contracts -- --check` - read-only check mode.
- `bun run sync:upstream-contracts -- --write` - explicit refresh mode.

Add the matching `package.json` script:

```json
"sync:upstream-contracts": "bun scripts/sync-upstream-component-contracts.mjs"
```

Start with the smallest useful source set:

- shadcn utility source: `apps/v4/lib/utils.ts`.
- shadcn Button source: `apps/v4/registry/new-york-v4/ui/button.tsx` or the
  current shadcn CLI `add button --view` output if that proves more stable.
- shadcn theme/token source: the current theming docs, CLI preset/base payload,
  or generated shadcn base registry payload. Prefer machine-readable registry
  payloads over prose docs when available.
- Base UI Button package/docs source: `@base-ui/react/button` package metadata
  and the Base UI Button docs/source URL.

Write raw snapshots under `registry/upstream/snapshots/**` and derived JSON
contracts under `registry/upstream/derived/**`. Derived contracts should be
small and reviewable. For the Button pilot, derive at least:

- `variant` names and class strings.
- `size` names and class strings.
- dependency helper names (`cn`, `buttonVariants`).
- upstream source digest.

For shadcn theme switching, derive at least:

- supported style/theme names from the current upstream source. Include Rhea if
  the current upstream source exposes it.
- base color names currently listed by upstream.
- token names required by shadcn theming: background, foreground, card,
  popover, primary, secondary, muted, accent, destructive, border, input, ring,
  chart tokens, sidebar tokens, and radius scale.
- light and dark token values for the default selected theme.

Do not derive by regexing local component files. The source of truth must be the
upstream snapshot or upstream command output.

**Verify**: `bun run sync:upstream-contracts -- --write` -> exit 0 and creates
or updates only `registry/upstream/**` plus the source reference doc if needed.

**Verify**: `bun run sync:upstream-contracts -- --check` -> exit 0 and reports
that snapshots and derived contracts are current.

**Verify**:
`node -e "const fs=require('fs'); const m=JSON.parse(fs.readFileSync('registry/upstream/source-manifest.json','utf8')); if(!Array.isArray(m.sources)||m.sources.length<4) process.exit(1)"` ->
exit 0.

### Step 5: Add OpenStory shadcn theme globals and decorator

Create `src/openstory/shadcnTheme.ts`. This module should export:

- a Schema-backed or literal-typed theme/style catalog derived from
  `registry/upstream/derived/shadcn-theme*.json`.
- `shadcnThemeGlobalTypes`, a `Preview["globalTypes"]` object with toolbar items
  for the available shadcn styles/themes.
- `initialShadcnThemeGlobals`, a `Preview["initialGlobals"]` object.
- `shadcnThemeClassNameForGlobals(globals)` or equivalent helper that returns a
  wrapper class/string of CSS variable utilities.
- `withShadcnTheme(Story, context)`, a Foldkit-compatible OpenStory decorator
  that applies the selected shadcn theme only when `context.title` starts with
  `shadcn/` or when story parameters explicitly mark the story as shadcn.

The decorator must not modify OpenStory shell internals. Use the existing
OpenStory preview surface:

```ts
const preview: Preview = {
  parameters: { layout: "centered" },
  globalTypes: shadcnThemeGlobalTypes,
  initialGlobals: initialShadcnThemeGlobals,
  decorators: [withShadcnTheme],
};
```

For Foldkit stories, the decorator cannot return React JSX. It must return a
Foldkit program/config wrapper around the inner `Story()` result. If wrapping
the returned program is not possible with the current `openstory/foldkit`
renderer, STOP and report; do not change OpenStory shell code in this plan.

Use CSS variable wrappers so theme switching changes all shadcn components that
use semantic classes such as `bg-background`, `text-foreground`, `bg-primary`,
`border-border`, `ring-ring`, chart tokens, sidebar tokens, and radius tokens.
The selected theme should appear in the iframe DOM as a stable test hook, for
example `data-shadcn-theme="rhea-neutral-light"` or equivalent.

Add `src/openstory/shadcnTheme.story.test.ts` for pure tests:

- default globals select the default shadcn theme/style.
- every global toolbar item maps to a known derived theme contract.
- `withShadcnTheme` leaves non-shadcn story titles unwrapped.
- `withShadcnTheme` wraps `shadcn/Button` and exposes the selected theme test
  attribute/class.

Add `tests/e2e/openstory-shadcn-theme.spec.ts`:

- open the OpenStory dev/build page for a shadcn Button story.
- use the top-bar global select labelled for the shadcn theme/style.
- choose a non-default theme/style.
- assert the iframe story root has the selected `data-shadcn-theme` value.
- assert a semantic token such as `--primary` or the computed background of a
  default shadcn Button changes after selection.
- assert a Base UI story does not receive the shadcn theme wrapper unless it is
  explicitly marked as a shadcn story.

**Verify**: `bun run test src/openstory/shadcnTheme.story.test.ts` -> exit 0.

**Verify**:
`bun run test:e2e -- tests/e2e/openstory-shadcn-theme.spec.ts` -> exit 0.

**Verify**: `bun run openstory:check` -> exit 0; generated story files stay
current after any generator metadata changes.

### Step 6: Refactor shadcn Button as the compatibility pilot

In `registry/shadcn/ui/shadcn-button/view.ts`, introduce a shadcn-shaped
variant helper. Preserve existing exported class constants for compatibility,
but derive them from the new helper instead of manual string concatenation.

Target public shape:

```ts
export type ShadcnButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ShadcnButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg";

export type ButtonVariantConfig = Readonly<{
  variant?: ShadcnButtonVariant | undefined;
  size?: ShadcnButtonSize | undefined;
  className?: string | undefined;
}>;

export const buttonVariants = ({
  variant = "default",
  size = "default",
  className,
}: ButtonVariantConfig = {}): string => cn(...);
```

Derive the variant and size options from the shadcn Button derived contract
created in Step 4. Use `class-variance-authority` only if it makes the resulting
helper closer to upstream shadcn and does not create awkward types in Foldkit
source. If `cva` introduces type or bundle friction, use typed lookup tables
plus `cn`; keep the exported API compatible with shadcn names.

Update `registry/shadcn/ui/shadcn-button/index.ts` to export the new
`buttonVariants`, `ShadcnButtonVariant`, `ShadcnButtonSize`, and
`ButtonVariantConfig` names. Keep `view`, `ButtonAttributes`, and `ViewConfig`
exports intact.

Add tests to `registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts`:

- default `buttonVariants()` contains `bg-primary`, `text-primary-foreground`,
  and default size classes.
- destructive/lg output contains destructive color classes and lg size classes.
- custom `className` can override a conflicting Tailwind class through `cn`,
  for example `buttonVariants({ className: "h-12" })` should not leave both
  `h-9` and `h-12` in the final string.
- old exported constants still exist and equal the corresponding
  `buttonVariants` calls.
- Foldkit `view` remains callable and renders a button through the existing
  Scene test.

**Verify**:
`bun run test registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts` ->
exit 0 and includes the new variant helper tests.
If this command reports "No test files found", update `vitest.config.ts` with a
narrow `registry/shadcn/**/*.{test,spec}.{ts,tsx,js,mjs}` include and rerun the
same command.

**Verify**: `bun run typecheck` -> exit 0.

### Step 7: Add the utility file to installable registry output

Make installed shadcn Button output able to resolve `cn` in a consuming app.
Choose one registry shape:

1. Add `src/lib/utils.ts` as a file on the `shadcn-button` registry item and
   target it at `src/lib/utils.ts`. If this path is chosen, ensure the
   `shadcn-button` registry item declares `clsx` and `tailwind-merge` as
   dependencies, and do not add those dependencies to unrelated items such as
   `badge`.
2. Create a separate utility registry item, for example `shadcn-utils`, and add
   it as a `registryDependencies` entry for any shadcn component that imports
   `cn`.

Prefer the separate utility registry item if more than one component will use
`cn` in the near term; prefer direct file inclusion if the pilot is the only
consumer and the registry codebase has no existing utility item pattern.

The generated public JSON must not import or reference `repos/`, `apps/docs/`,
GitHub raw URLs, React, or Base UI React components. It should install only
Foldkit-native component source plus `src/lib/utils.ts`.

**Verify**: `bun run build:registry` -> exit 0.

**Verify**:
`node -e "const item=require('./apps/docs/public/shadcn-button.json'); const targets=item.files.map(f=>f.target); if(!targets.includes('src/lib/utils.ts')) process.exit(1)"` ->
exit 0 if using direct file inclusion. If using `shadcn-utils`, replace this
command with a check that `shadcn-button.json.registryDependencies` includes
the qualified utility dependency and that `apps/docs/public/shadcn-utils.json`
installs `src/lib/utils.ts`.

**Verify**:
`node -e "const button=require('./apps/docs/public/shadcn-button.json'); const badge=require('./apps/docs/public/badge.json'); const b=new Set(button.dependencies); const g=new Set(badge.dependencies); if(!b.has('clsx')||!b.has('tailwind-merge')||g.has('clsx')||g.has('tailwind-merge')) process.exit(1)"` ->
exit 0 for the direct-file shape.

### Step 8: Document the compatibility contract and migration queue

Update `docs/product/component-entry-contract.md` with a short section under
the component source contract or origin policy:

- Base UI and shadcn-origin component content should be derived from checked-in
  upstream snapshots or upstream command output where practical: examples,
  visible copy, class contracts, variant names, theme tokens, and API/anatomy
  vocabulary.
- `registry/upstream/source-manifest.json` records the current source of truth
  and refresh commands. A component should not claim source parity unless its
  derived contract is current.
- `src/lib/utils.ts` is the canonical local shadcn-style utility.
- Use `cn` for shadcn-origin class composition when consumer `className` can
  override defaults.
- Prefer upstream shadcn variant names (`variant`, `size`, `default`,
  `destructive`, `outline`, etc.) for shadcn-origin components.
- shadcn theme/style switching in OpenStory is implemented through preview
  globals/decorators and generated theme contracts, not by changing OpenStory
  shell internals.
- Prefer Base UI part names and state/data-attribute vocabulary for
  Base UI-origin behavior docs and APIs.
- Direct upstream packages/repos are development references and guardrail
  inputs; installable Foldkit source must not import React components or
  upstream repository paths.

Update `docs/product/style-lane-contract-audit.md` with a new follow-up section
after the current "Next recommended slice":

- Button pilot completed by this plan.
- Next interface-parity candidates:
  `shadcn-alert`, `shadcn-dialog`, `shadcn-select`, `shadcn-tabs`,
  `base-ui-avatar`, `base-ui-dialog`, `base-ui-select`, `base-ui-tabs`.
- Each follow-up should migrate one component at a time to `cn`/variant
  helpers or documented Base UI part names, with Scene tests and install smoke.

**Verify**:
`rg -n "compatibility|src/lib/utils|buttonVariants|@base-ui/react|React runtime" docs/product/component-entry-contract.md docs/product/style-lane-contract-audit.md` ->
prints the new contract and queue entries.

### Step 9: Run full verification and update the plan index

Run the project gates most likely to catch this migration:

```sh
bun run check:upstream-refs
bun run sync:upstream-contracts -- --check
bun run test src/openstory/shadcnTheme.story.test.ts
bun run test:e2e -- tests/e2e/openstory-shadcn-theme.spec.ts
bun run test registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts
bun run typecheck
bun run check:registry
bun run test
bun run smoke:public-install
```

If `bun run smoke:public-install` requires network access and fails for network
reasons only, record the exact failure in `plans/README.md` status notes and
run `bun run build:registry` plus the JSON target check from Step 7 instead.

Update the row for plan 017 in `plans/README.md` from `TODO` to `DONE` only
after every required gate above has passed or a reviewer explicitly accepts the
documented smoke-test limitation.

**Verify**: `git status --short` -> only in-scope files are modified.

## Test plan

- Add or extend `registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts`
  for `buttonVariants`, Tailwind class conflict merging, old class constant
  compatibility, and existing Foldkit Button rendering.
- Add `src/openstory/shadcnTheme.story.test.ts` for pure shadcn theme catalog,
  globals, and decorator behavior.
- Add `tests/e2e/openstory-shadcn-theme.spec.ts` for the OpenStory top-bar
  shadcn theme selector and iframe token changes.
- Add `scripts/sync-upstream-component-contracts.mjs` coverage if the repo's
  script-test pattern makes temp upstream fixtures cheap. At minimum,
  `bun run sync:upstream-contracts -- --check` must be deterministic.
- Add a focused test for `scripts/check-upstream-reference-contract.mjs` only if
  this repo already has a script-test pattern that can create a temp fixture
  cheaply. If not, rely on the script command itself and keep the implementation
  simple.
- Run an install smoke that actually installs `shadcn-button` from the branch's
  generated registry output to prove generated consumer output can resolve
  `src/lib/utils.ts`. The existing `bun run smoke:public-install` currently
  installs `button` and `slider`; that is not sufficient for this plan unless it
  is updated to include `shadcn-button` or accompanied by an equivalent
  branch-local shadcn-button install smoke.

Use existing tests as patterns:

- `registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts` for component
  export/behavior tests.
- `scripts/registry-manifest.test.ts` for script-level fixture tests if adding
  one.
- `scripts/check-registry-metadata.mjs` for a concise read-only check script.

## Done criteria

All must hold:

- [ ] `src/lib/utils.ts` exports `cn` implemented with `clsx` and
  `tailwind-merge`.
- [ ] `package.json` has the required direct development/reference dependency
  support and `bun.lock` is updated by `bun install`.
- [ ] `bun run check:upstream-refs` exits 0.
- [ ] `registry/upstream/source-manifest.json` exists and records pinned
  upstream sources for shadcn utility, shadcn Button, shadcn themes, and Base UI
  Button.
- [ ] `bun run sync:upstream-contracts -- --check` exits 0.
- [ ] derived contracts under `registry/upstream/derived/**` feed the shadcn
  Button variant helper and OpenStory shadcn theme catalog.
- [ ] `src/preview.ts` exposes a shadcn theme/style global control through
  OpenStory `globalTypes` and `initialGlobals`.
- [ ] shadcn OpenStory stories receive the selected theme wrapper and Base UI
  stories do not receive it by default.
- [ ] `bun run test src/openstory/shadcnTheme.story.test.ts` exits 0.
- [ ] `bun run test:e2e -- tests/e2e/openstory-shadcn-theme.spec.ts` exits 0.
- [ ] `registry/shadcn/ui/shadcn-button/view.ts` exports a shadcn-shaped
  `buttonVariants` helper.
- [ ] Existing shadcn Button class constants still export and derive from the
  new helper.
- [ ] Generated registry output installs or depends on `src/lib/utils.ts` for
      shadcn Button.
- [ ] `apps/docs/public/shadcn-button.json` declares the dependencies required
      by `src/lib/utils.ts` (`clsx` and `tailwind-merge`) for the direct-file
      registry shape, and unrelated items such as `badge` do not gain those
      dependencies unless they import `cn`.
- [ ] `bun run test registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts`
  exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run test` exits 0.
- [ ] A public install smoke installs the branch's `shadcn-button` registry item
      and proves the installed `src/ui/shadcn-button/view.ts` can resolve
      `src/lib/utils.ts`, or the reviewer accepts a documented external network
      limitation plus an equivalent local registry-server smoke.
- [ ] No installable registry source imports React, `@base-ui/react`,
  `radix-ui`, shadcn GitHub paths, `repos/`, or `apps/docs/`.
- [ ] `plans/README.md` status row updated.

## STOP conditions

Stop and report back without improvising if:

- The code at the locations in "Current state" does not match the excerpts.
- `@base-ui/react` cannot be installed as a devDependency without pulling React
  into app runtime dependencies.
- The only way to use upstream Base UI behavior appears to be wrapping React
  components in Foldkit views.
- shadcn source cannot be represented as a dependency or pinned source contract
  without installing the private monorepo root as an unstable package.
- upstream shadcn theme/style data cannot be obtained from a stable command,
  registry payload, or pinned source URL.
- source-derived contracts require copying large upstream files into installable
  registry component output instead of keeping them as local reference data.
- `cn` cannot be imported in a way that works both in local registry source and
  generated consumer output.
- the OpenStory Foldkit renderer cannot support a preview decorator that wraps
  a Foldkit program/config, and the only remaining route would be changing
  OpenStory shell internals.
- Refactoring shadcn Button requires changing the Foldkit Button primitive API.
- Any step requires touching more than the Button pilot, shared utility,
  OpenStory preview/theme support, source snapshots, docs, scripts, and manifest
  files listed in Scope.
- A verification command fails twice after a reasonable fix attempt.

## Maintenance notes

This plan creates the compatibility foundation; it does not finish interface
parity for the full registry. Reviewers should scrutinize the boundary between
"upstream reference dependency" and "runtime import" carefully. The desired
future state is a sequence of small component-by-component migrations that use
`cn`, shadcn variant names, and Base UI part/state vocabulary while preserving
Foldkit messages, models, update functions, and installable source ownership.
For future updates, reviewers should first run the upstream source sync in check
mode. If upstream changed, refresh snapshots and derived contracts, then update
the affected component slice and OpenStory theme catalog in the same PR so
source, implementation, and preview behavior move in tandem.
