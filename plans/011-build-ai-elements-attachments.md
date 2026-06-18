# Plan 011: Build the AI Elements attachments registry slice

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report; do
> not improvise. When done, update the status row for this plan in
> `plans/README.md`, unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 759aca29..HEAD -- docs/product/component-entry-contract.md scripts/check-registry-metadata.mjs registry/default/items.json registry/default/ui/ai-elements-attachments registry/default/examples/ai-elements-attachments-grid registry/default/examples/ai-elements-attachments-inline registry/default/examples/ai-elements-attachments-list src/main.ts src/main.scene.test.ts src/main.story.test.ts src/docsView.ts src/ui/view/ai-elements-attachments.ts src/docsExamplePreviewsAIElements.ts src/openstory/generated plans/011-build-ai-elements-attachments.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/009-add-generated-openstory-registry-catalog.md
- **Category**: direction
- **Planned at**: commit `759aca29`, 2026-06-17

## Why this matters

AI Elements has a first-party attachments component at
`https://elements.ai-sdk.dev/components/attachments`, but this registry only has
Foldkit, shadcn, and Base UI lanes. A high-fidelity Foldkit-native attachments
slice gives this project the first concrete AI Elements category entry without
copying React context or shadcn implementation details into Foldkit code. The
work must preserve the upstream behavior surface: grid, inline, and list
variants; file and source-document data; media category utilities; remove
callbacks; hover-card preview support; and accessible labels.

## Current state

- `repos/foldkit/` is not present. `AGENTS.md` already has
  `subtree_prompted: true`, so do not prompt for or add the subtree while
  executing this plan.
- `package.json` uses Bun, Vite, Foldkit, Tailwind, Vitest, Openstory, and
  registry scripts:

```json
// package.json:7-24
"scripts": {
  "dev": "vite --host",
  "build": "vite build",
  "build:registry": "bun scripts/build-registry.mjs",
  "check:registry": "bun scripts/build-registry.mjs --check && bun scripts/check-registry-order.mjs && bun scripts/check-registry-metadata.mjs && bun scripts/check-example-tests.mjs && bun scripts/check-openstory-stories.mjs && bun scripts/check-primitive-coverage.mjs && bun scripts/check-shadcn-doc-examples.mjs && bun scripts/check-origin-content-parity-agenda.mjs",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "lint": "ultracite check",
  "openstory:generate": "bun scripts/generate-openstory-stories.mjs",
  "openstory:check": "bun scripts/check-openstory-stories.mjs"
}
```

- The component-entry contract currently names Base UI, shadcn, and Foldkit docs
  groups, but not AI Elements:

```md
<!-- docs/product/component-entry-contract.md:222-233 -->
The docs sidebar/dock grouping is part of the component contract, not a
presentation detail. A component's docs nav group must match
`registry/default/items.json`:

- `meta.foldkit.origin` under `https://base-ui.com/` appears under the `Base UI`
  docs group.
- `meta.foldkit.origin` under `https://ui.shadcn.com/` appears under the
  `shadcn` docs group.
- `meta.foldkit.origin` under `https://foldkit.dev/` appears under the `Foldkit`
  docs group.
```

- A registry UI item must include source, view, scene test, examples, docs
  route wiring, generated artifacts, and docs scene coverage:

```md
<!-- docs/product/component-entry-contract.md:109-124 -->
| `registry/default/ui/{name}/index.ts`             | every `registry:ui` | Public component API, exported types, JSDoc, Foldkit view helpers.          |
| `registry/default/ui/{name}/view.ts`              | every styled item   | Class constants, visual helper functions, style-only exports.               |
| `registry/default/ui/{name}/{name}.scene.test.ts` | every `registry:ui` | Behavior, accessibility, state, style hook, and inert/disabled proof.       |
| `registry/default/examples/{example}/main.ts`     | every example       | Runnable Foldkit example imported by docs and installed by registry.        |
| `registry/default/items.json`                     | every registry item | shadcn-compatible registry metadata plus `meta.foldkit` metadata.           |
| `src/main.ts`                                     | every docs item     | Route, nav, origin grouping, docs page, live preview, source viewer wiring. |
| `src/main.scene.test.ts`                          | every docs item     | Docs route section, example block, and visible behavior proof.              |
```

- Current component helpers expose Foldkit parent-message view functions and
  style constants rather than framework-local state. Match this shape:

```ts
// registry/default/ui/badge/index.ts:1-42
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { badgeClassNameByVariant } from "./view";
import type { BadgeVariant } from "./view";

