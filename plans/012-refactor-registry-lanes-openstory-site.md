# Plan 012: Refactor registry lanes and ship OpenStory as the public site

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report; do
> not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 87505180..HEAD -- registry scripts package.json bun.lock vite.config.ts .github/workflows/pages.yml README.md docs/product/component-entry-contract.md docs/product/docs-surface-guardrails.md src/preview.ts src/openstory/generated plans/012-refactor-registry-lanes-openstory-site.md plans/README.md`
>
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding. On a mismatch that
> changes the registry source contract, public registry URL contract, OpenStory
> build contract, or verification commands, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: HIGH
- **Depends on**: plans/009-add-generated-openstory-registry-catalog.md
- **Category**: migration
- **Planned at**: commit `87505180`, 2026-06-18

## Why this matters

Foldkit CN currently keeps all component libraries in one source namespace under
`registry/default/ui` and all examples under `registry/default/examples`. That
worked while the custom Foldkit docs app was the primary browsing surface, but it
now hides the product lanes that matter: Foldkit, Base UI, shadcn, and AI
Elements.

This migration should make the source tree library-oriented while keeping the
install surface shadcn-compatible. The public site should become a static
OpenStory build generated from runnable registry examples, and the public
registry should become a flat shadcn registry directory at the site root:
`/registry.json`, `/{name}.json`, and `/components.json`. This is an intentional
breaking change from the old `/r/{name}.json` URLs.

## Current state

Relevant files and roles:

- `registry/default/items.json` - single source registry item array for every
  lane and example.
- `registry/default/ui/*` - all installable UI source folders, regardless of
  origin.
- `registry/default/examples/*` - all runnable example apps, regardless of
  origin.
- `registry/config.json` - registry name, homepage, and current `/r` registry
  base URL.
- `registry/templates/components.json` - generated shadcn `components.json`
  alias template.
- `scripts/build-registry.mjs` - builds public registry JSON into
  `apps/docs/public/r` and generates `apps/docs/public/components.json`.
- `scripts/generate-openstory-stories.mjs` - discovers examples from
  `registry/default/examples` and writes generated CSF files into
  `src/openstory/generated`.
- `scripts/check-openstory-stories.mjs` - guardrail for generated OpenStory
  story imports.
- `vite.config.ts` - Vite config for the existing Foldkit docs app and
  OpenStory plugin.
- `.github/workflows/pages.yml` - GitHub Pages workflow; currently builds the
  Foldkit docs app with `bun run build`.
- `scripts/smoke-public-site.mjs` - public site smoke test for old docs routes
  such as `/docs/components/{component}`.
- `scripts/smoke-public-install.mjs` - public registry install smoke test using
  shadcn CLI.
- `README.md` - public install and self-hosting documentation.
- `docs/product/component-entry-contract.md` - canonical component-entry
  contract. Update it when the source layout changes.

Current registry item shape:

```json
// registry/default/items.json:1-36
[
  {
    "name": "ai-elements-attachments",
    "type": "registry:ui",
    "title": "Attachments",
    "description": "Foldkit-native AI Elements attachments component for files, media, and source documents.",
    "dependencies": ["effect", "foldkit"],
    "devDependencies": ["vitest"],
    "registryDependencies": [],
    "files": [
      {
        "path": "registry/default/ui/ai-elements-attachments/index.ts",
        "target": "src/ui/ai-elements-attachments/index.ts",
        "type": "registry:ui"
      }
    ],
    "meta": {
      "foldkit": {
        "component": "Attachments",
        "origin": "https://elements.ai-sdk.dev/components/attachments"
      }
    }
  }
]
```

Current public registry config:

```json
// registry/config.json:1-5
{
  "name": "foldkit-cn",
  "homepage": "https://bearing-ward.github.io/foldkit-basic-cn-ui",
  "registryBaseUrl": "https://bearing-ward.github.io/foldkit-basic-cn-ui/r"
}
```

Current shadcn `components.json` alias template:

```json
// registry/templates/components.json:1-27
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "css": "src/styles.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "ui": "@/src/ui",
    "lib": "@/src/lib"
  },
  "registries": {
    "@foldkit-cn": "{{registryBaseUrl}}/{name}.json"
  }
}
```

Current registry builder hard-codes the old source and output layout:

```js
// scripts/build-registry.mjs:4-17
const rootDir = path.resolve(import.meta.dirname, "..");
const itemsPath = path.join(rootDir, "registry/default/items.json");
const configPath = path.join(rootDir, "registry/config.json");
const componentsOutputPath = path.join(
  rootDir,
  "apps/docs/public/components.json"
);
const outputDir = path.join(rootDir, "apps/docs/public/r");
const itemSchemaUrl = "https://ui.shadcn.com/schema/registry-item.json";
const registrySchemaUrl = "https://ui.shadcn.com/schema/registry.json";
```

It also already has important compatibility behavior that must survive:

```js
// scripts/build-registry.mjs:172-185
const sourceItems = await readJson(itemsPath);
const sourceItemNames = new Set(sourceItems.map((item) => item.name));
const qualifyRegistryDependency = (dependency) => {
  if (
    dependency.startsWith("@") ||
    dependency.startsWith("http://") ||
    dependency.startsWith("https://") ||
    !sourceItemNames.has(dependency)
  ) {
    return dependency;
  }

  return `@foldkit-cn/${dependency}`;
};
```

Current OpenStory generator hard-codes old example and metadata paths:

```js
// scripts/generate-openstory-stories.mjs:12-18
export const generatedHeader =
  "// Generated by scripts/generate-openstory-stories.mjs. Do not edit by hand.";

const examplesDir = "registry/default/examples";
const generatedDir = "src/openstory/generated";
const itemsPath = "registry/default/items.json";
```

The generator emits story imports from the old examples directory:

```js
// scripts/generate-openstory-stories.mjs:282-288
group.stories.push({
  exportName: pascalCase(storyName),
  importName: `${pascalCase(slug)}Example`,
  modulePath: `../../../${examplesDir}/${slug}/main`,
  name: storyName,
  slug,
});
```

The current generated OpenStory files import from `registry/default/examples`:

```ts
// src/openstory/generated/base-ui-accordion.stories.ts:1-8
// Generated by scripts/generate-openstory-stories.mjs. Do not edit by hand.
import type { Meta, StoryObj } from "openstory/foldkit"

import * as AccordionBasicExample from "../../../registry/default/examples/base-ui-accordion-basic/main"
import * as AccordionMultipleExample from "../../../registry/default/examples/base-ui-accordion-multiple/main"

const meta = {
  title: "base-ui/Accordion",
} satisfies Meta
```

Current package scripts:

```json
// package.json:5-28
"scripts": {
  "dev": "vite --host",
  "build": "vite build",
  "build:registry": "bun scripts/build-registry.mjs",
  "check:registry": "bun scripts/build-registry.mjs --check && bun scripts/check-registry-order.mjs && bun scripts/check-registry-metadata.mjs && bun scripts/check-example-tests.mjs && bun scripts/check-openstory-stories.mjs && bun scripts/check-primitive-coverage.mjs && bun scripts/check-shadcn-doc-examples.mjs && bun scripts/check-origin-content-parity-agenda.mjs",
  "preview": "vite preview",
  "openstory": "openstory dev --framework foldkit",
  "openstory:generate": "bun scripts/generate-openstory-stories.mjs",
  "openstory:check": "bun scripts/check-openstory-stories.mjs"
}
```

Current Vite config includes the OpenStory plugin, points `publicDir` at the
generated registry assets, and chunks old docs/example paths:

```ts
// vite.config.ts:106-113
export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/foldkit-basic-cn-ui/" : "/",
  resolve: {
    alias: optimizedSourceAliases,
  },
  plugins: [tailwindcss(), foldkit({ devToolsMcpPort: 9988 }), openstory({ framework: "foldkit" })],
  publicDir: "apps/docs/public",
  build: {
```

Current GitHub Pages workflow builds the old Foldkit docs app:

```yaml
# .github/workflows/pages.yml:31-49
- name: Build registry
  run: bun run build:registry

- name: Check registry
  run: bun run check:registry

- name: Build docs
  run: bun run build
  env:
    GITHUB_PAGES: "true"

- name: Add SPA fallback
  run: cp dist/index.html dist/404.html
```

The current public README documents the old `/r` URL shape:

```md
<!-- README.md:42-60 -->
## Public Registry

Docs and registry JSON are served from GitHub Pages:

https://bearing-ward.github.io/foldkit-basic-cn-ui/

Registry item URL format:

https://bearing-ward.github.io/foldkit-basic-cn-ui/r/{name}.json

Published registry config:

https://bearing-ward.github.io/foldkit-basic-cn-ui/components.json
```

OpenStory supports the static site target needed for this migration:

```text
// ../openstory/packages/openstory/README.md:105-113
openstory dev        start the dev server
openstory build      build a static deployable site
openstory preview    serve the built site
openstory generate   generate CSF 3 stories for components
openstory list       print manifest (--json for raw)
openstory inspect    print details for one story (--json for raw)
```

OpenStory build accepts `--out`, `--base`, and `--framework`:

```ts
// ../openstory/packages/openstory/src/cli/run.ts:122-147
program
  .command("build")
  .description("build a static deployable site")
  .option("--out <dir>", "output directory", "dist")
  .option("--base <base>", "public base path", "/")
  .option("--framework <framework>", "react|foldkit|solid|vue|svelte (auto-detected by default)")
```

Component-entry contract facts to preserve:

```md
<!-- docs/product/component-entry-contract.md:42-63 -->
Each `registry:ui` item must declare its upstream reference in
`meta.foldkit.origin`.

Base UI and shadcn slices should steal Foldkit behavior when a Foldkit primitive
or Foldkit-native implementation already exists. Base UI remains the simple
styled or unstyled lane. shadcn remains the opinionated styled lane and
example-parity target.
```

```md
<!-- docs/product/component-entry-contract.md:74-89 -->
Base UI and shadcn style-lane components must always use an explicit origin
prefix, even when there is no overlap today:

- `registry/default/ui/base-ui-{name}`
- `registry/default/ui/shadcn-{name}`
- `registry/default/examples/base-ui-{name}-{example}`
- `registry/default/examples/shadcn-{name}-{example}`
- `/r/base-ui-{name}.json`
- `/r/shadcn-{name}.json`
```

This plan intentionally changes the folder and URL examples in that contract.
The prefix rule remains; the concrete `registry/default/...` and `/r/...` paths
must be updated.

shadcn registry conventions to preserve:

- The source registry may use a root `registry.json` with `include` entries for
  explicit child `registry.json` files.
- The published install surface should stay flat: `/registry.json` plus
  `/{name}.json` item payloads.
- Public `registry.json` item entries must not include embedded file `content`.
- Public `/{name}.json` item payloads should include file `content`.
- `components.json` must keep a `registries` pattern with `{name}` so
  `shadcn add @foldkit-cn/name` resolves.
- Bare `registryDependencies` such as `"button"` mean upstream shadcn registry
  dependencies; same-registry Foldkit CN dependencies must be namespaced as
  `@foldkit-cn/name` or expressed as URLs.

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Install deps | `bun install --frozen-lockfile` | exit 0; lockfile unchanged unless package scripts/deps intentionally changed |
| Generate OpenStory stories | `bun run openstory:generate` | exit 0; generated story imports point at the new library example folders |
| Check OpenStory stories | `bun run openstory:check` | exit 0; reports the discovered story count |
| Registry build | `bun run build:registry` | exit 0; writes `apps/docs/public/registry.json`, `apps/docs/public/{name}.json`, and `apps/docs/public/components.json` |
| Registry aggregate | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0; no TypeScript errors |
| Tests | `bun run test` | exit 0 |
| Lint | `bun run lint` | exit 0 |
| OpenStory site build | `bun run build` | exit 0; writes OpenStory shell, stories, registry JSON, and `404.html` into `dist` |
| Static preview | `bun run preview -- --port 4173` | serves `dist` on localhost |
| Public site smoke | `PUBLIC_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-site` | exit 0; validates OpenStory manifest, story HTML, and registry JSON |
| Install smoke | `PUBLIC_REGISTRY_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-install` | exit 0; shadcn CLI installs one URL item and one `@foldkit-cn` item |

## Suggested executor toolkit

- Read the official shadcn registry docs before changing the public JSON shape:
  - `https://ui.shadcn.com/docs/registry/registry-json`
  - `https://ui.shadcn.com/docs/registry/registry-item-json`
  - `https://ui.shadcn.com/docs/registry/registry-index`
  - `https://ui.shadcn.com/docs/registry/namespace`
- Do not use OpenStory `--components` for this migration. Foldkit CN already has
  runnable example programs; generated CSF files from `registry/*/examples/*`
  should remain the visual catalog source of truth.

## Scope

**In scope**:

- `registry/registry.json` (create root source registry).
- `registry/foldkit/registry.json` (create).
- `registry/base-ui/registry.json` (create).
- `registry/shadcn/registry.json` (create).
- `registry/ai-elements/registry.json` (create).
- `registry/foldkit/ui/**`, `registry/base-ui/ui/**`, `registry/shadcn/ui/**`,
  `registry/ai-elements/ui/**` (move existing component source folders).
- `registry/foldkit/examples/**`, `registry/base-ui/examples/**`,
  `registry/shadcn/examples/**`, `registry/ai-elements/examples/**` (move
  existing example source folders).
- `registry/config.json`.
- `registry/templates/components.json`.
- `scripts/build-registry.mjs`.
- `scripts/check-registry-order.mjs`.
- `scripts/check-registry-metadata.mjs`.
- `scripts/check-example-tests.mjs`.
- `scripts/check-openstory-stories.mjs`.
- `scripts/check-primitive-coverage.mjs`.
- `scripts/check-shadcn-doc-examples.mjs`.
- `scripts/check-origin-content-parity-agenda.mjs`.
- `scripts/generate-openstory-stories.mjs`.
- `scripts/generate-openstory-stories.test.ts`.
- `scripts/smoke-public-site.mjs`.
- `scripts/smoke-public-install.mjs`.
- `scripts/smoke-install-all.mjs`.
- `scripts/serve-registry.ts` and `scripts/serve-registry.test.ts`.
- `scripts/generate-registry-project.ts` and its tests.
- `scripts/component-registry-cli.ts`.
- `scripts/build-openstory-site.mjs` (create).
- `package.json` and `bun.lock`.
- `vite.config.ts`.
- `.github/workflows/pages.yml`.
- `README.md`.
- `docs/product/component-entry-contract.md`.
- `docs/product/docs-surface-guardrails.md`.
- `src/preview.ts`.
- `src/openstory/generated/**`.
- `plans/README.md` status row for this plan.

**Out of scope**:

- Do not change Foldkit component behavior, example behavior, or public component
  APIs except for import paths required by moving files.
- Do not rewrite component styling, parity content, accessibility behavior, or
  scene test expectations.
- Do not rename registry item `name` values in this plan. Folder layout and
  public URL shape are already breaking; item renames should be a separate
  alias/deprecation plan if still desired later.
- Do not delete the old Foldkit docs app source (`src/main.ts`, `src/docsView.ts`,
  `src/docsExamplePreviews*.ts`, route tests) in this plan unless it blocks
  typecheck after the production build stops using it. Shipping OpenStory as the
  public site is the goal; deleting the old docs implementation is follow-up
  cleanup.
- Do not remove source snapshots under `apps/docs/public/sources` unless every
  script/test that references them is updated or removed in the same step.
- Do not change `../openstory` or vendored dependencies.

## Git workflow

- Branch: `codex/012-registry-lanes-openstory-site`.
- Commit message style: match recent imperative history, for example
  `refactor registry lanes and openstory site`.
- Prefer commits by migration phase: manifest reader, source moves, OpenStory
  build, smoke/docs updates.
- Do not push or open a PR unless the operator explicitly asks.

## Steps

### Step 1: Add a manifest reader for shadcn-style included source registries

Create a shared manifest utility, either inside `scripts/build-registry.mjs` or
as `scripts/registry-manifest.mjs`, that can read this new source shape:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "foldkit-cn",
  "homepage": "https://bearing-ward.github.io/foldkit-basic-cn-ui",
  "include": [
    "foldkit/registry.json",
    "base-ui/registry.json",
    "shadcn/registry.json",
    "ai-elements/registry.json"
  ]
}
```

Requirements:

- Includes must be relative paths to explicit `registry.json` files. Do not
  support folder shorthand.
- Child registries contain an `items` array in shadcn registry format.
- Flatten included child items in include order.
- Reject duplicate item names with a clear error.
- Preserve every existing item field, including `meta.foldkit`.
- Preserve the existing same-registry dependency qualification behavior:
  unqualified dependencies that match a Foldkit CN item name become
  `@foldkit-cn/{name}` in generated public item payloads and public
  `registry.json`.
- Leave already namespaced, URL, HTTP(S), and unknown dependencies unchanged.

Add focused tests in `scripts/generate-openstory-stories.test.ts` or a new
script test file if the current test layout is cleaner. Cover:

- root include flattening.
- duplicate name failure.
- same-registry dependency qualification.
- bare unknown dependencies remaining bare.

**Verify**: `bun run test -- scripts` -> exit 0 for the script tests.

### Step 2: Create lane registries and move source folders by origin

Create these source registries:

- `registry/registry.json`
- `registry/foldkit/registry.json`
- `registry/base-ui/registry.json`
- `registry/shadcn/registry.json`
- `registry/ai-elements/registry.json`

Move each `registry/default/items.json` item into exactly one child registry by
`meta.foldkit.origin`:

- `https://foldkit.dev/` -> `registry/foldkit/registry.json`
- `https://base-ui.com/` -> `registry/base-ui/registry.json`
- `https://ui.shadcn.com/` -> `registry/shadcn/registry.json`
- `https://elements.ai-sdk.dev/` -> `registry/ai-elements/registry.json`

For `registry:example` items, use `meta.foldkit.origin` when present. If an
example item does not have an origin, place it in the same lane as its
`registryDependencies` component when that dependency is unambiguous. If neither
rule is enough, STOP and report the item names; do not guess.

Move files to this layout and update every item `files[].path`:

```text
registry/foldkit/ui/{name}/...
registry/foldkit/examples/{example}/...
registry/base-ui/ui/{name}/...
registry/base-ui/examples/{example}/...
registry/shadcn/ui/{name}/...
registry/shadcn/examples/{example}/...
registry/ai-elements/ui/{name}/...
registry/ai-elements/examples/{example}/...
```

Preserve every `files[].target` value. The installed file locations such as
`src/ui/shadcn-button/index.ts` and `src/examples/{example}/main.ts` are the
consumer contract and must not change in this plan.

After the move, delete `registry/default/items.json` and remove empty
`registry/default` directories only when no source file still references them.

**Verify**:

- `rg "registry/default" registry scripts src/openstory/generated` -> expected:
  no matches except this plan file, older historical plans, or intentionally
  documented legacy references in README/docs that will be updated in later
  steps.
- `bun run build:registry -- --check` is not a valid command for this repo; use
  `bun run build:registry` after Step 3 when the builder knows the new source
  layout.

### Step 3: Change public registry output to flat shadcn registry files

Update `scripts/build-registry.mjs` to read `registry/registry.json` instead of
`registry/default/items.json`.

Change generated output from:

```text
apps/docs/public/r/index.json
apps/docs/public/r/{name}.json
apps/docs/public/components.json
```

to:

```text
apps/docs/public/registry.json
apps/docs/public/{name}.json
apps/docs/public/components.json
```

Public `registry.json` requirements:

- `$schema` is `https://ui.shadcn.com/schema/registry.json`.
- `name` and `homepage` come from `registry/config.json`.
- `items` is flat.
- `items[].files` must omit `content`.
- Items with `meta.foldkit.public === false` must still be excluded from the
  public index, matching current behavior.

Public `{name}.json` requirements:

- `$schema` is `https://ui.shadcn.com/schema/registry-item.json`.
- It includes the full item payload.
- `files[].content` is embedded from the source file.
- `registryDependencies` are qualified with the same behavior as the current
  builder.

Update `registry/config.json` so `registryBaseUrl` no longer contains `/r`:

```json
{
  "name": "foldkit-cn",
  "homepage": "https://bearing-ward.github.io/foldkit-basic-cn-ui",
  "registryBaseUrl": "https://bearing-ward.github.io/foldkit-basic-cn-ui"
}
```

Keep `registry/templates/components.json` using:

```json
"registries": {
  "@foldkit-cn": "{{registryBaseUrl}}/{name}.json"
}
```

Delete stale generated files under `apps/docs/public/r` as part of the migration.

**Verify**:

- `bun run build:registry` -> exit 0; prints the number of built registry items.
- `test -f apps/docs/public/registry.json` -> exit 0.
- `test -f apps/docs/public/button.json` -> exit 0.
- `test ! -e apps/docs/public/r/index.json` -> exit 0.
- `bun run check:registry` -> exit 0 after later steps update all check scripts.

### Step 4: Update every registry guardrail script for lane registries

Update scripts that currently read `registry/default/items.json` or assume
`registry/default/ui` / `registry/default/examples`:

- `scripts/check-registry-order.mjs`
- `scripts/check-registry-metadata.mjs`
- `scripts/check-example-tests.mjs`
- `scripts/check-primitive-coverage.mjs`
- `scripts/check-shadcn-doc-examples.mjs`
- `scripts/check-origin-content-parity-agenda.mjs`
- `scripts/smoke-install-all.mjs`
- `scripts/smoke-public-install.mjs`
- `scripts/serve-registry.ts`
- `scripts/serve-registry.test.ts`
- `scripts/component-registry-cli.ts`
- `scripts/generate-registry-project.ts`
- `scripts/scaffold-component-slice.ts`
- related tests for the scripts above.

Use the shared manifest reader from Step 1 rather than duplicating JSON parsing.

Guardrail expectations after this step:

- Registry order checks still enforce deterministic ordering. Apply ordering
  within each child registry and, if practical, validate the root include order:
  `foldkit`, `base-ui`, `shadcn`, `ai-elements`.
- Metadata checks derive docs/library groups from `meta.foldkit.origin`, not
  source folder names.
- Example test checks find every `registry:example` item's `.scene.test.ts`
  through `files[].path`, not by scanning `registry/default/examples`.
- Public install smokes use root item URLs:
  `https://bearing-ward.github.io/foldkit-basic-cn-ui/button.json`.
- Local server smokes serve and validate `/components.json`,
  `/registry.json`, and `/{name}.json`.

**Verify**:

- `rg "registry/default" scripts` -> expected: no matches except deliberate
  compatibility comments in tests.
- `bun run test -- scripts` -> exit 0.
- `bun run check:registry` -> exit 0.

### Step 5: Update OpenStory generation for lane example folders

Update `scripts/generate-openstory-stories.mjs` so example discovery is driven by
registry metadata and/or lane example directories instead of a single
`registry/default/examples` directory.

Requirements:

- Discover all runnable example folders under:
  - `registry/foldkit/examples/*/main.ts`
  - `registry/base-ui/examples/*/main.ts`
  - `registry/shadcn/examples/*/main.ts`
  - `registry/ai-elements/examples/*/main.ts`
- Read registry item metadata from the new included source registry.
- Keep existing story grouping semantics:
  - `base-ui-*` examples render under titles like `base-ui/Accordion`.
  - `shadcn-*` examples render under titles like `shadcn/Button`.
  - Foldkit examples render under `registry/{Component}` unless you decide to
    update the lane title to `foldkit/{Component}` consistently in generator
    tests and docs.
  - AI Elements examples render under `ai-elements/{Component}`.
- Generated `modulePath` values must point at the new lane source paths.
- Keep duplicate story id detection in `scripts/check-openstory-stories.mjs`.
- Update `scripts/generate-openstory-stories.test.ts` fixtures and assertions.
- Run `bun run openstory:generate` and commit updated generated files under
  `src/openstory/generated`.

**Verify**:

- `bun run openstory:generate` -> exit 0.
- `bun run openstory:check` -> exit 0.
- `rg "registry/default/examples" src/openstory/generated` -> no matches.
- `bun run test -- scripts/generate-openstory-stories.test.ts` -> exit 0.

### Step 6: Build the public site with OpenStory instead of the Foldkit docs app

Create `scripts/build-openstory-site.mjs` and update package scripts so the
public `build` command builds the OpenStory static site.

Required behavior for `scripts/build-openstory-site.mjs`:

1. Run or require the equivalent of `bun run openstory:generate` so generated
   stories are current before static build.
2. Run `bun run build:registry` so `apps/docs/public` contains current
   `registry.json`, `{name}.json`, and `components.json`.
3. Compute base path:
   - if `GITHUB_PAGES === "true"`, use `/foldkit-basic-cn-ui/`.
   - otherwise use `/`.
4. Run `openstory build --framework foldkit --out dist --base <base>`.
5. Copy every file from `apps/docs/public` into `dist` after OpenStory build,
   preserving subdirectories such as `sources`.
6. Copy `dist/index.html` to `dist/404.html` for GitHub Pages SPA fallback.

Update package scripts:

```json
"build": "bun scripts/build-openstory-site.mjs",
"preview": "openstory preview --out dist",
"openstory:build": "openstory build --framework foldkit --out dist",
"openstory": "openstory dev --framework foldkit",
"openstory:generate": "bun scripts/generate-openstory-stories.mjs",
"openstory:check": "bun scripts/check-openstory-stories.mjs"
```

If keeping a local build path for the old Foldkit docs app is useful during the
migration, add a separate script such as `"build:legacy-docs": "vite build"`.
Do not keep GitHub Pages using the legacy docs app.

Update `vite.config.ts`:

- Replace `registry/default/examples` chunk detection with lane-aware detection
  for `registry/{foldkit,base-ui,shadcn,ai-elements}/examples`.
- Replace `registry/default/ui/` chunk group with lane-aware UI paths or a
  broader `registry/` grouping.
- Keep `openstory({ framework: "foldkit" })`.
- Keep `publicDir: "apps/docs/public"` unless the explicit copy in
  `build-openstory-site.mjs` makes it redundant. If redundant, keep the explicit
  copy as the source of truth and document why.

Update `.github/workflows/pages.yml`:

- Keep install, typecheck, registry check, lint, and test gates.
- Replace the old "Build docs" semantics with "Build OpenStory site".
- Remove the standalone `cp dist/index.html dist/404.html` step if the build
  script now does it. If you keep the workflow step instead, do not also do it in
  the script.
- Keep the artifact upload path as `dist`.

**Verify**:

- `bun run build` -> exit 0; output includes OpenStory shell and static stories.
- `test -f dist/__openstory/manifest.json` -> exit 0.
- `test -f dist/registry.json` -> exit 0.
- `test -f dist/components.json` -> exit 0.
- `test -f dist/button.json` -> exit 0.
- `test -f dist/404.html` -> exit 0.

### Step 7: Replace public smoke tests with OpenStory and flat registry checks

Update `scripts/smoke-public-site.mjs`.

It should no longer visit `/docs/components/{component}` or assert old docs
section headings. Instead, it should validate:

- `GET /` returns HTML.
- `GET /__openstory/manifest.json` returns JSON with at least one story.
- The manifest includes a known generated story id, such as
  `base-ui-accordion--basic`.
- `GET /__story/base-ui-accordion--basic/index.html` returns HTML.
- `GET /components.json` returns JSON.
- `GET /registry.json` returns JSON.
- `GET /button.json` returns JSON.
- A representative source snapshot such as `/sources/slider-basic.txt` still
  returns text if source snapshots remain published.
- Browser smoke opens `/`, has no horizontal overflow at desktop and mobile
  widths, and can find story navigation text for a known group such as
  `base-ui/Accordion`.

Update `scripts/smoke-public-install.mjs`:

- Default `PUBLIC_REGISTRY_BASE_URL` to
  `https://bearing-ward.github.io/foldkit-basic-cn-ui`.
- Install one item by URL with `${registryBaseUrl}/button.json`.
- Install one item by namespace with `@foldkit-cn/slider` using the generated
  `components.json`.
- Keep assertions that installed files land at `src/ui/{name}/...` targets.

**Verify**:

1. Run `bun run build`.
2. Start preview in a separate terminal: `bun run preview -- --port 4173`.
3. Run `PUBLIC_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-site` ->
   exit 0.
4. Run
   `PUBLIC_REGISTRY_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-install`
   -> exit 0.

### Step 8: Update docs, contracts, and generated-project tooling

Update `README.md`:

- Public site is an OpenStory browser.
- Public item URL format is
  `https://bearing-ward.github.io/foldkit-basic-cn-ui/{name}.json`.
- Public registry index is
  `https://bearing-ward.github.io/foldkit-basic-cn-ui/registry.json`.
- `components.json` remains
  `https://bearing-ward.github.io/foldkit-basic-cn-ui/components.json`.
- Self-hosting serves `/components.json`, `/registry.json`, and `/{name}.json`.
- Remove or rewrite references that say registry items live under `/r`.

Update `docs/product/component-entry-contract.md`:

- Replace `registry/default/ui/{name}` with lane paths.
- Replace `registry/default/examples/{example}` with lane paths.
- Replace `registry/default/items.json` with `registry/registry.json` plus child
  `registry/{lane}/registry.json` files.
- Replace `/r/{name}.json` with `/{name}.json`.
- Explain that lane is derived from `meta.foldkit.origin`, not folder name, and
  that folder name must agree with that metadata.
- Keep the product naming rule for `base-ui-*` and `shadcn-*` items.

Update `docs/product/docs-surface-guardrails.md`:

- State that the public visual surface is OpenStory.
- Remove requirements that only apply to the old docs route layout, or mark them
  as legacy docs-app guardrails.
- Add OpenStory guardrails: generated stories must cover every runnable example,
  static build must include `__openstory/manifest.json`, and public smoke must
  verify at least one story page.

Update `scripts/generate-registry-project.ts` and tests so generated projects use
the new included source registry layout and flat public output.

**Verify**:

- `rg "/r/" README.md docs scripts registry package.json .github` -> expected:
  no matches except historical plans or explicit migration notes.
- `rg "registry/default" README.md docs scripts registry package.json .github` ->
  expected: no matches except historical plans or explicit migration notes.
- `bun run test -- scripts/generate-registry-project.ts scripts/scaffold-component-slice.test.ts` -> exit 0, or use the exact relevant test filters if Vitest's file matching differs.

### Step 9: Final verification and status update

Run the full verification set:

```bash
bun run openstory:generate
bun run openstory:check
bun run build:registry
bun run check:registry
bun run typecheck
bun run test
bun run lint
bun run build
```

Then preview the built site and run both smoke scripts:

```bash
bun run preview -- --port 4173
PUBLIC_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-site
PUBLIC_REGISTRY_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-install
```

Update this plan's row in `plans/README.md` from `TODO` to `DONE`.

**Verify**:

- `git status --short` shows only intentional source, generated, docs, and plan
  changes.
- All commands above exit 0.

## Test plan

Add or update tests in these areas:

- Manifest reader tests:
  - flattens root `include` registries.
  - rejects duplicate item names.
  - qualifies same-registry dependencies to `@foldkit-cn/{name}`.
  - leaves built-in shadcn, unknown, URL, and already-namespaced dependencies
    unchanged.
- Registry build tests/checks:
  - public `registry.json` has no file `content`.
  - public `{name}.json` includes file `content`.
  - generated `components.json` uses `{{registryBaseUrl}}/{name}.json`.
  - no generated `/r` directory remains.
- OpenStory generation tests:
  - discovers examples from all lane folders.
  - generates imports to lane paths.
  - keeps stable story ids for known examples such as
    `base-ui-accordion--basic`.
  - catches duplicate story ids.
- Smoke tests:
  - OpenStory shell and manifest are reachable.
  - at least one story iframe page is reachable.
  - flat registry root files are reachable.
  - shadcn CLI can install one URL item and one namespace item.

Use existing script test style in `scripts/generate-openstory-stories.test.ts`
and `scripts/serve-registry.test.ts` as the structural pattern.

## Done criteria

All must hold:

- [ ] Source registry layout uses `registry/registry.json` plus
      `registry/foldkit`, `registry/base-ui`, `registry/shadcn`, and
      `registry/ai-elements` child registries.
- [ ] No active source or script path depends on `registry/default`.
- [ ] Public registry output is flat:
      `apps/docs/public/registry.json`, `apps/docs/public/{name}.json`, and
      `apps/docs/public/components.json`.
- [ ] Public generated registry no longer writes `apps/docs/public/r`.
- [ ] `registry/config.json` `registryBaseUrl` does not end in `/r`.
- [ ] `components.json` still supports `@foldkit-cn/{name}` through a `{name}`
      URL pattern.
- [ ] OpenStory generated stories import from lane example folders.
- [ ] `bun run build` builds OpenStory static output into `dist`.
- [ ] `dist` includes OpenStory shell files and flat registry JSON files.
- [ ] GitHub Pages workflow uploads the OpenStory static build.
- [ ] Public smoke tests validate OpenStory, not old `/docs/components` routes.
- [ ] shadcn install smoke passes for a root URL item and a namespace item.
- [ ] `bun run check:registry`, `bun run typecheck`, `bun run test`,
      `bun run lint`, and `bun run build` all exit 0.
- [ ] README and component-entry docs describe the new layout and URL shape.
- [ ] `plans/README.md` status row for this plan is updated.

## STOP conditions

Stop and report back if:

- OpenStory `build` cannot emit a static Foldkit site with the current
  dependency version.
- Moving examples into lane folders changes runtime behavior or breaks example
  scene tests for reasons unrelated to import paths.
- A registry item cannot be assigned to exactly one lane from
  `meta.foldkit.origin` or unambiguous example dependency metadata.
- A required shadcn registry convention conflicts with this plan's flat public
  output shape.
- shadcn CLI cannot install from root `/{name}.json` URLs after generated
  `components.json` is updated.
- Fixing verification requires changing component behavior, parity content,
  public view APIs, or old docs app internals beyond import path fallout.
- Any step's verification fails twice after a reasonable fix attempt.

## Maintenance notes

- Future component additions must update a lane child registry, not a global
  `items.json` array.
- Reviewers should scrutinize `registryDependencies`: bare dependencies can
  accidentally mean upstream shadcn items. Foldkit CN item dependencies should be
  namespaced in generated output.
- Keep OpenStory generated story files machine-generated. Manual edits in
  `src/openstory/generated` should fail `bun run openstory:check`.
- The old Foldkit docs app can be deleted in a separate cleanup plan once the
  OpenStory public surface and registry smokes are stable.
- If item renames are still desired after this migration, write a separate plan
  for aliases, deprecations, and install-documentation changes. Do not mix item
  renames into this layout/build migration.
