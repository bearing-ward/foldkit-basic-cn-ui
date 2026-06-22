# Plan 021: Pilot component-owned registry hierarchy with OpenStory-only examples

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report -
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 80db3fb1..HEAD -- AGENTS.md README.md package.json index.html vite.config.ts vite.aliases.ts tsconfig.json playwright.config.ts docs/product/component-entry-contract.md docs/product/docs-surface-guardrails.md docs/product/workflow-feature-surfaces.md docs/product/project-invariants-scorecard.md docs/product/base-ui-shadcn-expansion-plan.md scripts/registry-manifest.mjs scripts/build-registry.mjs scripts/build-openstory-site.mjs scripts/generate-openstory-stories.mjs scripts/check-openstory-stories.mjs scripts/check-registry-metadata.mjs scripts/check-primitive-coverage.mjs scripts/check-no-component-classname-api.mjs scripts/check-upstream-reference-contract.mjs scripts/check-shadcn-doc-examples.mjs scripts/check-example-tests.mjs scripts/smoke-public-site.mjs src/entry.ts src/main.ts src/main.story.test.ts src/main.scene.test.ts src/docsExampleRoutes.ts src/docsExamplePreviews*.ts src/docsView.ts src/componentSliceManifest.ts src/componentSliceManifest.test.ts src/newComponentAuthoring.ts src/themePlayground.ts src/preview.ts src/openstory/generated src/openstory/documentation scripts/scaffold-component-slice.ts scripts/generate-openstory-stories.test.ts scripts/scaffold-component-slice.test.ts scripts/generate-registry-project.test.ts scripts/custom-clone-spinout.test.ts scripts/templates/registry-project tests/e2e/docs-shell.spec.ts tests/e2e/docs-surface.spec.ts tests/e2e/interactive-primitives.spec.ts tests/e2e/origin-visual-parity.spec.ts tests/e2e/origin-parity/fixtures.json registry/registry.json registry/shadcn/registry.json registry/shadcn/ui/shadcn-button registry/shadcn/examples plans/README.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: HIGH
- **Depends on**: plans/020-define-project-invariants-scorecard.md
- **Category**: tech-debt
- **Planned at**: commit `80db3fb1`, 2026-06-22
- **Execution note**: A 2026-06-22 execute attempt stopped before legacy docs
  retirement because required Button documentation evidence still exists only in
  `src/docsView.ts`. The migration boundary has since been clarified:
  `src/docsView.ts` may remain temporarily as a reference-only artifact during
  extraction. It must stop being served, tested, or treated as an active docs
  surface in this plan; final deletion can happen after OpenStory references
  cover any content worth preserving.

## Why this matters

The current registry layout is lane-oriented: all shadcn component source lives
under `registry/shadcn/ui/**`, while all shadcn examples live under
`registry/shadcn/examples/**`. That makes individual component ownership harder:
reviewing Button requires jumping between implementation, examples, tests,
metadata, docs evidence, and parity ledgers. A component-owned hierarchy such as
`registry/shadcn/button/**` would make the installable slice easier to audit and
would better match the mental model "registry -> shadcn -> button contains the
Button work."

There is no absolute technical showstopper in the current codebase, because the
public registry already reads explicit `files[].path` values from
`registry/*.json`. The main risks are contract and tooling risks: many scripts
and docs assume top-level `ui` and `examples` folders, public install targets
must remain `src/ui/**` and `src/examples/**`, generated public JSON/OpenStory
files are derived artifacts, and a mass move would create a very large diff that
could hide behavior changes. This plan therefore adds compatibility first and
pilots the hierarchy with `shadcn-button`.

The plan also intentionally retires the hand-rolled docs/example browsing app in
favor of OpenStory as the only docs and example viewing surface. That is part of
the hierarchy migration because keeping the legacy docs app alive would force
every component-owned source move to update two documentation systems: generated
OpenStory stories and the manual `src/docsView.ts` / `src/docsExamplePreviews*.ts`
surface. `src/docsView.ts` may remain temporarily as reference material, but it
must not remain part of the runtime, active navigation, generated build, or
verification contract. Registry example programs, standalone example `entry.ts`
and `index.html` files, source snapshots, and generated public JSON remain
source/public registry contracts; only the custom browsing shell goes away. A
later plan can bulk-migrate the rest only if this pilot proves the checks can
preserve every public contract.

## Invariant Impact

| Invariant | Impact | Expected status/grade change | Evidence to update | Non-goal |
| --- | --- | --- | --- | --- |
| `P2_FOLDKIT_ARCHITECTURE` | Registry examples move paths but must remain Foldkit-native programs. | No grade change expected. | Focused and full Vitest scene tests. | Do not rewrite component architecture. |
| `P3_ORIGIN_IDENTITY` | Source paths change while public item names, origins, lanes, and groups must stay stable. | No grade change expected. | Registry metadata checks and generated OpenStory checks. | Do not rename public registry items. |
| `P5_EXAMPLE_PARITY` | Button examples move under the Button slice; visible content and tests must stay unchanged except import paths. | No grade change expected. | Button example scene tests, origin-content parity guard. | Do not change example behavior or parity claims. |
| `P8_DOC_REFERENCE` | OpenStory becomes the only component docs/example browser, and generated stories must keep the same docs grouping while importing examples from the new source path. | No grade change expected if OpenStory docs retain required reference and example coverage. | `bun run openstory:generate`, `bun run openstory:check`, OpenStory manifest/story smoke. | Do not keep the legacy docs app as a second public docs surface. |
| `P9_GENERATED_ARTIFACTS` | Generated registry JSON, source snapshots, and OpenStory stories must remain current even though source paths and docs surface ownership change. | No grade change expected. | `bun run build:registry`, `bun run check:registry`, public install smoke, public OpenStory site smoke. | Do not hand-edit generated public JSON or OpenStory stories. |
| `P11_PROGRESS_LEDGER` | This plan defines the next migration standard and records why it is safe enough to pilot. | No grade change expected. | `plans/README.md`, this plan. | Do not bulk-migrate all components. |
| `P12_INVARIANT_GOVERNANCE` | If the scorecard baseline is inspected or changed, keep the structural guard green. | No grade change expected. | `bun run check:invariants`. | Do not weaken invariant semantics to make the migration easier. |

## Current state

The current source layout is explicitly lane-oriented. `docs/product/component-entry-contract.md`
defines component source, examples, registry metadata, generated OpenStory
coverage, public JSON, and source snapshots as separate required file areas:

