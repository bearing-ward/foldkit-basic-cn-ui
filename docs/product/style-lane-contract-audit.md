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

Affected Base UI wrappers: none. All prefixed Base UI wrappers now have a
wrapper-specific installable Basic example with scene coverage.

Affected shadcn wrappers: none. All prefixed shadcn wrappers now have a
wrapper-specific installable Basic example with scene coverage.

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

- Base UI interactive primitives: `preview-card`, `radio`, `toggle`,
  `toggle-group`, and `toolbar`.
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

Completed wrapper-specific example batch:

- `shadcn-accordion` - done in `shadcn-accordion-basic`
- `shadcn-alert-dialog` - done in `shadcn-alert-dialog-basic`
- `shadcn-avatar` - done in `shadcn-avatar-basic`
- `shadcn-button` - done in `shadcn-button-basic`
- `shadcn-calendar` - done in `shadcn-calendar-basic`

Completed wrapper-specific example batch:

- `shadcn-checkbox` - done in `shadcn-checkbox-basic`
- `shadcn-collapsible` - done in `shadcn-collapsible-basic`
- `shadcn-combobox` - done in `shadcn-combobox-basic`
- `shadcn-context-menu` - done in `shadcn-context-menu-basic`
- `shadcn-date-picker` - done in `shadcn-date-picker-basic`

Completed wrapper-specific example batch:

- `shadcn-dialog` - done in `shadcn-dialog-basic`
- `shadcn-drawer` - done in `shadcn-drawer-basic`
- `shadcn-field` - done in `shadcn-field-basic`
- `shadcn-input` - done in `shadcn-input-basic`
- `shadcn-menubar` - done in `shadcn-menubar-basic`

Completed wrapper-specific example batch:

- `shadcn-navigation-menu` - done in `shadcn-navigation-menu-basic`
- `shadcn-popover` - done in `shadcn-popover-basic`
- `shadcn-progress` - done in `shadcn-progress-basic`
- `shadcn-scroll-area` - done in `shadcn-scroll-area-basic`
- `shadcn-separator` - done in `shadcn-separator-basic`

Completed wrapper-specific example batch:

- `shadcn-textarea` - done in `shadcn-textarea-basic`
- `shadcn-toast` - done in `shadcn-toast-basic`

Next wrapper-specific example batch:

- `base-ui-button` - done in `base-ui-button-basic`
- `base-ui-checkbox` - done in `base-ui-checkbox-basic`
- `base-ui-combobox` - done in `base-ui-combobox-basic`
- `base-ui-dialog` - done in `base-ui-dialog-basic`
- `base-ui-fieldset` - done in `base-ui-fieldset-basic`

Next wrapper-specific example batch:

- `base-ui-input` - done in `base-ui-input-basic`
- `base-ui-menu` - done in `base-ui-menu-basic`
- `base-ui-popover` - done in `base-ui-popover-basic`
- `base-ui-radio` - done in `base-ui-radio-basic`
- `base-ui-select` - done in `base-ui-select-basic`

Next wrapper-specific example batch:

- `base-ui-slider` - done in `base-ui-slider-basic`
- `base-ui-switch` - done in `base-ui-switch-basic`
- `base-ui-tabs` - done in `base-ui-tabs-basic`
- `base-ui-toast` - done in `base-ui-toast-basic`
- `base-ui-tooltip` - done in `base-ui-tooltip-basic`

Next recommended slice:

- Removed unprefixed Base UI aliases: `accordion`, `alert-dialog`, and
  `autocomplete`. Their installable dependents now point at
  `base-ui-accordion`, `base-ui-alert-dialog`, and `base-ui-autocomplete`.
- Removed unprefixed Base UI aliases: `checkbox-group`, `collapsible`, and
  `context-menu`. Their installable dependents now point at
  `base-ui-checkbox-group`, `base-ui-collapsible`, and
  `base-ui-context-menu`.
- Removed unprefixed Base UI aliases: `drawer`, `field`, and `form`. Their
  installable dependents now point at `base-ui-drawer`, `base-ui-field`, and
  `base-ui-form`.
- Removed unprefixed Base UI aliases: `menubar`, `navigation-menu`, and
  `number-field`. Their installable dependents now point at
  `base-ui-menubar`, `base-ui-navigation-menu`, and `base-ui-number-field`.
- Next unprefixed Base UI alias batch: `preview-card`, `radio`, and `toggle`.
- Continue side-by-side origin visual signoff from
  `docs/product/origin-content-parity-review.md`.
