# Plan 025: Add a toggleable OpenStory UI dev HUD

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report -
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat dcc69c82..HEAD -- src/preview.ts src/openstory/uiDevHud.ts src/openstory/uiDevHudElement.ts src/openstory/uiDevHud.story.test.ts tests/e2e/openstory-ui-dev-hud.spec.ts tests/e2e/openstory-shadcn-theme.spec.ts plans/README.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. This plan depends on plan 024; if plan
> 024 is still TODO, complete or rebase after it before touching `src/preview.ts`.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/024-expand-openstory-shadcn-theme-catalog.md
- **Category**: dx
- **Planned at**: commit `dcc69c82`, 2026-06-22

## Why this matters

Foldkit CN is now primarily reviewed through OpenStory. Reviewers need a fast
way to inspect rendered component geometry, identity hooks, data attributes, and
browser events without opening browser devtools for every story iframe. A
toggleable UI dev HUD gives maintainers a repo-native inspection tool for the
exact surfaces this registry cares about: bounds, padding, margins, IDs, data
attributes, and browser event flow.

This should be OpenStory development instrumentation, not a new public component
API. The HUD must wrap rendered story programs from the preview layer and leave
installable registry source, generated public JSON, and component contracts
unchanged.

## Current state

This is a Foldkit app. Follow `AGENTS.md`: model fields are Schema-backed,
messages describe facts, views bind `const h = html<Message>()` inside the
function, and side effects stay out of component update/view logic unless they
are isolated in commands or a narrow platform adapter. This plan is a dev-only
OpenStory adapter, so the DOM measurement code belongs in one contained
OpenStory HUD custom element, not in registry component views.

The current preview file owns OpenStory globals and decorators. At plan time it
contains only the shadcn theme globals and one decorator:

```ts
// src/preview.ts:1-40
import type { Preview } from "openstory/foldkit"

import { withShadcnTheme } from "./openstory/shadcnTheme"
import "./styles.css"

const preview: Preview = {
    parameters: { layout: "centered" },
    globalTypes: {
        shadcnTheme: { ... },
        shadcnMode: { ... },
    },
    initialGlobals: { shadcnTheme: "rhea-neutral", shadcnMode: "light" },
    decorators: [withShadcnTheme],
}
```

Plan 024 is expected to change `src/preview.ts` so the theme globals may become
source-derived. Preserve that work. Add the HUD globals beside the theme globals
and add the HUD decorator after the theme decorator unless live code proves the
opposite order is necessary.

The existing shadcn OpenStory decorator is the closest local pattern for wrapping
Foldkit story programs without modifying each story:

```ts
// src/openstory/shadcnTheme.ts:9-20
type FoldkitProgramConfig = Readonly<{
  Model: unknown;
  init: (...args: ReadonlyArray<unknown>) => readonly [unknown, ReadonlyArray<unknown>];
  update: (model: unknown, message: unknown) => readonly [unknown, ReadonlyArray<unknown>];
  view: (model: unknown, viewInputs?: unknown) => unknown;
}>;

type HtmlChild = Parameters<ReturnType<typeof html<never>>["div"]>[1][number];
```

```ts
// src/openstory/shadcnTheme.ts:273-326
const wrapProgramConfig = (
  config: FoldkitProgramConfig,
  globals: Record<string, unknown> | undefined,
): FoldkitProgramConfig => ({
  ...config,
  view: (model, viewInputs) => {
    const h = html<never>();
    const storyView = config.view(model, ...) as HtmlChild;
    return h.div([...], [storyView]);
  },
});

export const withShadcnTheme: Decorator<unknown> = (Story, context) => {
  const story = Story();
  if (!isShadcnStoryContext(context)) {
    return story;
  }
  return wrapProgram(story, context.globals);
};
```

OpenStory globals are manifest metadata, and the type surface supports toolbar
items but does not define a multi-select toolbar type:

```ts
// node_modules/openstory/src/types.ts:84-96
export interface GlobalType {
  name?: string;
  description?: string;
  defaultValue?: unknown;
  toolbar?: ToolbarOptions;
}

export interface ToolbarOptions {
  title?: string;
  icon?: string;
  items: unknown[];
  dynamicTitle?: boolean;
}
```

