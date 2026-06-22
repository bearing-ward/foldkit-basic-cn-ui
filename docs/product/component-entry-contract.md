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
| Lane      | A source registry folder for one component library, such as `foldkit`, `base-ui`, `shadcn`, or `ai-elements`. |
| Component | Styled, reusable registry UI under `registry/{lane}/ui/{name}`.                             |
| Example   | Runnable installable demo under `registry/{lane}/examples/{example-name}`.                  |
| Pattern   | Reusable behavior or UX solution documented through examples and tests.                     |
| Block     | Future higher-level composition that imports components instead of hiding domain behavior.  |
| Anatomy   | Named component parts such as Root, Label, Track, Indicator, Trigger, Content, or Item.     |
| Slot      | A consumer-owned content position or view callback, such as `contentView` or `renderValue`. |
| State     | Public styling or accessibility state exposed through ARIA, data attributes, or model tags. |

## Origin Policy

Each `registry:ui` item must declare its upstream reference in
`meta.foldkit.origin`. The value must be an `https://` URL for the component
being mirrored or wrapped, not a lane label.

| URL Family               | Use When                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `https://foldkit.dev/`   | The component shows the correct Foldkit functional implementation: model, messages, update, view wiring, and effects.    |
| `https://base-ui.com/`   | The component exposes the simple Base UI styled or unstyled lane, reusing Foldkit functionality where it already exists. |
| `https://ui.shadcn.com/` | The component exposes the opinionated shadcn style lane, reusing Foldkit functionality where it already exists.          |

Origin URLs identify the canonical component reference. The application and
registry guardrails derive the style/source lane from the URL family. Lanes are
not mutually exclusive functional coverage: a Foldkit-origin component can
satisfy the functional reference for a component name, but it does not satisfy
the Base UI or shadcn style lane by itself.

Base UI and shadcn slices should steal Foldkit behavior when a Foldkit primitive
or Foldkit-native implementation already exists. Base UI remains the simple
styled or unstyled lane. shadcn remains the opinionated styled lane and
example-parity target.

## Naming And Paths

Use clean public names only for Foldkit functional components:

- `registry/foldkit/ui/{name}`
- `registry/foldkit/examples/{name}-basic`
- `/{name}.json`

Base UI and shadcn style-lane components must always use an explicit origin
prefix, even when there is no overlap today:

- `registry/base-ui/ui/base-ui-{name}`
- `registry/shadcn/ui/shadcn-{name}`
- `registry/base-ui/examples/base-ui-{name}-{example}`
- `registry/shadcn/examples/shadcn-{name}-{example}`
- `/base-ui-{name}.json`
- `/shadcn-{name}.json`

The prefix is product language, not just a collision workaround. It keeps the
style lane visible in install names, OpenStory search, and generated registry
output. Existing non-Foldkit items should migrate to prefixed names;
compatibility aliases are not required.

Base UI and shadcn component identity is origin-page based. For every upstream
Base UI component page, the Base UI lane should have exactly one matching
component page and registry UI item named from that page. For every upstream
shadcn component page, the shadcn lane should have exactly one matching
component page and registry UI item named from that page. Do not split an
origin page into separate local component pages just because the upstream
implementation exposes sub-parts. Example: Base UI has a `Radio` page whose
anatomy uses `RadioGroup`; it does not have a `Radio Group` page, so the local
Base UI lane should be `base-ui-radio`, not `base-ui-radio-group`.

Base UI and shadcn are open-source source references, not inspiration boards.
When implementing or reviewing a Base UI or shadcn-origin component, compare
against the upstream docs and source code. Local markup, part nesting,
attributes, interaction behavior, keyboard behavior, spacing, orientation, and
visual output should match the origin as closely as Foldkit allows. Any
unavoidable Foldkit-specific difference must be documented as a parity gap, not
silently shipped as an approximation.

For shadcn-origin source, `src/lib/utils.ts` is the canonical local
shadcn-style utility module. Registry source may import it as
`@/src/lib/utils`; the project and generated consumer template both map `@/*`
to the repository root so the same path resolves locally and after install.
Use `cn` for shadcn class composition whenever a consumer `className` should be
able to override default Tailwind classes.

