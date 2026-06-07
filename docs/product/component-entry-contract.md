# Component Entry Contract

This is the canonical source of truth for adding, changing, reviewing, and
auditing registry components in Foldkit CN.

When this document conflicts with older planning docs, this document wins. Older
coverage matrices and expansion plans may provide historical context, but new
component work must be evaluated against this contract first.

## Purpose

A registry component entry is an installable, documented, tested component slice
for a Foldkit app. It must give consumers copy-and-paste source they can own,
while preserving Foldkit's Elm-style architecture and the behavior,
accessibility, and documentation expectations users bring from Base UI and
shadcn.

Each component entry must answer:

- What is the component's origin and artifact type?
- What source files are installed?
- What examples prove the component's intended use?
- What behavior, accessibility, styling, and state contracts are documented?
- What tests guard those claims?
- What generated public registry output proves it can be installed?

## Vocabulary

Use this vocabulary consistently in source, docs, metadata, and planning.

| Term      | Meaning in this repository                                                                  |
| --------- | ------------------------------------------------------------------------------------------- |
| Primitive | Headless behavior and accessibility, usually from `foldkit/dist/ui` or Base UI reference.   |
| Component | Styled, reusable registry UI under `registry/default/ui/{name}`.                            |
| Example   | Runnable installable demo under `registry/default/examples/{example-name}`.                 |
| Pattern   | Reusable behavior or UX solution documented through examples and tests.                     |
| Block     | Future higher-level composition that imports components instead of hiding domain behavior.  |
| Anatomy   | Named component parts such as Root, Label, Track, Indicator, Trigger, Content, or Item.     |
| Slot      | A consumer-owned content position or view callback, such as `contentView` or `renderValue`. |
| State     | Public styling or accessibility state exposed through ARIA, data attributes, or model tags. |

## Origin Policy

Each `registry:ui` item must declare its origin in `meta.foldkit.origin`.

| Origin    | Use When                                                                                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| `foldkit` | The component primarily packages an existing Foldkit UI primitive or a Foldkit-native behavior.                         |
| `base-ui` | The component is promoted to match Base UI anatomy, behavior, accessibility, examples, or API concepts in Foldkit form. |
| `shadcn`  | The component is a shadcn-style presentation component or shadcn example-parity slice.                                  |

Base UI is the preferred primitive and accessibility source for behavior-heavy
work. shadcn remains the styled registry and example-parity target, but
behavior-heavy shadcn slices must later be audited against the corresponding
Base UI contract when one exists.

## Naming And Paths

Use clean public names by default:

- `registry/default/ui/{name}`
- `registry/default/examples/{name}-basic`
- `/docs/components/{name}`
- `/r/{name}.json`

# john note: I actually always want origin name so it's explicit

Use `{origin}-{name}` only when two origins expose materially different
components with the same public name and both need to exist at the same time.

Examples should use upstream example names when matching Base UI or shadcn:

- Base UI examples should match the Base UI page's demo names, visible content,
  interaction behavior, keyboard expectations, and accessibility notes.
- Before deciding the example set is complete, inventory the whole upstream Base
  UI page, not just the section labelled `Examples`. Some Base UI pages have an
  initial hero/default demo that is not repeated in the examples list, plus one
  or more different examples farther down the page. Each distinct upstream demo
  must either become an installable registry example or be explicitly documented
  as intentionally deferred.
- shadcn examples should match shadcn example names and visible content.
- When an upstream example depends on another component, track that dependency
  and promote the dependency first when practical.

## Required Files

Every component entry has a component source slice, at least one example slice,
docs route wiring, generated public artifacts, and tests.

| File Or Area                                      | Required For        | Expectation                                                                 |
| ------------------------------------------------- | ------------------- | --------------------------------------------------------------------------- |
| `registry/default/ui/{name}/index.ts`             | every `registry:ui` | Public component API, exported types, JSDoc, Foldkit view helpers.          |
| `registry/default/ui/{name}/view.ts`              | every styled item   | Class constants, visual helper functions, style-only exports.               |
| `registry/default/ui/{name}/{name}.scene.test.ts` | every `registry:ui` | Behavior, accessibility, state, style hook, and inert/disabled proof.       |
| `registry/default/examples/{example}/main.ts`     | every example       | Runnable Foldkit example imported by docs and installed by registry.        |
| `registry/default/examples/{example}/entry.ts`    | every standalone    | Runtime boot only; never put pure component logic here.                     |
| `registry/default/examples/{example}/index.html`  | every standalone    | Minimal example shell pointing at `entry.ts`.                               |
| `registry/default/examples/{example}/*.test.ts`   | every example       | Scene test proving interaction, command/mount resolution, or inert state.   |
| `registry/default/items.json`                     | every registry item | shadcn-compatible registry metadata plus `meta.foldkit` metadata.           |
| `src/main.ts`                                     | every docs item     | Route, nav, origin grouping, docs page, live preview, source viewer wiring. |
| `src/main.scene.test.ts`                          | every docs item     | Docs route section, example block, and visible behavior proof.              |
| `src/main.story.test.ts`                          | stateful docs item  | Parent model/update/route behavior where relevant.                          |
| `src/ui/view/{name}.ts`                           | docs shell preview  | Embed view for `/docs/components/{name}` when applicable.                   |
| `apps/docs/public/sources/{example}.txt`          | every example       | Generated source snapshot used by the View code widget.                     |
| `apps/docs/public/r/{name}.json`                  | every item          | Generated public registry JSON.                                             |
| `docs/product/*-coverage-matrix.md`               | complex components  | Optional detail matrix; useful but subordinate to this contract.            |

