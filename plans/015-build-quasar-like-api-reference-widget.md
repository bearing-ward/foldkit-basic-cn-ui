# Plan 015: Build the Quasar-like API reference widget for Base UI Avatar

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report; do
> not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat ccce5d58..HEAD -- src/openstory/documentation/referenceProgram.ts src/openstory/documentation/referenceProgram.scene.test.ts src/openstory/documentation/referenceData.ts src/openstory/documentation/anatomyXray.ts registry/base-ui/ui/base-ui-avatar/index.ts registry/base-ui/ui/base-ui-avatar/view.ts plans/015-build-quasar-like-api-reference-widget.md plans/README.md`
>
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding. On a mismatch that
> changes the documentation data shape, Foldkit program shape, or Base UI Avatar
> exported API names, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/014-add-openstory-documentation-reference-stories.md
- **Category**: docs
- **Planned at**: commit `ccce5d58`, 2026-06-18

## Why this matters

The Base UI Avatar documentation story now has the right sections, but its API
section is still a plain table. The intended reference experience is closer to
Quasar's component API widget: dense, searchable, count-badged groups with a
left rail and detailed rows. This plan turns the Avatar API section into that
widget without changing registry component code or trying to document every
component at once.

## Current state

Relevant files and roles:

- `src/openstory/documentation/referenceProgram.ts` - renders the documentation
  story. It currently owns only the Anatomy submodel and renders API as a static
  table.
- `src/openstory/documentation/referenceData.ts` - stores the Base UI Avatar
  documentation data. `DocumentationApiRow` currently has only
  `name`, `signature`, and `description`.
- `src/openstory/documentation/referenceProgram.scene.test.ts` - verifies the
  Avatar documentation story headings and plain API text.
- `src/openstory/documentation/anatomyXray.ts` - good local pattern for a
  reusable Foldkit documentation widget with Schema model, messages, update,
  view, and focused Scene/Story tests.
- `registry/base-ui/ui/base-ui-avatar/index.ts` and `view.ts` - source of truth
  for the Avatar helper names, config types, class hooks, and ARIA behavior.

Current API table excerpt:

```ts
// src/openstory/documentation/referenceProgram.ts:157
const renderApiTable = (rows: readonly DocumentationApiRow[]): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("overflow-x-auto")],
    [
      h.table(
        [h.Class("w-full border-collapse text-left text-sm")],
        [
          h.thead([], [
            h.tr(
              [h.Class("border-b border-slate-200 text-slate-500")],
              [
                h.th([h.Class("py-2 pr-4 font-semibold")], ["Name"]),
                h.th([h.Class("py-2 pr-4 font-semibold")], ["Signature"]),
                h.th([h.Class("py-2 font-semibold")], ["Description"]),
              ]
            ),
          ]),
          h.tbody(
            [],
            rows.map((row) =>
              h.tr([h.Class("border-b border-slate-100 align-top")], [
                h.td([h.Class("py-3 pr-4")], [
                  h.code([h.Class("font-mono text-xs text-slate-950")], [
                    row.name,
                  ]),
                ]),
                h.td([h.Class("py-3 pr-4")], [
                  h.code([h.Class("font-mono text-xs text-slate-700")], [
                    row.signature,
                  ]),
                ]),
                h.td([h.Class("py-3 text-slate-600")], [row.description]),
              ])
            )
          ),
        ]
      ),
    ]
  );
};
```

Current API render call:

```ts
// src/openstory/documentation/referenceProgram.ts:310
renderSection("Styling", [renderList(reference.stylingNotes)]),
renderKeyboardSection(reference.keyboardInteractionNotes),
renderSection("API", [renderApiTable(reference.apiRows)]),
renderSection("Accessibility", [
  renderList(reference.accessibilityNotes),
]),
```

Current documentation data shape:

```ts
// src/openstory/documentation/referenceData.ts:24
export type DocumentationApiRow = Readonly<{
  name: string;
  signature: string;
  description: string;
}>;