Base UI and shadcn-origin component content should be derived from checked-in
upstream snapshots or reproducible upstream command output where practical:
examples, visible copy, class contracts, variant names, theme tokens, and API
or anatomy vocabulary. `registry/upstream/source-manifest.json` records the
current source of truth and refresh commands. A component should not claim
source parity unless its derived contract is current.

shadcn-origin components should prefer upstream shadcn variant vocabulary such
as `variant`, `size`, `default`, `destructive`, `outline`, `secondary`,
`ghost`, and `link`. Export shadcn-shaped helpers such as `buttonVariants`
when the upstream component exposes them. Use `cn` for shadcn class composition
when consumer `className` should override defaults. The OpenStory shadcn
theme/style selector is implemented through preview globals, decorators, and
generated theme contracts; do not change OpenStory shell internals to support a
shadcn theme.

Base UI-origin behavior docs and APIs should prefer Base UI part names and
state/data-attribute vocabulary. Direct upstream packages and repository
snapshots are development references and guardrail inputs only. Installable
Foldkit source must not import React components, `@base-ui/react`, shadcn
repository paths, `repos/`, or `apps/docs/`; there is no React runtime wrapper
inside installable Base UI or shadcn Foldkit source.

Origin examples are content contracts. Do not replace upstream demo content with
local product copy, generic placeholder copy, or a different scenario just
because the local component API is easier to demonstrate that way. Example names,
visible copy, labels, placeholders, button text, links, media, icon intent,
grouping, header/content/footer placement, and action layout must come from the
origin page/source unless the row explicitly documents why the exact content
cannot be represented in Foldkit yet. A component with invented content is
registry-covered, but it is not origin-parity complete.

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
- Every Base UI or shadcn component pass must reconcile the origin examples
  against our implementation before it is considered complete. Inventory the
  current origin URL from `meta.foldkit.origin`, compare its examples to
  `registry/{lane}/examples/{origin-lane}-{name}-*`, OpenStory stories, source
  snapshots, generated registry JSON, and scene tests, then either add the
  missing matching example or document the deliberate deferral with the reason.
- Reconciliation must compare more than names and text. Match the origin
  example's structure, orientation, and visual design intent: which component
  parts are nested, whether content is vertical or horizontal, where media,
  headers, actions, and footers sit, and which visual variant makes the example
  distinct. If the local primitive cannot match that structure, document the
  gap instead of publishing a same-named approximation.
- Use `docs/product/origin-parity-prompt.md` as the required prompt/checklist for
  Base UI and shadcn origin parity work. The acceptance bar is side-by-side
  visual and behavior parity with the origin, with documented constraints for
  any unavoidable local differences.
- Track the current reconciliation agenda in
  `docs/product/origin-parity-audit.md`. Do not treat a covered example as
  complete until it is marked verified/fixed there or in a newer audit artifact.
- Track the active row-by-row origin-content review in
  `docs/product/origin-content-parity-review.md`. That file is the checklist for
  current shadcn and Base UI rows that still need content, structure, behavior,
  and visual parity review. A row should stay unchecked until side-by-side origin
  comparison, local browser evidence, scene/browser tests, source snapshots, and
  generated registry JSON all agree.

## Required Files

Every component entry has a component source slice, at least one example slice,
source registry metadata, generated OpenStory coverage, generated public
artifacts, and tests.

