# Workflow Feature Surfaces

This file maps shipped maintainer, registry, and self-hosting workflows to
their public surfaces. It is a durable product map for routes, commands, Effect
CLI entrypoints, ownership boundaries, and validation commands.

## Shipped surfaces

| Workflow | Public surface | Implementation evidence | Validation evidence |
| --- | --- | --- | --- |
| New component authoring | Deferred from public browsing | `src/newComponentAuthoring.ts` remains as source reference; the legacy docs route is retired while an OpenStory or CLI replacement is designed. | `src/newComponentAuthoring.scene.test.ts` remains focused coverage for the module. |
| Theme playground | Deferred from public browsing | `src/themePlayground.ts` remains as source reference; the legacy docs route is retired while an OpenStory replacement is designed. | `src/themePlayground.scene.test.ts` remains focused coverage for the module. |
| Component registry CLI | `bun run registry list`; `bun run registry install <name> --app-root <path> --dry-run`; `bun run registry install <name> --app-root <path> --execute`; `bun run registry update <name> --app-root <path> --inspect` | `scripts/component-registry-cli.ts` uses `effect/unstable/cli`; `registry update` is inspect-only and writes no app source | `scripts/component-registry-cli.test.ts`; `bun run check:registry` validates generated registry artifacts |
| Custom registry project generator | `bun run generate-registry-project -- <path> --name <name>` | `scripts/generate-registry-project.ts` uses `effect/unstable/cli`; generated output includes a registry project, docs shell, validation scripts, `Dockerfile`, and `compose.yaml` | `scripts/generate-registry-project.test.ts`; generated project validation commands are listed in `README.md` |
| Self-hosted registry stack | `bun run build:registry`; `bun run serve:registry -- --host 127.0.0.1 --port 4174`; `Dockerfile`; `compose.yaml` | `scripts/build-registry.mjs` emits the static registry contract; `scripts/serve-registry.ts` uses `effect/unstable/cli` to serve `apps/docs/public` | `bun run check:registry`; `scripts/serve-registry.test.ts` |
| Custom-clone spin-out | `bun run custom-clone -- import <source>`; `bun run custom-clone -- score <origin-snapshot> <candidate-snapshot>` | `scripts/custom-clone-spinout.ts` uses `effect/unstable/cli`; imported references and candidate slices stay under `registry/candidates/custom-clone/` | `scripts/custom-clone-spinout.test.ts`; normal registry slice checks before promotion |

## Safety and ownership boundaries

Installed registry files are app-owned after they are copied into a consuming
app. The canonical update contract is
[`Installed component updates`](./component-entry-contract.md#installed-component-updates).

`registry update` is inspect-only today. It reports installed metadata and
upstream registry state without writing files; future source-writing update
modes are not implemented.

Custom-clone imports are limited to allowlisted trusted registries or explicit
local review fixtures. The workflow may fetch registry JSON and listed files,
stores imported source as reference material, and never executes imported code
during import or likeness scoring.

The custom registry project generator refuses to write into a non-empty target
directory unless the operator passes `--force`. Forced writes are limited to
template-owned project files in the generated target.

## Validation map

| Command | Protects |
| --- | --- |
| `rg -n "Workflow Backlog|Shipped Workflow|workflow-feature-surfaces|Docs App Tools|registry update" README.md docs/product` | Documentation links, shipped workflow wording, and update references |
| `bun run typecheck` | TypeScript coverage for docs routes, workflow implementation modules, and tests |
| `bun run check:registry` | Generated registry JSON, metadata, primitive coverage, example tests, and parity agenda checks |
| `bun run test src/newComponentAuthoring.scene.test.ts src/themePlayground.scene.test.ts` | New component authoring checklist and Theme playground behavior |
| `git diff --check` | Whitespace safety for documentation edits |
