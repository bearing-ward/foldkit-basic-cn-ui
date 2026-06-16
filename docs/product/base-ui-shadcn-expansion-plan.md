# Base UI and shadcn Expansion Plan

Canonical component-entry expectations now live in
[`component-entry-contract.md`](./component-entry-contract.md). Use that
contract for source, docs, examples, tests, metadata, generated artifacts, and
completion criteria. This expansion plan tracks sequencing and backlog only.

## Goal

Foldkit CN should grow from “styled coverage for current Foldkit UI primitives”
into a shadcn-style registry that covers the common Base UI and shadcn component
surface area. Base UI is the preferred primitive and accessibility reference for
new behavior work. shadcn remains the styled registry and example-parity target,
but further shadcn promotion is paused until the Base UI primitive layer is in a
stronger place. New items must keep the same installable slice contract:
registry item, example, docs page, source viewer, scene/e2e coverage, generated
JSON, and public install smoke compatibility.

## Current Baseline

Current registry UI items:

- animation
- badge
- button
- calendar
- checkbox
- disclosure
- drag-and-drop
- fieldset
- file-drop
- input
- listbox
- menu
- popover
- radio-group
- select
- slider
- switch
- tabs
- textarea
- toast
- tooltip
- virtual-list

These cover all 24 current `foldkit/dist/ui` exports.

## External Targets

shadcn component list source:

- https://ui.shadcn.com/docs/components

Base UI component list source:

- https://base-ui.com/react/overview/quick-start

Base UI version observed during this pass:

- `@base-ui/react` 1.5.0 in Base UI docs navigation.

Component quality standard to consider during expansion:

- https://www.components.build/
- Use this as a reference point for modern, composable, accessible component
  library expectations: clear artifact taxonomy, composition-first APIs, lean
  dependencies, consumer control, accessibility, documentation, and developer
  experience.

Definitions vocabulary to adopt:

- https://www.components.build/definitions
- Use the artifact taxonomy intentionally:
  - `Primitive`: headless behavior and accessibility with no styling. In this
    repo, current `foldkit/dist/ui` exports such as `Ui.Dialog`,
    `Ui.Combobox`, and `Ui.Tabs` are primitives.
  - `Component`: styled, reusable UI built from primitives or composed markup.
    Registry entries under `registry/default/ui/{name}` are the primary
    component artifacts.
  - `Pattern`: documented recurring interaction or UX solution such as
    destructive confirmation, form validation, typeahead, or optimistic UI.
  - `Block`: opinionated production-ready composition for a concrete interface
    use case. Future blocks should import components rather than hide domain
    logic.
  - `Page` and `Template`: future higher-level registry categories, not the
    current focus.
  - `Utility`: non-visual helpers such as class utilities, keybinding helpers,
    focus helpers, or ID helpers.
- Use the API/composition vocabulary in docs when applicable:
  `slots`, `render prop`, `controlled`, `uncontrolled`, `provider/context`,
  `portal`, `headless`, `styled`, `variants`, `design tokens`,
  `role/state/property`, `keyboard map`, `focus management`, and
  `copy-and-paste source distribution`.

## shadcn Lane Coverage

shadcn is the opinionated style lane. A Foldkit functional implementation with
the same component name does not count as shadcn lane coverage.

Present shadcn lane components:

- accordion
- alert
- alert-dialog
- aspect-ratio
- avatar
- badge
- breadcrumb
- button
- button-group
- calendar
- card
- carousel
- chart
- checkbox
- collapsible
- combobox
- command
- context-menu
- data-table
- date-picker
- dialog
- direction
- drawer
- dropdown-menu
- empty
- field
- hover-card
- input
- input-group
- input-otp
- item
- kbd
- label
- menubar
- native-select
- navigation-menu
- pagination
- popover
- progress
- radio-group
- resizable
- scroll-area
- select
- separator
- sheet
- sidebar
- skeleton
- slider
- sonner
- spinner
- switch
- table
- tabs
- textarea
- toast
- typography