| File Or Area                                      | Required For        | Expectation                                                                 |
| ------------------------------------------------- | ------------------- | --------------------------------------------------------------------------- |
| `registry/{lane}/ui/{name}/index.ts`              | every `registry:ui` | Public component API, exported types, JSDoc, Foldkit view helpers.          |
| `registry/{lane}/ui/{name}/view.ts`               | every styled item   | Class constants, visual helper functions, style-only exports.               |
| `registry/{lane}/ui/{name}/{name}.scene.test.ts`  | every `registry:ui` | Behavior, accessibility, state, style hook, and inert/disabled proof.       |
| `registry/{lane}/examples/{example}/main.ts`      | every example       | Runnable Foldkit example imported by stories and installed by registry.     |
| `registry/{lane}/examples/{example}/entry.ts`     | every standalone    | Runtime boot only; never put pure component logic here.                     |
| `registry/{lane}/examples/{example}/index.html`   | every standalone    | Minimal example shell pointing at `entry.ts`.                               |
| `registry/{lane}/examples/{example}/*.test.ts`    | every example       | Scene test proving interaction, command/mount resolution, or inert state.   |
| `registry/{lane}/registry.json`                   | every registry item | shadcn-compatible registry metadata plus `meta.foldkit` metadata.           |
| `registry/registry.json`                          | every lane          | Root source manifest that includes child lane registries in public order.   |
| `src/openstory/generated/{name}.stories.ts`       | every docs item     | Generated OpenStory coverage for the component and installable examples.    |
| `apps/docs/public/sources/{example}.txt`          | every example       | Generated source snapshot used by the source viewer.                        |
| `apps/docs/public/{name}.json`                    | every item          | Generated public registry JSON.                                             |
| `docs/product/*-coverage-matrix.md`               | complex components  | Optional detail matrix; useful but subordinate to this contract.            |

## Installed component updates

Installed registry files are app-owned source after they are copied into a
consuming app. Future update tooling must default to non-destructive behavior
and preserve source-owned local edits unless the operator explicitly opts into
overwrite behavior.

Supported update modes:

- `inspect`: show the available upstream version and source differences without
  writing to the consuming app.
- `apply-clean`: write updated files only when each installed file still matches
  its recorded source snapshot.
- `merge-assisted`: produce a patch or conflict report when local files have
  changed since installation.
- `force`: overwrite app-owned files only when the operator passes an explicit
  destructive flag.

To support those modes, a CLI must record minimum metadata for each installed
component in the consuming app:

- registry URL or registry alias.
- Component name.
- Installed registry item version/hash or content digest.
- file list and target paths.
- dependency items installed with the component.
- Timestamp and CLI version when available.

This contract does not choose a storage format. Future CLI work should define
that implementation detail without weakening the default local-edit protection.

## Component Source Contract

## OpenStory Navigation And Origin Contract

OpenStory grouping is part of the component contract, not a presentation
detail. A component's story group and generated registry output must match the
included source registry metadata from `registry/registry.json` and its child
lane registries:

- `meta.foldkit.origin` under `https://base-ui.com/` appears under the `Base UI`
  docs group.
- `meta.foldkit.origin` under `https://ui.shadcn.com/` appears under the
  `shadcn` docs group.
- `meta.foldkit.origin` under `https://elements.ai-sdk.dev/` appears under the
  `AI Elements` docs group.
- `meta.foldkit.origin` under `https://foldkit.dev/` appears under the `Foldkit`
  docs group.
- AI Elements entries must be Foldkit-native translations of the upstream
  registry behavior surface. Do not wrap or import the upstream React
  implementation.

When adding or changing a `registry:ui` item:

- Add the item to the correct child lane registry.
- Keep the item name prefixed for non-Foldkit lanes so OpenStory search,
  install URLs, and registry aliases expose the library origin.
- Ensure `meta.foldkit.origin` is present for every `registry:ui` item.
- Run `bun run openstory:generate` and `bun run check:registry`; the metadata
  guardrail must fail if a Base UI, shadcn, or AI Elements item is missing or
  misclassified.

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

`view.ts` owns presentation helpers and default styling composition.

Required:

- Export typed style helpers or variant helpers with semantic names such as
  `buttonVariants({ variant, size })`, `avatarRoot({ size })`, or
  `{component}{Part}Classes(config)`.
- Compose default classes through `cn` from `@/src/lib/utils` when joining
  Tailwind strings.
- Keep behavior out of style helpers.
- Keep Tailwind defaults useful and tied to typed component options.
- Export pure visual helper functions where useful:
  `progressPercent`, `statusDataAttribute`, variant helpers, size helpers,
  part helpers, etc.