```md
<!-- docs/product/component-entry-contract.md:190-209 -->
Every component entry has a component source slice, at least one example slice,
source registry metadata, generated OpenStory coverage, generated public
artifacts, and tests.

| File Or Area                                      | Required For        | Expectation                                                                 |
| ------------------------------------------------- | ------------------- | --------------------------------------------------------------------------- |
| `registry/{lane}/ui/{name}/index.ts`              | every `registry:ui` | Public component API, exported types, JSDoc, Foldkit view helpers.          |
| `registry/{lane}/ui/{name}/view.ts`               | every styled item   | Class constants, visual helper functions, style-only exports.               |
| `registry/{lane}/ui/{name}/{name}.scene.test.ts`  | every `registry:ui` | Behavior, accessibility, state, style hook, and inert/disabled proof.       |
| `registry/{lane}/examples/{example}/main.ts`      | every example       | Runnable Foldkit example imported by stories and installed by registry.     |
| `src/openstory/generated/{name}.stories.ts`       | every docs item     | Generated OpenStory coverage for the component and installable examples.    |
| `apps/docs/public/sources/{example}.txt`          | every example       | Generated source snapshot used by the source viewer.                        |
| `apps/docs/public/{name}.json`                    | every item          | Generated public registry JSON.                                             |
```

Examples are real Foldkit programs and source snapshots are generated artifacts:

```md
<!-- docs/product/component-entry-contract.md:462-485 -->
Every example under `registry/{lane}/examples/{example}` must be a real Foldkit
example, not a decorative mock.

Required:

- `main.ts` contains pure Foldkit definitions: Model, Message, init, update,
  view, Commands where needed.
- `entry.ts` boots runtime only.
- `index.html` references `entry.ts`.
- Example uses the registry component source directly.
- Source snapshot is generated into `apps/docs/public/sources/{example}.txt`.

Examples must not:

- Hide behavior in docs-only wrappers.
- Depend on untracked global state.
- Use React examples as implementation templates.
- Ship without a `.scene.test.ts`.
```

Generated files are intentionally derived and should not be manually moved or
edited:

```md
<!-- docs/product/component-entry-contract.md:568-580 -->
Generated files are part of the public registry contract.

Required:

- `apps/docs/public/{name}.json` exists and is current.
- `apps/docs/public/{example}.json` exists and is current for every example.
- `apps/docs/public/registry.json` includes the item.
- `apps/docs/public/sources/{example}.txt` exists and matches the example source
  used by the View code widget.
- `bun run check:registry` passes.

Do not manually edit generated registry JSON or source snapshots. Update source
and run `bun run build:registry`.
```

The registry reader already supports explicit source paths through metadata. It
does not require component source files to live under `registry/{lane}/ui/**`:

```js
// scripts/registry-manifest.mjs:20-48
const readRegistryFile = async ({ rootDir, registryPath }) => {
  const absolutePath = path.join(rootDir, registryPath);
  const registry = await readJson(absolutePath);

  const includeItems = await Promise.all(
    (registry.include ?? []).map((includePath) =>
      readRegistryFile({ rootDir, registryPath: includePath })
    )
  );

  return [...(registry.items ?? []), ...includeItems.flat()];
};
```

Public install targets are constrained in `scripts/build-registry.mjs`. This is
the biggest hard boundary: source files may move, but install targets must keep
using app-owned `src/ui/**`, `src/lib/**`, or `src/examples/**` destinations:

```js
// scripts/build-registry.mjs:90-99
const assertTarget = (itemName, target) => {
  const approved =
    target.startsWith("src/ui/") ||
    target.startsWith("src/lib/") ||
    target.startsWith("src/examples/");

  if (!approved) {
    throw new Error(`${itemName} has unsupported target path: ${target}`);
  }
};
```

OpenStory example discovery is currently path-convention based. It scans only
`registry/{lane}/examples/{slug}/main.ts` and renders imports from that path:

```js
// scripts/generate-openstory-stories.mjs:296-305
export const discoverExamples = (rootDir = process.cwd()) => {
  const examples = exampleLanes.flatMap((sourceLane) => {
    const examplesDir = `registry/${sourceLane}/examples`;
    const absoluteExamplesDir = path.join(rootDir, examplesDir);

    if (!existsSync(absoluteExamplesDir)) {
      return [];
    }
```

OpenStory is already the public build path. `package.json` routes `bun run build`
through `scripts/build-openstory-site.mjs`, while the old Vite docs app remains
available through `bun run dev` and `bun run build:legacy-docs`:

```json
// package.json:6-10, 33-36
"dev": "vite --host",
"build": "bun scripts/build-openstory-site.mjs",
"build:legacy-docs": "vite build",
"preview": "openstory preview --out dist",
"openstory": "openstory dev --framework foldkit",
"openstory:build": "openstory build --framework foldkit --out dist",
"openstory:generate": "bun scripts/generate-openstory-stories.mjs",
"openstory:check": "bun scripts/check-openstory-stories.mjs"
```

The public build script already generates OpenStory stories, builds registry
artifacts, builds the OpenStory site, and copies public registry artifacts into
`dist`:

```js
// scripts/build-openstory-site.mjs:35-47
await run("bun", ["run", "openstory:generate"]);
await run("bun", ["run", "build:registry"]);
await run("openstory", [
  "build",
  "--framework",
  "foldkit",
  "--out",
  "dist",
  "--base",
  base,
]);
```

The hand-rolled docs app still owns a separate runtime entry, route model, view,
and generated preview modules. `index.html` boots `src/entry.ts`, and
`src/entry.ts` boots `src/main.ts` plus `src/docsView.ts`:

```ts
// src/entry.ts:1-21
import { Runtime } from "foldkit";

import { view } from "./docsView";
import {
  ChangedUrl,
  ClickedLink,
  Flags,
  Message,
  Model,
  flags,
  init,
  subscriptions,
  update,
} from "app-main";
```

The legacy docs view manually renders example cards and source iframes:

```ts
// src/docsView.ts:4077-4138
type DocsExampleBlockInput = Readonly<{
  title: string;
  description?: string;
  testId: string;
  preview: Html;
  href: string;
  linkText: string;
}>;

const docsExampleBlock = ({
  title,
  description,
  testId,
  preview,
  href,
}: DocsExampleBlockInput): Html => {
  const h = html<Message>();
  const sourceHref = publicPath(exampleSourceHrefByExampleHref()[href] ?? "");
```

Vite and TypeScript aliases are optimized around the legacy docs app:

```ts
// vite.config.ts:127-172
exactChunkGroup("/src/docsView.ts", "docs-view"),
exactChunkGroup("/src/docsExampleRoutes.ts", "docs-example-routes"),
exactChunkGroup(
  "/src/docsExamplePreviewsAccordion.ts",
  "docs-example-previews-accordion"
),
```

Several active checks still target the legacy docs app. For example,
`scripts/check-shadcn-doc-examples.mjs` parses `src/docsView.ts` and fails if
shadcn examples are not declared there:

```js
// scripts/check-shadcn-doc-examples.mjs:8-18, 41-64
const docsViewSource = readFileSync(
  path.join(rootDir, "src/docsView.ts"),
  "utf-8"
);

const hasLiveExampleResolver = (exampleName) =>
  docsViewSource.includes(`M.when("${exampleName}"`) ||
  new RegExp(
    `\\[\\s*"${escapeRegExp(exampleName)}"\\s*,\\s*\\(\\)\\s*=>`,
    "u"
  ).test(docsViewSource);
```

Playwright docs and parity tests also target legacy `/docs/components/**` routes
and `docs-example-block-*` test IDs. Those tests must be rewritten to use
OpenStory manifest entries and story iframe URLs before the legacy app is
removed:

```ts
// tests/e2e/docs-surface.spec.ts:63-118
await page.goto(`/docs/components/${componentName}`);
const firstCodeToggle = page.getByText("View code").first();
await expect(firstCodeToggle).toBeVisible();
await firstCodeToggle.click();
await expect(
  page
    .locator(
      '[data-testid^="docs-example-block-"][data-testid$="-actions"] iframe'
    )
    .first()
).toHaveAttribute("src", /\/sources\/.+\.txt/u);
```

Scaffolding also assumes separate top-level `ui` and `examples` folders:

```ts
// src/componentSliceManifest.ts:78-110
const uiPath = (origin: SliceOrigin, name: string): string =>
  `registry/${origin}/ui/${name}`;

const examplePath = (origin: SliceOrigin, name: string): string =>
  `registry/${origin}/examples/${name}`;

checklistItems: [
  `Create ${uiPath(input.origin, name)}/index.ts`,
  `Create ${uiPath(input.origin, name)}/view.ts`,
  `Create focused scene tests for ${name}`,
  `Create at least one example under ${examplePath(input.origin, `${name}-basic`)}`,
  `Add registry/${input.origin}/registry.json metadata`,
  "Run registry generation for apps/docs/public/components.json and apps/docs/public/{name}.json",
  "Run OpenStory generation and add documentation reference coverage",
  "Run install smoke compatibility before review",
],
```

`registry/shadcn/registry.json` currently defines the `shadcn-button` component
at lines around `907-943`, with files under `registry/shadcn/ui/shadcn-button/**`
and install targets under `src/ui/shadcn-button/**`. Its examples are later
`registry:example` items whose `registryDependencies` include `shadcn-button`
and whose source paths live under `registry/shadcn/examples/shadcn-button-*`.

## Why we might not want this

- **Diff churn and blame churn**: a full migration would move hundreds of files
  and make future archaeology harder unless it is split into a compatibility
  layer, a pilot, and later mechanical migrations.
- **Generated artifacts are not source-of-truth**: public JSON under
  `apps/docs/public/**`, source snapshots, and generated OpenStory stories are
  intentionally derived. Co-locating those as hand-owned component source would
  weaken `P9_GENERATED_ARTIFACTS`.
- **Public install shape must stay app-owned**: users install files into
  `src/ui/**`, `src/lib/**`, and `src/examples/**`. Mirroring
  `registry/shadcn/button/**` into consuming apps would fight the source-owned
  install contract.
- **Path-based scripts are real contracts today**: OpenStory generation,
  OpenStory checks, class API guards, upstream reference checks, scaffold tests,
  legacy docs preview imports, and documentation reference data all encode the
  current split layout.
- **Legacy docs app retirement expands the blast radius**: removing the
  hand-rolled docs/example app touches runtime entrypoints, Vite/TypeScript
  aliases, e2e tests, workflow docs, and guard scripts. It is worth doing only
  if OpenStory becomes the single replacement surface, not if the work leaves a
  half-alive docs app with broken checks.
- **Component boundaries are not always one-to-one**: some examples depend on
  several registry components, and some documentation reference data is shared or
  generated. The hierarchy needs explicit ownership metadata, not only folder
  location.

## Showstopper verdict

No absolute showstopper was found for a component-owned **source** hierarchy if
all of these constraints hold:

- Public registry item names and install URLs stay stable.
- `files[].target` stays under `src/ui/**`, `src/lib/**`, or `src/examples/**`.
- Generated artifacts remain generated, not manually owned component files.
- Discovery and guard scripts read registry metadata instead of hard-coded lane
  folders before any mass move.
- OpenStory replaces the legacy docs/example browser before or during the pilot,
  and all docs/parity checks are mapped to OpenStory stories or public registry
  artifacts.
- The first migration is a pilot with full verification, not a bulk move.

Treat either of these as an absolute stop for this plan:

- The requested hierarchy requires changing consumer install targets to
  `registry/shadcn/button/**` or another non-`src/**` target.
- The requested hierarchy requires making `apps/docs/public/**` or
  `src/openstory/generated/**` hand-edited component-local source instead of
  generated output.
- The OpenStory-only cutover would remove maintainer workflows such as New
  Component Authoring or Theme Playground without an explicit OpenStory
  replacement or an approved deferral.
- Origin parity or public docs checks cannot be mapped from `/docs/components/**`
  and `docs-example-block-*` selectors to stable OpenStory story IDs or public
  registry artifacts.

## Affected application surfaces and effort

This is not only a filesystem move. A quick blast-radius check found 81
non-generated repo files with direct `registry/{lane}/ui/**` or
`registry/{lane}/examples/**` path references. The Button pilot itself affects
16 source registry items: one `registry:ui` item (`shadcn-button`) and 15
`registry:example` items whose `registryDependencies` include `shadcn-button`.
That count is the minimum pilot move set; do not move unrelated components just
because their names contain "button".

| Surface | Effort | What must change | Risk to watch |
| --- | --- | --- | --- |
| Source registry metadata and public registry generation | M for pilot, L for full migration | `registry/shadcn/registry.json`, `registry/registry.json`, `scripts/registry-manifest.mjs`, and `scripts/build-registry.mjs` must keep reading explicit `files[].path` values while preserving public item names, dependencies, and install targets. | Accidentally treating folder location as the source of truth instead of registry metadata. |
| Registry source files and example programs | M for Button pilot, XL for bulk migration | Move `registry/shadcn/ui/shadcn-button/**` and the 15 Button-dependent examples into `registry/shadcn/button/**`; update local imports and scene test paths. | Moving `shadcn-button-group` as a component by accident. The example item `shadcn-button-button-group` currently sources from `registry/shadcn/examples/shadcn-button-group/**`, while `shadcn-button-group` is a separate `registry:ui` component. |
| Legacy docs app retirement | L | Detach `index.html`, `src/entry.ts`, `src/main.ts`, `src/docsView.ts`, `src/docsExampleRoutes.ts`, `src/docsExamplePreviews*.ts`, and `src/main.story.test.ts` / `src/main.scene.test.ts` from the active runtime/test/docs contract. `src/docsView.ts` may remain reference-only until content extraction is complete. | Accidentally leaving the legacy app served/tested, deleting reference material before extraction, or deleting maintainer workflows without replacement. |
| OpenStory generation and generated stories | M | `scripts/generate-openstory-stories.mjs`, `scripts/check-openstory-stories.mjs`, `scripts/generate-openstory-stories.test.ts`, and generated `src/openstory/generated/*.stories.ts` must use metadata-backed source paths while keeping story IDs and grouping stable. | Generated imports update correctly but public story identity drifts. |
| OpenStory/public-site tests and parity fixtures | L | Replace `/docs/components/**` and `docs-example-block-*` assumptions in `tests/e2e/docs-shell.spec.ts`, `tests/e2e/docs-surface.spec.ts`, `tests/e2e/interactive-primitives.spec.ts`, `tests/e2e/origin-visual-parity.spec.ts`, and `tests/e2e/origin-parity/fixtures.json` with OpenStory manifest/story URLs and story-local selectors. | Visual parity or interactive coverage silently disappears because it was tied to legacy docs cards. |
| Guard and audit scripts | M | `scripts/check-no-component-classname-api.mjs`, `scripts/check-upstream-reference-contract.mjs`, `scripts/check-shadcn-doc-examples.mjs`, `scripts/check-example-tests.mjs`, and parity agenda/coverage checks must collect files from registry metadata instead of hard-coded lane folders. | A moved component silently falls out of class-name, upstream-reference, or example-test coverage. |
| Authoring, scaffold, and non-doc workflow surfaces | M | `src/componentSliceManifest.ts`, `src/componentSliceManifest.test.ts`, `scripts/scaffold-component-slice.ts`, `scripts/scaffold-component-slice.test.ts`, registry-project templates/tests, `src/newComponentAuthoring.ts`, `src/themePlayground.ts`, and `docs/product/workflow-feature-surfaces.md` need either OpenStory homes or explicit deferral. | New components keep being scaffolded into the legacy layout, or maintainer tools disappear from public navigation without intent. |
| Public install and consumer smoke surfaces | M | `scripts/smoke-public-install.mjs`, `scripts/smoke-install-all.mjs`, the component registry CLI path handling, and generated public JSON need to prove targets remain `src/ui/**`, `src/lib/**`, or `src/examples/**`. | Source paths move and public install paths accidentally move with them. |
| Docs and governance ledgers | S to M | `docs/product/component-entry-contract.md`, new hierarchy decision docs, `docs/product/project-invariants-scorecard.md`, `plans/README.md`, and recent parity docs may need source-path notes. Historical audit docs can remain historical unless they are used as current gates. | Updating too much historical documentation creates churn; updating too little leaves active standards stale. |
| Origin parity and e2e fixtures | S to M | `tests/e2e/origin-parity/fixtures.json`, visual/content parity specs, and parity review docs should mostly remain item-name based, but any source-path strings need review. | Treating "path-only" as safe while a parity fixture still imports or displays the old source path. |

Expected effort shape:

- Compatibility, OpenStory-only cutover, and discovery layer: large, because
  several scripts and browser checks must stop depending on the legacy docs app
  before files move.
- `shadcn-button` pilot: medium after compatibility lands, but still touches 16
  registry items plus OpenStory/import/test surfaces.
- Full registry migration: extra-large and should be split into later lane or
  component-family plans after the pilot proves the contracts.

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Drift check | `git diff --stat 80db3fb1..HEAD -- <paths from this plan>` | no drift, or only understood drift reconciled before editing |
| Typecheck | `bun run typecheck` | exit 0, no errors |
| Registry checks | `bun run check:registry` | exit 0 |
| OpenStory generation | `bun run openstory:generate` | generated stories current |
| OpenStory check | `bun run openstory:check` | exit 0 |
| Focused generator tests | `bun run test -- scripts/generate-openstory-stories.test.ts scripts/scaffold-component-slice.test.ts src/componentSliceManifest.test.ts` | all tests pass |
| Focused template/clone tests | `bun run test -- scripts/generate-registry-project.test.ts scripts/custom-clone-spinout.test.ts` | all tests pass |
| OpenStory public site smoke | `bun run smoke:public-site` | public OpenStory shell, manifest, known stories, registry JSON, and source snapshots are reachable |
| E2E docs/parity smoke | `bun run test:e2e` or focused OpenStory replacements for docs/parity specs | all retained e2e tests pass against OpenStory/public registry surfaces |
| Focused pilot tests | `bun run test -- registry/shadcn/button/ui/shadcn-button.scene.test.ts` plus every moved Button example scene test | all tests pass |
| Public install smoke | `bun run smoke:public-install` | exit 0 |
| Full tests | `bun run test` | all tests pass |
| Build | `bun run build` | exit 0 |
| Invariants | `bun run check:invariants` | exit 0 |
| Diff hygiene | `git diff --check` | no whitespace errors |

## Scope

**In scope**:

- Add a component-owned hierarchy decision/pilot note:
  `docs/product/component-owned-registry-hierarchy.md`.
- Update `docs/product/component-entry-contract.md` so it allows both the
  legacy split layout and the new component-owned layout during migration.
- Update `docs/product/project-invariants-scorecard.md` only if the pilot changes
  evidence, known gaps, or last-reviewed fields for touched invariants.
- Add or update script helpers so registry/OpenStory/check tooling discovers
  examples and source files from registry metadata rather than hard-coded
  top-level lane folders.
- Update these script and test surfaces as needed:
  - `scripts/generate-openstory-stories.mjs`
  - `scripts/check-openstory-stories.mjs`
  - `scripts/check-registry-metadata.mjs`
  - `scripts/check-primitive-coverage.mjs`
  - `scripts/check-no-component-classname-api.mjs`
  - `scripts/check-upstream-reference-contract.mjs`
  - `scripts/check-shadcn-doc-examples.mjs`
  - `scripts/check-example-tests.mjs`
  - `scripts/generate-openstory-stories.test.ts`
  - `src/componentSliceManifest.ts`
  - `src/componentSliceManifest.test.ts`
  - `scripts/scaffold-component-slice.ts`
  - `scripts/scaffold-component-slice.test.ts`
  - `scripts/generate-registry-project.test.ts`
  - `scripts/custom-clone-spinout.test.ts`
  - `scripts/templates/registry-project/**`
- Retire the hand-rolled docs/example app as a browsing surface and make
  OpenStory the only docs/example viewer. Update these surfaces as needed:
  - `package.json`
  - `README.md`
  - `index.html`
  - `src/entry.ts`
  - `src/main.ts`
  - `src/main.story.test.ts`
  - `src/main.scene.test.ts`
  - `src/docsView.ts`
  - `src/docsExampleRoutes.ts`
  - `src/docsExamplePreviews*.ts`
  - `vite.config.ts`
  - `vite.aliases.ts`
  - `tsconfig.json`
  - `docs/product/docs-surface-guardrails.md`
  - `docs/product/workflow-feature-surfaces.md`
  - `tests/e2e/docs-shell.spec.ts`
  - `tests/e2e/docs-surface.spec.ts`
  - `tests/e2e/interactive-primitives.spec.ts`
  - `tests/e2e/origin-visual-parity.spec.ts`
  - `tests/e2e/origin-parity/fixtures.json`
- Preserve or explicitly replace non-doc maintainer workflows that currently
  live in the docs app, including New Component Authoring and Theme Playground.
- Pilot migrate `shadcn-button` source and all examples whose registry item
  depends on `shadcn-button` into a component-owned source layout.
- Update `registry/shadcn/registry.json` `files[].path` values for the pilot
  while keeping item names, targets, dependencies, metadata, and public URLs
  stable.
- Update direct source imports that break because of the pilot move, including
  generated OpenStory imports after `bun run openstory:generate`,
  OpenStory documentation reference source-path strings that point at moved
  pilot files, and any retained tests or tooling that legitimately still import
  registry example source.
- Regenerate generated outputs only through the repo scripts.
- Update `plans/README.md` status for this plan when done.

**Out of scope**:

- Do not bulk-migrate all registry components in this plan.
- Do not change public registry item names such as `shadcn-button` or
  `shadcn-button-basic`.
- Do not change public install targets away from `src/ui/**`, `src/lib/**`, or
  `src/examples/**`.
- Do not manually edit files under `apps/docs/public/**`; run generation/check
  commands instead.
- Do not make `src/openstory/generated/**` the source of truth. It may continue
  to be generated centrally even if its imports point at component-owned source.
- Do not delete registry example source, example scene tests, generated public
  JSON, or source snapshots as part of removing the legacy docs app. OpenStory
  replaces the browsing surface, not the installable example contract.
- Do not change component behavior, visual styling, origin API parity, or
  example visible content except for import paths required by the move.
- Do not move shared upstream snapshots under a single component unless the
  snapshot is truly component-specific and all upstream reference checks are
  updated.

## Git workflow

- Branch: `codex/021-pilot-component-owned-registry-hierarchy`.
- Commit as one logical unit if the pilot is small enough to review. If the diff
  becomes hard to review, split into:
  1. discovery/contract compatibility,
  2. OpenStory-only docs/example surface cutover,
  3. `shadcn-button` pilot move,
  4. generated artifacts.
- Do not push or open a PR unless the operator explicitly asks.

## Steps

### Step 1: Document the target hierarchy and non-goals

Create `docs/product/component-owned-registry-hierarchy.md`. It must answer the
user's question directly:

- Why a component-owned hierarchy is attractive.
- Why we might not want to do it.
- The showstopper verdict from this plan.
- The approved pilot target shape.
- The distinction between source-of-truth files and generated artifacts.
- The OpenStory-only browsing decision: OpenStory owns component docs/example
  viewing; registry example programs and public registry artifacts remain
  source/public contracts.

Use this target shape for the pilot:

```text
registry/shadcn/button/
  ui/
    index.ts
    view.ts
    shadcn-button.scene.test.ts
  examples/
    basic/
      main.ts
      shadcn-button-basic.scene.test.ts
    secondary/
      main.ts
      shadcn-button-secondary.scene.test.ts
    ...
```

The local example folder names may omit the `shadcn-button-` prefix, but the
registry item names must remain `shadcn-button-*` and the generated public JSON
filenames must remain `shadcn-button-*.json`.

**Verify**:
`rg -n "showstopper|generated artifacts|registry/shadcn/button|install targets|not want" docs/product/component-owned-registry-hierarchy.md`
shows the decision, constraints, and target shape.

### Step 2: Update the component-entry contract for a migration period

Update `docs/product/component-entry-contract.md` so the required-file section
allows both layouts:

- Legacy layout:
  - `registry/{lane}/ui/{name}/index.ts`
  - `registry/{lane}/examples/{example}/main.ts`
- Component-owned layout:
  - `registry/{lane}/{component-key}/ui/index.ts`
  - `registry/{lane}/{component-key}/examples/{example-key}/main.ts`

The contract must state that public registry metadata is still the source of
truth for item names, install targets, dependencies, origins, and generated
output. It must also state that generated artifacts remain generated in
`apps/docs/public/**` and `src/openstory/generated/**`.

Update the docs-surface language in `docs/product/component-entry-contract.md`
and `docs/product/docs-surface-guardrails.md` so OpenStory is no longer merely
the "public" browser alongside a legacy app. The new contract is:

- OpenStory is the only supported component docs/example browsing surface.
- `/__openstory/manifest.json` and `/__story/{story-id}/index.html` are the
  browser contract for examples and reference docs.
- `/components.json`, `/registry.json`, `/{name}.json`, and
  `/sources/{example}.txt` remain public registry/source contracts.
- The old `/docs/components/**`, `/examples/**`, and `docs-example-block-*`
  contracts are retired unless a retained tool explicitly owns a compatibility
  redirect.

**Verify**:
`rg -n "component-owned|registry/\\{lane\\}/\\{component-key\\}|legacy layout|generated artifacts remain generated|OpenStory is the only|/__openstory/manifest.json|/docs/components" docs/product/component-entry-contract.md docs/product/docs-surface-guardrails.md`
shows both source layouts, the generated-artifact boundary, and the OpenStory-only
surface contract.

### Step 3: Add metadata-driven source discovery before moving files

Refactor the discovery code so scripts can handle both source layouts.

Recommended implementation:

- Add a small helper module such as `scripts/registry-source-layout.mjs`.
- It should read registry items with `readSourceRegistryItems` /
  `readSourceRegistryItemsSync`.
- It should expose helpers for:
  - every registry UI source file path from `registry:ui` items,
  - every registry example item,
  - every example entry `main.ts` file from `registry:example` item files,
  - a module import path for generated OpenStory stories based on the actual
    source `main.ts` path, not an assumed folder.
- Keep this helper read-only and deterministic. It must not scan
  `apps/docs/public/**` as source.

Update `scripts/generate-openstory-stories.mjs`:

- Replace filesystem-only `discoverExamples()` with metadata-backed discovery.
- Keep the function name if tests depend on it, but have it return examples from
  `registry:example` metadata.
- Preserve each story's public slug as the registry item `name`, not the local
  folder name.
- Render imports from the actual `main.ts` source path.

Update `scripts/check-openstory-stories.mjs`:

- Stop assuming imports must match
  `../../../registry/{lane}/examples/{slug}/main`.
- Validate generated imports against the metadata-backed example main paths.

Update any focused tests in `scripts/generate-openstory-stories.test.ts` so they
prove both layouts work at the same time.

**Verify**:
`bun run test -- scripts/generate-openstory-stories.test.ts` exits 0 and includes
at least one test where an example item named `shadcn-button-basic` imports from
`registry/shadcn/button/examples/basic/main`.

### Step 4: Make guard scripts layout-neutral

Update hard-coded registry source root scans so the pilot can move files without
losing coverage.

Required changes:

- `scripts/check-no-component-classname-api.mjs` should collect relevant source
  files from registry item `files[].path` values, or from a shared helper, rather
  than only these roots:
  - `registry/base-ui/ui`
  - `registry/shadcn/ui`
  - `registry/foldkit/ui`
  - `registry/ai-elements/ui`
- `scripts/check-upstream-reference-contract.mjs` should not decide Base UI or
  shadcn coverage only by `readdirSync("registry/base-ui/ui")` and
  `readdirSync("registry/shadcn/ui")`. Use registry metadata and
  `meta.foldkit.origin` instead.
- `scripts/check-shadcn-doc-examples.mjs` and
  `scripts/check-example-tests.mjs` should continue to verify example files by
  registry metadata paths, not folder conventions.
- `scripts/check-shadcn-doc-examples.mjs` must stop parsing `src/docsView.ts`.
  Rewrite it around registry metadata, generated OpenStory catalog/story output,
  and `apps/docs/public/sources/{example}.txt`, or remove it only if another
  check in `bun run check:registry` proves the same shadcn example/source/story
  coverage.
- `scripts/check-registry-metadata.mjs` and
  `scripts/check-primitive-coverage.mjs` must not require `src/main.ts` or
  `src/docsView.ts` after the OpenStory cutover.

**Verify**:
`bun run check:no-component-classname-api`, `bun run check:upstream-refs`, and
`bun run check:registry` all exit 0 before moving the pilot files.

### Step 5: Retire the hand-rolled docs/example app in favor of OpenStory

Remove the legacy docs app as a browsing surface now. `src/docsView.ts` may stay
in the repo as a temporary reference artifact while OpenStory documentation
references are backfilled, but it must no longer be served, routed, tested,
imported by active code, or used by guard scripts as proof that documentation is
current.

The first known reference-only extraction target is `shadcn-button`:
`src/docsView.ts` owns `ShadcnButtonDocs`, the Button source snapshot mapping,
Button example list, installation/usage/API material, and Button/Button Group
cross-links, while `src/openstory/documentation/referenceData.ts` currently only
exports the `base-ui-avatar` documentation reference. That gap does not block
this plan if `src/docsView.ts` remains reference-only. Record the gap in
`docs/product/component-owned-registry-hierarchy.md` or
`docs/product/workflow-feature-surfaces.md`, and do not delete `src/docsView.ts`
until the relevant content has either been migrated to OpenStory or explicitly
discarded.

Required changes:

- Change the default local docs command so `bun run dev` opens OpenStory, not the
  legacy Vite app. Keep or remove the existing `openstory` script based on
  whether it remains useful after `dev` changes, but avoid two commands that
  imply two supported docs browsers.
- Remove or retire `build:legacy-docs`.
- Remove or detach `index.html` and `src/entry.ts` if they only boot the legacy
  docs app.
- Remove or detach `src/main.ts`, `src/docsExampleRoutes.ts`,
  `src/docsExamplePreviews*.ts`, `src/main.story.test.ts`, and
  `src/main.scene.test.ts` after replacing every active check they support.
  Keep `src/docsView.ts` only if it is clearly reference-only and excluded from
  runtime entrypoints, TypeScript aliases, generated chunks, active tests, and
  guard scripts.
- Remove `app-main`, `docs-example-routes`, `docs-example-previews-*`, and
  `legacy-ui-views` aliases from `tsconfig.json`, `vite.aliases.ts`, and
  `vite.config.ts` when no retained code imports them.
- Update `tests/e2e/docs-shell.spec.ts`, `tests/e2e/docs-surface.spec.ts`,
  `tests/e2e/interactive-primitives.spec.ts`, `tests/e2e/origin-visual-parity.spec.ts`,
  and `tests/e2e/origin-parity/fixtures.json` to use OpenStory manifest/story
  IDs, `/__story/{story-id}/index.html`, public source snapshots, and story-local
  selectors instead of `/docs/components/**` and `docs-example-block-*`.
- Preserve New Component Authoring and Theme Playground by moving them to
  OpenStory stories or explicitly documenting them as deferred/removable in
  `docs/product/workflow-feature-surfaces.md` and the hierarchy decision doc.
- Update README and product docs so they no longer describe `/docs/components/**`
  as the supported browsing surface.

OpenStory-only does not mean deleting registry examples. Keep `registry/**/examples/**`
programs, `entry.ts`, `index.html`, scene tests, generated source snapshots, and
public example JSON unless a separate registry contract change says otherwise.

**Verify**:

```sh
rg -n "docsExampleBlock|docs-example-block|/docs/components|build:legacy-docs|app-main|docs-example-previews|docs-example-routes|legacy-ui-views" package.json README.md index.html tsconfig.json vite.config.ts vite.aliases.ts src scripts tests docs/product --glob '!src/docsView.ts' --glob '!docs/product/*-v1-coverage-matrix.md' --glob '!docs/product/foldkit-shadcn-registry-plan.md' --glob '!docs/product/component-entry-contract.md' --glob '!docs/product/docs-surface-guardrails.md' --glob '!docs/product/component-owned-registry-hierarchy.md'
bun run openstory:generate
bun run openstory:check
bun run smoke:public-site
bun run test:e2e
```

The `rg` command returns no active-contract references outside intentionally
historical docs. All commands exit 0.

### Step 6: Update authoring/scaffold/template planning to create component-owned slices

Update `src/componentSliceManifest.ts` and `scripts/scaffold-component-slice.ts`
so future scaffolds use the component-owned layout. Keep generated install
targets unchanged.

Target scaffold paths for a shadcn component named `command-menu`:

```text
registry/shadcn/command-menu/ui/index.ts
registry/shadcn/command-menu/ui/view.ts
registry/shadcn/command-menu/ui/command-menu.scene.test.ts
registry/shadcn/command-menu/examples/basic/main.ts
registry/shadcn/command-menu/examples/basic/entry.ts
registry/shadcn/command-menu/examples/basic/index.html
registry/shadcn/command-menu/examples/basic/command-menu-basic.scene.test.ts
```

The scaffold checklist must still say to add/update `registry/{lane}/registry.json`
metadata and run registry/OpenStory checks.

Update `scripts/templates/registry-project/**` and its focused tests if they
would otherwise keep teaching `registry/{lane}/ui/**` and
`registry/{lane}/examples/**` as the only source layout. Keep template public
install targets unchanged.

**Verify**:
`bun run test -- scripts/scaffold-component-slice.test.ts src/componentSliceManifest.test.ts scripts/generate-registry-project.test.ts scripts/custom-clone-spinout.test.ts`
exits 0 and asserts the new component-owned paths or intentional compatibility
paths.

### Step 7: Pilot-migrate `shadcn-button`

Move `shadcn-button` component source:

- From `registry/shadcn/ui/shadcn-button/index.ts`
  to `registry/shadcn/button/ui/index.ts`.
- From `registry/shadcn/ui/shadcn-button/view.ts`
  to `registry/shadcn/button/ui/view.ts`.
- From `registry/shadcn/ui/shadcn-button/shadcn-button.scene.test.ts`
  to `registry/shadcn/button/ui/shadcn-button.scene.test.ts`.

Move every example item whose `registryDependencies` includes `shadcn-button`
under `registry/shadcn/button/examples/{example-key}/`. Use the registry item
name to preserve public identity. As of this plan, the exact pilot example set
is:

- `shadcn-button-as-child`
- `shadcn-button-basic`
- `shadcn-button-button-group`
- `shadcn-button-default`
- `shadcn-button-destructive`
- `shadcn-button-ghost`
- `shadcn-button-icon`
- `shadcn-button-link`
- `shadcn-button-outline`
- `shadcn-button-rounded`
- `shadcn-button-rtl`
- `shadcn-button-secondary`
- `shadcn-button-size`
- `shadcn-button-spinner`
- `shadcn-button-with-icon`

Example path mapping:

- `registry/shadcn/examples/shadcn-button-basic/main.ts`
  becomes `registry/shadcn/button/examples/basic/main.ts`.
- `registry/shadcn/examples/shadcn-button-secondary/main.ts`
  becomes `registry/shadcn/button/examples/secondary/main.ts`.
- The item `shadcn-button-button-group` currently uses source files under
  `registry/shadcn/examples/shadcn-button-group/**`; move that example item
  under the Button slice, but do not move the separate `shadcn-button-group`
  component source in this pilot.

Keep scene test file names stable unless there is a compelling reason to rename
them. Update relative imports inside moved examples so they import the moved
component source directly.

Update `registry/shadcn/registry.json`:

- Change only `files[].path` values for the moved component and example items.
- Keep item `name`, `title`, `description`, `target`, `type`, dependencies,
  devDependencies, registryDependencies, and `meta.foldkit` stable unless a
  path change strictly requires a metadata note.

Update direct imports in OpenStory/source files that point at the old paths.
Expect some imports in:

- `src/openstory/generated/shadcn-button.stories.ts` after regeneration
- source strings in `src/openstory/documentation/referenceData.ts` only if they
  point at moved Button files
- retained e2e fixture/test files only if they still import or display moved
  Button source paths after the OpenStory-only cutover

Do not manually edit generated public JSON or source snapshots.

**Verify**:

```sh
test -f registry/shadcn/button/ui/index.ts
test -f registry/shadcn/button/ui/view.ts
test -f registry/shadcn/button/ui/shadcn-button.scene.test.ts
rg -n "registry/shadcn/(ui/shadcn-button|examples/shadcn-button)" registry/shadcn/registry.json src scripts --glob '!src/openstory/generated/**'
```

The first three commands exit 0. The final `rg` must return no old-path matches
except intentional historical mentions in docs or this plan.

### Step 8: Regenerate derived outputs and verify public stability

Run the normal generation commands:

```sh
bun run build:registry
bun run openstory:generate
```

Then inspect the generated diff:

- `apps/docs/public/shadcn-button.json` must still exist.
- `apps/docs/public/shadcn-button-basic.json` and other moved Button example
  JSON files must still exist under the same public filenames.
- Generated JSON `files[].target` entries must still point under `src/ui/**`,
  `src/lib/**`, or `src/examples/**`.
- Generated JSON `files[].path` entries may point at
  `registry/shadcn/button/**`.
- `src/openstory/generated/shadcn-button.stories.ts` may change imports, but its
  story group and story names must remain stable.

**Verify**:

```sh
bun run build:registry
bun run openstory:check
test -f apps/docs/public/shadcn-button.json
test -f apps/docs/public/shadcn-button-basic.json
rg -n "\"target\": \"src/(ui|lib|examples)/" apps/docs/public/shadcn-button.json apps/docs/public/shadcn-button-basic.json
rg -n "registry/shadcn/button" apps/docs/public/shadcn-button.json src/openstory/generated/shadcn-button.stories.ts
```

All commands exit 0.

### Step 9: Update scorecard evidence if the pilot changes governance facts

If the pilot changes only paths and all public contracts stay green, update
`docs/product/project-invariants-scorecard.md` conservatively:

- Do not raise grades.
- Update `Evidence verified this pass` or `Last reviewed` only for rows actually
  inspected during this plan.
- Keep `P9_GENERATED_ARTIFACTS` `PARTIAL` unless public install smoke and full
  generated artifact checks are run and reviewed.

If the pilot exposes a new known gap, record it in the relevant row and add a
follow-up plan instead of silently accepting the gap.

**Verify**:
`bun run check:invariants` exits 0.

### Step 10: Run full verification and update the plan index

Run:

```sh
git diff --check
bun run typecheck
bun run check:registry
bun run check:upstream-refs
bun run openstory:check
bun run smoke:public-site
bun run smoke:public-install
bun run test:e2e
bun run test
bun run build
bun run check:invariants
```

Then update this plan's row in `plans/README.md` from `TODO` to `DONE`.

**Verify**:

```sh
rg -n "\\| 021 .* DONE" plans/README.md
git status --short
```

The plan row is `DONE`, and `git status --short` shows only intentional files
from this plan.

## Test plan

- Add or update script tests for metadata-backed OpenStory discovery:
  `scripts/generate-openstory-stories.test.ts`.
- Add or update scaffold tests:
  `scripts/scaffold-component-slice.test.ts` and
  `src/componentSliceManifest.test.ts`.
- Add or update OpenStory-only docs/e2e tests:
  - `tests/e2e/docs-shell.spec.ts`
  - `tests/e2e/docs-surface.spec.ts`
  - `tests/e2e/interactive-primitives.spec.ts`
  - `tests/e2e/origin-visual-parity.spec.ts`
  - `tests/e2e/origin-parity/fixtures.json`
- Replace assertions against `/docs/components/**`, `/examples/**`, and
  `docs-example-block-*` with assertions against `/__openstory/manifest.json`,
  `/__story/{story-id}/index.html`, public registry JSON, source snapshots, and
  story-local accessible selectors.
- Run the moved Button component scene test:
  `bun run test -- registry/shadcn/button/ui/shadcn-button.scene.test.ts`.
- Run every moved Button example scene test. Derive the list from
  `registry/shadcn/registry.json` items whose `registryDependencies` includes
  `shadcn-button`.
- Run full `bun run test`.
- Run `bun run test:e2e`.
- Run public OpenStory site smoke with `bun run smoke:public-site`.
- Run public install smoke to prove registry JSON targets still install into the
  same app-owned paths.

## Done criteria

All must hold:

- [ ] `docs/product/component-owned-registry-hierarchy.md` exists and records the
  why-not analysis, OpenStory-only decision, and showstopper verdict.
- [ ] `docs/product/component-entry-contract.md` allows both legacy split layout
  and component-owned layout during migration.
- [ ] `docs/product/component-entry-contract.md` and
  `docs/product/docs-surface-guardrails.md` state that OpenStory is the only
  supported docs/example browser.
- [ ] `package.json` no longer exposes `build:legacy-docs`, and `bun run dev`
  starts OpenStory or another explicitly OpenStory-owned local docs surface.
- [ ] Active runtime source, tests, scripts, TypeScript/Vite aliases, and
  non-historical docs no longer depend on `src/docsView.ts`,
  `src/docsExampleRoutes.ts`, `src/docsExamplePreviews*.ts`, `app-main`,
  `docs-example-previews-*`, `docs-example-routes`, or `legacy-ui-views`.
  `src/docsView.ts` may remain only as a clearly documented reference artifact.
- [ ] Any retained New Component Authoring or Theme Playground workflow has an
  OpenStory surface, or its removal/deferral is recorded in
  `docs/product/workflow-feature-surfaces.md`.
- [ ] Browser/e2e tests use OpenStory story URLs, manifest data, public registry
  artifacts, source snapshots, and story-local selectors instead of
  `/docs/components/**` and `docs-example-block-*`.
- [ ] OpenStory example discovery uses registry metadata paths and supports both
  layouts.
- [ ] Guard scripts still cover moved component-owned source files.
- [ ] Future scaffolds create component-owned source paths while preserving
  public install targets.
- [ ] `shadcn-button` component source lives under `registry/shadcn/button/ui/**`.
- [ ] Every `shadcn-button` example item lives under
  `registry/shadcn/button/examples/**`.
- [ ] Public registry item names and generated public JSON filenames are
  unchanged.
- [ ] Public registry install targets remain under `src/ui/**`, `src/lib/**`, or
  `src/examples/**`.
- [ ] No generated public JSON or source snapshot is manually edited.
- [ ] `git diff --check` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run check:upstream-refs` exits 0.
- [ ] `bun run openstory:check` exits 0.
- [ ] `bun run smoke:public-site` exits 0.
- [ ] `bun run smoke:public-install` exits 0.
- [ ] `bun run test:e2e` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run build` exits 0.
- [ ] `bun run check:invariants` exits 0.
- [ ] `plans/README.md` status row for plan 021 is updated.

## STOP conditions

Stop and report back instead of improvising if:

- The requested hierarchy requires changing public install targets away from
  `src/ui/**`, `src/lib/**`, or `src/examples/**`.
- The requested hierarchy requires hand-owning generated files under
  `apps/docs/public/**` or `src/openstory/generated/**`.
- The moved pilot cannot keep public item names and public JSON filenames stable.
- A script cannot be made layout-neutral without dropping coverage for legacy
  components.
- `src/docsView.ts` remains connected to runtime entrypoints, active navigation,
  TypeScript/Vite aliases, active tests, guard scripts, or generated build output
  instead of being either deleted or kept as a reference-only artifact.
- Removing or detaching legacy runtime/view files would also remove non-doc
  workflows such as New Component Authoring or Theme Playground without an
  explicit OpenStory replacement or approved deferral.
- Origin parity, visual parity, or interactive e2e tests still require
  `/docs/components/**` or `docs-example-block-*` and cannot be mapped to stable
  OpenStory story IDs/selectors.
- `bun run check:registry` cannot be made independent of the legacy docs app
  without weakening `P8_DOC_REFERENCE` or `P9_GENERATED_ARTIFACTS` evidence.
- OpenStory generation cannot import examples from registry metadata paths while
  keeping story IDs stable.
- Public install smoke fails because generated JSON no longer installs the same
  target files.
- Verification fails twice after a reasonable fix attempt.
- The pilot requires behavior, visual, API, or parity changes unrelated to the
  path migration.

## Maintenance notes

- If this pilot succeeds, write a follow-up plan for bulk migration by lane or
  by component family. Do not infer that success means every component can move
  safely in one commit.
- Reviewers should scrutinize generated JSON and source snapshot diffs. Path
  changes are expected; public names, targets, dependencies, and visible example
  behavior should stay stable.
- Keep using registry metadata as the source of truth. Folder hierarchy should
  make ownership easier, not become an implicit replacement for metadata.
- For generated OpenStory files, co-location means the source example lives with
  its component; the generated story module may remain under
  `src/openstory/generated` as a build artifact.
