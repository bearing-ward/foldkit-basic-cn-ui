# Plan 033: Render anatomy x-ray previews with inline metadata overlays

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report;
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer tells you they maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat f13a69ff..HEAD -- src/openstory/documentation/anatomyXray.ts src/openstory/documentation/anatomyXray.story.test.ts src/openstory/documentation/anatomyXray.scene.test.ts src/openstory/documentation/referenceData.ts src/openstory/wipSpace/anatomy-xray/main.ts docs/product/component-entry-contract.md docs/product/docs-surface-guardrails.md docs/product/project-invariants-scorecard.md`
>
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/013-*.md, plans/031-*.md
- **Category**: docs
- **Planned at**: commit `f13a69ff`, 2026-06-23

## Why this matters

The current anatomy x-ray preview map is still an abstract diagram of nested
boxes. It repeats labels and class chips, then pushes the actually useful
selected-part metadata into a separate card. The target interaction is more
direct: show the rendered example itself, highlight the selected part inside
that preview, and place tag/classes/styles/attributes as live overlays around
the rendered component.

This keeps the Anatomy section focused on the hierarchy of rendered HTML while
the API reference continues to own function and prop shape.

## Current state

Relevant files:

- `src/openstory/documentation/anatomyXray.ts` - reusable Anatomy x-ray program.
- `src/openstory/documentation/anatomyXray.story.test.ts` - update-level tests
  for active part state.
- `src/openstory/documentation/anatomyXray.scene.test.ts` - scene tests for the
  Avatar x-ray demo.
- `src/openstory/documentation/referenceData.ts` - documentation references that
  provide `anatomyXray` config for Avatar and Alert Dialog.
- `src/openstory/wipSpace/anatomy-xray/main.ts` - standalone Avatar x-ray demo.
- `src/openstory/documentation/referenceProgram.ts` - embeds the x-ray as a
  submodel inside documentation reference stories.
- `docs/product/component-entry-contract.md` - product contract for Anatomy.

Current x-ray model and messages:

```ts
// src/openstory/documentation/anatomyXray.ts:37
export const Model = S.Struct({
  maybeActivePartId: S.Option(S.String),
});

// src/openstory/documentation/anatomyXray.ts:44
export const HoveredPart = m("HoveredPart", { partId: S.String });
export const FocusedPart = m("FocusedPart", { partId: S.String });
export const SelectedPart = m("SelectedPart", { partId: S.String });
export const ClearedPart = m("ClearedPart");
```

The update loop already changes the active part on hover, focus, and click:

```ts
// src/openstory/documentation/anatomyXray.ts:72
export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    withUpdateReturn,
    M.tagsExhaustive({
      HoveredPart: ({ partId }) => [activatePart(model, partId), []],
      FocusedPart: ({ partId }) => [activatePart(model, partId), []],
      SelectedPart: ({ partId }) => [activatePart(model, partId), []],
      ClearedPart: () => [
        evo(model, { maybeActivePartId: () => Option.none() }),
        [],
      ],
    })
  );