Missing shadcn lane components:

None.

New shadcn work should focus on opinionated style parity:

- example-name parity and visible-content parity
- anatomy depth and composition guidance
- API reference completeness
- data attributes and accessibility notes
- scene tests for interactive behavior

## Base UI Lane Coverage

Base UI is the simple styled or unstyled lane. A Foldkit functional
implementation with the same component name does not count as Base UI lane
coverage.

Present Base UI lane components:

- accordion
- alert-dialog
- autocomplete
- avatar
- button
- checkbox
- checkbox-group
- collapsible
- combobox
- context-menu
- dialog
- drawer
- field
- fieldset
- form
- input
- menubar
- menu
- meter
- navigation-menu
- number-field
- popover
- preview-card
- progress
- radio-group
- scroll-area
- separator
- select
- slider
- switch
- tabs
- toast
- toggle
- toggle-group
- toolbar
- tooltip

Missing Base UI lane components: none.

New Base UI work should focus on simple styled or unstyled contract depth:

- every distinct upstream demo is either implemented or explicitly deferred
- anatomy hierarchy matches the upstream component page
- API reference documents Foldkit equivalents for upstream behavior
- data attributes are documented with state semantics
- keyboard and focus behavior has scene-test coverage

## Priority Order

1. Keep registry ordering and metadata guardrails green:
   source items sorted by type/name, docs navigation sorted by type/name, and
   docs origins matching `meta.foldkit.origin`.

2. Rename existing style-lane items to explicit origin-prefixed names. Existing
   Base UI and shadcn items predate the prefix rule and are temporarily
   allowlisted by `scripts/check-registry-metadata.mjs`; migrate them to
   `base-ui-*` and `shadcn-*` names in batches before adding broad new style
   coverage.

3. Fill missing Base UI lane components by reusing Foldkit behavior and adding
   simple styled or unstyled source. Current Base UI lane coverage is complete
   against the tracked list.

4. Maintain complete shadcn lane coverage by reusing Foldkit behavior and
   adding opinionated style parity when upstream adds or changes components.
   Current shadcn lane coverage is complete against the tracked list.

5. Audit already-promoted shadcn slices against Base UI behavior and
   accessibility contracts:
   badge, avatar, card, skeleton, spinner, kbd, typography, empty, input-group,
   badge-spinner, empty-input-group, and kbd-input-group.

6. Continue shadcn parity on top of the Base UI-informed foundation:
   use shadcn example names and visible content, but require behavior-heavy
   shadcn components to pass the corresponding Base UI contract first.

7. Harden shadcn-only presentation and layout components:
   alert, aspect-ratio, breadcrumb, button-group, carousel, typography.

8. Specialized integration components:
   command, native-select, sonner, sheet, hover-card, dropdown-menu, input-otp,
   and form wrappers where the Base UI/shadcn naming or behavior diverges.

## Workflow Backlog

- Custom-clone spin-out workflow: support importing a component or example from
  another trusted registry, generating a local Foldkit CN candidate, then
  running a comparison harness with likeness scoring before the candidate can
  enter the normal registry slice contract.
- Theme playground: add an interactive surface for trying registry components
  across tokens, color modes, density, radius, and typography settings before
  those theme decisions are copied into an app.
- New-component interface: provide CLI and web flows for adding a component
  slice, including origin/name selection, contract checklist generation,
  registry/example/docs scaffolding, and the validation commands required before
  the slice enters review.
