# Foldkit CN

Foldkit CN is an early shadcn-style registry for Foldkit applications. It
packages styled, installable Foldkit component slices, examples, tests, and
documentation so teams can copy source into their own app and keep ownership of
the code.

This is a sneak peek release. The registry is usable for experimentation, but it
is still work in progress. APIs, example coverage, visual parity, and file
layout may change while the registry matures.

Foldkit CN is not the official Foldkit UI documentation. Foldkit UI is the
headless component layer built into Foldkit; this repo provides styled registry
items on top of Foldkit.

The Foldkit-origin registry items are included as an initial reference for how
native Foldkit UI components can be packaged, documented, and tested through the
registry workflow. When building an app, default to the native Foldkit UI
components first; install these registry items when you want project-owned
styling, examples, or a source snapshot to adapt.

## What You Get

- Installable registry items for Foldkit components and examples.
- shadcn/Base UI inspired styling translated into Foldkit views and messages.
- Source-owned installs: generated files land in your app, not in a runtime
  dependency.
- Scene tests and docs examples for the registry items.
- A hosted registry suitable for `shadcn add` experiments.

## Current Status

This registry is actively being brought toward origin parity with shadcn and
Base UI examples. Some components are closer than others. Expect occasional
visual drift, missing edge-case behavior, and follow-up passes on icons,
mobile/overlay behavior, keyboard details, and example fidelity.

Use it today when you want a starting point for styled Foldkit components. Review
installed files like project code, because they become part of your app.

## Public Registry

Docs and registry JSON are served from GitHub Pages:

```text
https://bearing-ward.github.io/foldkit-basic-cn-ui/
```

Registry item URL format:

```text
https://bearing-ward.github.io/foldkit-basic-cn-ui/r/{name}.json
```

Published registry config:

```text
https://bearing-ward.github.io/foldkit-basic-cn-ui/components.json
```

## Self-Hosted Registry

The self-hosted server exposes the same static registry contract as GitHub
Pages:

- `/components.json` for shadcn registry alias configuration.
- `/r/{name}.json` for each generated registry item.
- Any additional generated public assets under `apps/docs/public/`, including
  source viewer assets when docs output includes them.

The registry base URL is owned by `registry/config.json` and is written into
`apps/docs/public/components.json` by `bun run build:registry`. For local
self-hosting, set that base URL to the URL that clients can reach, such as
`http://127.0.0.1:4174/r`, then rebuild the registry.

Serve the generated registry locally:

```bash
bun run build:registry
bun run serve:registry -- --host 127.0.0.1 --port 4174
```

Smoke-test the local registry from another terminal:

```bash
curl -fsS http://127.0.0.1:4174/components.json
curl -fsS http://127.0.0.1:4174/r/button.json
```

Container self-hosting builds the same generated registry artifacts into the
image and serves them without secrets:

```bash
docker build -t foldkit-cn-registry .
docker run --rm -p 4174:4174 foldkit-cn-registry
curl -fsS http://127.0.0.1:4174/components.json
curl -fsS http://127.0.0.1:4174/r/button.json
```

Use compose when you want the same local port mapping:

```bash
docker compose up --build registry
```

## Generate A Custom Registry Project

Use the generator when another team wants to own a custom registry project
instead of publishing from this repository:

```bash
bun run generate-registry-project -- /tmp/acme-foldkit-cn \
  --name acme-foldkit-cn \
  --homepage https://example.com/acme-foldkit-cn \
  --registry-base-url https://example.com/acme-foldkit-cn/r
```

The generated custom registry project contains the minimum Foldkit CN registry
contract:

- `package.json` with docs, registry generation, registry validation,
  typecheck, test, and build scripts.
- `registry/config.json` for the registry name, homepage, and registry base
  URL.
- `registry/default/items.json` for the source registry item manifest.
- `registry/templates/components.json` for the generated `components.json`
  template.
- `registry/default/ui/example-card/` as the example component slice.
- `registry/default/examples/example-card-basic/` as the example component
  installation target.
- `apps/docs/public/components.json` and `apps/docs/public/r/*.json` as
  generated public registry output.