```

The current preview map is synthetic. It renders every part as a labeled box
instead of rendering the actual example component:

```ts
// src/openstory/documentation/anatomyXray.ts:212
const renderPreviewPart = (model: Model, part: XrayPart): Html => {
  const h = html<Message>();
  const active = isActivePart(model, part);

  return h.div(
    [
      h.DataAttribute("xray-part", part.id),
      h.Class(
        `${previewBoxBaseClasses} ${active ? activeClasses : "hover:border-slate-300"}`
      ),
    ],
    [
      h.div(
        [h.Class("flex items-center justify-between gap-3")],
        [
          h.span(
            [h.Class("text-sm font-semibold text-slate-900")],
            [part.label]
          ),
          h.span([h.Class("font-mono text-xs text-slate-500")], [part.tag]),
        ]
      ),
```

The current selected-part card is a separate right-side aside:

```ts
// src/openstory/documentation/anatomyXray.ts:294
const renderDetails = (maybePart: Option.Option<XrayPart>): Html => {
  const h = html<Message>();

  return maybePart.pipe(
    Option.match({
      onNone: () =>
        h.div(
          [h.Class(`${panelClasses} p-4 text-sm text-slate-500`)],
          ["No anatomy parts are available."]
        ),
      onSome: (part) =>
        h.aside(
          [
            h.Class(`${panelClasses} lg:sticky lg:top-6`),
            h.AriaLabel("Selected anatomy details"),
          ],
```

The current layout renders a code map, preview map, and selected-part aside:

```ts
// src/openstory/documentation/anatomyXray.ts:369
h.div(
  [
    h.Class(
      "grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
    ),
  ],
  [
    h.section(
      [h.Class("grid gap-4 xl:grid-cols-2")],
      [
        // Rendered HTML map panel
        // Preview map panel
      ]
    ),
    renderDetails(maybeActivePart),
  ]
)
```

The current scene test expects separate selected-part description text:

```ts
// src/openstory/documentation/anatomyXray.scene.test.ts:31
test("clicking and focusing parts changes the details panel", () => {
  const [model] = init();

  Scene.scene(
    { update, view },
    Scene.with(model),
    Scene.expect(
      Scene.text("The group container arranges avatar roots", {
        exact: false,
      })
    ).toExist(),
```

The product contract says Anatomy should show x-ray rendered HTML metadata and
update on interaction:

```md
<!-- docs/product/component-entry-contract.md:433 -->
The Anatomy section should be interactive when the component has meaningful
markup: hovering a code element highlights the corresponding preview element
and displays the relevant part name, classes, data attributes, ARIA attributes,
and style hooks.
```

Repo conventions to preserve:

- Bind the Foldkit `html<Message>()` factory inside view functions or helpers,
  not at module scope.
- Keep state changes in `update`; do not add imperative DOM mutation.
- Use `Option.match`, `Array.match`, and `evo()` instead of nullable state,
  length checks, or object spreading.
- Keep messages verb-first and past-tense.
- Use `empty` for absent view content if needed; do not return `null`.
- Keep documentation x-ray behavior inside `src/openstory/documentation/**` and
  demo/reference configuration, not installable registry source.

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Focused x-ray tests | `bun run test -- src/openstory/documentation/anatomyXray.story.test.ts src/openstory/documentation/anatomyXray.scene.test.ts` | exit 0; all x-ray tests pass |
| Documentation reference tests | `bun run test -- src/openstory/documentation/referenceProgram.scene.test.ts src/openstory/documentation/apiReference.scene.test.ts` | exit 0; documentation submodels still render |
| Typecheck | `bun run typecheck` | exit 0; no TypeScript errors |
| OpenStory story guard | `bun run openstory:check` | exit 0; generated story catalog remains valid |
| Registry/docs guard | `bun run check:registry` | exit 0; docs, generated artifacts, invariants, and parity guards pass |
| Build | `bun run build` | exit 0; public OpenStory site builds |
| Diff hygiene | `git diff --check` | no whitespace errors |

## Scope

In scope:

- `src/openstory/documentation/anatomyXray.ts`
- `src/openstory/documentation/anatomyXray.story.test.ts`
- `src/openstory/documentation/anatomyXray.scene.test.ts`
- `src/openstory/documentation/referenceData.ts`
- `src/openstory/wipSpace/anatomy-xray/main.ts`
- `docs/product/component-entry-contract.md`
- `docs/product/docs-surface-guardrails.md`
- `docs/product/project-invariants-scorecard.md`, only if the evidence row needs
  an explicit update after verification
- `plans/README.md`

Out of scope:

- Do not change installable registry component APIs.
- Do not change Base UI or shadcn component source under `registry/**`.
- Do not change the API reference widget.
- Do not revive or modify the retired docs app.
- Do not add browser DOM measurement code, popovers, floating-ui, portals, or a
  new runtime dependency.
- Do not change OpenStory shell code; this is a story-content surface.
- Do not remove the code map unless the user explicitly asks later. This plan
  changes the preview map and selected metadata placement.

## Git workflow

- Branch: `codex/033-anatomy-xray-preview-overlays`
- Commit message: `Render anatomy xray preview overlays`
- Do not push or open a PR unless the operator instructs it.

## Target behavior

Keep the left "Rendered HTML map" code rows as the interactive selector. Replace
the current preview map internals and the selected-part card with:

1. A preview panel that renders an actual Foldkit example/component preview.
2. A highlight around the part selected by hover, focus, or click.
3. An overlay in the preview panel that updates from the selected part:
   - top left: tag name, then classes stacked underneath with dot prefixes:
     `div`, `.relative`, `.text-sm`, `.flex`
   - top right: styles as a stacked list, for example
     `anchor: right-0 bottom-0`
   - bottom: attributes as a stacked list under or at the bottom edge of the
     rendered component area, for example `aria-label="Online"`
4. A useful empty state for parts without classes, styles, or attributes that
   does not look like a selected-part card.

When no part has been hovered/focused/clicked, the overlay should show the first
part from `config.parts`, matching the current `activePart(config, model)`
fallback. The highlighted element should also use the same displayed part so the
overlay and highlight do not disagree on initial render.

## Design guidance

Add a preview-rendering extension to `XrayConfig`. The exact final type can be
adjusted to match Foldkit's exported HTML types, but keep the shape close to:

```ts
export type XrayPreviewContext = Readonly<{
  model: Model;
  activePart: Option.Option<XrayPart>;
  partAttributes: (partId: string, classes?: string) => readonly unknown[];
}>;

export type XrayConfig = Readonly<{
  title: string;
  summary: string;
  parts: readonly XrayPart[];
  preview: (context: XrayPreviewContext) => Html;
}>;
```

The important contract is not the exact `unknown[]`; it is that documentation
reference data can render the real preview while reusing x-ray-owned handlers,
data attributes, and highlight classes. Prefer a helper callback over exposing
message constructors to every reference.

If the Foldkit HTML attribute type is not exported, define the helper fully
inside `anatomyXray.ts` and pass higher-level functions into config, such as:

```ts
preview: ({ part }) =>
  part("avatar-group", avatarGroupClasses, [
    // children...
  ])
```

Where `part(partId, classes, children)` returns a `Html` node with:

- `data-xray-preview-part="<partId>"`
- hover/focus/click handlers that dispatch the existing anatomy x-ray messages
- active highlight classes when the displayed part ID matches `partId`
- the caller-supplied classes preserved

Use the helper in `referenceData.ts` and
`src/openstory/wipSpace/anatomy-xray/main.ts` so Avatar and Alert Dialog both
prove the real-preview path.

## Implementation steps

### Step 1: Add tests for overlay intent before changing layout

Update `src/openstory/documentation/anatomyXray.scene.test.ts` so the tests no
longer assert on the selected-part card. Add expectations for stable test hooks:

- preview root: `data-testid="anatomy-xray-preview"`
- selected metadata overlay: `data-testid="anatomy-xray-overlay"`
- top-left tag/classes group: `data-testid="anatomy-xray-overlay-identity"`
- top-right styles group: `data-testid="anatomy-xray-overlay-styles"`
- bottom attributes group: `data-testid="anatomy-xray-overlay-attributes"`
- highlighted preview part: `data-xray-preview-active="true"`

Expected test behavior:

- Initial render shows the first part's tag in the identity overlay.
- Initial render highlights the first part.
- Clicking `Inspect Avatar root span` changes the identity overlay to `span` and
  includes root classes with dot prefixes.
- Focusing `Inspect Avatar image img` changes the attributes overlay to include
  `alt="Lena Taylor"`.
- The old `Selected anatomy details` aside is absent.

Do not remove the story/update tests; they still prove the message flow.

**Verify**:
`bun run test -- src/openstory/documentation/anatomyXray.scene.test.ts`

Expected: fails because the overlay and real preview are not implemented yet.

### Step 2: Split displayed-part lookup from model-only active state

In `src/openstory/documentation/anatomyXray.ts`, replace or supplement
`isActivePart(model, part)` with a helper that compares against the displayed
part ID:

```ts
const displayedPart = activePart(config, model);
const isDisplayedPart = (maybePart: Option.Option<XrayPart>, part: XrayPart) =>
  maybePart.pipe(
    Option.match({
      onNone: () => false,
      onSome: (active) => active.id === part.id,
    })
  );
```

Use the displayed part for both the highlight and overlay. This intentionally
changes initial render from "metadata shows first part but no preview highlight"
to "metadata and highlight both show first part."

**Verify**:
`bun run test -- src/openstory/documentation/anatomyXray.story.test.ts`

Expected: exits 0. Update-level behavior should not change.

### Step 3: Replace the selected-part card with overlay renderers

Remove the `renderDetails` aside path from the main layout. Add small render
helpers in `anatomyXray.ts`:

- `renderOverlayIdentity(part: XrayPart): Html`
- `renderOverlayStyles(part: XrayPart): Html`
- `renderOverlayAttributes(part: XrayPart): Html`
- `renderSelectedPartOverlay(maybePart: Option.Option<XrayPart>): Html`

Formatting rules:

- Tag line is the raw tag name, for example `div`.
- Class lines use dot prefixes, for example `.relative`.
- Style lines use the existing `formatStyle(style)`.
- Attribute lines use the existing `formatAttribute(attribute)`.
- Empty classes/styles/attributes should show quiet copy like `No classes`,
  `No styles`, or `No attributes` only inside the relevant overlay region.
- Overlay text should use compact monospace styling and must not cause the
  rendered preview layout to resize when the selected part changes.

Place the overlay inside the preview panel with absolute positioning:

- top-left identity box
- top-right styles box
- bottom attributes box spanning the preview width or sitting below the rendered
  component inside the preview panel

Do not use a separate card titled "Selected part".

**Verify**:
`bun run test -- src/openstory/documentation/anatomyXray.scene.test.ts`

Expected: still may fail until the real preview renderer is wired, but should no
longer find the old selected-part card if the test checks absence.

### Step 4: Add a real preview renderer path

Extend `XrayConfig` so each x-ray config supplies a rendered preview. Use helper
functions from `anatomyXray.ts` to annotate parts. The preview should render
the same local component anatomy that the part metadata describes, not the old
synthetic nested boxes.

For Avatar, render a compact Avatar group preview using the same class constants
already imported by `src/openstory/wipSpace/anatomy-xray/main.ts` and
`referenceData.ts`:

- group wrapper: `avatar-group`
- root span: `avatar-root`
- image: `avatar-image`
- fallback: `avatar-fallback`
- badge: `avatar-badge`
- count: `avatar-count`

For Alert Dialog reference data, render the local alert dialog anatomy in an
open, static documentation state so the portal/backdrop/viewport/popup/title/
description/footer/action parts are visible enough to inspect. If a faithful
open dialog preview would require runtime modal side effects, stop and report;
do not implement DOM commands or portal behavior in this plan.

Delete or stop using the old `renderPreviewPart` synthetic box tree after the
real preview path is in place.

**Verify**:
`bun run test -- src/openstory/documentation/anatomyXray.scene.test.ts`

Expected: exits 0; tests confirm the rendered preview, highlight marker, and
overlay metadata update together.

### Step 5: Collapse the anatomy layout to code map plus preview map

Update the main `view(config)(model)` layout in `anatomyXray.ts`:

- Keep the header.
- Keep the "Rendered HTML map" code panel.
- Keep the "Preview map" panel, but make its body a relatively positioned
  preview stage containing the rendered preview plus overlays.
- Remove the third selected-part aside from the grid.
- Use a two-column desktop layout and a single-column mobile layout.
- Make sure overlay content wraps or scrolls within its region on small screens;
  it must not overlap the code panel, escape the preview panel, or resize the
  code map.

**Verify**:
`bun run test -- src/openstory/documentation/anatomyXray.scene.test.ts`

Expected: exits 0.

### Step 6: Update documentation contract wording

Update `docs/product/component-entry-contract.md` so the Anatomy contract says
the x-ray preview should render the component/example and display selected-part
tag/classes/styles/attributes as preview overlays. Keep the current statement
that Anatomy uses the same part names as the API table.

If `docs/product/docs-surface-guardrails.md` mentions the x-ray behavior in a
way that now implies a separate static details panel, update it to match the
overlay behavior.

Only update `docs/product/project-invariants-scorecard.md` if the executor has
fresh verification evidence to record for `P8_DOC_REFERENCE`.

**Verify**:
`bun run check:invariants`

Expected: exits 0 if the scorecard changed; if the scorecard did not change,
this command is still useful and should exit 0.

### Step 7: Run the full focused gate set

Run:

```sh
bun run test -- src/openstory/documentation/anatomyXray.story.test.ts src/openstory/documentation/anatomyXray.scene.test.ts src/openstory/documentation/referenceProgram.scene.test.ts src/openstory/documentation/apiReference.scene.test.ts
bun run typecheck
bun run openstory:check
bun run check:registry
bun run build
git diff --check
```

Expected:

- All commands exit 0.
- The x-ray tests prove overlay updates for hover/focus/click-selected parts.
- No generated OpenStory story catalog drift appears unless it is expected and
  checked in.

## Test plan

Update `src/openstory/documentation/anatomyXray.scene.test.ts` around the
existing Avatar demo. Cover:

- initial overlay and highlight show the first part;
- click on a code row changes the overlay identity/classes and preview
  highlight;
- focus on a code row changes the attributes overlay;
- the old selected-part aside is gone;
- preview parts expose stable `data-xray-preview-part` hooks;
- overlay uses dot-prefixed class display, raw tag display, formatted styles,
  and formatted attributes.

Keep `src/openstory/documentation/anatomyXray.story.test.ts` focused on update
state. Add a story-level assertion only if changing default highlight behavior
requires a pure helper test.

Use `src/openstory/documentation/referenceProgram.scene.test.ts` as the
regression path for documentation-reference embedding.

## Done criteria

- [ ] `src/openstory/documentation/anatomyXray.ts` no longer renders a separate
      `Selected part` details card.
- [ ] The preview map renders a real Avatar/Alert Dialog documentation preview,
      not the old synthetic nested label boxes.
- [ ] The selected/displayed preview part is highlighted with a stable test hook.
- [ ] The preview overlay shows tag and dot-prefixed classes at top left, styles
      at top right, and attributes at the bottom.
- [ ] Overlay content dynamically updates on hover, focus, and click through the
      existing Foldkit messages.
- [ ] Existing update tests still pass.
- [ ] Focused scene tests cover initial, clicked, and focused selected-part
      overlay states.
- [ ] `bun run typecheck`, `bun run openstory:check`, `bun run check:registry`,
      `bun run build`, and `git diff --check` all pass.
- [ ] `plans/README.md` row `033` is updated to `DONE` by the executor after
      implementation and verification.

## STOP conditions

Stop and report back if:

- The live code at the current-state excerpts no longer matches this plan.
- Rendering the real preview requires changing installable registry component
  APIs under `registry/**`.
- Rendering Alert Dialog as a static open preview requires real DOM portal,
  focus, or scroll-lock side effects.
- The Foldkit HTML type surface makes it impossible to provide an x-ray helper
  without unsafe casts.
- Overlay positioning cannot be made responsive without obscuring the rendered
  component or code map.
- A verification command fails twice after a focused fix attempt.

## Maintenance notes

Future documentation references should provide a rendered x-ray preview when
they add meaningful Anatomy metadata. Keep the metadata source in
`XrayConfig.parts`; the overlay should continue to derive tag/classes/styles/
attributes from that same source so the code map, preview highlight, and overlay
cannot drift apart.

Reviewers should scrutinize whether the rendered preview is genuinely using
local Foldkit/registry helpers rather than a duplicated visual mock. If a
component cannot yet render a faithful real preview, keep the row explicit in
the Anatomy config and document the blocker instead of silently falling back to
synthetic boxes.