The preview parser only records literal `globalTypes`, `initialGlobals`, and
`parameters` from the default exported preview object:

```ts
// node_modules/openstory/src/csf/preview-parser.ts:92-100
return {
  globalTypes: coerceLiteralObject(getObjectProperty(previewObject, "globalTypes")) as Record<
    string,
    GlobalType
  >,
  initialGlobals: coerceLiteralObject(getObjectProperty(previewObject, "initialGlobals")),
  parameters: coerceLiteralObject(getObjectProperty(previewObject, "parameters")),
};
```

That means `src/preview.ts` must keep the HUD `globalTypes` and `initialGlobals`
as literal object properties until OpenStory gains imported-preview metadata
support. You may export shared constants from `src/openstory/uiDevHud.ts` for
tests, but do not replace the preview metadata with imported constants unless
you also update OpenStory itself, which is out of scope.

The repo already has a Foldkit-native anatomy x-ray view that demonstrates the
visual inspection vocabulary, but it is static documentation, not a runtime
overlay:

```ts
// src/openstory/documentation/anatomyXray.ts:20-35
export type XrayPart = Readonly<{
  id: string;
  label: string;
  tag: string;
  description: string;
  classes: readonly string[];
  attributes: readonly XrayAttribute[];
  styles: readonly XrayStyle[];
  children: readonly XrayPart[];
}>;
```

```ts
// src/openstory/documentation/anatomyXray.ts:167-184
return h.button(
  [
    h.Type("button"),
    h.AriaLabel(`Inspect ${part.label} ${part.tag}`),
    h.AriaPressed(active ? "true" : "false"),
    h.OnMouseEnter(HoveredPart({ partId: part.id })),
    h.OnMouseLeave(ClearedPart()),
    h.OnFocus(FocusedPart({ partId: part.id })),
    h.OnBlur(ClearedPart()),
    h.OnClick(SelectedPart({ partId: part.id })),
    h.Class(...),
    h.Style({ paddingLeft: `${12 + depth * 18}px` }),
  ],
  [...]
);
```

The project invariants apply even to DX work. The scorecard requires future
plans to declare invariant impact:

```md
// docs/product/project-invariants-scorecard.md:159-166
Every future plan must include this table under `P11_PROGRESS_LEDGER`:

`Invariant | Impact | Expected status/grade change | Evidence to update | Non-goal`

For tiny plans, one row is enough. If a future plan truly touches no invariants,
the table must say `None` with a one-sentence reason.
```

Invariant impact for this plan:

| Invariant | Impact | Expected status/grade change | Evidence to update | Non-goal |
| --- | --- | --- | --- | --- |
| `P2_FOLDKIT_ARCHITECTURE` | Adds a Foldkit/OpenStory decorator and a contained custom element for dev-only DOM measurement. | No grade change expected. | Focused unit/scene tests and browser HUD e2e. | Do not add imperative state to registry components. |
| `P6_VISUAL_PARITY` | Improves local inspection of bounds, padding, margins, IDs, data attributes, and events during parity review. | No grade change expected. | Browser HUD e2e proves the overlay can be toggled on a real story. | Do not replace origin visual parity fixtures or screenshot gates. |
| `P8_DOC_REFERENCE` | HUD appears in OpenStory shell/iframe review surfaces. | No grade change expected. | Manifest and browser tests prove global controls do not hide stories. | Do not rewrite documentation reference stories. |
| `P11_PROGRESS_LEDGER` | Adds this plan and README entry. | No grade change expected. | `plans/README.md` row and dependency note. | Do not update the scorecard baseline. |

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Focused HUD unit/scene tests | `bun run test -- src/openstory/uiDevHud.story.test.ts` | exit 0; all HUD tests pass |
| Existing theme decorator regression tests | `bun run test -- src/openstory/shadcnTheme.story.test.ts` | exit 0; all theme tests still pass |
| Focused HUD browser test | `bunx playwright test tests/e2e/openstory-ui-dev-hud.spec.ts` | exit 0; all HUD browser tests pass |
| Existing OpenStory theme browser regression | `bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts` | exit 0; all theme browser tests still pass |
| Typecheck | `bun run typecheck` | exit 0; no TypeScript errors |
| OpenStory/registry gate | `bun run check:registry` | exit 0 |
| Static site build | `bun run build` | exit 0 |
| Whitespace | `git diff --check` | exit 0 |

