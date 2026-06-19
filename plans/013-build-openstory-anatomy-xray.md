# Plan 013: Build the interactive OpenStory anatomy x-ray view

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report; do
> not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 1e93385e..HEAD -- src/openstory src/openstory/generated scripts/generate-openstory-stories.mjs scripts/generate-openstory-stories.test.ts docs/product/component-entry-contract.md docs/product/docs-surface-guardrails.md package.json plans/013-build-openstory-anatomy-xray.md plans/README.md`
>
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding. On a mismatch that
> changes OpenStory's Foldkit story shape, generated story expectations, or the
> documentation reference contract, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: docs
- **Planned at**: commit `1e93385e`, 2026-06-18

## Why this matters

The component docs contract now requires an anatomy section that behaves like an
x-ray of the rendered HTML: developers should see the code-like structure, hover
or focus an element, and understand which rendered part, classes, styles, and
attributes construct the component. The repo does not yet have a reusable
Foldkit-native view for that interaction. Building it first keeps the later
documentation-reference story work small and gives reviewers a focused place to
verify hover, focus, selected-state, and mobile layout behavior.

## Current state

Relevant files and roles:

- `docs/product/component-entry-contract.md` - canonical docs contract. It now
  requires an "X-ray style rendered HTML map with part names, classes, styles,
  attributes" for Anatomy.
- `docs/product/docs-surface-guardrails.md` - companion public-site guardrail.
  It says the Anatomy section should support hovering a code element to
  highlight the corresponding preview element and display part metadata.
- `src/openstory/wipSpace/livetrace.stories.ts` - existing hand-authored
  OpenStory story pattern for a Foldkit program.
- `src/openstory/wipSpace/livetrace/main.ts` - existing Foldkit program used by
  hand-authored OpenStory stories.
- `registry/base-ui/ui/base-ui-avatar/index.ts` and `view.ts` - small component
  API with meaningful anatomy parts; use it as the first x-ray fixture.
- `registry/base-ui/ui/base-ui-avatar/base-ui-avatar.scene.test.ts` - simple
  Scene test pattern for a static view.

Contract excerpts to preserve:

```md
// docs/product/component-entry-contract.md
| Anatomy | always | X-ray style rendered HTML map with part names, classes, styles, attributes. |

The Anatomy section should be interactive when the component has meaningful
markup: hovering a code element highlights the corresponding preview element
and displays the relevant part name, classes, data attributes, ARIA attributes,
and style hooks.
```

Current hand-authored OpenStory story pattern:

```ts
// src/openstory/wipSpace/livetrace.stories.ts
import type { Meta, StoryObj } from "openstory/foldkit";
import * as LiveTraceCapture from "./livetrace/main";