export type ViewConfig = Readonly<{
  label: string;
  variant?: BadgeVariant;
  className?: string;
}>;

export const contentView = <ParentMessage>({
  children,
  variant = "Default",
  className,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span([h.Class(classNamesForVariant(variant, className))], children);
};
```

- Current examples are pure Foldkit programs using `S.Struct`, `S.Never` when
  stateless, `Submodel.defineView`, and update functions returning
  `[Model, Command[]]`:

```ts
// registry/default/examples/base-ui-avatar-basic/main.ts:1-44
import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";

import * as Avatar from "../../ui/base-ui-avatar";

export const Model = S.Struct({});
export type Model = typeof Model.Type;

export const Message = S.Never;
export type Message = typeof Message.Type;

export const init = (): readonly [Model, readonly Command.Command<Message>[]] =>
  [{}, []];

export const update = (
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

export const view = Submodel.defineView<Model, Message>(
  (): Html => Avatar.groupView<Message>([...])
);
```

- Registry metadata follows this shape for components and examples:

```json
// registry/default/items.json, base-ui-avatar excerpt
{
  "name": "base-ui-avatar",
  "type": "registry:ui",
  "dependencies": ["effect", "foldkit"],
  "devDependencies": ["vitest"],
  "registryDependencies": ["avatar"],
  "files": [
    {
      "path": "registry/default/ui/base-ui-avatar/index.ts",
      "target": "src/ui/base-ui-avatar/index.ts",
      "type": "registry:ui"
    }
  ],
  "meta": {
    "foldkit": {
      "component": "Avatar",
      "origin": "https://base-ui.com/react/components/avatar",
      "artifact": "component",
      "stateful": true
    }
  }
}
```

- Upstream AI Elements attachments facts, verified from
  `https://elements.ai-sdk.dev/components/attachments` and
  `https://elements.ai-sdk.dev/api/registry/attachments.json` on 2026-06-17:
  - Registry item: `attachments`, type `registry:component`, dependencies
    `ai` and `lucide-react`, source path
    `registry/default/ai-elements/attachments.tsx`.
  - Public component surface: `Attachments`, `Attachment`, `AttachmentPreview`,
    `AttachmentInfo`, `AttachmentRemove`, `AttachmentHoverCard`,
    `AttachmentHoverCardTrigger`, `AttachmentHoverCardContent`,
    `AttachmentEmpty`.
  - Utility surface: `getMediaCategory(data)` and `getAttachmentLabel(data)`.
  - Variants: `grid`, `inline`, and `list`.
  - Media categories: `image`, `video`, `audio`, `document`, `source`,
    `unknown`.
  - Data kinds: `FileUIPart & { id: string }` and
    `SourceDocumentUIPart & { id: string }`.
  - Docs examples: Grid Variant, Inline Variant, List Variant.
  - Required features from docs: automatic media type detection, hover card
    support for inline previews, remove callback, composable architecture,
    accessible labels, and exported TypeScript utilities.
  - Important upstream class families to preserve in Foldkit equivalents:
    container classes include `grid grid-cols-2 gap-2`, `flex flex-wrap gap-2`,
    and `flex flex-col gap-2`; item classes include
    `group relative overflow-hidden rounded-lg border`,
    `inline-flex max-w-xs items-center gap-2 rounded-md border`, and
    `flex items-center gap-3 rounded-lg border p-3`; remove button classes
    include `absolute top-2 right-2 size-6 rounded-full p-0`, `size-5 rounded
    p-0`, and `size-8 shrink-0 rounded p-0`.

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Typecheck | `bun run typecheck` | exit 0, no TypeScript errors |
| Focused component tests | `bun run test -- ai-elements-attachments` | exit 0; new UI and example scene tests pass |
| Docs route tests | `bun run test -- src/main.scene.test.ts` | exit 0; attachments docs route assertions pass |
| Generate registry | `bun run build:registry` | exit 0; generated public registry files and sources are current |
| Generate Openstory | `bun run openstory:generate` | exit 0; generated story coverage includes the new examples |
| Registry aggregate | `bun run check:registry` | exit 0 |
| Build | `bun run build` | exit 0 |
| Format/lint check | `bun run lint -- registry/default/ui/ai-elements-attachments registry/default/examples/ai-elements-attachments-grid registry/default/examples/ai-elements-attachments-inline registry/default/examples/ai-elements-attachments-list src/main.ts src/docsView.ts src/main.scene.test.ts src/main.story.test.ts src/ui/view/ai-elements-attachments.ts docs/product/component-entry-contract.md scripts/check-registry-metadata.mjs registry/default/items.json` | exit 0 |

## Suggested executor toolkit

- Use the `frontend-design` or `polish` skill only after the Foldkit API,
  examples, and tests exist. Do not polish before preserving the upstream
  attachments behavior surface.
- Use the official upstream URLs above as fidelity references. Do not rely on
  memory of AI Elements because the registry JSON is live source-of-truth for
  this component.

## Scope

**In scope**:

- Update the docs/category contract:
  - `docs/product/component-entry-contract.md`
- Add a new Foldkit-native registry UI slice:
  - `registry/default/ui/ai-elements-attachments/index.ts`
  - `registry/default/ui/ai-elements-attachments/view.ts`
  - `registry/default/ui/ai-elements-attachments/ai-elements-attachments.scene.test.ts`
- Add runnable examples:
  - `registry/default/examples/ai-elements-attachments-grid/main.ts`
  - `registry/default/examples/ai-elements-attachments-grid/ai-elements-attachments-grid.scene.test.ts`
  - `registry/default/examples/ai-elements-attachments-inline/main.ts`
  - `registry/default/examples/ai-elements-attachments-inline/ai-elements-attachments-inline.scene.test.ts`
  - `registry/default/examples/ai-elements-attachments-list/main.ts`
  - `registry/default/examples/ai-elements-attachments-list/ai-elements-attachments-list.scene.test.ts`
  - `entry.ts` and `index.html` in each example only if existing registry
    examples around this component family include standalone shells.
- Add registry metadata:
  - `registry/default/items.json`
- Update registry metadata guardrails:
  - `scripts/check-registry-metadata.mjs`
- Add docs route, navigation, preview, source viewer, and tests:
  - `src/main.ts`
  - `src/main.scene.test.ts`
  - `src/main.story.test.ts` if the main model gains required example submodel
    fields that must be initialized for existing story tests to typecheck.
  - `src/docsView.ts`
  - `src/ui/view/ai-elements-attachments.ts`
  - `src/docsExamplePreviewsAIElements.ts` if introducing a separate preview
    chunk is cleaner than expanding an existing one.
- Generated artifacts from project scripts:
  - `apps/docs/public/r/*`
  - `apps/docs/public/sources/*`
  - `apps/docs/public/components.json`
  - `src/openstory/generated/*`
- Plan index status:
  - `plans/README.md`

**Out of scope**:

- Do not import or wrap React components from AI Elements.
- Do not add `react`, `lucide-react`, shadcn, Radix, or AI Elements runtime
  dependencies to the Foldkit registry component.
- Do not touch unrelated shadcn or Base UI component slices.
- Do not implement upload transport, file picker behavior, AI SDK `useChat`, or
  server APIs. This plan covers display and remove events for attachment data.
- Do not rename existing registry categories or move existing components between
  categories except for the new AI Elements category support needed here.
- Do not execute plan 010 or modify `foldkit-livetrace` files.

## Git workflow

- Branch: `codex/011-ai-elements-attachments`
- Commit message: `add ai elements attachments registry slice`
- Commit per logical unit is acceptable: category contract, component slice,
  examples/docs wiring, generated artifacts.
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add the AI Elements category contract

Update `docs/product/component-entry-contract.md` so `meta.foldkit.origin` under
`https://elements.ai-sdk.dev/` maps to a new `AI Elements` docs group. Keep the
existing Base UI, shadcn, and Foldkit rules. Add a note that AI Elements entries
must be Foldkit-native translations of the upstream registry behavior, not React
wrappers.

Then update the docs navigation/category classifier in `src/docsView.ts` so a
nav item with AI Elements metadata renders under `AI Elements`, not Foldkit. The
existing `docsNavItemLibrary` and `COMPONENT_DOCS_METADATA_BY_SLUG` surfaces are
the relevant places to inspect.

**Verify**:
`rg -n "AI Elements|elements.ai-sdk.dev|docsNavItemLibrary|COMPONENT_DOCS_METADATA_BY_SLUG" docs/product/component-entry-contract.md src/docsView.ts`
-> all four concepts appear, and the docs contract explicitly names the AI
Elements origin rule.

### Step 2: Create the Foldkit-native UI module

Create `registry/default/ui/ai-elements-attachments/index.ts` and
`registry/default/ui/ai-elements-attachments/view.ts`.

Use Foldkit-friendly PascalCase public types. Suggested API:

- `AttachmentData` as a discriminated union using Effect `Schema`-compatible
  shapes where exported data is schema-owned:
  - `FileAttachmentData` with fields such as `id`, `type: "file"`,
    `filename`, `mediaType`, `url`, and optional `sizeLabel`.
  - `SourceAttachmentData` with fields such as `id`, `type: "source"`, `title`,
    `url`, and optional `description`.
- `AttachmentMediaCategory = "Image" | "Video" | "Audio" | "Document" |
  "Source" | "Unknown"`.
- `AttachmentVariant = "Grid" | "Inline" | "List"`.
- `getMediaCategory(data)` and `getAttachmentLabel(data)` exported with the same
  semantics as upstream, adapted to PascalCase category values.
- View helpers:
  - `attachmentsView<ParentMessage>({ variant, children, className })`
  - `attachmentView<ParentMessage>({ data, variant, children, onRemove,
    className })`
  - `attachmentPreviewView<ParentMessage>({ data, fallback, className })`
  - `attachmentInfoView<ParentMessage>({ data, variant, showMediaType,
    className })`
  - `attachmentRemoveView<ParentMessage>({ label, onRemove, variant,
    className })`
  - `attachmentHoverCardView`, `attachmentHoverCardTriggerView`,
    `attachmentHoverCardContentView`
  - `attachmentEmptyView`
  - A convenience `view<ParentMessage>({ attachments, variant, onRemove })`
    that composes the helpers.

Translate the upstream class families into exported constants in `view.ts` and
preserve the visual structure closely:

- Grid container: `grid grid-cols-2 gap-2`
- Inline container: `flex flex-wrap gap-2`
- List container: `flex flex-col gap-2`
- Grid item: `group relative overflow-hidden rounded-lg border`
- Inline item: `inline-flex max-w-xs items-center gap-2 rounded-md border`
- List item: `flex items-center gap-3 rounded-lg border p-3`
- Grid remove button: `absolute top-2 right-2 size-6 rounded-full p-0`
- Inline remove button: `size-5 rounded p-0`
- List remove button: `size-8 shrink-0 rounded p-0`

Use existing local helper style: `html<ParentMessage>()` inside functions,
`classNames(...)` helper, no React context, no hooks, no raw DOM mutation, no
`as` casts.

**Verify**:
`rg -n "AttachmentVariant|AttachmentMediaCategory|getMediaCategory|getAttachmentLabel|attachmentsView|attachmentPreviewView|attachmentRemoveView|AttachmentEmpty|grid grid-cols-2 gap-2|flex flex-wrap gap-2|flex flex-col gap-2" registry/default/ui/ai-elements-attachments`
-> every symbol and class family appears.

### Step 3: Add component scene tests

Create `registry/default/ui/ai-elements-attachments/ai-elements-attachments.scene.test.ts`.

Cover at least:

- Grid renders image/file/source/audio/document labels and remove buttons.
- Inline renders compact labels and supports hover-card trigger/content markup.
- List renders filename/title plus media type when `showMediaType` is enabled.
- `getMediaCategory` returns Image, Video, Audio, Document, Source, and Unknown
  for representative data.
- `getAttachmentLabel` returns filename for files, source title for sources, and
  sensible fallbacks for unknown data.
- Remove buttons send the parent-owned message passed into `onRemove`, following
  Foldkit unidirectional data flow.

Use the existing `registry/default/ui/badge/badge.scene.test.ts` and
`registry/default/ui/base-ui-avatar/base-ui-avatar.scene.test.ts` structure.

**Verify**:
`bun run test -- registry/default/ui/ai-elements-attachments/ai-elements-attachments.scene.test.ts`
-> exit 0.

### Step 4: Add the three upstream examples as runnable Foldkit examples

Create these examples:

- `ai-elements-attachments-grid`
- `ai-elements-attachments-inline`
- `ai-elements-attachments-list`

Each example must be a Foldkit program with `Model`, `Message`, `init`,
`update`, and `view`. The model should own the attachments array. Removal should
be represented as a fact message such as `ClickedRemoveAttachment`, and `update`
should remove the matching item from the model with `evo()` or other established
Foldkit immutable update helpers. Do not mutate arrays.

Use sample data matching upstream visible examples:

- `mountain-landscape.jpg` as `image/jpeg`
- `ocean-sunset.jpg` as `image/jpeg`
- `quarterly-report-2024.pdf` or `quarterly-report.pdf` as `application/pdf`
- `product-demo.mp4` as `video/mp4`
- `API Documentation` or `React Documentation` as a source document
- `meeting-recording.mp3` or `podcast-episode.mp3` as `audio/mpeg`

Use stable remote image URLs or inline SVG data URLs. If using remote URLs,
scene tests must not depend on network image loading; assert on roles, labels,
and text instead.

**Verify**:
`bun run test -- registry/default/examples/ai-elements-attachments-grid registry/default/examples/ai-elements-attachments-inline registry/default/examples/ai-elements-attachments-list`
-> exit 0.

### Step 5: Register component and examples in `items.json`

Add one `registry:ui` item:

- `name`: `ai-elements-attachments`
- `title`: `Attachments`
- `description`: "Foldkit-native AI Elements attachments component for files,
  media, and source documents."
- `dependencies`: `["effect", "foldkit"]`
- `devDependencies`: `["vitest"]`
- `registryDependencies`: include only local registry dependencies actually used
  by the implementation. If hover-card helpers are imported from
  `registry/default/ui/hover-card`, include `hover-card`; otherwise leave empty.
- `meta.foldkit.origin`: `https://elements.ai-sdk.dev/components/attachments`
- `meta.foldkit.component`: `Attachments`
- `meta.foldkit.artifact`: `component`
- `meta.foldkit.stateful`: `true`
- `meta.foldkit.primitive`: `AI Elements attachments view helpers`

Add three `registry:example` items for grid, inline, and list. Set
`registryDependencies` to `["ai-elements-attachments"]`. Set
`meta.foldkit.origin` to `https://elements.ai-sdk.dev/components/attachments`,
`meta.foldkit.component` to `Attachments`, `meta.foldkit.example` to `grid`,
`inline`, or `list`, and `meta.foldkit.originExample` to the upstream section
name.

Keep registry ordering sorted according to the existing guardrail.

**Verify**:
Update `scripts/check-registry-metadata.mjs` so `https://elements.ai-sdk.dev/`
is an accepted origin lane and the `AiElementsAttachmentsDocs` route must be
classified into the AI Elements docs group. Keep the existing Base UI and shadcn
checks intact; this should be a narrow lane addition, not a broad checker
rewrite.

**Verify**:
`bun scripts/check-registry-order.mjs && bun scripts/check-registry-metadata.mjs`
-> both exit 0.

### Step 6: Wire docs route, navigation, preview, and source blocks

Add docs route support for `/docs/components/ai-elements-attachments` and example
routes:

- `/docs/components/ai-elements-attachments/examples/grid`
- `/docs/components/ai-elements-attachments/examples/inline`
- `/docs/components/ai-elements-attachments/examples/list`

Update `src/main.ts` consistently with existing docs route declarations,
routers, route union, imports, and page rendering. Update `src/docsView.ts` so
the new component appears in an `AI Elements` nav/category group. Add
`COMPONENT_DOCS_METADATA_BY_SLUG` metadata for the new slug so the docs meta grid
shows the origin URL and does not fall back to Foldkit.

Create `src/ui/view/ai-elements-attachments.ts` only if that matches nearby docs
preview patterns for components with custom docs preview blocks. Otherwise, wire
the examples through existing preview/source-view mechanisms. If a separate
chunk is used, name it clearly, for example `src/docsExamplePreviewsAIElements.ts`.

Docs page content must mention the Foldkit-native API and the upstream fidelity
surface:

- Three variants: Grid, Inline, List.
- File and source document data.
- Automatic media category utilities.
- Remove messages are parent-owned facts, not imperative callbacks.
- Hover-card preview support for inline layout.

**Verify**:
`rg -n "AiElementsAttachments|AI Elements|ai-elements-attachments|elements.ai-sdk.dev/components/attachments|docs-example-block-ai-elements-attachments" src/main.ts src/docsView.ts src/ui/view`
-> route, nav, metadata, preview/source block, and origin are present.

### Step 7: Generate registry and Openstory artifacts

Run the project generators:

```sh
bun run build:registry
bun run openstory:generate
```

Expected results:

- `apps/docs/public/r/ai-elements-attachments.json` exists.
- `apps/docs/public/r/ai-elements-attachments-grid.json` exists.
- `apps/docs/public/r/ai-elements-attachments-inline.json` exists.
- `apps/docs/public/r/ai-elements-attachments-list.json` exists.
- `apps/docs/public/sources/ai-elements-attachments-grid.txt` exists.
- `apps/docs/public/sources/ai-elements-attachments-inline.txt` exists.
- `apps/docs/public/sources/ai-elements-attachments-list.txt` exists.
- Generated Openstory output includes the three new examples.

**Verify**:
`test -f apps/docs/public/r/ai-elements-attachments.json && test -f apps/docs/public/sources/ai-elements-attachments-grid.txt && rg -n "ai-elements-attachments-(grid|inline|list)" src/openstory/generated apps/docs/public/r apps/docs/public/sources`
-> exit 0 and all three example names appear.

### Step 8: Add docs and integration tests

Update `src/main.scene.test.ts` for the docs page and example routes. Cover:

- The `AI Elements` category is visible and contains Attachments.
- `/docs/components/ai-elements-attachments` renders the Attachments docs page,
  install command/source metadata, and example blocks.
- Grid, inline, and list example routes render without route mismatch and expose
  the expected labels.

Do not make tests depend on image network loading. Assert on text, accessible
labels, roles, source block IDs, and remove buttons.

**Verify**:
`bun run test -- src/main.scene.test.ts`
-> exit 0.

### Step 9: Run full verification

Run:

```sh
bun run typecheck
bun run test -- ai-elements-attachments
bun run check:registry
bun run build
bun run lint -- registry/default/ui/ai-elements-attachments registry/default/examples/ai-elements-attachments-grid registry/default/examples/ai-elements-attachments-inline registry/default/examples/ai-elements-attachments-list src/main.ts src/docsView.ts src/main.scene.test.ts src/main.story.test.ts docs/product/component-entry-contract.md scripts/check-registry-metadata.mjs registry/default/items.json
```

Expected result: every command exits 0. If `bun run lint -- <paths>` is not
accepted by the local lint script, run `bun run lint` and record that broader
check in the plan status update.

## Test plan

- Component scene test:
  `registry/default/ui/ai-elements-attachments/ai-elements-attachments.scene.test.ts`
  covers utility functions, variants, labels, media categories, hover-card
  markup, and remove messages.
- Example scene tests:
  - `registry/default/examples/ai-elements-attachments-grid/ai-elements-attachments-grid.scene.test.ts`
  - `registry/default/examples/ai-elements-attachments-inline/ai-elements-attachments-inline.scene.test.ts`
  - `registry/default/examples/ai-elements-attachments-list/ai-elements-attachments-list.scene.test.ts`
- Docs scene tests in `src/main.scene.test.ts` cover navigation grouping, docs
  route, and example routes.
- Use `registry/default/ui/badge/badge.scene.test.ts`,
  `registry/default/ui/base-ui-avatar/base-ui-avatar.scene.test.ts`, and
  `registry/default/examples/base-ui-avatar-basic/base-ui-avatar-basic.scene.test.ts`
  as structural patterns.

## Done criteria

- [ ] `docs/product/component-entry-contract.md` defines the AI Elements origin
      category rule.
- [ ] `registry/default/ui/ai-elements-attachments` exposes Foldkit-native
      helpers and utilities for the full upstream attachments surface.
- [ ] Grid, inline, and list examples exist and are registered.
- [ ] Docs navigation groups the component under `AI Elements`.
- [ ] Registry JSON and source snapshots are generated.
- [ ] Openstory generated coverage includes the three new examples.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test -- ai-elements-attachments` exits 0.
- [ ] `bun run test -- src/main.scene.test.ts` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run build` exits 0.
- [ ] `git status --short` shows only the in-scope implementation, generated
      artifacts, and the plan index update.
- [ ] `plans/README.md` row 011 is updated from TODO to DONE, or BLOCKED with a
      one-line reason.

## STOP conditions

Stop and report back if:

- `https://elements.ai-sdk.dev/api/registry/attachments.json` no longer exposes
  `attachments`, or the public component/utility names differ from this plan.
- The implementation requires adding React, shadcn, Radix, `lucide-react`, or
  the AI Elements runtime to the Foldkit registry component.
- The docs category work requires renaming existing Base UI, shadcn, or Foldkit
  routes instead of adding a new AI Elements classification.
- `registry/default/items.json` guardrails reject `https://elements.ai-sdk.dev/`
  origins in a way that requires broader redesign than adding an AI Elements
  lane to `scripts/check-registry-metadata.mjs`.
- Existing plan 010 work is mixed into the same diff.
- The code at the cited local patterns no longer matches the excerpts closely
  enough to know which convention to follow.
- Any verification command fails twice after a focused fix attempt.

## Maintenance notes

- Future AI Elements components should reuse the category rule and naming shape
  introduced here: `ai-elements-{component}` for the Foldkit registry slug, with
  `meta.foldkit.origin` pointing at `https://elements.ai-sdk.dev/components/...`.
- Reviewers should compare rendered output against both the upstream docs page
  and registry JSON, not just against this plan. The user explicitly asked for
  strong fidelity to the originals.
- Keep parent-owned events as facts. Remove behavior should be a Foldkit message
  handled by `update`, not an imperative callback that mutates external state.
- If a later component needs AI SDK runtime streaming or upload behavior, plan
  it separately. This slice is display, metadata, and remove interaction only.