## Scope

**In scope**:

- `src/openstory/uiDevHud.ts` - new OpenStory globals, option resolution, and decorator.
- `src/openstory/uiDevHudElement.ts` - new contained custom element that measures the rendered story DOM and draws overlays.
- `src/openstory/uiDevHud.story.test.ts` - new focused unit/scene tests.
- `src/preview.ts` - add literal HUD globals and register the HUD decorator.
- `tests/e2e/openstory-ui-dev-hud.spec.ts` - new browser tests for toolbar toggles and iframe overlay behavior.
- `tests/e2e/openstory-shadcn-theme.spec.ts` - only if needed to keep existing expectations passing after preview/global additions.
- `plans/README.md` - status update when execution completes.

**Out of scope**:

- Any file under `registry/**`.
- Any generated file under `src/openstory/generated/**` or `apps/docs/public/**`, unless an existing verification command explicitly regenerates it.
- OpenStory package internals under `node_modules/openstory` or `/Volumes/Sync/Development/Bearing-Ward/openstory`.
- Foldkit runtime internals under `node_modules/foldkit`.
- Public component APIs, registry JSON contracts, origin snapshots, parity fixtures, or scorecard baseline rows.
- A full message-history debugger. "Show Events" means captured browser DOM events in the story iframe; Foldkit message inspection remains the job of the existing Foldkit devtools MCP.

## Git workflow

- Branch: use the existing worktree branch chosen by the dispatcher, or create
  `codex/025-openstory-ui-dev-hud` if no branch is provided.
- Commit per logical unit if you are asked to commit. A sensible split is:
  HUD decorator/custom element, tests, then plan index status.
- Do not push or open a PR unless explicitly instructed.

## Steps

### Step 1: Add HUD globals and option resolution

Create `src/openstory/uiDevHud.ts`. Export string constants for these global
keys:

- `uiDevHud`
- `uiDevHudBounds`
- `uiDevHudPadding`
- `uiDevHudMargins`
- `uiDevHudIds`
- `uiDevHudData`
- `uiDevHudEvents`

Use `"off"` and `"on"` string values for every key. Keep the top-level
`uiDevHud` default `"off"`, and keep every layer default `"off"` so OpenStory
loads unchanged until the reviewer opts in.

Export a `resolveUiDevHudOptions(globals)` helper that returns:

```ts
type UiDevHudOptions = Readonly<{
  enabled: boolean;
  bounds: boolean;
  padding: boolean;
  margins: boolean;
  ids: boolean;
  data: boolean;
  events: boolean;
}>;
```

The resolver must treat a layer as active only when `uiDevHud === "on"` and the
specific layer key is `"on"`. Invalid or missing global values resolve to off.

Also export `uiDevHudGlobalTypes` and `initialUiDevHudGlobals` for tests, but
remember that `src/preview.ts` still needs literal metadata. The toolbar entries
should be short and explicit:

- HUD: Off, On
- Bounds: Off, On
- Padding: Off, On
- Margins: Off, On
- IDs: Off, On
- Data: Off, On
- Events: Off, On

Use `satisfies Preview["globalTypes"]` and `satisfies Preview["initialGlobals"]`
the same way `src/openstory/shadcnTheme.ts:71-105` does.

**Verify**: `bun run test -- src/openstory/uiDevHud.story.test.ts` will fail
because the test file does not exist yet. This is expected for this step; do not
run the full suite until the test is added in Step 4.

### Step 2: Add a contained HUD custom element

Create `src/openstory/uiDevHudElement.ts`. This file owns the browser-only DOM
measurement and overlay drawing. Keep raw DOM reads and observers in this file
only.

Implement and export:

- `uiDevHudElementTag = "foldkit-ui-dev-hud"`
- `defineUiDevHudElement(): void`

