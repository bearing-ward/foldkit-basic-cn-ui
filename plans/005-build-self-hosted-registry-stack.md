# Plan 005: Build the self-hosted registry stack

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 795046f1..HEAD -- package.json scripts registry apps/docs/public README.md docs/product/base-ui-shadcn-expansion-plan.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/003-add-component-registry-cli.md, plans/004-generate-custom-registry-project.md
- **Category**: direction
- **Planned at**: commit `795046f1`, 2026-06-16

## Why this matters

The backlog asks for an Effect CLI that can serve the registry locally, a Docker
container wrapper for the server, and a minimal self-hosted stack. This lets
teams own their registry infrastructure instead of depending only on GitHub
Pages. The implementation should serve the same static registry contract that
the current docs/public output already exposes.

## Current state

- `README.md` says deployment builds the registry, builds the docs app with the
  GitHub Pages asset base, and publishes `dist`.
- `registry/config.json` currently points at
  `https://bearing-ward.github.io/foldkit-basic-cn-ui/r`.
- `scripts/build-registry.mjs` writes public registry artifacts under
  `apps/docs/public/r/` and `apps/docs/public/components.json`.
- Dependencies include `effect` and `@effect/platform-browser`. The repo
  convention says Foldkit work is tightly coupled to Effect-TS; do not introduce
  unrelated server frameworks without a design reason.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Registry generation | `bun run build:registry` | exit 0 |
| Registry guardrails | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Unit/scene tests | `bun run test` | exit 0 |
| Docs build | `bun run build` | exit 0 |
| Public site smoke | `bun run smoke:public-site` | exit 0 when server/public target is available |

## Scope

**In scope**:
- Effect-based local registry server CLI.
- Dockerfile or container wrapper for serving generated registry artifacts.
- Minimal compose or documented run command for self-hosting.
- README self-hosting docs.
- Tests for route/path resolution and generated artifact serving.
- `plans/README.md`.

**Out of scope**:
- Authentication, multi-tenant management, or hosted SaaS features.
- Database-backed registry storage.
- Replacing GitHub Pages deployment.
- Non-Effect server framework unless explicitly approved.

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
the generated public directory locally. Prefer Effect platform APIs and keep file
serving read-only. The command must print the local registry URL and the
`components.json` URL.

**Verify**: start the server, then request `/components.json` and one known
`/r/{name}.json` locally; both return valid JSON.

### Step 3: Add Docker wrapper

Add a Dockerfile or equivalent container wrapper that serves the same generated
artifacts. It should not require secrets. It should expose configuration for host
and port and should document how to mount or build registry artifacts.

**Verify**: build the container and run it locally; curl `/components.json` and a
known `/r/{name}.json`.

### Step 4: Add smoke tests or documented smoke commands

Add automated tests for route resolution if feasible. If container execution is
too environment-specific for CI, add explicit smoke commands to README and keep
local server route tests automated.

**Verify**: `bun run test` -> local server tests pass.

## Test plan

- Unit tests for path normalization and 404 behavior.
- Integration test for serving generated JSON from a temp/public directory.
- Manual Docker smoke command documented with expected curl results.

## Done criteria

- [ ] Effect CLI serves generated registry artifacts locally.
- [ ] Docker wrapper serves the same artifact contract.
- [ ] Self-hosting README section includes local and container commands.
- [ ] `bun run build:registry` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run build` exits 0.
- [ ] `plans/README.md` status row for plan 005 is updated.

## STOP conditions

Stop and report back if:

- Serving the registry requires changing the public JSON shape.
- The server needs secrets or authentication decisions.
- Dockerizing requires publishing images or changing CI credentials.
- An Effect server package dependency is missing and the repo owner must choose
  whether to add it.

## Maintenance notes

Keep the self-hosted stack static-file-oriented until there is a clear need for
mutable server state. Reviewers should verify that local, Docker, and GitHub
Pages serving all expose the same registry URLs.