## Component Source Contract

## Docs Navigation And Origin Contract

The docs sidebar/dock grouping is part of the component contract, not a
presentation detail. A component's docs nav group must match
`registry/default/items.json`:

- `meta.foldkit.origin: "base-ui"` appears under the `Base UI` docs group.
- `meta.foldkit.origin: "shadcn"` appears under the `shadcn` docs group.
- `meta.foldkit.origin: "foldkit"` appears under the `Foldkit` docs group.

When adding or changing a `registry:ui` item:

- Add the docs route to `NAV_ITEMS`.
- Ensure `docsNavItemLibrary` classifies the `{Component}Docs` route according
  to `meta.foldkit.origin`; never rely on the fallback for Base UI or shadcn
  components.
- Add source metadata to `COMPONENT_DOCS_METADATA_BY_SLUG` for every non-Foldkit
  origin so the docs meta grid shows the same origin as the registry metadata.
- Run `bun run check:registry`; the metadata guardrail must fail if a Base UI or
  shadcn docs route falls back into the Foldkit group.

### `index.ts`

`index.ts` is the consumer-facing API. It must be small, typed, documented, and
Foldkit-native.

Required:

- Export public view helpers such as `view`, `rootView`, `labelView`, or other
  anatomy part helpers where the component has meaningful parts.
- Export named config types for every public view helper:
  `ViewConfig`, `RootViewConfig`, `ItemViewConfig`, etc.
- Add JSDoc to public config types, callback types, context types, and each
  property that a consumer is expected to use.
- Add JSDoc to public functions, especially `view`, because consumers commonly
  hover that symbol first.
- Export context/callback types for Foldkit-native equivalents of React render
  functions:
  `RenderValue`, `FormatValue`, `GetAriaValueText`, `ContentView`, etc.
- Keep state changes in Foldkit update functions or primitives; view helpers
  must not perform side effects.
- Use Schema-backed models/messages for stateful examples or components.
- Prefer discriminated unions over nullable or boolean-heavy state, except when
  matching a public primitive contract where `null` has a clear semantic meaning
  such as indeterminate progress.

Forbidden:

- React APIs or React-shaped implementation details in registry source.
- Imperative DOM mutation in view helpers.
- Undocumented public props.
- Public `any` unless it is a deliberate compatibility boundary and documented.
- A namespace-only hover story. Consumers must be able to hover named exports or
  config types for useful detail.

### `view.ts`

`view.ts` owns presentation helpers and default styling constants.

Required:

- Export default class constants per anatomy part:
  `{component}RootClassName`, `{component}LabelClassName`, etc.
- Keep behavior out of style constants.
- Keep Tailwind defaults useful but replaceable.
- Export pure visual helper functions where useful:
  `progressPercent`, `statusDataAttribute`, variant class helpers, size class
  helpers, etc.
- Use names that match documented anatomy parts.

Default styling policy:

- `*ClassName` props append to default registry classes.
- `*Style` props apply inline styles to the same anatomy element.
- If a component needs replacement styling instead of additive styling, add an
  explicit documented option such as `unstyled`, not an ambiguous `className`
  behavior change.
- Document when inline style hooks are applied after computed component styles,
  because that means the consumer can override computed values.

## Anatomy Contract

Use an `Anatomy` docs section for Base UI-informed components and any component
with named parts.

The Anatomy section must:

# john note: this should be about the hiearchy of components as html, api ref will handle shape and functions

- Show part composition using Foldkit-native helpers.
- Use the same part names as the API table.
- Avoid React terms unless explicitly explaining the Foldkit-native equivalent.
- Show consumer-owned slots/view callbacks when they are part of the API.

Examples:

- Progress: Root, Label, Value, Track, Indicator.
- Dialog: Trigger, Root/Content, Title, Description, Footer, Close.
- Menu/Listbox/Select: Root, Trigger, Positioner/Popup, Item, Group, Label where
  applicable.

