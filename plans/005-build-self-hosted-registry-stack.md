# Plan 005: Build the self-hosted registry stack

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 9c6b4c12..HEAD -- package.json scripts registry apps/docs/public README.md docs/product/base-ui-shadcn-expansion-plan.md plans/README.md Dockerfile docker-compose.yml compose.yaml`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/003-add-component-registry-cli.md, plans/004-generate-custom-registry-project.md
- **Category**: direction
- **Planned at**: commit `9c6b4c12`, 2026-06-16

## Why this matters

The backlog asks for an Effect CLI that can serve the registry locally, a Docker
container wrapper for the server, and a minimal self-hosted stack. This lets
teams own their registry infrastructure instead of depending only on GitHub
Pages. The implementation should serve the same static registry contract that
the current docs/public output already exposes.

The local serving command must use the same Effect CLI surface as the existing
first-party CLI scripts: `Command`, `Argument`, and `Flag` from
`effect/unstable/cli`, plus `NodeServices` from `@effect/platform-node`.

## Current state

- `README.md` says deployment builds the registry, builds the docs app with the
  GitHub Pages asset base, and publishes `dist`.
- `registry/config.json` currently points at
  `https://bearing-ward.github.io/foldkit-basic-cn-ui/r`.
- `scripts/build-registry.mjs` writes public registry artifacts under
  `apps/docs/public/r/` and `apps/docs/public/components.json`.
- Dependencies include `effect`, `@effect/platform-browser`, and
  `@effect/platform-node@4.0.0-beta.66`. The current package exposes
  `NodeHttpServer`, `NodeHttpPlatform`, and `NodeServices`; HTTP server types
  live under `effect/unstable/http/*`.
- `scripts/scaffold-component-slice.ts`, `scripts/component-registry-cli.ts`,
  and `scripts/generate-registry-project.ts` are the existing Effect CLI
  examples. Match their `Command.make` / `Command.runWith(...).pipe(Effect.provide(NodeServices.layer))`
  structure and explicit write/serve flags.
- `scripts/generate-registry-project.ts` and
  `scripts/templates/registry-project/**` now create a minimal custom registry
  project with its own build/check scripts. This self-hosted stack should be
  available to generated custom registry projects too, unless doing so would
  duplicate too much logic; document any omission.
- Known baseline test residuals: a full `bun run test` can fail in unrelated
  pre-existing scene tests that cannot resolve docs-preview aliases from
  `src/main.scene.test.ts`, and in
  `registry/default/examples/shadcn-input-demo/shadcn-input-demo.scene.test.ts`
  where the expected API key is `sk_live_123456789x` but the rendered value is
  `x`. Do not fix those in this plan. New self-hosting tests must pass when run
  directly.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Registry generation | `bun run build:registry` | exit 0 |
| Registry guardrails | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Self-hosting tests | `bun run test scripts/<new-server-test-file>.test.ts` | exit 0 |
| Full tests | `bun run test` | exit 0, or fails only with the known unrelated baseline residuals listed above |
| Docs build | `bun run build` | exit 0 |
| Public site smoke | `bun run smoke:public-site` | exit 0 when server/public target is available |
| Diff hygiene | `git diff --check` | exit 0 |

## Scope

**In scope**:
- Effect-based local registry server CLI.
- Dockerfile or container wrapper for serving generated registry artifacts.
- Minimal compose or documented run command for self-hosting.
- README self-hosting docs.
- Tests for route/path resolution and generated artifact serving.
- Generated project templates under `scripts/templates/registry-project/**` if
  needed so `bun run generate-registry-project` creates projects with the same
  local serve/container contract.
- `package.json` script wiring.

**Out of scope**:
- Authentication, multi-tenant management, or hosted SaaS features.
- Database-backed registry storage.
- Replacing GitHub Pages deployment.
- Non-Effect server framework.
- Authentication, credentials, TLS termination, or image publishing.

## Git workflow

- Branch: `codex/005-self-hosted-registry-stack`
- Commit message: `add self hosted registry stack`
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Define server contract

Document which paths the self-hosted server must expose:
`/components.json`, `/r/{name}.json`, and any source viewer assets needed by the
registry docs. Define how the registry base URL is configured for local and
container execution.

**Verify**: `rg -n "/components.json|/r/\\{name\\}.json|registry base URL|self-host" README.md docs/product` -> documented paths exist.

### Step 2: Add Effect local serve command

Implement a CLI command that builds or validates registry artifacts and serves
the generated public directory locally. Define command options with the Effect
CLI package. Prefer `NodeHttpServer` / `NodeHttpPlatform` from
`@effect/platform-node` and the `effect/unstable/http` response APIs; if those
APIs cannot serve static files cleanly, use Node's `http` server inside an
Effect program rather than adding another server framework. Keep file serving
read-only. The command must print the local registry URL and the
`components.json` URL.

**Verify**: start the server on `127.0.0.1` with an ephemeral or explicit port,
then request `/components.json` and one known `/r/{name}.json` locally; both
return valid JSON. Also verify an unknown path returns 404.

### Step 3: Add Docker wrapper

Add a Dockerfile or equivalent container wrapper that serves the same generated
artifacts. It should not require secrets. It should expose configuration for host
and port and should document how to mount or build registry artifacts.

**Verify**: if Docker is available, build the container and run it locally; curl
`/components.json` and a known `/r/{name}.json`. If Docker is unavailable in the
executor environment, verify the Dockerfile/compose syntax as far as local tools
allow and document the exact skipped smoke command.

### Step 4: Add smoke tests or documented smoke commands

Add automated tests for route resolution if feasible. If container execution is
too environment-specific for CI, add explicit smoke commands to README and keep
local server route tests automated.

**Verify**: direct self-hosting tests pass.

### Step 5: Propagate to generated projects

Update `scripts/templates/registry-project/**` so newly generated custom
registry projects expose the same local serve command and container wrapper, or
document why that propagation is intentionally deferred. Keep the generated
project minimal.

**Verify**: generate a temp project, run its registry build/check, and confirm
its README/package scripts include the self-hosting command and Docker/container
instructions.

## Test plan

- Unit tests for path normalization and 404 behavior.
- Integration test for serving generated JSON from a temp/public directory.
- CLI help smoke for the local serve command.
- Temp generated-project smoke for package/README propagation.
- Manual Docker smoke command documented with expected curl results.

## Done criteria

- [ ] Effect CLI serves generated registry artifacts locally.
- [ ] Local serve command/options/help use the Effect CLI package.
- [ ] Docker wrapper serves the same artifact contract.
- [ ] Generated custom registry projects include or explicitly document the
      same self-hosting path.
- [ ] Self-hosting README section includes local and container commands.
- [ ] `bun run build:registry` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test scripts/<new-server-test-file>.test.ts` exits 0.
- [ ] `bun run test` exits 0, or fails only with the known unrelated baseline residuals listed above.
- [ ] `bun run build` exits 0.
- [ ] `git diff --check` exits 0.

## STOP conditions

Stop and report back if:

- Serving the registry requires changing the public JSON shape.
- The server needs secrets or authentication decisions.
- Dockerizing requires publishing images or changing CI credentials.
- Implementing command parsing with `effect/unstable/cli` requires an
  unplanned dependency/version decision.

## Maintenance notes

Keep the self-hosted stack static-file-oriented until there is a clear need for
mutable server state. Reviewers should verify that local, Docker, and GitHub
Pages serving all expose the same registry URLs.