`defineUiDevHudElement` should guard duplicate registration with
`customElements.get(uiDevHudElementTag)`. The custom element should:

- Attach a shadow root.
- Render a fixed, pointer-events-none overlay layer inside the story iframe.
- Observe its parent/root story container with `ResizeObserver`,
  `MutationObserver`, `scroll`, and `resize`, debounced with
  `requestAnimationFrame`.
- Ignore itself, its shadow DOM, `script`, `style`, and elements with zero
  visible client rects.
- Cap inspected elements to a reasonable number such as 200 visible elements to
  avoid making large stories unusable.
- Recompute overlays when any HUD property changes.

Use properties or attributes for `enabled`, `bounds`, `padding`, `margins`,
`ids`, `data`, and `events`. The element must produce stable test hooks:

- `data-testid="ui-dev-hud-overlay"` on the overlay root.
- `data-ui-dev-hud-layer="bounds"` on bounds overlay nodes.
- `data-ui-dev-hud-layer="padding"` on padding overlay nodes.
- `data-ui-dev-hud-layer="margins"` on margin overlay nodes.
- `data-ui-dev-hud-label="ids"` on ID label nodes.
- `data-ui-dev-hud-label="data"` on data-attribute label nodes.
- `data-ui-dev-hud-event` on recent event chips or labels.

Box-model drawing requirements:

- Bounds: draw the border-box rectangle from `getBoundingClientRect()`.
- Padding: use `getComputedStyle()` padding values to draw inset padding bands
  inside the border box.
- Margins: use computed margin values to draw the margin area outside the border
  box, clamped to the viewport so labels do not create scrollbars.
- IDs: show `#id` and `[data-testid=...]` when present.
- Data: show `data-*` attributes, excluding the HUD's own `data-ui-dev-hud-*`
  attributes.
- Events: capture common browser events on the story root in capture phase:
  `click`, `input`, `change`, `keydown`, `keyup`, `pointerdown`, `pointerup`,
  `focusin`, `focusout`, and `submit`. Show the most recent events with event
  type and a compact target label. Do not call `preventDefault` or
  `stopPropagation`.

Use plain TypeScript and DOM APIs here. Do not add a dependency.

**Verify**: `bun run typecheck` may still fail until Step 3 wires the element
through a typed Foldkit custom-element builder. Continue to Step 3 before
debugging type errors from unused exports.

### Step 3: Wrap every Foldkit story program with the HUD decorator

In `src/openstory/uiDevHud.ts`, import `html` from `foldkit/html`, `CustomElement`
from `foldkit`, and `defineUiDevHudElement` from
`./uiDevHudElement`. Define a Foldkit custom-element binding for
`foldkit-ui-dev-hud` using `CustomElement.define`.

Copy the narrow `FoldkitProgramConfig`, `FoldkitProgramContainer`, `HtmlChild`,
`isObject`, `hasProgramFields`, and `hasProgramProperty` pattern from
`src/openstory/shadcnTheme.ts` rather than refactoring shared helpers in this
plan. A later cleanup may extract shared OpenStory decorator utilities, but this
plan should stay focused.

Export `withUiDevHud: Decorator<unknown>`. It should:

- Call `defineUiDevHudElement()` once before rendering the custom element.
- Call `Story()` exactly once.
- Wrap both direct Foldkit program exports and `{ program }` containers, matching
  the shadcn wrapper behavior.
- Leave non-Foldkit story values unchanged.
- Preserve `viewInputs` exactly. The HUD should not add story-specific
  `viewInputs`.
- Always wrap Foldkit stories, but render the custom element with
  `enabled=false` when HUD is off so tests can prove the decorator is present
  without drawing overlays.

The wrapped view should return:

