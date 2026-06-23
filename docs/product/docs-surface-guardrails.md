# Docs Surface Guardrails

Canonical component-entry expectations now live in
[`component-entry-contract.md`](./component-entry-contract.md). This file is an
implementation guardrail companion for the public OpenStory site. The legacy
docs app may remain only as disconnected reference material; if this file
conflicts with the canonical contract, update this file to
match the contract.

## Public OpenStory Site

The public site is the only supported component browser. It must expose the generated
OpenStory build and the shadcn-compatible registry artifacts from the same site
root.

Required public paths:

| Path                          | Expectation                                      |
| ----------------------------- | ------------------------------------------------ |
| `/`                           | Loads the OpenStory shell.                       |
| `/__openstory/manifest.json`   | Lists generated component and example stories.   |
| `/__story/{story-id}/index.html` | Renders an individual story iframe.            |
| `/components.json`            | shadcn registry alias configuration.             |
| `/registry.json`              | Flat generated registry manifest.                |
| `/{name}.json`                | Generated registry item payload.                 |
| `/sources/{example}.txt`      | Generated source snapshot for example stories.   |

Implementation guardrail:

- Run `bun run openstory:generate` after registry source changes.
- Run `bun run build` before publishing so OpenStory and registry artifacts are
  copied into `dist`.
- Run `bun run smoke:public-site` against a local preview or deployed site.
- Run `bun run smoke:public-install` against a local preview or deployed site
  before changing registry URL behavior.

## Documentation Reference Story

Every component should eventually expose a first OpenStory entry that acts as
the documentation reference before the installable examples.

Required sections:

| Section              | Expectation                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| Description/Overview | Defines the component's scope and behavior boundary.                        |
| Installation         | Shows component install first, then example installs in registry order.      |
| Usage                | Shows minimal consumer import and direct use.                               |
| Foldkit integration  | Shows parent model, message, update, and submodel wiring when applicable.    |
| Preview and source   | Links to generated OpenStory examples and generated `/sources/*.txt` files. |
| Anatomy              | Shows an x-ray of rendered HTML, classes, styles, attributes, and parts.     |
| Styling              | Names class hooks, data attributes, variants, and state styling hooks.       |
| Keyboard interaction | Appears only when interactive keyboard behavior exists.                     |
| API                  | Lists props, callbacks, render hooks, types, and intentional omissions.      |
| Accessibility        | Names roles, names, ARIA, focus, disabled, and state behavior.              |
| Existing coverage    | Maps claims to scene tests, story checks, registry checks, and smokes.       |

The Anatomy section should support hovering a code element to highlight the
corresponding preview element and display relevant part metadata when the
component has meaningful nested markup.

The shared documentation display template marks its root with
`data-openstory-documentation-template`. Browser tests may use that selector to
prove they are targeting the OpenStory documentation route, not the retired
legacy docs app.

## Retired Legacy Docs App

The old `/docs/components/**`, `/examples/**`, and `docs-example-block-*`
contracts are retired. Do not add new runtime, navigation, Vite, TypeScript,
test, or guard-script dependencies on the hand-rolled docs app. Any remaining
`src/docsView.ts` content is reference-only until it is migrated into OpenStory
documentation references or explicitly discarded.
