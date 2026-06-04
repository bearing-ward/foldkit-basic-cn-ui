# Foldkit CN

Foldkit CN is a shadcn-style registry of styled, installable Foldkit component slices, examples, tests, and documentation. It packages source on top of Foldkit UI primitives so teams can copy components into a Foldkit app and keep ownership of the code.

Foldkit CN is not the official Foldkit UI documentation. Foldkit UI is the headless component layer built into Foldkit; this repo provides styled registry items on top.

## Public Registry

The docs app serves the generated registry from:

```text
https://binarytide.github.io/foldkit-basic-cn-ui/r/{name}.json
```

Consumer `components.json` config is published at:

```text
https://binarytide.github.io/foldkit-basic-cn-ui/components.json
```

Install a component directly:

```bash
bunx shadcn@latest add https://binarytide.github.io/foldkit-basic-cn-ui/r/dialog.json
```

Or copy `components.json` into a Foldkit app and install through the registry alias:

```bash
bunx shadcn@latest add @foldkit-cn/dialog
```

## Development

```bash
bun install
bun run dev
```

## Deployment

The `Deploy docs and registry` GitHub Actions workflow builds the registry,
builds the docs app with the GitHub Pages asset base, and publishes `dist`.
Update `registry/config.json` before changing repository ownership, repository
name, or the public registry host.

## Verification

```bash
bun run typecheck
bun run build:registry
bun run check:registry
bun run lint
bun run test
bun run build
bun run test:e2e
```