```ts
h.div(
  [
    h.Class("relative"),
    h.DataAttribute("testid", "ui-dev-hud-root"),
    h.DataAttribute("ui-dev-hud", options.enabled ? "on" : "off"),
    h.DataAttribute("ui-dev-hud-bounds", String(options.bounds)),
    h.DataAttribute("ui-dev-hud-padding", String(options.padding)),
    h.DataAttribute("ui-dev-hud-margins", String(options.margins)),
    h.DataAttribute("ui-dev-hud-ids", String(options.ids)),
    h.DataAttribute("ui-dev-hud-data", String(options.data)),
    h.DataAttribute("ui-dev-hud-events", String(options.events)),
  ],
  [
    storyView,
    hudElement(
      [
        hud.Enabled(options.enabled),
        hud.Bounds(options.bounds),
        hud.Padding(options.padding),
        hud.Margins(options.margins),
        hud.Ids(options.ids),
        hud.Data(options.data),
        hud.Events(options.events),
      ],
      [],
    ),
  ],
)
```

Adjust property names if the `CustomElement.define` factory capitalization
requires a different exact casing, but keep the public global keys lowercase as
listed in Step 1.

**Verify**: `bun run typecheck` exits 0.

### Step 4: Add focused HUD tests

Create `src/openstory/uiDevHud.story.test.ts`. Model it after
`src/openstory/shadcnTheme.story.test.ts`.

Cover these cases:

- `initialUiDevHudGlobals` sets every key to `"off"`.
- `uiDevHudGlobalTypes` exposes all seven toolbar globals with Off/On entries.
- `resolveUiDevHudOptions` returns every layer false when the top-level HUD is
  off, even if a layer global is on.
- `resolveUiDevHudOptions` enables only the selected layers when the top-level
  HUD is on.
- `withUiDevHud` wraps a Foldkit story program and preserves `Model`, `init`,
  and `update`.
- Scene rendering with HUD off produces `data-testid="ui-dev-hud-root"` and
  `data-ui-dev-hud="off"`.
- Scene rendering with HUD on and all layers on produces `data-ui-dev-hud="on"`
  and all layer attributes set to `"true"`.
- A non-Foldkit story object is returned unchanged.

Use an existing small example such as
`../../registry/shadcn/button/examples/default/main` or
`../../registry/foldkit/examples/button-basic/main`, whichever exists after
plan 024 lands. If the selected example path has drifted, choose the smallest
existing generated-story source and cite it in the test.

**Verify**: `bun run test -- src/openstory/uiDevHud.story.test.ts` exits 0.

### Step 5: Add HUD globals and decorator to the preview

Update `src/preview.ts` after plan 024 has landed. Add:

```ts
import { withUiDevHud } from "./openstory/uiDevHud"
```

Then add literal `globalTypes` entries for `uiDevHud`,
`uiDevHudBounds`, `uiDevHudPadding`, `uiDevHudMargins`, `uiDevHudIds`,
`uiDevHudData`, and `uiDevHudEvents`. Do not rely on imported constants for the
manifest metadata because OpenStory currently parses preview metadata from the
literal default export object.

Add matching literal `initialGlobals` entries, all `"off"`.

Add `withUiDevHud` to `decorators`. Prefer:

```ts
decorators: [withShadcnTheme, withUiDevHud],
```

If plan 024 changed the decorator list, preserve its decorators and append
`withUiDevHud` after theme-related decorators. The HUD should inspect the final
rendered themed story.

**Verify**: `bun run test -- src/openstory/uiDevHud.story.test.ts src/openstory/shadcnTheme.story.test.ts` exits 0.

### Step 6: Add browser coverage for toolbar toggles and overlay output

Create `tests/e2e/openstory-ui-dev-hud.spec.ts`. Reuse the manifest helper
shape from `tests/e2e/openstory-shadcn-theme.spec.ts:1-26`.

Add a manifest test:

- Fetch `/__openstory/manifest.json`.
- Assert `globalTypes` contains all seven HUD keys.
- Assert `initialGlobals` has all seven keys set to `"off"`.

Add a browser test on a small stable story such as `shadcn/Button` "Default":

- Navigate to `/?id=<storyId>`.
- Assert toolbar controls with accessible labels `HUD`, `Bounds`, `Padding`,
  `Margins`, `IDs`, `Data`, and `Events` are visible. If OpenStory lowercases
  labels, match the actual accessible labels and update the plan in the PR
  summary.