- `scripts/build-registry.mjs` and `scripts/check-registry.mjs` as validation
  scripts.
- `scripts/serve-registry.ts`, `Dockerfile`, and `compose.yaml` for local and
  container self-hosting.
- `src/` as a minimal docs app shell.

The generator refuses to write into a non-empty target directory unless
`--force` is passed. After generating a project, validate the nested project
from its own directory:

```bash
bun install
bun run build:registry
bun run check:registry
bun run serve:registry -- --host 127.0.0.1 --port 4174
bun run typecheck
bun run build
```

## Install In A Project

Prerequisites:

- A Foldkit app with `foldkit`, `effect`, Tailwind, and TypeScript already set
  up.
- A source root that matches your `components.json` aliases.
- `bunx` or another way to run the shadcn CLI.

First-party registry CLI from this repository:

```bash
bun run registry list
bun run registry install dialog --app-root /path/to/foldkit-app --dry-run
bun run registry install dialog --app-root /path/to/foldkit-app --execute
bun run registry update dialog --app-root /path/to/foldkit-app --inspect
```

Use `install --dry-run` semantics to review planned writes before changing a
project. The install command is a dry run unless `--execute` is passed. Executed
installs copy local generated registry payloads into the consuming app and stop
before overwriting existing app-owned files.

Install one registry item directly by URL:

```bash
bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/dialog.json
```

Install an example directly by URL:

```bash
bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/sidebar-basic.json
```

To use aliases such as `@foldkit-cn/dialog`, copy or merge the published
registry config into your app's `components.json`:

```bash
curl -L https://bearing-ward.github.io/foldkit-basic-cn-ui/components.json -o components.json
```

Then install through the alias:

```bash
bunx shadcn@latest add @foldkit-cn/dialog
```

The generated files are intended to be app-owned. After installation, inspect
the source, wire the view into your Foldkit app, and keep or edit the scene tests
that match your usage.
Future update tooling must account for source-owned local edits before changing
installed files.

## Useful Items To Try

```bash
bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/button.json
bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/sidebar.json
bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/sonner.json
bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/data-table.json
```

Example installs:

```bash
bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/sidebar-basic.json
bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/sonner-basic.json
```

## Local Development

```bash
bun install
bun run dev
```

The dev server hosts the docs app and generated registry previews. Regenerate
registry JSON after editing registry source files:

```bash
bun run build:registry
```

## Verification

Core checks:

```bash
bun run typecheck
bun run build:registry
bun run check:registry
bun run test
bun run build
```

Additional checks used before publishing:

```bash
bun run lint
bun run test:e2e
bun run smoke:public-site
bun run smoke:public-install
```

## Deployment

The `Deploy docs and registry` GitHub Actions workflow builds the registry,
builds the docs app with the GitHub Pages asset base, and publishes `dist`.

After deployment it smoke-tests the public docs, registry JSON, source viewer
assets, and a real `shadcn add` install from the public registry.

Update `registry/config.json` before changing repository ownership, repository
name, or the public registry host.

## Acknowledgements

Foldkit CN builds on ideas, APIs, examples, and design language from a few
excellent open source projects:

- [Foldkit](https://github.com/foldkit/foldkit) for the Elm-style application
  architecture, Effect-based runtime, and accessibility-focused primitives this
  registry targets.
- [shadcn/ui](https://github.com/shadcn-ui/ui) for the registry model,
  source-owned installation workflow, component naming, and visual reference
  points.
- [Base UI](https://github.com/mui/base-ui) for accessible unstyled component
  patterns and many of the origin examples used for parity work.

Thank you to the maintainers and contributors behind those projects. This
registry is an experiment in bringing that source-owned, accessible component
workflow into Foldkit applications.

## Contributing Direction

The near-term goal is better origin parity: examples should look and behave like
their shadcn/Base UI source material while staying idiomatic Foldkit. That means
parent-owned state, messages as facts, no hidden runtime side effects, and tests
that cover the visible behavior.

High-value contributions right now:

- Side-by-side visual fixes against origin examples.
- Missing example parity.
- Accessibility and keyboard behavior.
- Mobile and overlay behavior.
- Registry install smoke coverage.
