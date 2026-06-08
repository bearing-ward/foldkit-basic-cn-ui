# Style Lane Contract Audit

This audit tracks Base UI and shadcn style-lane registry entries against
[`component-entry-contract.md`](./component-entry-contract.md). The component
coverage gap is closed; this document tracks contract-depth work that remains
after coverage completion.

## Scope

Current registry UI origin counts:

| Origin    | Count |
| --------- | ----- |
| `base-ui` | 38    |
| `shadcn`  | 56    |

Total style-lane UI entries: 94.

## Green Structural Checks

- Every style-lane `registry:ui` entry has a component source directory under
  `registry/default/ui/`.
- Every style-lane `registry:ui` entry has a component scene test.
- Every style-lane `registry:ui` entry has generated public registry JSON under
  `apps/docs/public/r/`.
- The missing Base UI lane list is empty.
- The missing shadcn lane list is empty.

## Remaining Contract Gaps

### P1: Wrapper-Specific Examples

The newest prefixed wrappers are installable components with direct scene tests
and docs routes, but they do not yet have wrapper-specific installable examples.
They currently lean on the underlying Foldkit/Base UI example pages for behavior
proof.

Affected Base UI wrappers:

- `base-ui-button`
- `base-ui-checkbox`
- `base-ui-combobox`
- `base-ui-dialog`
- `base-ui-fieldset`
- `base-ui-input`
- `base-ui-menu`
- `base-ui-popover`
- `base-ui-radio-group`
- `base-ui-select`
- `base-ui-slider`
- `base-ui-switch`
- `base-ui-tabs`
- `base-ui-toast`
- `base-ui-tooltip`

Affected shadcn wrappers:

- `shadcn-accordion`
- `shadcn-alert-dialog`
- `shadcn-avatar`
- `shadcn-button`
- `shadcn-calendar`
- `shadcn-checkbox`
- `shadcn-collapsible`
- `shadcn-combobox`
- `shadcn-context-menu`
- `shadcn-date-picker`
- `shadcn-dialog`
- `shadcn-drawer`
- `shadcn-field`
- `shadcn-input`
- `shadcn-menubar`
- `shadcn-navigation-menu`
- `shadcn-popover`
- `shadcn-progress`
- `shadcn-scroll-area`
- `shadcn-separator`
- `shadcn-textarea`
- `shadcn-toast`

Remediation rule: each wrapper should either get at least one installable
wrapper-specific example or explicitly document why the underlying example is
the intentional proof surface for that wrapper.

### P1: Unprefixed Style-Lane Names

The contract now requires explicit `base-ui-*` and `shadcn-*` names for style
lanes. Older promoted entries still use clean names and are temporarily
allowlisted by the metadata checker.

Remediation rule: migrate older style-lane entries to prefixed names in small
batches. Compatibility aliases are not required.

Highest-value first batches:

- Base UI interactive primitives: `accordion`, `alert-dialog`, `autocomplete`,
  `checkbox-group`, `collapsible`, `context-menu`, `drawer`, `field`, `form`,
  `menubar`, `navigation-menu`, `number-field`, `preview-card`, `radio`,
  `toggle`, `toggle-group`, and `toolbar`.
- shadcn presentation and layout entries: `alert`, `aspect-ratio`,
  `breadcrumb`, `button-group`, `card`, `carousel`, `chart`, `data-table`,
  `direction`, `dropdown-menu`, `empty`, `hover-card`, `input-group`,
  `input-otp`, `item`, `kbd`, `label`, `native-select`, `pagination`,
  `resizable`, `sheet`, `sidebar`, `skeleton`, `sonner`, `spinner`, `table`,
  and `typography`.

### P2: Docs Depth For Bespoke Pages

The shared `baseUiLaneDocsView` and `shadcnLaneDocsView` pages provide a
consistent baseline for newer wrappers. Older bespoke docs pages should be
audited for the same contract sections:

- upstream example-name and visible-content parity
- Anatomy below Foldkit integration
- API reference table or detailed list
- public data attributes
- accessibility notes for roles, names, ARIA, focus, disabled, and read-only
  behavior
- scene-test proof for behavior, state, style hooks, and inert states

Priority bespoke pages:

- `button-group`
- `chart`
- `command`
- `data-table`
- `dropdown-menu`
- `hover-card`
- `input-otp`
- `native-select`
- `resizable`
- `sonner`

## Next Recommended Slice

Start with wrapper-specific examples for the recently added prefixed shadcn
selection controls:

- `shadcn-radio-group` - done in `shadcn-radio-group-basic`
- `shadcn-select` - done in `shadcn-select-basic`
- `shadcn-slider` - done in `shadcn-slider-basic`
- `shadcn-switch` - done in `shadcn-switch-basic`
- `shadcn-tabs` - done in `shadcn-tabs-basic`

This batch is behavior-heavy, currently visible in the docs sidebar, and gives
the install workflow direct shadcn-style example proof instead of relying only
on the underlying Foldkit examples.

Next wrapper-specific example batch:

- `shadcn-accordion`
- `shadcn-alert-dialog`
- `shadcn-avatar`
- `shadcn-button`
- `shadcn-calendar`
