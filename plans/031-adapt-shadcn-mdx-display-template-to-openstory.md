# Plan 031: Adapt shadcn's docs display template to all OpenStory component docs

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report -
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 8b8ad6a7..HEAD -- src/openstory/documentation scripts/generate-openstory-stories.mjs scripts/generate-openstory-stories.test.ts registry/base-ui/ui/base-ui-alert-dialog registry/base-ui/examples/base-ui-alert-dialog-basic docs/product/component-entry-contract.md docs/product/docs-surface-guardrails.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding. On a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/013-build-openstory-anatomy-xray.md, plans/014-add-openstory-documentation-reference-stories.md, plans/015-build-quasar-like-api-reference-widget.md, plans/021-pilot-component-owned-registry-hierarchy.md, plans/022-codify-component-local-configuration-poc.md, plans/026-activate-exact-origin-visual-parity.md
- **Category**: docs, openstory, architecture, parity
- **Planned at**: commit `8b8ad6a7`, 2026-06-23

## Why this matters

The pasted shadcn source is very likely the display foundation for the docs page
shape visible at `https://ui.shadcn.com/docs/components/base/alert-dialog`, but
Alert Dialog is only the reference page that exposed the pattern. The actual
goal is registry-wide: Foldkit CN should have one reusable OpenStory component
documentation template that every component documentation story can use.

That template should reuse shadcn's product shape - headings, callouts, code
blocks, tabs, accordions, component previews, source panels, and component
lists - but not the React/Next runtime or upstream registry imports. The local
source of truth is this repo's component registry and Foldkit-native examples.
The outcome should feel familiar to shadcn users while rendering local Base UI,
local shadcn, and local Foldkit component documentation from this project's
source data.

This matters because the current OpenStory documentation reference system is
functional but still a narrow pilot. It has a hard-coded `base-ui-avatar`
documentation story and custom slate rendering in `referenceProgram.ts`; it does
not yet expose a reusable docs display vocabulary equivalent to shadcn's
`mdxComponents`, and it does not yet make that vocabulary the default renderer
for every component documentation reference. Base UI Alert Dialog is only the
first verification slice because it matches the page that revealed the pattern
and already has strong local source, example, and test coverage.

## Source references

- User attachment:
  `/Users/richardmcandrews/.codex/attachments/f3be22d4-9b7d-4448-b060-8daa94e5d834/pasted-text.txt`
- shadcn source:
  `https://github.com/shadcn-ui/ui/blob/main/apps/v4/mdx-components.tsx`
- shadcn target page:
  `https://ui.shadcn.com/docs/components/base/alert-dialog`

Use these as product and structure references only. Do not copy React, Next.js,
MDX, or upstream `@/registry/new-york-v4/**` implementation into this repo's
runtime.

## Current state

This is a Foldkit app. Follow `AGENTS.md`: source examples must remain
Foldkit-native, model fields must be Schema types, messages must be facts, view
functions bind `const h = html<Message>()` inside the function, effects stay in
commands, and installable component source must import from the `foldkit` npm
package instead of the vendored `repos/foldkit` subtree.

The pasted shadcn template imports React/Next infrastructure and upstream
registry display components:

```ts
import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { source } from "@/lib/source"
import { cn } from "@/lib/utils"
import { Callout } from "@/components/callout"
import { CodeBlockCommand } from "@/components/code-block-command"
import { CodeTabs } from "@/components/code-tabs"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/new-york-v4/ui/accordion"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york-v4/ui/alert"
import { AspectRatio } from "@/registry/new-york-v4/ui/aspect-ratio"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Kbd } from "@/registry/new-york-v4/ui/kbd"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york-v4/ui/tabs"
```

The Foldkit CN equivalent must be local and Foldkit-native. At plan time, this
repo already has local component sources that can cover much of that display
vocabulary and should be reused by every component documentation story:

```text
registry/base-ui/ui/base-ui-accordion/index.ts
registry/base-ui/ui/base-ui-accordion/view.ts
registry/base-ui/ui/base-ui-button/index.ts
registry/base-ui/ui/base-ui-button/view.ts
registry/base-ui/ui/base-ui-tabs/index.ts
registry/base-ui/ui/base-ui-tabs/view.ts
registry/foldkit/ui/accordion/index.ts
registry/foldkit/ui/accordion/view.ts
registry/foldkit/ui/button/index.ts
registry/foldkit/ui/button/view.ts
registry/foldkit/ui/tabs/index.ts
registry/foldkit/ui/tabs/view.ts
registry/shadcn/ui/alert/index.ts
registry/shadcn/ui/alert/view.ts
registry/shadcn/ui/aspect-ratio/index.ts
registry/shadcn/ui/aspect-ratio/view.ts
registry/shadcn/ui/kbd/index.ts
registry/shadcn/ui/kbd/view.ts
```

Prefer this repo's `registry/base-ui/ui/**` display primitives where they exist.
Only use local shadcn-lane or Foldkit-lane primitives when a Base UI equivalent
does not exist yet, and record that fallback in the template mapping. The
mapping should be global to the documentation system, not owned by any single
component.

The current OpenStory reference story generator has a hard-coded documentation
pilot:

```js
// scripts/generate-openstory-stories.mjs
const documentationItemNames = new Set(["base-ui-avatar"]);
```

It then conditionally imports the documentation program and reference data for
documented groups. The generated Base UI Avatar story currently prepends
Documentation ahead of example stories:

```ts
// src/openstory/generated/base-ui-avatar.stories.ts
import { createDocumentationReferenceProgram } from "../documentation/referenceProgram";
import { baseUiAvatarDocumentation } from "../documentation/referenceData";

export const Documentation = story(
  "Documentation",
  createDocumentationReferenceProgram(baseUiAvatarDocumentation)
);
```

The renderer itself is in `src/openstory/documentation/referenceProgram.ts`. It
owns the page shell and section rendering today:

```ts
const shellClasses = "min-h-screen bg-white px-4 py-6 text-slate-950 sm:px-6";
const containerClasses = "mx-auto flex w-full max-w-6xl flex-col gap-6";
const panelClasses =
  "rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm";
const sectionHeadingClasses = "text-xl font-semibold text-slate-950";
const proseClasses = "text-sm leading-6 text-slate-600";
const codeClasses =
  "overflow-x-auto rounded-[6px] border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-5 text-slate-50";
```

The reference data contract already has enough structure to build a richer
display template:

```ts
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
  apiReference: ApiReferenceConfig;
  accessibilityNotes: readonly string[];
  coverageRows: readonly DocumentationCoverageRow[];
}>;
```

The OpenStory documentation contract requires a consistent reference story
surface and forbids treating React examples as Foldkit implementation
templates:

```md
<!-- docs/product/component-entry-contract.md -->
The OpenStory Documentation Reference story is the supported component
documentation surface.

Examples should show Foldkit usage directly. React-origin snippets may be cited
as upstream compatibility evidence, but they are not implementation templates.
```

The supported public docs surface is OpenStory, not the retired legacy docs app:

```md
<!-- docs/product/docs-surface-guardrails.md -->
The public OpenStory site is the supported component browser and documentation
surface.

Do not add new work to `/docs/components/**`.
```

The Alert Dialog verification slice has local source, examples, metadata, and
tests already available:

```text
registry/base-ui/ui/base-ui-alert-dialog/index.ts
registry/base-ui/ui/base-ui-alert-dialog/view.ts
registry/base-ui/examples/base-ui-alert-dialog-basic/main.ts
registry/base-ui/ui/base-ui-alert-dialog/base-ui-alert-dialog.scene.test.ts
registry/base-ui/examples/base-ui-alert-dialog-basic/base-ui-alert-dialog-basic.scene.test.ts
```

Use those local files as the first component proof, not shadcn's React
implementation. Do not encode Alert Dialog assumptions into the display
template; the same template must render Avatar, Alert Dialog, and future
component documentation references through the same shared path.

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Typecheck | `bun run typecheck` | exits 0 |
| Documentation story generator tests | `bun run test -- scripts/generate-openstory-stories.test.ts` | exits 0 |
| Documentation program tests | `bun run test -- src/openstory/documentation/referenceProgram.scene.test.ts src/openstory/documentation/apiReference.scene.test.ts src/openstory/documentation/anatomyXray.scene.test.ts` | exits 0 |
| Alert Dialog focused tests | `bun run test -- registry/base-ui/ui/base-ui-alert-dialog/base-ui-alert-dialog.scene.test.ts registry/base-ui/examples/base-ui-alert-dialog-basic/base-ui-alert-dialog-basic.scene.test.ts` | exits 0 |
| Regenerate OpenStory stories | `bun run openstory:generate` | exits 0 and updates generated stories only from source data |
| Check generated OpenStory stories | `bun run openstory:check` | exits 0 |
| Registry/invariant gate | `bun run check:registry` | exits 0 |
| Focused OpenStory docs e2e | `bunx playwright test tests/e2e/docs-surface.spec.ts` or a new focused `tests/e2e/openstory-documentation-template.spec.ts` | exits 0 |
| Build | `bun run build` | exits 0 |

## Scope

**In scope**:

- `src/openstory/documentation/referenceProgram.ts`
- `src/openstory/documentation/referenceData.ts`
- New `src/openstory/documentation/displayTemplate.ts` or equivalent small
  helpers that translate shadcn's docs display vocabulary into Foldkit `Html`
- New documentation data split files under `src/openstory/documentation/**` if
  `referenceData.ts` becomes too large
- `src/openstory/documentation/*.story.test.ts` / `*.scene.test.ts`
- `scripts/generate-openstory-stories.mjs`
- `scripts/generate-openstory-stories.test.ts`
- Generated `src/openstory/generated/**` files produced by
  `bun run openstory:generate`
- A focused OpenStory e2e spec if `docs-surface.spec.ts` is too broad
- `docs/product/component-entry-contract.md`,
  `docs/product/docs-surface-guardrails.md`, and
  `docs/product/project-invariants-scorecard.md` only if the new template
  changes the documented reference contract or evidence
- `plans/README.md`

**Out of scope**:

- Do not implement React, Next.js, or MDX rendering.
- Do not import from shadcn upstream aliases such as
  `@/registry/new-york-v4/**`, `@/components/**`, `next/image`, or
  `next/link`.
- Do not import from `repos/foldkit/**` in project source.
- Do not revive or extend the retired `/docs/components/**` legacy docs app.
- Do not hand-edit generated `src/openstory/generated/**` files except through
  the generator.
- Do not change installable Base UI Alert Dialog APIs unless the local docs
  work reveals a concrete contract mismatch. If it does, stop and file a
  separate component parity plan.
- Do not mark any visual parity row complete unless the existing parity gates
  prove it.

## Implementation steps

1. **Map shadcn docs display concepts to local Foldkit components**

   Create a short mapping in code and tests before refactoring the renderer:

   | shadcn concept | Foldkit CN source |
   | --- | --- |
   | `h1`-`h6`, `HeadingAnchor` | `displayTemplate` heading helpers with stable slug IDs and anchor links |
   | `p`, `strong`, lists, blockquote, table | `displayTemplate` prose/table helpers returning Foldkit `Html` |
   | `Callout` / `Alert` | local alert helper; prefer Base UI if available, otherwise local `registry/shadcn/ui/alert` |
   | `Button` | local `registry/base-ui/ui/base-ui-button` display helper |
   | `Tabs` / `CodeTabs` | local `registry/base-ui/ui/base-ui-tabs` display helper |
   | `Accordion` | local `registry/base-ui/ui/base-ui-accordion` display helper |
   | `Kbd` | local `registry/shadcn/ui/kbd` until a Base UI equivalent exists |
   | `AspectRatio` / image frames | local `registry/shadcn/ui/aspect-ratio` or a plain Foldkit helper with the fallback documented |
   | `ComponentPreview` | OpenStory story/example embedding or a local reference to the generated example story |
   | `ComponentSource` / `CodeBlockCommand` | local generated source snapshots, `apps/docs/public/sources/*.txt`, or direct local example source excerpts |
   | `ComponentsList` | local registry metadata and generated OpenStory group index, not `source.pageTree` |

   The mapping must be executable documentation, such as a typed constant or
   helper module that tests can assert. It should make the local source path for
   every display primitive obvious and be shared by all component documentation
   stories.

2. **Introduce a Foldkit-native display template layer**

   Add `src/openstory/documentation/displayTemplate.ts` or an equivalent module
   that exports focused helpers for the docs display vocabulary. The helpers
   should return `Html`, keep styling classes centralized, and be usable by
   `referenceProgram.ts` without turning the reference program into a styling
   dump.

   Keep this layer narrow. It is the global documentation display template, not
   a new installable component package. Use local registry components by
   importing their project-local source directly only from the OpenStory
   documentation layer. Do not create public registry JSON for this template.

3. **Refactor `referenceProgram.ts` onto the display template**

   Replace the inline shell, panel, heading, paragraph, list, code, install, and
   table render helpers with calls into the display template. Preserve the
   existing Foldkit program shape:

   - Keep `Model` Schema fields for `anatomyXray` and `apiReference`.
   - Keep `GotAnatomyXrayMessage` and `GotApiReferenceMessage`.
   - Keep `Command.mapMessages` for submodel commands.
   - Keep `createDocumentationReferenceProgram(reference)` as the generator
     integration point.

   Do not weaken existing Anatomy X-Ray or API Reference interactions.

4. **Make documentation references source-driven across the registry**

   Replace the hard-coded `documentationItemNames = new Set(["base-ui-avatar"])`
   with a source-driven lookup. Acceptable shapes:

   - A typed `documentationReferences` map exported from
     `src/openstory/documentation/referenceData.ts`.
   - A component metadata flag that resolves to a local documentation reference.
   - A small manifest generated from local registry metadata.

   The important invariant is that the generator asks the local source of truth
   whether a group has a documentation reference. It must not keep a separate
   hand-curated item-name set. The lookup must work for every component group,
   even if this plan only adds one new reference data object as proof.

5. **Add Base UI Alert Dialog as the first template proof, not the scope limit**

   Add `baseUiAlertDialogDocumentation` using only local project source:

   - Import class hooks from
     `registry/base-ui/ui/base-ui-alert-dialog/view.ts`.
   - Document view helpers from
     `registry/base-ui/ui/base-ui-alert-dialog/index.ts`.
   - Use the Foldkit example in
     `registry/base-ui/examples/base-ui-alert-dialog-basic/main.ts` for usage
     and integration snippets.
   - Cite the origin page as compatibility context:
     `https://base-ui.com/react/components/alert-dialog`, but do not copy React
     snippets as implementation.
   - Include coverage rows for the local UI source, example, scene tests,
     generated story, and registry metadata.

   The generated story order for `base-ui-alert-dialog` should match the Avatar
   pilot: `Documentation` first, then the runnable examples.

   This is a verification slice for the registry-wide template. The
   implementation must keep `base-ui-avatar` on the same template path and make
   the generator ready for additional component documentation references without
   per-component renderer forks.

6. **Represent preview and source affordances honestly**

   The shadcn template has `ComponentPreview` and `ComponentSource`. In this
   repo, those affordances must resolve to local OpenStory and source artifacts
   for any component documentation story:

   - Preview links should point to the generated OpenStory example or embed a
     local example view if the current OpenStory API supports that safely.
   - Source panels should show local example/component source snapshots from the
     generated docs output or from a deterministic source extraction helper.
   - If source snapshots are not currently generated for the needed file, add a
     small generator step or document a deferred gap in the reference data.

   Do not add fake "view source" panels with stale hand-copied source.

7. **Test the template at the helper, generator, and browser levels**

   Add or update focused tests so failures point to the correct layer:

   - Display template tests prove heading slugs, anchors, prose classes, local
     primitive mapping, code block rendering, tabs, accordion, and callout
     helpers.
   - `referenceProgram` scene tests prove both Avatar and Alert Dialog render
     through the shared template path and expose the expected sections: header,
     metadata, overview, installation, usage, Foldkit integration, anatomy,
     styling, keyboard interaction, API, accessibility, and coverage.
   - Generator tests prove `base-ui-avatar` and `base-ui-alert-dialog` both get
     documentation stories through the source-driven lookup, and that
     undocumented groups do not import documentation code.
   - A focused Playwright test proves a public OpenStory component
     documentation route renders the shared display template, opens at least
     one local component-driven interactive primitive such as tabs or accordion,
     and exposes source/preview affordances. Use Alert Dialog for this browser
     proof unless another local component has better coverage by implementation
     time.

8. **Update contracts and evidence**

   Update product docs only where the implementation changes the contract:

   - If the display template becomes the canonical Documentation Reference
     renderer, mention it in `docs/product/component-entry-contract.md`.
   - If the OpenStory public docs route adds a new stable e2e selector or source
     panel behavior, record it in `docs/product/docs-surface-guardrails.md`.
   - If the scorecard needs a new evidence line for documentation reference
     breadth, update `docs/product/project-invariants-scorecard.md`.

   Keep the updates specific to the new OpenStory display template and the
   registry-wide documentation contract. Do not turn this plan into broad docs
   cleanup or a requirement to author full reference data for every component in
   one pass.

## Expected final shape

- `src/openstory/documentation/referenceProgram.ts` remains the Foldkit program
  boundary, but most repeated display markup moves into a reusable local
  display template module.
- The display template is the shared renderer for all component Documentation
  stories, not an Alert Dialog-specific renderer.
- The display template uses this repo's local Base UI, local shadcn, or local
  Foldkit registry primitives, never upstream React imports.
- `base-ui-avatar` continues to have a Documentation story.
- `base-ui-alert-dialog` gains a Documentation story built from local component
  source, local example source, and local coverage evidence.
- The OpenStory generator discovers documented components across the registry
  from local source data instead of a hard-coded item-name set.
- Tests prove the shared template, source-driven documentation opt-in, and at
  least one browser-rendered component documentation route.

## STOP conditions

- Stop if the implementation requires React, Next.js, MDX, or upstream
  `@/registry/new-york-v4/**` imports to render the OpenStory documentation
  story.
- Stop if the display template starts depending on Alert Dialog-specific data,
  assumptions, IDs, or renderer branches.
- Stop if local Base UI Alert Dialog source lacks the hooks needed to document
  anatomy or API truthfully. Keep the shared template work, but file a smaller
  component-source follow-up for the Alert Dialog proof.
- Stop if preview/source affordances can only be implemented by hand-copying
  source into docs data. Add deterministic source extraction first or split that
  work into its own plan.
- Stop if adding Alert Dialog documentation requires changing installable
  component APIs. That is component parity work and needs its own focused plan.
- Stop if `bun run openstory:check` reports generated story drift after running
  `bun run openstory:generate`.
- Stop if focused OpenStory e2e tests can only pass by targeting the retired
  legacy docs app.

## Definition of done

- `bun run typecheck` passes.
- `bun run test -- scripts/generate-openstory-stories.test.ts` passes.
- `bun run test -- src/openstory/documentation/referenceProgram.scene.test.ts src/openstory/documentation/apiReference.scene.test.ts src/openstory/documentation/anatomyXray.scene.test.ts` passes, with new coverage proving Avatar and Alert Dialog share the display template.
- `bun run test -- registry/base-ui/ui/base-ui-alert-dialog/base-ui-alert-dialog.scene.test.ts registry/base-ui/examples/base-ui-alert-dialog-basic/base-ui-alert-dialog-basic.scene.test.ts` passes.
- `bun run openstory:generate` has been run and generated story changes are committed.
- `bun run openstory:check` passes.
- `bun run check:registry` passes.
- A focused OpenStory docs browser test passes for a component Documentation
  story using the shared template, with Alert Dialog as the default proof route.
- `bun run build` passes.
- `plans/README.md` marks plan 031 `DONE` only after the verification commands
  above pass and any contract docs touched by the implementation are updated.