- Assert the iframe has `data-testid="ui-dev-hud-root"` with
  `data-ui-dev-hud="off"` and no visible overlay nodes.
- Turn HUD on, then turn each layer on.
- In the iframe, assert `data-ui-dev-hud="on"` and each layer data attribute is
  `"true"`.
- Assert at least one bounds node, padding node, margin node, ID label, and data
  label exists under `data-testid="ui-dev-hud-overlay"`.
- Click the story's Button and assert at least one `data-ui-dev-hud-event`
  element contains `click`.

Add a regression assertion that turning HUD back off removes overlay layer
nodes while leaving the story button visible and clickable.

**Verify**: `bunx playwright test tests/e2e/openstory-ui-dev-hud.spec.ts` exits 0.

### Step 7: Run the full focused gate and update the plan index

Run the commands in this order:

```sh
bun run test -- src/openstory/uiDevHud.story.test.ts src/openstory/shadcnTheme.story.test.ts
bunx playwright test tests/e2e/openstory-ui-dev-hud.spec.ts tests/e2e/openstory-shadcn-theme.spec.ts
bun run typecheck
bun run check:registry
bun run build
git diff --check
```

If all pass, update the row for plan 025 in `plans/README.md` from TODO to DONE.
Do not change the status of plan 024 unless you also executed that plan.

**Verify**: `git status --short` shows only the files in this plan's scope plus
any generated artifacts required by verification commands.

## Test plan

- New unit/scene tests in `src/openstory/uiDevHud.story.test.ts` covering
  global metadata, option resolution, decorator wrapping, off state, on state,
  and non-Foldkit passthrough.
- New browser tests in `tests/e2e/openstory-ui-dev-hud.spec.ts` covering
  manifest exposure, toolbar toggles, iframe overlay nodes for all requested
  layers, captured browser events, and off-state cleanup.
- Regression tests for existing theme behavior:
  `bun run test -- src/openstory/shadcnTheme.story.test.ts` and
  `bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts`.

## Done criteria

All must hold:

- [ ] `src/preview.ts` exposes literal OpenStory globals for HUD, Bounds,
  Padding, Margins, IDs, Data, and Events, all defaulting to off.
- [ ] `withUiDevHud` wraps Foldkit story programs without changing registry
  component source or story `viewInputs`.
- [ ] The HUD overlay can be toggled off and on from OpenStory toolbar controls.
- [ ] Bounds, padding, margins, IDs, data attributes, and browser events each
  have stable test hooks and browser coverage.
- [ ] `bun run test -- src/openstory/uiDevHud.story.test.ts src/openstory/shadcnTheme.story.test.ts` exits 0.
- [ ] `bunx playwright test tests/e2e/openstory-ui-dev-hud.spec.ts tests/e2e/openstory-shadcn-theme.spec.ts` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run build` exits 0.
- [ ] `git diff --check` exits 0.
- [ ] No files outside the in-scope list are modified unless a verification
  command generated required artifacts and the PR summary explains why.
- [ ] `plans/README.md` status row for 025 is updated when execution completes.

## STOP conditions

Stop and report back, without improvising, if:

- Plan 024 has not landed and `src/preview.ts` differs from both this plan's
  excerpts and plan 024's expected direction.
- OpenStory cannot expose seven boolean-like toolbar globals from literal
  `globalTypes`.
- The HUD requires changes to OpenStory package internals.
- The overlay requires changes to files under `registry/**`.
- Box-model measurement cannot be isolated to `src/openstory/uiDevHudElement.ts`.
- The event layer needs to intercept, prevent, or stop story events to work.
- A verification command fails twice after a reasonable fix attempt.

## Maintenance notes

The HUD is a review aid, not product behavior. Keep it dev-only, iframe-local,
and off by default. Reviewers should scrutinize performance, especially the
MutationObserver and ResizeObserver loop, because OpenStory renders many
component stories and some examples contain portals or animated overlays.

If future OpenStory adds imported preview metadata or multi-select toolbar
globals, this HUD can be simplified. Until then, literal preview globals are the
safer contract because the manifest parser reads object literals from
`src/preview.ts`.