export type DocumentationReference = Readonly<{
  title: string;
  laneLabel: string;
  sourcePath: string;
  registryItemName: string;
  originUrl: string;
  artifact: string;
  primitive: string;
  overview: readonly string[];
  installCommands: readonly string[];
  usageSnippet: string;
  foldkitIntegrationSnippet: string;
  foldkitIntegrationNotes: readonly string[];
  anatomyXray: XrayConfig;
  stylingNotes: readonly string[];
  keyboardInteractionNotes: readonly string[];
  apiRows: readonly DocumentationApiRow[];
  accessibilityNotes: readonly string[];
  coverageRows: readonly DocumentationCoverageRow[];
}>;
```

Current Avatar API rows:

```ts
// src/openstory/documentation/referenceData.ts:204
apiRows: [
  { name: "rootView", signature: "rootView<ParentMessage>(config)", ... },
  { name: "imageView", signature: "imageView<ParentMessage>(config)", ... },
  { name: "fallbackView", signature: "fallbackView<ParentMessage>(config)", ... },
  { name: "view", signature: "view<ParentMessage>(config)", ... },
  { name: "badgeView", signature: "badgeView<ParentMessage>(config)", ... },
  { name: "groupView", signature: "groupView<ParentMessage>(children, className?)", ... },
  { name: "countView", signature: "countView<ParentMessage>(config)", ... },
],
```

Avatar source exports to document:

```ts
// registry/base-ui/ui/base-ui-avatar/index.ts
export type RootViewConfig = Readonly<{ children: readonly Html[]; size?: AvatarSize | undefined; className?: string | undefined; style?: AvatarStyle | undefined }>;
export type ImageViewConfig = Readonly<{ src: string; alt: string; className?: string | undefined; style?: AvatarStyle | undefined }>;
export type FallbackViewConfig = Readonly<{ children: readonly Html[]; ariaLabel?: string | undefined; className?: string | undefined; style?: AvatarStyle | undefined }>;
export type ViewConfig = Readonly<{ fallback: string; src?: string | undefined; alt?: string | undefined; size?: AvatarSize | undefined; className?: string | undefined; style?: AvatarStyle | undefined }>;
export type CountConfig = Readonly<{ count: number; label?: string | undefined; className?: string | undefined; style?: AvatarStyle | undefined }>;
export type BadgeViewConfig = Readonly<{ children?: readonly Html[] | undefined; label?: string | undefined; className?: string | undefined; style?: AvatarStyle | undefined }>;
export const rootView = <ParentMessage>(config: RootViewConfig): Html => ...
export const imageView = <ParentMessage>(config: ImageViewConfig): Html => ...
export const fallbackView = <ParentMessage>(config: FallbackViewConfig): Html => ...
export const view = <ParentMessage>(config: ViewConfig): Html => ...
export const badgeView = <ParentMessage>(config: BadgeViewConfig): Html => ...
export const groupView = <ParentMessage>(children: readonly Html[], className?: string): Html => ...
export const countView = <ParentMessage>(config: CountConfig): Html => ...
```

Foldkit conventions to follow:

- Model fields must be Schema types.
- Messages are facts, verb-first and past-tense. Do not use `NoOp`.
- `init` and `update` return
  `readonly [Model, readonly Command.Command<Message>[]]`.
- Use `evo()` for immutable updates.
- Use `M.value(message).pipe(M.tagsExhaustive(...))` for message handling.
- Bind `const h = html<Message>()` inside view functions.
- Use accessible controls. The widget's tabs/category buttons should be real
  buttons with `aria-pressed` or `aria-selected`; the search control should be a
  labelled input.
- Do not import from `repos/foldkit/`.

## Commands you will need

Use Bun. If your shell cannot find `bun`, use:

`env PATH=/Users/richardmcandrews/.bun/bin:/Users/richardmcandrews/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/usr/bin:/bin:/usr/sbin:/sbin <command>`

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Focused docs tests | `bunx vitest run src/openstory/documentation/apiReference.story.test.ts src/openstory/documentation/apiReference.scene.test.ts src/openstory/documentation/referenceProgram.scene.test.ts` | exit 0; new and updated tests pass |
| Typecheck | `bun run typecheck` | exit 0, no TypeScript errors |
| Full tests | `bun run test` | exit 0; all Vitest tests pass |
| Build | `bun run build` | exit 0; OpenStory build writes `dist` |
| Public-site smoke | after `bun run preview -- --port 4173`, run `PUBLIC_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-site` | exit 0 |

`bun run lint` is known to report broad pre-existing lint debt on this branch.
Fix new lint issues in files you touch, but do not mass-format unrelated files.

## Scope

**In scope**:

- `src/openstory/documentation/apiReference.ts` - create the reusable
  Quasar-like API reference widget.
- `src/openstory/documentation/apiReference.story.test.ts` - create update-level
  tests for widget group/category/search behavior.
- `src/openstory/documentation/apiReference.scene.test.ts` - create Scene tests
  for the Avatar widget rendering, filtering, and empty state.
- `src/openstory/documentation/referenceData.ts` - enrich the Base UI Avatar
  documentation data with API reference groups/rows.
- `src/openstory/documentation/referenceProgram.ts` - compose the new API widget
  as a submodel inside the existing documentation reference program and replace
  the plain API table.
- `src/openstory/documentation/referenceProgram.scene.test.ts` - update the
  documentation story assertions to prove the widget appears in the API section.

**Out of scope**:

- Editing registry component source under `registry/**`.
- Changing generated OpenStory story files under `src/openstory/generated/**`.
- Changing `scripts/generate-openstory-stories.mjs` or registry build scripts.
- Adding API reference data for every component. This plan pilots
  `base-ui-avatar` only.
- Reworking the Anatomy x-ray widget. Reuse it as-is.
- Editing OpenStory internals under `../openstory`.

## Git workflow

- Branch: use the current `codex/...` branch unless the operator tells you to
  create a new branch.
- Commit message style in this repo is short imperative prose, for example
  `Add OpenStory documentation reference`.
- Do not push or open a PR unless the operator explicitly asks.

## Steps

### Step 1: Create the reusable API reference data model and update loop

Create `src/openstory/documentation/apiReference.ts`.

Export at least these data types:

```ts
export type ApiReferenceBadge = Readonly<{
  label: string;
  tone: "neutral" | "required" | "optional" | "source" | "a11y";
}>;

export type ApiReferenceRow = Readonly<{
  id: string;
  name: string;
  category: string;
  typeLabel: string;
  signature: string;
  description: string;
  badges: readonly ApiReferenceBadge[];
  defaultValue?: string | undefined;
  source?: string | undefined;
  details: readonly string[];
}>;

export type ApiReferenceGroup = Readonly<{
  id: string;
  label: string;
  summary: string;
  rows: readonly ApiReferenceRow[];
}>;

export type ApiReferenceConfig = Readonly<{
  title: string;
  summary: string;
  groups: readonly ApiReferenceGroup[];
}>;
```

Export a Foldkit program surface:

- `Model` with:
  - `query: S.String`
  - `selectedGroupId: S.String`
  - `maybeSelectedCategory: S.Option(S.String)`
- Messages:
  - `UpdatedApiReferenceQuery`
  - `SelectedApiReferenceGroup`
  - `SelectedApiReferenceCategory`
  - `ClearedApiReferenceCategory`
- `init(config: ApiReferenceConfig)` should select the first group id or `""`
  if there are no groups.
- `update(model, message)` should update only widget state and return no
  commands.
- `view(config: ApiReferenceConfig)` should render the widget.
- `defineProgram(config: ApiReferenceConfig)` is optional but useful for
  standalone tests.

Use pure helpers for:

- finding the selected group,
- deriving category counts from the selected group's rows,
- filtering rows by `query` across row name, category, type label, signature,
  description, badges, and details,
- filtering rows by selected category.

**Verify**:
`bun run typecheck` should exit 0 after Step 2 supplies data that consumes the
new types.

### Step 2: Render the Quasar-like widget

In `apiReference.ts`, render a dense API panel inspired by Quasar's API widget,
but adapted to Foldkit terminology:

- Header with `config.title`, `config.summary`, and a search input labelled
  `Filter API reference`.
- Top group tabs/buttons with count badges, for example:
  - `View helpers 7`
  - `Config types 6`
  - `Class hooks 7`
  - `Accessibility 5`
  - `Coverage 4`
- A left category rail for the selected group with an `All` option and category
  count badges. Categories for Avatar should include values such as `Rendering`,
  `Composition`, `Styling`, `ARIA`, and `Tests`.
- A right details pane containing dense rows/cards for the filtered rows.
  Every row should show:
  - name,
  - type label,
  - signature,
  - description,
  - badges,
  - optional default value,
  - optional source path,
  - details list when present.
- Empty state text: `No API entries match this filter`.
- Use stable dimensions and responsive constraints so the widget stacks on
  mobile and becomes rail + content on desktop.
- Do not use a nested-card visual hierarchy. It is acceptable for rows to be
  bordered list items inside one panel.

Use accessible controls:

- Top group buttons must be buttons with names like `View helpers 7`.
- Category rail buttons must be buttons with names like `Rendering 3`.
- The active button should expose `aria-pressed="true"` or equivalent.
- Search input should use `h.input`, `h.Value(model.query)`,
  `h.OnInput((value) => UpdatedApiReferenceQuery({ value }))`, and
  `h.OnChange(...)`.

**Verify**:
`bunx vitest run src/openstory/documentation/apiReference.scene.test.ts` should
pass after Step 4 adds tests.

### Step 3: Enrich Base UI Avatar documentation data

Update `src/openstory/documentation/referenceData.ts`.

Replace or augment the current `apiRows` shape with an `apiReference` field on
`DocumentationReference`:

```ts
apiReference: ApiReferenceConfig;
```

You may keep `DocumentationApiRow` and `apiRows` only if doing so minimizes
churn, but `referenceProgram.ts` must render the new `apiReference` widget in
the `API` section instead of the old table.

For `baseUiAvatarDocumentation.apiReference`, include exactly these groups:

1. `View helpers` with 7 rows:
   - `rootView`
   - `imageView`
   - `fallbackView`
   - `view`
   - `badgeView`
   - `groupView`
   - `countView`
2. `Config types` with rows for:
   - `RootViewConfig`
   - `ImageViewConfig`
   - `FallbackViewConfig`
   - `ViewConfig`
   - `BadgeViewConfig`
   - `CountConfig`
   - `AvatarSize`
   - `AvatarStyle`
3. `Class hooks` with rows for:
   - `avatarBaseClassName`
   - `avatarImageClassName`
   - `avatarFallbackClassName`
   - `avatarBadgeClassName`
   - `avatarGroupClassName`
   - `avatarGroupCountClassName`
   - `avatarSizeClassNameBySize`
4. `Accessibility` with rows for:
   - image `alt`
   - fallback text
   - badge `aria-label`
   - badge decorative `aria-hidden`
   - count `role="img"`
   - count `aria-label`
5. `Coverage` with rows for the same coverage paths already documented:
   - `registry/base-ui/ui/base-ui-avatar/base-ui-avatar.scene.test.ts`
   - `registry/base-ui/examples/base-ui-avatar-basic/base-ui-avatar-basic.scene.test.ts`
   - `scripts/check-openstory-stories.mjs`
   - `scripts/smoke-public-site.mjs`

For each row, set a useful `category`, `typeLabel`, `signature`, description,
badges, and details. Source paths should point to the files above when a row is
source-owned.

**Verify**:
`bun run typecheck` exits 0.

### Step 4: Compose the API widget into the documentation reference program

Update `src/openstory/documentation/referenceProgram.ts`:

- Import `* as ApiReference` from `./apiReference`.
- Extend `Model` with `apiReference: ApiReference.Model`.
- Add `GotApiReferenceMessage = m("GotApiReferenceMessage", { message: ApiReference.Message })`.
- Add `GotApiReferenceMessage` to `Message`.
- In `init`, call `ApiReference.init(reference.apiReference)`.
  Because `init` currently has no `reference` parameter, it is acceptable to
  change `createDocumentationReferenceProgram(reference)` so its returned
  `init` closes over the reference and initializes both submodels.
- In `update`, route API widget messages through `ApiReference.update` and use
  `evo()` to update the nested model.
- In the view, render the API section with:

```ts
h.submodel({
  slotId: `${reference.registryItemName}-api-reference`,
  model: model.apiReference,
  view: apiReferenceView,
  toParentMessage: (message) => GotApiReferenceMessage({ message }),
})
```

- Delete `renderApiTable` if it is no longer used.
- Preserve all existing documentation section headings. `Keyboard interaction`
  should still be omitted for Avatar.

**Verify**:
`bunx vitest run src/openstory/documentation/referenceProgram.scene.test.ts`
exits 0 after Step 5 updates tests.

### Step 5: Add focused tests

Create `src/openstory/documentation/apiReference.story.test.ts` proving:

- `init(baseUiAvatarDocumentation.apiReference)` selects the first group,
  `view-helpers`.
- `SelectedApiReferenceGroup({ groupId: "class-hooks" })` changes the selected
  group and clears selected category.
- `SelectedApiReferenceCategory({ category: "Styling" })` selects a category.
- `ClearedApiReferenceCategory()` clears the selected category.
- `UpdatedApiReferenceQuery({ value: "aria" })` updates `query`.

Create `src/openstory/documentation/apiReference.scene.test.ts` proving:

- The widget renders `Avatar API reference`.
- Top group buttons include `View helpers 7`, `Config types 8`,
  `Class hooks 7`, `Accessibility 6`, and `Coverage 4`.
- Row text includes `rootView`, `RootViewConfig`, `avatarBaseClassName`,
  `role="img"`, and `base-ui-avatar.scene.test.ts`.
- Clicking `Class hooks 7` shows `avatarImageClassName`.
- Typing `aria` into `Filter API reference` filters to accessibility-relevant
  rows such as `aria-label`.
- Typing a no-match query shows `No API entries match this filter`.

Update `src/openstory/documentation/referenceProgram.scene.test.ts` proving:

- The documentation story still renders all required section headings.
- The API section includes `Avatar API reference`.
- The API widget exposes `View helpers 7`.
- The widget can be interacted with through the documentation story by clicking
  `Class hooks 7` and finding `avatarBadgeClassName`.
- Existing assertions for `rootView`, `imageView`, `fallbackView`,
  `badgeView`, `groupView`, `countView`, and coverage filenames still pass.

Use `Scene.type` for input tests, matching existing examples such as
`registry/shadcn/examples/command-scrollable/command-scrollable.scene.test.ts`.

**Verify**:
`bunx vitest run src/openstory/documentation/apiReference.story.test.ts src/openstory/documentation/apiReference.scene.test.ts src/openstory/documentation/referenceProgram.scene.test.ts`
exits 0.

### Step 6: Run the full verification set

Run:

```bash
bun run typecheck
bun run test
bun run build
bun run preview -- --port 4173
PUBLIC_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-site
```

Expected:

- typecheck exits 0,
- all Vitest tests pass,
- build exits 0 and writes `dist`,
- smoke prints `Public OpenStory site smoke passed at http://127.0.0.1:4173`.

Stop the preview server after the smoke.

## Test plan

- `apiReference.story.test.ts` covers pure widget update behavior.
- `apiReference.scene.test.ts` covers rendered group counts, category/search
  filtering, dense row content, and empty state.
- `referenceProgram.scene.test.ts` covers integration of the widget inside the
  Base UI Avatar documentation story.
- Existing full test/build/smoke commands prove the public OpenStory story still
  compiles and is reachable.

## Done criteria

All must hold:

- [ ] `src/openstory/documentation/apiReference.ts` exports a reusable
  Foldkit-native API reference widget.
- [ ] The Base UI Avatar documentation story's API section renders
  `Avatar API reference`, count-badged group controls, category controls, dense
  API rows, and search filtering.
- [ ] The Avatar API reference includes the five groups and row counts specified
  in Step 3.
- [ ] The old plain API table is no longer used for the Avatar API section.
- [ ] `bunx vitest run src/openstory/documentation/apiReference.story.test.ts src/openstory/documentation/apiReference.scene.test.ts src/openstory/documentation/referenceProgram.scene.test.ts` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run build` exits 0.
- [ ] `PUBLIC_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-site` exits 0
  against a local preview.
- [ ] No files outside the in-scope list are modified.
- [ ] `plans/README.md` status row for 015 is updated, unless a reviewer told
  you they maintain the index.

## STOP conditions

Stop and report back if:

- `referenceProgram.ts` no longer exposes a Foldkit program returned from
  `createDocumentationReferenceProgram(reference)`.
- The Avatar exported helper/type/class names in `registry/base-ui/ui/base-ui-avatar`
  do not match the names listed in this plan.
- Search/filter behavior appears to require direct DOM querying or imperative
  mutation. Keep it in the model and messages.
- Implementing the widget requires changing OpenStory internals under
  `../openstory`.
- Implementing the widget requires changing registry component source under
  `registry/**`.
- A verification command fails twice after a reasonable fix attempt.

## Maintenance notes

This plan intentionally builds the rich API widget for one pilot component.
Future documentation rollout should add `apiReference` data for more components
without changing the widget contract. Reviewers should scrutinize the row data
for accuracy against exported source names and make sure the widget remains a
documentation component, not a replacement for generated TypeScript API
extraction.
