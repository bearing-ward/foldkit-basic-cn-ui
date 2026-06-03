# Foldkit Shadcn Registry Plan

## Product Boundary

This repository will become Foldkit CN: a Foldkit-native component registry, documentation site, example catalog, and public shadcn-style install source in one repo.

The v1 product is registry-first, not npm-package-first:

- Public GitHub repository.
- Documentation site.
- Shadcn-compatible registry JSON served from a public URL.
- Installable Foldkit component source.
- Installable examples and tests.

An npm component package is deferred until demand proves that a traditional package API is useful.

## Naming And Relationship To Foldkit UI

Use these public names for now:

- Product name: `Foldkit CN`
- Registry name: `foldkit-cn`
- Registry namespace: `@foldkit-cn`

Plan to rename the repository to `foldkit-cn` later, but defer that operational step until deployment or public URL setup needs it.

Foldkit CN is a registry first, component library second. It is not a starter kit.

Recommended positioning:

```text
Foldkit CN is a shadcn-style registry of styled, installable Foldkit component slices, examples, tests, and documentation.
```

Foldkit CN must not conflict with official Foldkit UI. Official Foldkit UI is the headless component layer built into Foldkit and documented at:

```text
https://foldkit.dev/ui/overview
```

The overview and installation docs should include this relationship statement:

```text
Foldkit CN is not the official Foldkit UI documentation. Foldkit UI is the headless component layer built into Foldkit. Foldkit CN packages styled, shadcn-style source slices on top of those primitives so you can copy components, examples, and tests into your app.
```

Preferred vocabulary:

- registry item
- installable component slice
- copy-and-own source
- Foldkit UI primitive

Avoid:

- package component
- runtime library
- official Foldkit UI
- starter template

## Repository Shape

Use a monorepo-style layout inside the single repository:

```text
apps/docs/              # Foldkit documentation site
registry/default/ui/    # installable component source
registry/default/lib/   # explicit shared registry utilities
registry/default/examples/
registry/schema/        # registry item types and build helpers
scripts/                # registry build and validation scripts
```

Only the `default` style variant is supported in v1, but the folder shape reserves space for future variants.

## Registry Contract

The registry should target shadcn v4's public registry schemas:

- `registry-item.json`
- `registry.json`
- JSON Schema draft-07

Use the shadcn v4 shape unless Foldkit requires a narrow extension. Put Foldkit-specific data under `meta.foldkit` instead of changing the schema.

Registry item type policy:

- `registry:ui` for installable component slices.
- `registry:lib` for shared utilities like `cn`, `id`, and `test`.
- `registry:item` for examples or arbitrary multi-file installs.

Registry source is organized by component name. Generated registry output controls consumer install paths.

Example source shape:

```text
registry/default/ui/dialog/
  model.ts
  message.ts
  update.ts
  view.ts
  index.ts
  dialog.story.test.ts
  dialog.scene.test.ts
```

Consumer install target:

```text
src/ui/dialog/
  model.ts
  message.ts
  update.ts
  view.ts
  index.ts
  dialog.story.test.ts
  dialog.scene.test.ts
```

Each registry item must explicitly declare:

- dependencies
- devDependencies
- registryDependencies
- files

Generated registry JSON is static, committed in v1, and served by the docs site:

```text
apps/docs/public/r/index.json
apps/docs/public/r/dialog.json
apps/docs/public/r/dialog-basic.json
```

The docs app imports registry source directly. Generated JSON is for external consumers.

The public registry should use GitHub Pages-compatible static URLs, with the concrete base URL kept configurable until the final owner, repo name, and host are settled:

```ts
export const registryConfig = {
  name: "foldkit-cn",
  homepage: "https://<host>",
  registryBaseUrl: "https://<host>/r",
};
```

The likely public URL shape is:

```text
https://<github-owner>.github.io/<repo-name>/r/{name}.json
```

The consumer config template should be maintained as source and published with the docs site:

```text
registry/templates/components.json
apps/docs/public/components.json
```

Recommended starter config:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "ui": "src/ui",
    "lib": "src/lib"
  },
  "registries": {
    "@foldkit-cn": "https://<host>/r/{name}.json"
  }
}
```

Registry validation should enforce, before the first `Dialog` slice ships:

- every registry source item builds to valid shadcn v4 registry JSON
- generated JSON is up to date
- every file listed in JSON exists in registry source
- every item has `name`, `type`, `files`, and explicit dependency arrays
- every import from another registry item is declared in `registryDependencies`
- every package import is declared in `dependencies` or `devDependencies`
- every target path lands under approved aliases: `src/ui`, `src/lib`, or tests beside those files
- no registry source imports from `apps/docs`
- docs can import registry source, but registry source cannot import docs
- no source imports from `repos/*`
- stateful components include `index.ts`, `model.ts`, `message.ts`, `update.ts`, `view.ts`, and tests
- generated JSON validates against the local copied shadcn v4 schema

## Component Contract

Stateful components install as full Foldkit slices:

- `Model`
- `Message`
- `OutMessage` where parent-relevant facts exist
- `init`
- `update`
- `view`
- commands when needed
- tests

Stateless components install only the files they genuinely need, usually `view.ts`, `index.ts`, and scene tests.

Every component exposes a public `index.ts` barrel as the canonical import path:

```ts
import * as Dialog from "./ui/dialog";
```

## Component Slice Status

| Component   | Status          | Notes                                                                                                                                           |
| ----------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Button      | Active v1 slice | Registry wrapper, basic example, disabled example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |
| Calendar    | Active v1 slice | Registry wrapper, basic example, bounds example, docs page, route coverage, generated registry output, and coverage matrix are in place.        |
| Checkbox    | Active v1 slice | Registry wrapper, basic example, indeterminate example, docs page, route coverage, generated registry output, and coverage matrix are in place. |
| DatePicker  | Active v1 slice | Registry wrapper, basic example, bounds example, docs page, route coverage, generated registry output, and coverage matrix are in place.        |
| Dialog      | Frozen for v1   | Registry wrapper, basic, animated, destructive, focus, scrollable examples, docs page, route probes, and coverage matrix are complete.          |
| Disclosure  | Active v1 slice | Registry wrapper, basic example, disabled example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |
| DragAndDrop | Active v1 slice | Registry wrapper, basic example, disabled example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |
| Fieldset    | Active v1 slice | Registry wrapper, basic example, disabled example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |
| FileDrop    | Active v1 slice | Registry wrapper, basic example, disabled example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |
| Input       | Active v1 slice | Registry wrapper, basic example, disabled example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |
| Popover     | Frozen for v1   | Registry wrapper, basic example, animated example, docs page, route coverage, generated registry output, and coverage matrix are complete.      |
| Menu        | Frozen for v1   | Registry wrapper, basic example, animated example, docs page, route coverage, generated registry output, and coverage matrix are complete.      |
| Listbox     | Active v1 slice | Registry wrapper, basic example, animated example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |
| Select      | Active v1 slice | Registry wrapper, basic example, disabled example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |
| Combobox    | Active v1 slice | Registry wrapper, basic example, multi example, docs page, route coverage, generated registry output, and coverage matrix are in place.         |
| RadioGroup  | Active v1 slice | Registry wrapper, basic example, horizontal example, docs page, route coverage, generated registry output, and coverage matrix are in place.    |
| Slider      | Active v1 slice | Registry wrapper, basic example, disabled example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |
| Switch      | Active v1 slice | Registry wrapper, basic example, disabled example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |
| Tabs        | Active v1 slice | Registry wrapper, basic example, manual example, docs page, route coverage, generated registry output, and coverage matrix are in place.        |
| Textarea    | Active v1 slice | Registry wrapper, basic example, disabled example, docs page, route coverage, generated registry output, and coverage matrix are in place.      |

Stateful component `init` returns `[Model, Commands]`:

```ts
export type InitReturn = readonly [
  Model,
  ReadonlyArray<Command.Command<Message>>,
];
```

Stateful component `update` includes an `Option<OutMessage>` channel:

```ts
export type UpdateReturn = readonly [
  Model,
  ReadonlyArray<Command.Command<Message>>,
  Option.Option<OutMessage>,
];
```

`OutMessage` is limited to parent-relevant semantic facts, not internal lifecycle details.

Examples:

- `SelectedItem`
- `ChangedChecked`
- `ClosedDialog`
- `DismissedToast`

Avoid outward messages like:

- `FocusedTrigger`
- `MeasuredPanel`
- `CompletedLockScroll`

## State Ownership

V1 defaults to local component state plus `OutMessage`, not fully controlled component APIs.

Plain form values are parent-owned by default:

- `Input`
- `Textarea`
- `Checkbox` when used as form state
- `RadioGroup` selected value
- `Switch`

Composite widgets may own interaction state and emit semantic changes:

- `Dialog`
- `Select`
- `Combobox`
- `Tabs`
- `Toast`
- `Menu`
- `Popover`

Parent-owned form values are passed into `view` as explicit view inputs rather than stored in the component model.

## Foldkit Primitive Policy

Prefer Foldkit `Ui.*` primitives where they exist.

Rules:

- If a Foldkit primitive exists, package it with registry conventions.
- If no primitive exists, implement a Foldkit-native component module.
- If a primitive is insufficient, document the gap and consider an upstream Foldkit change before local workarounds.

Registry components expose component-specific public modules even when they delegate to Foldkit internals.

The module namespace is the public name, while the internal Foldkit primitive stays explicit in implementation:

```ts
import * as Dialog from "./ui/dialog";

Dialog.Model;
Dialog.Message;
Dialog.OutMessage;
Dialog.init;
Dialog.update;
Dialog.view;
```

Implementation files may delegate to Foldkit primitives:

```ts
import { Ui } from "foldkit";

export const Model = Ui.Dialog.Model;
export const Message = Ui.Dialog.Message;
```

Avoid public names like `FoldkitDialog`, `UiDialog`, or `DialogPrimitive`.

When Base UI has behavior that Foldkit does not, use this gap policy:

1. Document the gap in component docs and implementation notes.
2. Spike locally only if the behavior is needed for the registry component.
3. Upstream the behavior to Foldkit once it stabilizes and is broadly useful.

Local spikes must stay Foldkit-native and should not copy React API patterns directly.

## Dialog V1 API Contract

The first `Dialog` registry component should mirror Foldkit `Ui.Dialog` publicly while normalizing `init` to the registry component contract and adding styled view helpers.

Foldkit `Ui.Dialog` already provides:

- `Model`
- `Message`
- `OutMessage`
- `RequestedOpen`
- `RequestedClose`
- `Opened`
- `Closed`
- `init`
- `update`
- `open`
- `close`
- `view`
- `titleId`
- `descriptionId`

Registry `Dialog` should expose the same public concepts from `registry/default/ui/dialog/index.ts`:

```ts
export {
  Model,
  Message,
  OutMessage,
  RequestedOpen,
  RequestedClose,
  Opened,
  Closed,
  init,
  update,
  open,
  close,
  view,
  titleId,
  descriptionId,
};
```

Use registry-local files:

```text
registry/default/ui/dialog/
  model.ts
  message.ts
  update.ts
  view.ts
  index.ts
```

`Ui.Dialog.init` returns only `Model`, but registry stateful components return `[Model, Commands]`. Therefore registry `Dialog.init` wraps the Foldkit primitive:

```ts
export const init = (config: InitConfig): InitReturn => [
  Ui.Dialog.init(config),
  [],
];
```

The trigger stays outside the main `Dialog.view`. Opening the dialog starts with a `Message`, not a `Command`:

```ts
h.OnClick(GotDialogMessage({ message: Dialog.RequestedOpen() }));
```

Then `Dialog.update` returns the DOM command that calls `showModal`.

`view.ts` should expose composable styled parts plus a default composed view. The default view is for common usage; advanced users can compose parts around `Ui.Dialog.view`.

Initial exports:

- `trigger`
- `root`
- `backdrop`
- `panel`
- `title`
- `description`
- `closeButton`
- `footer`
- `confirmButton`
- `cancelButton`
- `view`

Core `Dialog.view` inputs should use markup callbacks or slots first, with string helpers only as convenience. String-only props are too limiting for a copy-and-own registry.

Dialog v1 styling variants:

- `default`
- `destructive`

Variants are view styling intent, not model state.

`AlertDialog` should be a separate component later, not a Dialog v1 variant. Destructive Dialog styling is for standard cancel/confirm flows only; it is not an alert semantics substitute.

Dialog v1 behavior:

- Escape closes.
- Backdrop click closes.
- Close button closes.
- Confirm and cancel actions are example-specific.
- Do not add a disable-backdrop-close option in v1.
- Examples default to animated dialogs with `isAnimated: true`.
- `focusSelector` is part of the documented API.
- `h.OnClickFocus` should be documented for iOS keyboard warmup flows where a trigger opens a dialog containing a text input.
- Nested or stacked dialogs are unsupported in Dialog v1. Keep one active Dialog per flow; true modal stacking should be a future coordinator or separate component with its own state, focus, and escape-key tests.
- RTL is inherited from `dir` on the document, page region, or preview wrapper. Dialog v1 should document `h.Dir("rtl")` composition and must not add direction to Dialog model state.
- AlertDialog remains a separate future component. Do not add AlertDialog variants, model fields, messages, or registry dependencies to Dialog v1.
- Command Dialog remains a separate future component. Do not add search, filtering, active option, or command/listbox keyboard state to Dialog v1.
- Drawer remains a separate future component. Do not add side, placement, or responsive drawer sizing props to Dialog v1.

## Styling Policy

Ship shadcn-like Tailwind defaults in v1, while keeping behavior modules independent from styling.

Behavior should not depend on class names except where selectors are required for accessibility, focus, or DOM commands.

Docs should include:

- default styled examples
- unstyled/headless integration notes where useful
- customization examples when useful

## Shared Utilities

Shared utilities are allowed only as explicit registry dependencies.

V1 shared utilities are intentionally tiny:

```text
registry/default/lib/cn.ts
registry/default/lib/id.ts
registry/default/lib/test.ts
```

Do not add broad utility grab bags like `keyboard.ts`, `a11y.ts`, `collection.ts`, or `focus.ts` until duplication proves they are needed.

## Documentation

Docs are structured data rendered by Foldkit views, not MDX-first in v1.

Docs route taxonomy:

```text
/
/docs
/docs/installation
/docs/registry
/docs/components
/docs/components/dialog
/docs/components/dialog/examples/basic
/docs/components/dialog/examples/animated
/docs/components/dialog/examples/destructive
/docs/components/dialog/examples/focus
/docs/components/dialog/examples/scrollable
/docs/components/button
/docs/components/input
/docs/guides/foldkit-integration
/docs/guides/testing
/docs/guides/theming
/docs/guides/registry-authoring
```

Route rules:

- `/docs/components/<name>` is component-specific documentation.
- `/docs/guides/*` covers reusable Foldkit and registry concepts.
- `/docs/components/<name>/examples/<example>` renders standalone examples.

Every stateful component page requires a first-class "Foldkit integration" section covering:

- parent `Model` field
- parent `Message` wrapper
- init composition
- update composition
- view/submodel wiring
- command mapping
- tests to run

Documentation pages should follow a Base UI/shadcn-like format:

- overview
- installation
- usage
- Foldkit integration
- examples
- API
- accessibility
- testing

Docs must dogfood registry source directly. Demo wrappers may exist, but component behavior and view code should come from registry-owned source.

Use live previews and browser checks for v1. Do not add a screenshot pipeline for the first Dialog slice. Screenshots can come later for Open Graph images, preview cards, and marketing polish.

Every component page and test suite should carry a behavior-specific accessibility checklist derived from Base UI behavior docs plus Foldkit scene tests.

Minimum accessibility requirements:

- keyboard support documented
- roles and ARIA expectations documented
- focus behavior documented
- disabled or read-only behavior documented where applicable
- screen-reader-visible labels or accessible names documented
- scene tests for at least one keyboard path
- scene tests using accessible role/name queries
- no pointer-only interaction path

For `Dialog`, specifically:

- trigger has an accessible name
- dialog has role and accessible name
- opening moves focus inside
- Escape closes
- backdrop or close button closes if supported
- focus returns to trigger after close where Foldkit supports it
- body scroll lock behavior is documented
- nested or stacked dialog policy is documented as unsupported in v1

Foldkit `0.104.0` adds `h.OnClickFocus(focusSelector, message)` for click handlers that must synchronously focus an existing element before dispatching their message. Dialog docs should still document `focusSelector` as the post-open target, and should also document `OnClickFocus` for iOS keyboard warmup flows where a trigger opens a dialog containing a text input.

## Examples

Examples have one definition that powers:

- inline docs previews
- standalone example routes
- registry example JSON
- scene tests

Examples are installable registry items separate from component items.

Component install:

```bash
shadcn add dialog
```

Example install:

```bash
shadcn add dialog-basic
```

## Testing Strategy

Tests are part of the component unit.

Component and example tests are registry-installable:

- `*.story.test.ts`
- `*.scene.test.ts`

Docs-site tests stay repo-only and verify:

- documentation routing
- inline previews
- standalone example routes
- registry dogfooding

The test matrix should include:

- component story tests
- component scene tests
- example scene tests
- registry schema validation
- registry dependency/import validation
- docs navigation/render tests

## First Milestone Scope

The first architecture-proof component set is:

- `Button`
- `Input`
- `Checkbox`
- `Dialog`
- `Select`
- `Tabs`
- `Toast`

The first implementation slice is a complete `Dialog` vertical slice, not a broad repo restructure.

## Dialog Slice Definition Of Done

The first `Dialog` slice is done when all of this exists and passes together:

- `registry/default/ui/dialog/` contains public source, tests, and a public `index.ts`.
- `registry/default/examples/dialog-basic/`, `dialog-animated/`, `dialog-destructive/`, `dialog-focus/`, and `dialog-scrollable/` contain runnable examples importing the registry `Dialog` source.
- `apps/docs/` has a Dialog docs page rendered by Foldkit.
- The Dialog docs page has inline previews using the same registry examples.
- Standalone Dialog example routes exist.
- The Dialog docs page includes Foldkit integration, accessibility, composition, RTL, AlertDialog, Command Dialog, Drawer, browser focus proof, and traceability checklist sections.
- `apps/docs/public/r/dialog.json` is generated and committed.
- `apps/docs/public/r/dialog-basic.json` is generated and committed.
- `apps/docs/public/r/dialog-animated.json` is generated and committed.
- `apps/docs/public/r/dialog-destructive.json` is generated and committed.
- `apps/docs/public/r/dialog-focus.json` is generated and committed.
- `apps/docs/public/r/dialog-scrollable.json` is generated and committed.

Required verification:

```bash
bun run typecheck
bun run test
bun run build:registry
bun run check:registry
bun run build
```

Also perform a browser check of the Dialog docs page and standalone example route.

## Open Questions

- What should the first Dialog registry source API look like in exact TypeScript?
- How should the initial docs app be migrated from the current single Vite app shape into `apps/docs/`?
- Should the first Dialog slice reuse the existing app's `Ui.Dialog` demo code, or start fresh from a registry-owned module?
- What should the first `build:registry` implementation generate manually versus derive from source metadata?
