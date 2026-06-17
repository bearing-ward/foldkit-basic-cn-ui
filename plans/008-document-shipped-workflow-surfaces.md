# Plan 008: Document the shipped workflow surfaces

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report; do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**: `git diff --stat 90add0f9..HEAD -- README.md docs/product/base-ui-shadcn-expansion-plan.md docs/product/component-entry-contract.md docs/product/workflow-feature-surfaces.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/002-add-new-component-interface.md, plans/003-add-component-registry-cli.md, plans/004-generate-custom-registry-project.md, plans/005-build-self-hosted-registry-stack.md, plans/006-add-theme-playground.md, plans/007-add-custom-clone-spinout-workflow.md
- **Category**: docs
- **Planned at**: commit `90add0f9`, 2026-06-17

## Why this matters

Plans 002 through 007 shipped several maintainer and self-hosting workflows, but
the long-lived product docs still read partly like a backlog. The README now
has runnable commands, but there is no single durable product document that
maps each workflow to its route, command, Effect CLI entrypoint, safety boundary,
and validation command. This plan turns the shipped features into a coherent
documentation set without changing runtime behavior.

## Current state

Relevant files and roles:

- `README.md` is the public quickstart and now includes the shipped commands.
- `docs/product/base-ui-shadcn-expansion-plan.md` is the roadmap and still has a
  "Workflow Backlog" section listing items that are now implemented.
- `docs/product/component-entry-contract.md` is the canonical component and
  update contract.
- `src/docsView.ts`, `src/main.ts`, and scene tests prove the docs-app routes
  exist; use them as read-only evidence.
- `scripts/*.ts` prove the CLI workflow implementations and Effect CLI package
  usage; use them as read-only evidence.

Current README quickstart excerpts:

```text
README.md:62-68
## Self-Hosted Registry

The self-hosted server exposes the same static registry contract as GitHub
Pages:

- `/components.json` for shadcn registry alias configuration.
- `/r/{name}.json` for each generated registry item.
```

```text
README.md:162-168
First-party registry CLI from this repository:

bun run registry list
bun run registry install dialog --app-root /path/to/foldkit-app --dry-run
bun run registry install dialog --app-root /path/to/foldkit-app --execute
bun run registry update dialog --app-root /path/to/foldkit-app --inspect
```

```text
README.md:270-282
## Docs App Tools

The docs app includes local planning tools for maintainers:

- `/docs/new-component` opens the New Component interface.
- `/docs/theme-playground` opens the Theme Playground.
```

The roadmap still presents shipped work as backlog:

```text
docs/product/base-ui-shadcn-expansion-plan.md:284-310
## Workflow Backlog

- Custom-clone spin-out workflow: support importing a component or example from
  another trusted registry...
- Theme playground: add an interactive surface...
- New-component interface: provide CLI and web flows...
- Component registry CLI: list available components...
- Custom registry project generator: scaffold a new registry project...
- Self-hosted registry stack: build an Effect CLI...
```

The update contract is already canonical and should be linked, not rewritten:

```text
docs/product/component-entry-contract.md:180-196
## Installed component updates

Installed registry files are app-owned source after they are copied into a
consuming app. Future update tooling must default to non-destructive behavior
and preserve source-owned local edits unless the operator explicitly opts into
overwrite behavior.
```

Read-only implementation evidence:

```text
src/docsView.ts:55-65
const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "New Component",
    routeTag: "NewComponentAuthoring",
    href: "/docs/new-component",
  },
  {
    label: "Theme Playground",
    routeTag: "ThemePlayground",
    href: "/docs/theme-playground",
  },
];
```

```text
src/main.ts:1534-1543
export const newComponentAuthoringRouter = pipe(
  literal("docs"),
  slash(literal("new-component")),
  Route.mapTo(NewComponentAuthoringRoute)
);
export const themePlaygroundRouter = pipe(
  literal("docs"),
  slash(literal("theme-playground")),
  Route.mapTo(ThemePlaygroundRoute)
);
```

```text
scripts/component-registry-cli.ts:5-8
import { NodeServices } from "@effect/platform-node";
import { Array, Effect } from "effect";
import { Argument, Command, Flag } from "effect/unstable/cli";
```

```text
scripts/serve-registry.ts:239-278
export const serveRegistryCommand = Command.make("serve-registry", ...).pipe(
  Command.withDescription("Serve generated Foldkit CN registry artifacts from apps/docs/public."),
  Command.withExamples([...])
);
```

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Search docs | `rg -n "Workflow Backlog|Shipped Workflow|workflow-feature|Docs App Tools|registry update" README.md docs/product` | shows the expected docs locations |
| Typecheck | `bun run typecheck` | exit 0, no errors |
| Registry checks | `bun run check:registry` | exit 0 |
| Focused scene tests | `bun run test src/main.scene.test.ts src/newComponentAuthoring.scene.test.ts src/themePlayground.scene.test.ts` | all pass |
| Whitespace | `git diff --check` | exit 0 |

## Scope

**In scope** (the only files you should modify):

- `README.md`
- `docs/product/base-ui-shadcn-expansion-plan.md`
- `docs/product/component-entry-contract.md` only for a short cross-link if the
  new workflow doc needs one
- `docs/product/workflow-feature-surfaces.md` (create)
- `plans/README.md` status row when this plan is complete

**Out of scope** (do NOT touch):

- `src/**`
- `scripts/**`
- `registry/**`
- Docker, compose, or generated public registry artifacts
- Any implementation behavior or CLI flag shape

## Git workflow

- Branch: `codex/008-document-shipped-workflow-surfaces`
- Commit message style: short imperative phrase, matching recent commits such
  as `document new feature surfaces` and `fix current test failures`.
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Create the workflow feature surfaces document

Create `docs/product/workflow-feature-surfaces.md`. Make it the durable docs map
for shipped workflow features, not a planning backlog.

The document must include:

- A title such as `# Workflow Feature Surfaces`.
- A short purpose paragraph explaining that this file maps shipped maintainer,
  registry, and self-hosting workflows to their public surfaces.
- A table with one row for each shipped workflow:
  - New component authoring interface: `/docs/new-component`,
    `src/newComponentAuthoring.ts`, `src/newComponentAuthoring.scene.test.ts`,
    and the scaffold checklist commands surfaced in the UI.
  - Theme playground: `/docs/theme-playground`, `src/themePlayground.ts`, and
    `src/themePlayground.scene.test.ts`.
  - Component registry CLI: `bun run registry list`, `install`, and
    `update --inspect`; note that it uses `effect/unstable/cli` and that update
    remains inspect-only.
  - Custom registry project generator: `bun run generate-registry-project`.
  - Self-hosted registry stack: `bun run build:registry`,
    `bun run serve:registry`, `Dockerfile`, and `compose.yaml`.
  - Custom-clone spin-out: `bun run custom-clone -- import` and
    `bun run custom-clone -- score`.
- A "Safety and ownership boundaries" section covering source-owned installs,
  inspect-only update behavior, allowlisted custom-clone imports, and generated
  project overwrite behavior.
- A "Validation map" section listing the exact validation commands from this
  repo and which workflow each command protects.

Do not include stale future-tense wording such as "build an Effect CLI" for
features that are already implemented. Keep unresolved future work explicit,
for example "future source-writing update modes are not implemented."

**Verify**:

```bash
rg -n "New component authoring|Theme playground|Component registry CLI|Custom registry project|Self-hosted registry|Custom-clone|effect/unstable/cli|inspect-only" docs/product/workflow-feature-surfaces.md
```

Expected result: every listed phrase appears at least once.

### Step 2: Link the new docs map from the README

Update `README.md` so the public quickstart has one clear link to
`docs/product/workflow-feature-surfaces.md`. Keep the existing command examples
in place; the README should remain the quickstart, while the new product doc is
the detailed workflow map.

Add the link near the existing workflow sections, for example after
`## Docs App Tools` or after the first-party registry CLI description. The link
should make clear that it covers shipped maintainer workflows, CLI commands,
self-hosting, and safety boundaries.

**Verify**:

```bash
rg -n "workflow-feature-surfaces|Workflow Feature Surfaces" README.md docs/product/workflow-feature-surfaces.md
```

Expected result: both `README.md` and the new product doc are returned.

### Step 3: Retire stale backlog wording in the roadmap

Update `docs/product/base-ui-shadcn-expansion-plan.md` so the `## Workflow
Backlog` section no longer lists shipped features as pending TODOs.

Replace that section with either:

- `## Shipped Workflow Surfaces`, with links to
  `docs/product/workflow-feature-surfaces.md`, or
- `## Workflow Backlog`, with a short note that the previously listed workflow
  items have shipped and moved to the workflow feature surfaces doc, followed
  only by genuine remaining future work.

Preserve the rest of the roadmap, especially the component coverage and priority
sections.

**Verify**:

```bash
rg -n "build an Effect CLI|add an interactive surface|provide CLI and web flows|should be implemented with the Effect CLI package|Shipped Workflow|workflow-feature-surfaces" docs/product/base-ui-shadcn-expansion-plan.md
```

Expected result: no stale future-tense phrases remain for shipped features; the
new shipped-workflow heading or link appears.

### Step 4: Cross-link the update contract only if needed

If the new workflow doc describes `registry update`, add one short cross-link in
`docs/product/component-entry-contract.md` from `## Installed component updates`
to `docs/product/workflow-feature-surfaces.md`. Do not weaken or reword the
update modes. The contract stays canonical.

Skip this step if the workflow doc already links to the contract and the
contract reads clearly without a reciprocal link.

**Verify**:

```bash
rg -n "Installed component updates|workflow-feature-surfaces|inspect" docs/product/component-entry-contract.md docs/product/workflow-feature-surfaces.md
```

Expected result: the canonical contract remains present, and at least one
directional link connects update workflow docs to it.

### Step 5: Run the documentation verification set

Run the docs/search checks and the repo gates listed below:

```bash
rg -n "Workflow Backlog|Shipped Workflow|workflow-feature-surfaces|Docs App Tools|registry update" README.md docs/product
bun run typecheck
bun run check:registry
bun run test src/main.scene.test.ts src/newComponentAuthoring.scene.test.ts src/themePlayground.scene.test.ts
git diff --check
```

Expected result: all commands exit 0. The `rg` output should show the new
workflow docs map and no stale backlog phrasing that implies shipped items are
still unimplemented.

## Test plan

This is a documentation-only plan. Do not add or modify code tests unless a
reviewer explicitly expands the scope to docs-app copy changes under `src/**`.

Use existing tests as evidence that documented routes still exist:

- `src/main.scene.test.ts` already covers the `/docs/new-component` routed view.
- `src/newComponentAuthoring.scene.test.ts` covers the scaffold checklist and
  validation commands shown by the new component interface.
- `src/themePlayground.scene.test.ts` covers the theme playground controls,
  preview state, and output.

Verification:

```bash
bun run test src/main.scene.test.ts src/newComponentAuthoring.scene.test.ts src/themePlayground.scene.test.ts
```

Expected result: all focused scene tests pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `docs/product/workflow-feature-surfaces.md` exists and documents all six
  shipped workflow surfaces listed in Step 1.
- [ ] `README.md` links to `docs/product/workflow-feature-surfaces.md`.
- [ ] `docs/product/base-ui-shadcn-expansion-plan.md` no longer presents the
  shipped workflow items as pending backlog TODOs.
- [ ] The update workflow docs link to
  `docs/product/component-entry-contract.md#installed-component-updates` or the
  contract links back to the workflow docs.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run test src/main.scene.test.ts src/newComponentAuthoring.scene.test.ts src/themePlayground.scene.test.ts` exits 0.
- [ ] `git diff --check` exits 0.
- [ ] No files outside the in-scope list are modified, confirmed with
  `git status --short`.
- [ ] `plans/README.md` status row for plan 008 is updated when complete.

## STOP conditions

Stop and report back if:

- The current README or product docs no longer match the excerpts above.
- Any CLI script no longer imports `Command` or related types from
  `effect/unstable/cli`; the docs must not claim Effect CLI usage without live
  evidence.
- `registry update` has gained source-writing modes since this plan was written;
  update the plan with the operator before documenting new behavior.
- The requested documentation seems to require source changes under `src/**` or
  `scripts/**`.
- Any verification command fails twice after a reasonable docs-only fix attempt.

## Maintenance notes

- Future workflow features should update
  `docs/product/workflow-feature-surfaces.md` in the same change that adds the
  route, script, or container surface.
- Reviewers should check that docs distinguish current behavior from future
  update modes, especially around source-owned installs and destructive writes.
- This plan deliberately does not add generated docs pages or UI copy. It
  documents shipped surfaces and retires stale backlog language only.