const meta = {
  title: "wipSpace/LiveTrace",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullPage: Story = {
  name: "Full Page",
  render: () => LiveTraceCapture,
};
```

Foldkit conventions to follow:

- A Foldkit app module exports `Model`, `Message`, `init`, `update`, and `view`.
- Model fields must be Schema types. Use `S.Option(S.String)` for the selected
  part instead of `null` or `undefined`.
- Messages are facts, verb-first and past-tense. Use messages such as
  `HoveredPart`, `FocusedPart`, `ClearedPart`, and `SelectedPart`; do not use
  `NoOp`.
- `init` and `update` return `readonly [Model, readonly Command.Command<Message>[]]`.
- Use `evo()` for immutable updates, `M.value(...).pipe(M.tagsExhaustive(...))`
  for message handling, and bind `const h = html<Message>()` inside view
  functions.
- Prefer accessible controls: x-ray code rows should be focusable buttons, not
  pointer-only spans.

Base UI Avatar anatomy fixture:

```ts
// registry/base-ui/ui/base-ui-avatar/index.ts
export const rootView = <ParentMessage>({ children, size, className, style }: RootViewConfig): Html => ...
export const imageView = <ParentMessage>({ src, alt, className, style }: ImageViewConfig): Html => ...
export const fallbackView = <ParentMessage>({ children, ariaLabel, className, style }: FallbackViewConfig): Html => ...
export const badgeView = <ParentMessage>({ children, label, className, style }: BadgeViewConfig): Html => ...
export const groupView = <ParentMessage>(children: readonly Html[], className?: string): Html => ...
export const countView = <ParentMessage>({ count, label, className, style }: CountConfig): Html => ...
```

## Commands you will need

Use the repo's package manager, Bun. If your shell cannot find `bun`, use the
same PATH shape used elsewhere in this repo:

`env PATH=/Users/richardmcandrews/.bun/bin:/Users/richardmcandrews/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/usr/bin:/bin:/usr/sbin:/sbin <command>`

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Focused tests | `bunx vitest run src/openstory/documentation/anatomyXray.scene.test.ts src/openstory/documentation/anatomyXray.story.test.ts` | exit 0; new tests pass |
| Typecheck | `bun run typecheck` | exit 0, no TypeScript errors |
| Full tests | `bun run test` | exit 0; all Vitest tests pass |
| OpenStory build smoke | `bun run build` | exit 0; OpenStory build writes `dist` |
| Public-site smoke | `PUBLIC_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-site` after `bun run preview -- --port 4173` | exit 0 |

`bun run lint` is currently broad and may fail on pre-existing lint debt. Do not
mass-format the repo in this plan. If a new lint failure points only at files
you touched, fix it; otherwise report the pre-existing lint output.

## Scope

**In scope**:

- `src/openstory/documentation/anatomyXray.ts` - create the reusable x-ray
  Foldkit program/view helpers.
- `src/openstory/documentation/anatomyXray.scene.test.ts` - create scene tests
  for rendered labels, metadata, hover/focus affordances, and selected state.
- `src/openstory/documentation/anatomyXray.story.test.ts` - create update-level
  tests for `HoveredPart`, `FocusedPart`, `ClearedPart`, and selection.
- `src/openstory/wipSpace/anatomy-xray/main.ts` - create a small demo program
  using the Avatar fixture data.
- `src/openstory/wipSpace/anatomy-xray.stories.ts` - create a hand-authored
  OpenStory story for the x-ray demo.

**Out of scope**:

- `scripts/generate-openstory-stories.mjs` and generated files under
  `src/openstory/generated/`. Plan 014 wires the x-ray into generated
  documentation reference stories.
- Registry component source under `registry/**`. Use registry components as
  data/examples; do not refactor them here.
- Legacy Vite docs app files under `src/main.ts`, `src/main.scene.test.ts`, or
  `src/ui/view/**`.
- Public registry JSON under `apps/docs/public/**`.

## Git workflow

- Branch: use the current `codex/...` branch unless the operator tells you to
  create a new branch.
- Commit message style in this repo is short imperative prose, for example
  `Refactor registry lanes and OpenStory site`.
- Do not push or open a PR unless the operator explicitly asks.

## Steps

### Step 1: Create the x-ray data model and update loop

Create `src/openstory/documentation/anatomyXray.ts` with exported types and a
Foldkit program/view surface. The module should export at least:

- `XrayAttribute` - `{ readonly name: string; readonly value: string }`
- `XrayStyle` - `{ readonly name: string; readonly value: string }`
- `XrayPart` - `{ readonly id: string; readonly label: string; readonly tag: string; readonly description: string; readonly classes: readonly string[]; readonly attributes: readonly XrayAttribute[]; readonly styles: readonly XrayStyle[]; readonly children: readonly XrayPart[] }`
- `XrayConfig` - `{ readonly title: string; readonly summary: string; readonly parts: readonly XrayPart[] }`
- `Model` with `maybeActivePartId: S.Option(S.String)`
- messages `HoveredPart`, `FocusedPart`, `SelectedPart`, and `ClearedPart`
- `init`, `update`, and a reusable `view(config: XrayConfig)` function or
  `defineProgram(config: XrayConfig)` helper that returns a Foldkit program.

Use `Option.some(partId)` when a part is hovered/focused/selected and
`Option.none()` when cleared.

**Verify**:
`bun run typecheck` should still exit 0. If it fails because the exact Schema
Option helper differs in this repo, inspect `registry/foldkit/examples/date-picker-basic/main.ts`
and match its `S.Option(...)` usage.

### Step 2: Render a keyboard-accessible code tree and preview map

In `anatomyXray.ts`, render a two-column layout on desktop and a stacked layout
on mobile:

- Left region: a code-like HTML tree. Each element row is a `button` with an
  accessible name like `Inspect Avatar root span`. It should show the tag,
  key classes, and collapsed children indentation. Use `h.OnMouseEnter`,
  `h.OnMouseLeave`, `h.OnFocus`, `h.OnBlur`, and `h.OnClick` to update the
  active part.
- Right region: a preview map using simple boxes/cards generated from the same
  `XrayPart` tree. Each preview box must include `data-xray-part="{id}"`.
  The active preview part should have a visible ring/background.
- Details panel: show active part label, description, tag, class list,
  attributes, and styles. If no part is active, show the root part details.

Do not rely on DOM introspection. This component is driven by explicit anatomy
metadata so documentation can describe intended construction even when the
rendered preview is simplified.

**Verify**:
`bunx vitest run src/openstory/documentation/anatomyXray.scene.test.ts`
should pass after Step 3 adds tests.

### Step 3: Add focused tests for interaction and details

Create `src/openstory/documentation/anatomyXray.story.test.ts` to prove:

- `init` starts with `maybeActivePartId` as `Option.none()`.
- `HoveredPart({ partId: "avatar-root" })` selects that part.
- `FocusedPart({ partId: "avatar-image" })` selects that part.
- `ClearedPart()` clears the selection.

Create `src/openstory/documentation/anatomyXray.scene.test.ts` using
`foldkit` `Scene` to prove:

- The x-ray renders the title and summary.
- It exposes a button named `Inspect Avatar root span`.
- It exposes metadata text for classes such as `rounded-full` and attributes
  such as `alt="Lena Taylor"`.
- It exposes preview elements with `data-xray-part` attributes. If Scene cannot
  assert arbitrary attributes directly, use accessible text and role assertions
  instead and keep the attribute assertion for the Playwright smoke in Plan 014.
- Focus or click on a part changes the visible details panel.

Use the style of `registry/base-ui/ui/base-ui-avatar/base-ui-avatar.scene.test.ts`
for simple Scene assertions.

**Verify**:
`bunx vitest run src/openstory/documentation/anatomyXray.scene.test.ts src/openstory/documentation/anatomyXray.story.test.ts`
should exit 0.

### Step 4: Add a hand-authored OpenStory demo

Create `src/openstory/wipSpace/anatomy-xray/main.ts` that imports the x-ray
program helper and passes Avatar anatomy fixture data. The fixture should
include at least these parts:

- `avatar-group` - `div`, class `flex items-center -space-x-2`
- `avatar-root` - `span`, classes from `avatarBaseClassName` and `avatarSizeClassNameBySize("Default")`
- `avatar-image` - `img`, class `avatarImageClassName`, attributes `src`, `alt`
- `avatar-fallback` - `span`, class `avatarFallbackClassName`
- `avatar-badge` - `span`, class `avatarBadgeClassName`, attribute `aria-label`
- `avatar-count` - `span`, class `avatarGroupCountClassName`, attributes `role="img"` and `aria-label`

Create `src/openstory/wipSpace/anatomy-xray.stories.ts` using the same pattern
as `src/openstory/wipSpace/livetrace.stories.ts`:

```ts
import type { Meta, StoryObj } from "openstory/foldkit";
import * as AnatomyXrayDemo from "./anatomy-xray/main";

const meta = { title: "wipSpace/Anatomy Xray" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Avatar: Story = {
  name: "Avatar",
  render: () => AnatomyXrayDemo,
};
```

**Verify**:
`bun run build` should exit 0 and include the hand-authored story in the
OpenStory build.

## Test plan

- Unit/update tests in `src/openstory/documentation/anatomyXray.story.test.ts`
  for message handling.
- Scene tests in `src/openstory/documentation/anatomyXray.scene.test.ts` for
  code tree, details panel, and accessible interaction.
- Build verification via `bun run build` so OpenStory can compile the demo
  story.

## Done criteria

All must hold:

- [ ] `src/openstory/documentation/anatomyXray.ts` exports a reusable x-ray
  Foldkit program/view surface driven by explicit part metadata.
- [ ] `src/openstory/wipSpace/anatomy-xray.stories.ts` renders the Avatar x-ray
  demo in OpenStory.
- [ ] `bunx vitest run src/openstory/documentation/anatomyXray.scene.test.ts src/openstory/documentation/anatomyXray.story.test.ts` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run build` exits 0.
- [ ] No files outside the in-scope list are modified.
- [ ] `plans/README.md` status row for 013 is updated, unless a reviewer told
  you they maintain the index.

## STOP conditions

Stop and report back if:

- OpenStory cannot render a hand-authored story whose `render` returns a
  Foldkit program module, contradicting `src/openstory/wipSpace/livetrace.stories.ts`.
- The x-ray interaction requires direct DOM querying or imperative mutation.
  That would violate Foldkit's Elm-style architecture; keep state in the model
  and messages.
- Implementing the view requires changing registry component source or the
  generated OpenStory story script. Those belong to Plan 014 or later.
- A verification command fails twice after a reasonable fix attempt.

## Maintenance notes

Future docs reference stories should import and reuse this x-ray component
rather than creating ad hoc anatomy layouts. Reviewers should check that x-ray
metadata stays honest: classes and attributes must match exported component
helpers or documented intentional differences. This plan intentionally does not
try to auto-introspect rendered DOM; explicit metadata is easier to review,
stable across OpenStory rendering, and aligns with source-owned registry docs.