- Use names that match documented anatomy parts.
- Apply helper output with `h.Class(...)` inside Foldkit views.

Default styling policy:

- Public style extension uses typed variant, size, tone, orientation, part, or
  lane-specific options, not arbitrary string style overrides on component
  config.
- One-off consumer classes belong in caller-owned wrapper markup through
  `h.Class(...)`.
- If a component needs replacement styling instead of additive styling, add an
  explicit documented option such as `unstyled`, not an ambiguous style escape
  hatch.
- `*Style` props may apply inline styles to the same anatomy element when the
  component documents that inline styles are part of its public contract.
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

## OpenStory Documentation Reference Contract

Every component should have a first OpenStory entry that acts as its
documentation reference before the interactive example stories.

Required sections:

| Section              | Required When                                  | Expectation                                                                 |
| -------------------- | ---------------------------------------------- | --------------------------------------------------------------------------- |
| Header               | always                                         | Component name, origin label, concise description.                          |
| Metadata             | always                                         | Source, Origin, Artifact, Primitive when applicable, Examples, Proof.       |
| Description/Overview | always                                         | v1 scope, behavior boundary, and upstream reference alignment.              |
| Installation         | always                                         | Component install first, then example installs in registry item order.      |
| Usage                | always                                         | Minimal consumer import and direct use.                                     |
| Foldkit integration  | stateful or parent-integrated components       | Model, Message, init, update, submodel, command mapping as needed.          |
| Anatomy              | always                                         | X-ray style rendered HTML map with part names, classes, styles, attributes. |
| Styling              | always                                         | Class hooks, style hooks, data attributes, state attributes, and variants.  |
| Keyboard interaction | only when interactive keyboard behavior exists | Key map and focus behavior from Base UI/Foldkit contract.                   |
| API reference        | always                                         | Props, callbacks, slots/render hooks, types, and deliberate omissions.      |
| Accessibility        | always                                         | Roles, names, ARIA, focus, disabled/read-only behavior.                     |
| Existing coverage    | always                                         | Claims mapped to scene tests, story tests, registry checks, and smokes.     |

The Anatomy section should be interactive when the component has meaningful
markup: hovering a code element highlights the corresponding preview element
and displays the relevant part name, classes, data attributes, ARIA attributes,
and style hooks. Static anatomy text is acceptable only for tiny single-element
components.

Documentation must not:

- Render route/install copy inline with interactive preview controls.
- Include keyboard sections for read-only, static, or inert components.
- Claim Base UI or shadcn parity that is not backed by source, tests, or an
  explicit documented deferral.

## Legacy Docs App Example Block Contract

Use this section only for the legacy Vite docs app while it remains in the
repository. New public component browsing should use OpenStory stories.

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

Every example under `registry/{lane}/examples/{example}` must be a real Foldkit
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
| OpenStory check | Prove generated stories exist for component documentation and installable examples.                                      |
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

Every `registry:ui` item in each included child registry must include
Foldkit-specific metadata under `meta.foldkit`.

Required fields:

```json
{
  "meta": {
    "foldkit": {
      "origin": "https://foldkit.dev/ui/dialog",
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

- `apps/docs/public/{name}.json` exists and is current.
- `apps/docs/public/{example}.json` exists and is current for every example.
- `apps/docs/public/registry.json` includes the item.
- `apps/docs/public/sources/{example}.txt` exists and matches the example source
  used by the View code widget.
- `bun run check:registry` passes.

Do not manually edit generated registry JSON or source snapshots. Update source
and run `bun run build:registry`.

## OpenStory Shell Contract

The public site is an OpenStory component browser backed by the generated
registry JSON.

Required:

- The OpenStory manifest is present at `/__openstory/manifest.json`.
- Component story titles expose library grouping: Foldkit, Base UI, shadcn, and
  AI Elements.
- Registry files are available from the same site root:
  `/components.json`, `/registry.json`, and `/{name}.json`.
- Source snapshots are available under `/sources/{example}.txt`.
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
- OpenStory docs reference entry renders required and conditional sections only.
- OpenStory checks and browser smokes guard the public site contract.
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