- Component registry CLI: list available components, install selected component
  slices into a consuming app, and implement the installed-component update
  workflow defined by the
  [`Installed component updates`](./component-entry-contract.md#installed-component-updates)
  update contract.
- Custom registry project generator: scaffold a new registry project with the
  expected source layout, docs shell, generated public registry output,
  validation scripts, and example component slice.
- Self-hosted registry stack: build an Effect CLI that can serve the registry
  locally, provide a Docker container wrapper for the registry server, and define
  the minimal self-hosted deployment shape for teams that want to own their
  component registry infrastructure.

## Slice Contract

Each new component slice should include:

- `registry/default/ui/{name}/index.ts`
- `registry/default/ui/{name}/view.ts`
- path names stay clean by default (`badge`, `avatar`, `card`); use
  `{origin}-{name}` only when two origins expose materially different
  components with the same public name
- registry metadata for every `registry:ui` item:
  - `meta.foldkit.origin`: `foldkit`, `base-ui`, or `shadcn`
  - `meta.foldkit.artifact`: `primitive-backed-component` or `component`
  - `meta.foldkit.primitive` when the component wraps a Foldkit `Ui.*`
    primitive
- focused scene tests
- at least one runnable example under `registry/default/examples/{name}-basic`
- generated public source snapshot
- generated registry JSON
- docs metadata table showing Origin, Artifact, and Primitive when applicable
- docs page with Overview, Examples, Installation, Usage, Foldkit integration,
  Styling, Keyboard interaction where applicable, API reference, Accessibility,
  and Coverage
- public install smoke compatibility through direct URL and registry alias
- shadcn parity examples should use upstream shadcn example names and visible
  content as the source of truth; when an upstream example depends on another
  shadcn component, track that dependency and promote the dependency first when
  possible
- behavior-heavy shadcn components must be audited against Base UI behavior and
  accessibility contracts before they are considered complete
- Base UI examples should match the examples from the corresponding Base UI docs
  page. Use the Base UI demo names, visible content, interaction behavior,
  keyboard expectations, and accessibility notes as the source of truth, then
  adapt only the implementation shape to idiomatic Foldkit.

## First Implementation Slice

Completed as an initial shadcn presentation proof: `badge`, then `avatar`.

Reasoning:

- They are shadcn staples missing from the current registry.
- They do not need Foldkit command/submodel machinery.
- They prove the docs/registry path for non-Foldkit-primitive components before
  adding larger interactive Base UI parity items.
- Avatar was already visually present in earlier docs review context, so it is a
  natural bridge into richer shadcn-style components.

## Current Direction

Pause further shadcn expansion and move to Base UI first.

Reasoning:

- The preferred long-term stack is shadcn-style components built on top of Base
  UI-informed primitive behavior and accessibility contracts.
- Base UI is the better source of truth for keyboard interaction, roles,
  focus-management, controlled/uncontrolled semantics, and accessibility edge
  cases.
- shadcn examples should remain the styled visual/examples target, but the
  underlying behavior should not drift from Base UI where Base UI has a matching
  primitive.
- After the Base UI pass, audit all existing shadcn-origin slices to confirm
  they adhere to the Base UI behavior/accessibility contracts or explicitly
  document why no Base UI contract applies.

## Progress

- Completed `badge` as the first shadcn-style non-primitive registry item:
  installable UI slice, basic example, docs page, source snapshot, generated
  registry JSON, scene coverage, and docs e2e coverage.
- Completed `avatar` as the second shadcn-style non-primitive registry item:
  image/fallback rendering, grouped avatars, overflow count helpers, docs page,
  source snapshot, generated registry JSON, scene coverage, and docs e2e
  coverage.
- Completed `card`, `separator`, `skeleton`, `kbd`, `typography`, and `empty`
  as static shadcn-style non-primitive registry items: installable UI slices,
  basic examples, docs pages, source snapshots, generated registry JSON, scene
  coverage, and docs navigation metadata.
- Started dependency-driven shadcn parity: promoted `spinner` because upstream
  examples for existing components use it, and added the upstream-name
  `badge-spinner` example.
- Promoted `input-group` and added the upstream-name `empty-input-group` and
  `kbd-input-group` examples so current Empty/Kbd docs match upstream shadcn
  examples where dependencies are available.
- Paused further shadcn promotion in favor of Base UI-first primitive and
  accessibility contract work.
- Started the Base UI lane with `progress`: Root/Label/Value/Track/Indicator
  anatomy, Base UI hero example parity, progressbar ARIA contract, determinate
  and indeterminate state handling, generated registry output, docs route,
  source snapshot, and scene coverage.
- Added `meter` as the second Base UI lane component: Root/Label/Value/Track/
  Indicator anatomy, Base UI hero example parity, role=meter ARIA contract,
  locale/format value formatting hooks, generated registry output, docs route,
  source snapshot, and scene coverage.
- Promoted `separator` from shadcn-origin presentation component to Base
  UI-informed component: role=separator semantics, aria/data orientation,
  single-part Anatomy docs, API table, standalone example shell, generated
  registry output, source snapshot, and scene coverage.
- Added `scroll-area` as the next Base UI lane component: Root/Viewport/Content/
  Scrollbar/Thumb/Corner anatomy, native scroll viewport, Base UI hero example
  parity, generated registry output, docs route, source snapshot, scene
  coverage, and documented deferral for runtime overflow measurement and
  draggable custom thumbs.
- Added `toggle` as the first interactive Base UI lane component: controlled
  pressed state, native button semantics, aria-pressed/data-pressed state
  hooks, disabled handling, Base UI hero example parity, generated registry
  output, docs route, source snapshot, and scene coverage.
- Added `toggle-group` as the follow-up Base UI interaction component:
  controlled value-array semantics, Root/Item helpers, Toggle-backed item
  behavior, Base UI hero example parity, generated registry output, docs route,
  source snapshot, and scene coverage.
- Added `radio` as the next Base UI selection component: RadioGroup/Root/
  Indicator anatomy, controlled selected-value semantics, labelled group
  behavior, Base UI hero example parity, generated registry output, docs route,
  source snapshot, and scene coverage.
- Added `toolbar` as the next Base UI interaction component: Root/Button/Link/
  Input/Group/Separator anatomy, parent-owned Foldkit message routing, native
  toolbar control semantics, Base UI hero example parity, docs route, source
  snapshot, registry output, and scene coverage. Roving focus and arrow-key
  management remain deferred to the managed-focus slice.
- Added `checkbox-group` as the next Base UI selection component: controlled
  value-array semantics, Root/Item/Parent helpers, parent mixed-state behavior
  from `allValues`, Base UI hero example parity, docs route, source snapshot,
  registry output, and scene coverage.
- Added `accordion` as the next Base UI disclosure component: Root/Item/Header/
  Trigger/Panel anatomy, controlled open value-array semantics, single-panel
  and multiple-open example parity, docs route, source snapshots, registry
  output, and scene coverage. Roving focus remains deferred to the managed-focus
  slice.
- Added `collapsible` as the next Base UI disclosure component: Root/Trigger/
  Panel anatomy, controlled open boolean semantics, default Recovery keys demo
  parity after full upstream example inventory, docs route, source snapshot,
  registry output, and scene coverage.
- Added `field` as the next Base UI form component: Root/Label/Control/
  Description/Error/Item/Validity anatomy, parent-owned value and touched
  validation state, default Name field demo parity after full upstream example
  inventory, docs route, source snapshot, registry output, and scene coverage.
- Added `number-field` as the next Base UI numeric input component: Root/
  ScrubArea/Group/Decrement/Input/Increment anatomy, parent-owned numeric
  value, default Amount demo parity after full upstream example inventory, docs
  route, source snapshot, registry output, and scene coverage. Pointer
  scrubbing, locale parsing, commit events, and wheel scrubbing remain deferred.
- Audited and promoted `avatar` from the initial shadcn presentation slice to a
  Base UI-informed component: Root/Image/Fallback anatomy, image-backed and
  fallback-only default demo parity, retained group/count helpers, origin
  metadata update, standalone example files, source snapshot, and scene
  coverage. Runtime image loading callbacks and fallback delay remain deferred.
- Added `form` as the next Base UI submission component: Root/Field/Label/
  Control/Error/Submit anatomy, native `h.OnSubmit` message mapping,
  parent-owned submitted/error state, default Homepage URL demo parity, docs
  route, source snapshot, registry output, and scene coverage. Server
  functions, object submission helpers, and Zod integration remain deferred.
- Added `autocomplete` as the next Base UI input-heavy component: Root/Label/
  Input/List/Item/Empty anatomy, controlled query and selected value state,
  default Search tags demo parity, docs route, source snapshot, registry output,
  and scene coverage. Async search, inline completion, fuzzy ranking,
  virtualization, grid popup layout, and command-palette variants remain
  deferred.
- Added `alert-dialog` as the first overlay confirmation component: Root/
  Trigger/Portal/Backdrop/Viewport/Popup/Title/Description/Close anatomy,
  parent-owned open/discarded state, default Discard draft demo parity, docs
  route, source snapshot, registry output, and scene coverage. Menu
  integration, nested close-confirmation, detached triggers, multiple trigger
  payloads, focus trapping, and escape/outside-dismiss command handling remain
  deferred.
- Added `drawer` as the next controlled overlay component: Root/Trigger/Portal/
  Backdrop/Viewport/Popup/Content/Title/Description/Close anatomy,
  parent-owned open state, default side drawer demo parity, docs route, source
  snapshot, registry output, and scene coverage. Swipe gestures, snap points,
  nested stacking, indent provider, mobile navigation, detached triggers, and
  animation lifecycle remain deferred.
- Added `context-menu` as the first controlled command-menu overlay: Trigger/
  Portal/Positioner/Popup/Item/Separator anatomy, parent-owned open and
  selected-command state, default Right click here demo parity, docs route,
  source snapshot, registry output, and scene coverage. Native pointer
  positioning, long press, nested submenus, shared menu foundations, roving
  focus, and typeahead remain deferred.
- Added `menubar` as a controlled command-menu slice: Root/Menu/Trigger/
  Popup/Item/Separator anatomy, parent-owned open menu and selected command
  state, default File/Edit/View/Help demo parity with popup content for each
  trigger, docs route, source snapshot,
  registry output, and scene coverage. Horizontal keyboard navigation, roving
  focus, and submenu handoff remain deferred.
- Added `navigation-menu` as the first controlled site-navigation slice: Root/
  List/Item/Trigger/Content/Link/Portal/Positioner/Popup/Viewport/Arrow anatomy,
  parent-owned open item state, default Overview/Handbook/GitHub demo parity,
  docs route, source snapshot, registry output, and scene coverage. Delayed
  hover, nested submenus, viewport transitions, collision-aware placement, large
  menu scrolling, and keyboard behavior remain deferred.
- Added `otp-field` as a controlled verification-code slice: Root/Input/
  Separator anatomy, six-slot one-time-code default demo parity, digit-array
  parent state, paste-like numeric normalization across following slots,
  auto-advance focus command, docs route, source snapshot, registry output, and
  scene coverage. Arrow-key movement, deletion navigation, hidden input
  mirroring, and password-manager badge avoidance remain deferred.
- Added `preview-card` as a controlled contextual-preview slice: Root/Trigger/
  Portal/Backdrop/Positioner/Popup/Viewport/Arrow anatomy, Base UI profile
  preview demo parity, parent-owned open state, docs route, source snapshot,
  registry output, and scene coverage. Delayed hover, pointer grace area,
  collision-aware placement, focus return, and animation lifecycle remain
  deferred.
- Added `alert` as a shadcn-origin static status slice: Root/Icon/Content/
  Title/Description/Action anatomy, role=alert semantics, Default and
  Destructive variant parity, docs route, source snapshots, registry output,
  and scene coverage. No direct Base UI component contract applies.
- Added `aspect-ratio` as a shadcn-origin layout slice: fixed-ratio Root,
  Image, and Caption helpers, public data-ratio state, default/Square/Portrait/
  RTL example parity, docs route, source snapshots, registry output, and scene
  coverage. No direct Base UI component contract applies.
- Added `breadcrumb` as a shadcn-origin navigation slice: Root/List/Item/Link/
  Page/Separator/Ellipsis anatomy, aria-current page state, hidden separators,
  Basic/Custom separator/Dropdown/Collapsed/Link component/RTL example parity,
  docs route, source snapshots, registry output, and scene coverage. Dropdown
  open state is parent-owned in the runnable example.
- Added `button-group` as a shadcn-origin composition slice: Root/Item/
  Separator/Text anatomy, labelled role=group semantics, horizontal and vertical
  orientation metadata, and Basic/Orientation/Size/Nested/Separator/Split/Input/
  Input group/Select/Popover/RTL example parity. The upstream Dropdown example
  is intentionally deferred until a `dropdown-menu` registry primitive exists.
- Added `carousel` as a shadcn-origin slide-navigation slice: Root/Viewport/
  Content/Item/Previous/Next/Status anatomy, labelled region semantics,
  aria-roledescription metadata, wrapped previous/next index helpers, and
  Basic/Sizes/Spacing/Orientation/API/RTL example parity. The upstream Autoplay
  and plugin examples are intentionally deferred until
  `embla-carousel-autoplay` and timer/subscription behavior are promoted.
- Dependency ledger:
  - `spinner`: unlocked `badge-spinner`; later unlocks `button-spinner` once
    the shadcn button collision is resolved.
  - `button`: collides with the existing Foldkit primitive-backed `button`
    registry item; use a prefixed shadcn path/name unless the clean path is
    intentionally migrated.
  - `tooltip`: collides with the existing Foldkit primitive-backed `tooltip`
    registry item; same collision policy as button.
  - `input-group`: promoted; unlocked `empty-input-group` and
    `kbd-input-group`.
  - RTL examples depend on shadcn's upstream language selector wrapper; mirror
    with local `h.Dir("rtl")` unless the language selector itself is promoted.
- Audit ledger for existing shadcn-origin slices after the Base UI pass:
  - Audited `badge`, `card`, `skeleton`, `spinner`, `kbd`, `typography`,
    `empty`, and `input-group`: no direct Base UI component contract applies,
    so no code changes are required.
  - Confirmed `avatar` is already promoted to `origin: "base-ui"` and matches
    the scoped Root/Image/Fallback anatomy; loading-status state, fallback
    delay, and image transition data attributes remain possible future
    hardening.
  - Audited `badge-spinner`, `empty-input-group`, and `kbd-input-group` as
    composition-only examples with no new Base UI behavior contract.
  - Durable audit record:
    [`shadcn-base-ui-contract-audit.md`](./shadcn-base-ui-contract-audit.md).
- shadcn parity ledger:
  - `chart`: promoted as a shadcn-origin component slice with Foldkit-native
    SVG helpers for container, bar chart, tooltip, and legend composition.
    Recharts-specific runtime behavior remains intentionally deferred until a
    Foldkit-native chart engine is promoted.
  - Revisit `chart` after the initial shadcn parity pass to decide whether to
    promote a Foldkit-native chart engine, adopt a non-React chart dependency,
    or add a dedicated Recharts compatibility note for consumers migrating from
    shadcn's React examples.
  - `data-table`: use Foldkit-owned table state for the default shadcn guide
    slice. Do not use `VirtualList` in the default examples; revisit it as an
    optional large-data enhancement after sorting, filtering, pagination,
    visibility, and row-selection APIs are stable.
  - `data-table`: promoted as a shadcn-origin guide slice with Basic, Row
    Actions, Pagination, Sorting, Filtering, Visibility, and Row Selection
    examples. Default examples keep native table semantics and parent-owned
    Foldkit state; `VirtualList` remains a deferred enhancement.
  - `direction`: promoted as a shadcn-origin provider-style helper around
    Foldkit `h.Dir("ltr" | "rtl")`, with a toggleable preview example matching
    the shadcn DirectionProvider documentation intent.
  - `item`: promoted as a shadcn-origin presentation component with Basic,
    Variant, Size, Icon, Avatar, Image, Group, Header, Link, and RTL examples.
    The Dropdown example is deferred until `dropdown-menu` is promoted.
  - `label`: promoted as a shadcn-origin native label helper with the Basic
    email control example, `for` association, required/disabled data styling
    hooks, docs route, source snapshot, registry output, and scene coverage.
  - `pagination`: promoted as a shadcn-origin navigation component with Root/
    Content/Item/Link/Previous/Next/Ellipsis anatomy, Basic example parity,
    native nav and anchor semantics, active-page aria-current support, docs
    route, source snapshot, registry output, and scene coverage.
  - `resizable`: promoted as a shadcn-origin controlled panel composition with
    PanelGroup/Panel/Handle anatomy, Basic example parity, separator semantics,
    controlled size styling, parent-owned pointer drag and keyboard resizing in
    the Basic example, docs route, source snapshot, registry output, and scene
    coverage.
  - `sidebar`: promoted as a shadcn-origin application layout component with
    Provider/Sidebar/Header/Content/Footer/Group/Menu/MenuItem/MenuButton/Rail/
    Inset anatomy, controlled collapsed state, parent-owned active menu
    selection, Basic example parity for a collapsible app sidebar, docs route,
    source snapshot, registry output, and scene coverage.
  - `table`: promoted as a shadcn-origin native table component with Root/
    Caption/Header/Body/Footer/Row/Head/Cell anatomy, recent invoices Basic
    example parity, responsive overflow wrapper, source snapshot, registry
    output, docs route, and scene coverage. Advanced sorting/filtering/
    pagination remains in `data-table`.
  - `command`: promoted as a shadcn-origin command palette composition with
    controlled query and selected command state, grouped item filtering,
    shortcut hints, empty state, Basic example parity, source snapshot,
    registry output, docs route, and scene coverage. Dialog presentation,
    global shortcuts, active-option roving focus, and command-dialog keyboard
    behavior remain deferred to a later overlay slice.
  - `dropdown-menu`: promoted as a shadcn-origin click-triggered command menu
    composition with Root/Trigger/Portal/Backdrop/Positioner/Popup/Item/
    Separator/Shortcut anatomy, controlled open and selected action state,
    Basic account-menu example parity, source snapshot, registry output, docs
    route, and scene coverage. Collision-aware positioning, submenus,
    checkbox/radio items, and keyboard roving focus remain deferred.
- Audited existing `empty`: confirmed shadcn-origin registry metadata, Basic
  and Input Group examples, source snapshots, docs route, shadcn nav grouping,
  and scene coverage already satisfy the component-entry contract.
- Audited existing `field`: confirmed Base UI-origin registry metadata, default
  Name field example parity, source snapshot, docs route, Base UI nav grouping,
  validation state hooks, and scene coverage already satisfy the
  component-entry contract.
- Added `hover-card`, `input-otp`, `native-select`, `sheet`, and `sonner` as
  shadcn-origin registry slices with Basic examples, source snapshots, docs
  routes, shadcn nav grouping, generated registry output, and scene coverage.
- Next recommended item: run a cross-lane quality audit against
  [`component-entry-contract.md`](./component-entry-contract.md), focusing on
  example parity, anatomy depth, API reference completeness, data attributes,
  accessibility notes, and scene-test coverage for already-promoted Base UI and
  shadcn slices.
- Started that audit in
  [`style-lane-contract-audit.md`](./style-lane-contract-audit.md). The first
  wrapper-specific example slice is complete for `shadcn-radio-group`,
  `shadcn-select`, `shadcn-slider`, `shadcn-switch`, and `shadcn-tabs`. The
  second wrapper-specific example slice is complete for `shadcn-accordion`,
  `shadcn-alert-dialog`, `shadcn-avatar`, `shadcn-button`, and
  `shadcn-calendar`. The next wrapper-specific example batch is
  `shadcn-checkbox`, `shadcn-collapsible`, `shadcn-combobox`,
  `shadcn-context-menu`, and `shadcn-date-picker`.