Static presentation components may omit Anatomy only when there are no useful
public parts beyond `view`.

## API Reference Contract

API reference must be useful enough that a consumer can understand the component
without reading the source first.

For new Base UI-informed components, use a table, not a loose bullet list.

Required table columns:

| Column      | Meaning                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| Part        | Anatomy part or `Types`, `State`, `Utility`, `Factory`, `Model`, etc.   |
| Prop        | Public prop, export, callback, data attribute, or type name.            |
| Type        | Concise TypeScript type or export kind.                                 |
| Default     | Default value or `-` when none.                                         |
| Description | Consumer-facing behavior, styling, accessibility, or state explanation. |

The API reference must document:

# john note: also add data attributes

- All exported config types.
- All public view helpers.
- All Foldkit-native callback/render equivalents.
- All public style hooks.
- All public class hooks.
- All public data attributes.
- ARIA/state behavior that consumers need for styling or accessibility.
- Important model/message/update exports for stateful primitives.
- Unsupported or deliberately deferred upstream API concepts when omission could
  surprise a consumer.

For older Foldkit-origin components, a bullet API list is acceptable until that
page is upgraded, but new work should use the table when the surface has more
than a few exports.

## Documentation Page Contract

Every component docs page is a product surface and a testable contract.

Required sections:

| Section              | Required When                                  | Expectation                                                           |
| -------------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| Header               | always                                         | Component name, origin label, concise description.                    |
| Metadata             | always                                         | Source, Origin, Artifact, Primitive when applicable, Examples, Proof. |
| Overview             | always                                         | v1 scope, behavior boundary, and upstream reference alignment.        |
| Examples             | always                                         | Installable examples via `docsExampleBlock`.                          |
| Installation         | always                                         | Component install first, then example installs in registry order.     |
| Usage                | always                                         | Minimal consumer import and direct use.                               |
| Foldkit integration  | stateful or parent-integrated components       | Model, Message, init, update, submodel, command mapping as needed.    |
| Anatomy              | always                                         | Foldkit-native part composition after Foldkit integration.            |
| Keyboard interaction | only when interactive keyboard behavior exists | Key map and focus behavior from Base UI/Foldkit contract.             |
| API reference        | always                                         | Table or detailed list as defined above.                              |
| Accessibility        | always                                         | Roles, names, ARIA, focus, disabled/read-only behavior.               |
| Coverage             | always                                         | Claims mapped to tests, registry checks, and browser checks.          |

Do not include a standalone `Styling` section for new Base UI-informed pages.
Document styling through the API reference table by listing class hooks, style
hooks, data attributes, state attributes, and anatomy parts.

For older pages that still use a standalone Styling section, treat that as
legacy documentation. Upgrade them opportunistically toward the API-table model.

Documentation must not:

- Link users to standalone example pages from the example block.
- Render route/install copy inline with interactive preview controls.
- Include keyboard sections for read-only, static, or inert components.
- Claim Base UI or shadcn parity that is not backed by source, tests, or an
  explicit documented deferral.

## Example Block Contract

Use `docsExampleBlock` for component docs examples.

Required structure:

| Region  | Expectation                                                             |
| ------- | ----------------------------------------------------------------------- |
| Card    | Vertical flex layout with stable min height.                            |
| Heading | Short example name only.                                                |
| Preview | Dedicated preview region. Interactive controls stay inside this region. |
| Actions | Dedicated row below preview, separated by a light top border.           |
| Source  | View code widget loads generated source snapshot in the actions region. |

Example blocks must:

- Use `data-testid` hooks for block, preview, and actions.
- Keep preview controls visually separate from source/view-code controls.
- Avoid standalone example links unless there is a deliberate debugging reason.
- Preserve readable code viewer contrast.
- Work at desktop and mobile widths without overflow or overlapping controls.

## Example Source Contract

Every example under `registry/default/examples/{example}` must be a real Foldkit
example, not a decorative mock.

Required:

- `main.ts` contains pure Foldkit definitions: Model, Message, init, update,
  view, Commands where needed.
- `entry.ts` boots runtime only.
- `index.html` references `entry.ts`.
- Example uses the registry component source directly.
- Parity examples are based on a complete upstream example inventory, including
  both the initial page demo and any examples listed later on the upstream page.
- Example content matches upstream Base UI or shadcn demo names and visible
  content when it is a parity example.
- Example tests exercise behavior through accessible locators or assert inert
  state for static examples.
- Source snapshot is generated into `apps/docs/public/sources/{example}.txt`.

Examples must not:

- Hide behavior in docs-only wrappers.
- Depend on untracked global state.
- Use React examples as implementation templates.
- Ship without a `.scene.test.ts`.

## Testing Contract

Each component entry must be guarded at the source, example, docs, registry, and
browser surface levels.

Required tests/checks:

| Surface         | Requirement                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Component scene | Prove roles, names, ARIA, data attributes, disabled/read-only states, styling hooks, and key interactions where relevant. |
| Example scene   | Prove the installable example's behavior or inert/static state.                                                           |
| Docs scene      | Prove docs route sections, visible example previews, source viewer, and important API text.                               |
| Story tests     | Prove update/model/message behavior for stateful components.                                                              |
| Registry checks | Prove generated JSON, metadata, source snapshots, and example test coverage.                                              |
| Browser e2e     | Prove docs layout and source viewer across desktop and mobile.                                                            |

Default verification commands:

```sh
bun run format
bun run typecheck
bun run build:registry
bun run check:registry
bun run lint
bun run test
bun run build
bunx playwright test tests/e2e/docs-shell.spec.ts tests/e2e/docs-surface.spec.ts tests/e2e/public-registry.spec.ts
```

Focused slices may run a narrowed Vitest or Playwright command while iterating,
but the full gate must pass before considering a broad docs/contract change
complete.

## Accessibility Contract

Every component must document and test accessibility behavior that applies to
its category.

Required when applicable:

- Accessible names for controls, regions, dialogs, inputs, and status elements.
- Roles and ARIA properties.
- Keyboard interaction and focus management.
- Disabled, read-only, invalid, selected, active, checked, open, closed, and
  loading states.
- Screen-reader-visible labels or descriptions.
- Data attributes that expose state for styling.
- No pointer-only interaction path for interactive components.

Read-only components should explicitly say no keyboard interaction is required in
Accessibility or API text, but they should not render a Keyboard interaction
section.

## Metadata Contract

Every `registry:ui` item in `registry/default/items.json` must include
Foldkit-specific metadata under `meta.foldkit`.

Required fields:

```json
{
  "meta": {
    "foldkit": {
      "origin": "foldkit | base-ui | shadcn",
      "artifact": "primitive-backed-component | component",
      "primitive": "Ui.Dialog"
    }
  }
}
```

`primitive` is required when the component wraps a Foldkit `Ui.*` primitive and
omitted when no Foldkit primitive applies.

Dependencies must be explicit in the registry item. If an example needs another
registry component, promote or include that dependency rather than relying on an
unstated source path.

## Generated Artifact Contract

Generated files are part of the public registry contract.

Required:

- `apps/docs/public/r/{name}.json` exists and is current.
- `apps/docs/public/r/{example}.json` exists and is current for every example.
- `apps/docs/public/r/index.json` includes the item.
- `apps/docs/public/sources/{example}.txt` exists and matches the example source
  used by the View code widget.
- `bun run check:registry` passes.

Do not manually edit generated registry JSON or source snapshots. Update source
and run `bun run build:registry`.

## Docs Shell Contract

The docs app is a SPA-style component browser.

Required:

- Left sidebar title: `Foldkit-basic-cn-ui`.
- Main heading/home copy: `Foldkit component registry`.
- Sidebar groups are labeled by library: Foldkit, Base UI, shadcn.
- Component selection persists in the sidebar while only the detail pane changes.
- Sidebar and detail pane have independent scroll areas.
- Component labels should indicate library origin through grouped navigation and
  concise badges where useful.

## Completion Checklist

A component entry is complete only when all applicable items are true:

- Source files exist and follow Foldkit conventions.
- Public types and properties have useful JSDoc.
- Anatomy is named and documented when applicable.
- API reference documents props, types, callbacks, class hooks, style hooks, data
  attributes, ARIA/state behavior, and deliberate omissions.
- Examples match upstream Base UI or shadcn demos when parity is the goal.
- Every example has a scene test.
- Component scene tests prove behavior and accessibility.
- Docs route renders required and conditional sections only.
- Docs scene tests and browser e2e guard the page contract.
- Registry metadata includes origin/artifact/primitive where applicable.
- Generated registry JSON and source snapshots are current.
- Verification commands pass.
- Any deferred upstream behavior is documented as a policy decision, not left
  implicit.

## Current Refinement Targets

These are known follow-up cleanups against this contract:

- Upgrade existing docs pages that still use generic Styling sections to move
  styling hooks into API reference tables.
- Remove Keyboard interaction sections from static/read-only components where no
  keyboard behavior exists.
- Backfill Anatomy sections for multi-part components.
- Backfill JSDoc for exported config/context/callback types.
- Audit already-promoted shadcn-origin slices against Base UI behavior and
  accessibility contracts after the Base UI pass.
- Continue Base UI promotion with this contract as the review checklist.
