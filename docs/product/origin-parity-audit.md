# Origin Parity Audit

Status: in progress.

This audit covers registry UI items whose `meta.foldkit.origin` is a shadcn or
Base UI URL. The parity standard is in `docs/product/origin-parity-prompt.md`:
coverage is not completion. A component/example is complete only after the local
example is compared against the origin for structure, orientation, visual design,
behavior, source snapshot, generated registry JSON, docs block, and scene tests.

## Current Verdict

- Active row-by-row review now lives in
  `docs/product/origin-content-parity-review.md`.
- Previous `Covered, needs visual parity review` rows mean registry/docs/example
  coverage only. They do not mean origin parity. Any example with invented local
  content must be treated as incomplete until it is reconciled against the
  current origin page/source.
- Verified/fixed in this pass:
  - `card-basic` now uses the shadcn origin login-card content instead of the
    invented `Project health` demo. It still needs final side-by-side screenshot
    signoff in the active review checklist.
  - `button-group-*` examples were moved toward the shadcn origin grouped-control
    contract, especially `button-group-nested`. They still need final
    side-by-side screenshot signoff in the active review checklist.
  - `item-header` now matches the shadcn Item Header example anatomy: vertical
    item cards, real origin image URLs, media in `ItemHeader`, content below.
  - `shadcn-accordion-borders` now has the distinct bordered wrapper that makes
    the Borders example different from the default divided accordion.
  - shadcn Accordion and Calendar docs previews use parent-owned submodels so
    expanding/toggling examples does not crash the docs app.
  - `shadcn-button-as-child` no longer fakes behavior with a click counter.
- Not yet verified:
  - Most shadcn/Base UI examples have registry coverage and scene tests, but have
    not been accepted through side-by-side browser screenshot comparison against
    the current origin page.
  - The docs demo shell itself still differs from the shadcn docs shell. That is
    acceptable only when the component/example inside the shell matches the
    origin; do not use the shell difference to justify component drift.
- Direct wrapper coverage:
  - All listed `base-ui-*` wrappers now have direct examples. Use these examples
    as the baseline for visual parity review against each origin page; direct
    examples alone are not completion.

## Origin Page Reconciliation Checklist

Source of truth:

- Base UI current component pages were inventoried from the live Base UI docs
  navigation on 2026-06-08.
- shadcn current component pages were inventoried from the live shadcn docs
  navigation on 2026-06-08.
- Registry entries were reconciled from `registry/default/items.json`.

Rules:

- Every current Base UI component page gets exactly one local Base UI component
  entry and docs page.
- Every current shadcn component page gets exactly one local shadcn component
  entry and docs page.
- Origin URLs must be exact, clickable, current component-page URLs. Redirecting
  legacy URLs are not accepted as done.
- Component implementations and examples must match the upstream docs/source in
  markup shape, part nesting, attributes, behavior, keyboard behavior,
  orientation, spacing, and visual output. Coverage without physical parity is
  still incomplete.

### Base UI Page Identity

Current status: Base UI has 37 current component pages. We have origin coverage
for all 37 pages. The incorrect extra `base-ui-radio-group` split has been
merged into the `base-ui-radio` page identity.

- [x] Replace `base-ui-radio-group` with `base-ui-radio`.
  - Origin page: `https://base-ui.com/react/components/radio`
  - Reason: Base UI has no `radio-group` component page. `RadioGroup` is an
    anatomy/API part of the `Radio` page.
- [x] Rename `base-ui-radio-group-basic` to `base-ui-radio-basic`.
  - The example should match the `Radio` page default demo: `Best apple`,
    `Fuji`, `Gala`, `Granny Smith`, with the same label/radio structure.

### Base UI Missing Prefixed Examples

These Base UI-origin component pages exist in our registry, mostly as legacy
unprefixed entries, but they do not yet have a `base-ui-{page}-*` parity example.
Each needs at least the origin page's default/hero demo represented as an
installable example, then any additional origin demos either implemented or
explicitly deferred.

- [x] `base-ui-accordion`
- [x] `base-ui-alert-dialog`
- [x] `base-ui-autocomplete`
- [x] `base-ui-avatar`
- [x] `base-ui-checkbox-group`
- [x] `base-ui-collapsible`
- [x] `base-ui-context-menu`
- [x] `base-ui-drawer`
- [x] `base-ui-field`
- [x] `base-ui-form`
- [x] `base-ui-menubar`
- [x] `base-ui-meter`
- [x] `base-ui-navigation-menu`
- [x] `base-ui-number-field`
- [x] `base-ui-otp-field`
- [x] `base-ui-preview-card`
- [x] `base-ui-progress`
- [x] `base-ui-scroll-area`
- [x] `base-ui-separator`
- [x] `base-ui-toggle`
- [x] `base-ui-toggle-group`
- [x] `base-ui-toolbar`

### Base UI Existing Prefixed Examples Needing Physical Parity Review

These exist and have scene coverage, but still need side-by-side origin
comparison for source markup, rendered shape, spacing, and behavior.

- [x] `base-ui-button-basic`
- [x] `base-ui-checkbox-basic`
- [x] `base-ui-combobox-basic`
- [x] `base-ui-accordion-basic`
- [x] `base-ui-alert-dialog-basic`
- [x] `base-ui-autocomplete-basic`
- [x] `base-ui-avatar-basic`
- [x] `base-ui-checkbox-group-basic`
- [x] `base-ui-collapsible-basic`
- [x] `base-ui-context-menu-basic`
- [x] `base-ui-dialog-basic`
- [x] `base-ui-drawer-basic`
- [x] `base-ui-field-basic`
- [x] `base-ui-fieldset-basic`
- [x] `base-ui-form-basic`
- [x] `base-ui-input-basic`
- [x] `base-ui-menubar-basic`
- [x] `base-ui-meter-basic`
- [x] `base-ui-menu-basic`
- [x] `base-ui-navigation-menu-basic`
- [x] `base-ui-number-field-basic`
- [x] `base-ui-otp-field-basic`
- [x] `base-ui-popover-basic`
- [x] `base-ui-preview-card-basic`
- [x] `base-ui-progress-basic`
- [x] `base-ui-radio-basic`
- [x] `base-ui-scroll-area-basic`
- [x] `base-ui-separator-basic`
- [x] `base-ui-select-basic`
- [x] `base-ui-slider-basic`
- [x] `base-ui-switch-basic`
- [x] `base-ui-tabs-basic`
- [x] `base-ui-toggle-basic`
- [x] `base-ui-toggle-group-basic`
- [x] `base-ui-toolbar-basic`
- [x] `base-ui-toast-basic`
- [x] `base-ui-tooltip-basic`

### shadcn Missing Current Component Pages

These current shadcn docs pages do not have matching local shadcn component
entries yet.

- [x] `https://ui.shadcn.com/docs/components/base/accordion`
- [x] `https://ui.shadcn.com/docs/components/radix/toggle`
- [x] `https://ui.shadcn.com/docs/components/radix/toggle-group`
- [x] `https://ui.shadcn.com/docs/components/radix/tooltip`

### shadcn Incorrect Or Legacy Origin URLs

These must be updated so `meta.foldkit.origin` points at the current exact
component page instead of a redirecting legacy URL.

- [x] `shadcn-radio-group`: change `https://ui.shadcn.com/docs/components/radio`
      to `https://ui.shadcn.com/docs/components/radix/radio-group`.
- [x] Canonicalize remaining legacy shadcn origin URLs from
      `/docs/components/{name}` to `/docs/components/radix/{name}` where the current
      docs navigation resolves there:
  - [x] `alert`
  - [x] `aspect-ratio`
  - [x] `badge`
  - [x] `breadcrumb`
  - [x] `button-group`
  - [x] `card`
  - [x] `carousel`
  - [x] `chart`
  - [x] `command`
  - [x] `data-table`
  - [x] `direction`
  - [x] `dropdown-menu`
  - [x] `empty`
  - [x] `hover-card`
  - [x] `input-group`
  - [x] `input-otp`
  - [x] `kbd`
  - [x] `label`
  - [x] `native-select`
  - [x] `pagination`
  - [x] `resizable`
  - [x] `shadcn-alert-dialog`
  - [x] `shadcn-button`
  - [x] `shadcn-checkbox`
  - [x] `shadcn-collapsible`
  - [x] `shadcn-combobox`
  - [x] `shadcn-context-menu`
  - [x] `shadcn-date-picker`
  - [x] `shadcn-dialog`
  - [x] `shadcn-drawer`
  - [x] `shadcn-field`
  - [x] `shadcn-input`
  - [x] `shadcn-menubar`
  - [x] `shadcn-navigation-menu`
  - [x] `shadcn-popover`
  - [x] `shadcn-progress`
  - [x] `shadcn-scroll-area`
  - [x] `shadcn-select`
  - [x] `shadcn-separator`
  - [x] `shadcn-slider`
  - [x] `shadcn-switch`
  - [x] `shadcn-tabs`
  - [x] `shadcn-textarea`
  - [x] `shadcn-toast`
  - [x] `sheet`
  - [x] `sidebar`
  - [x] `skeleton`
  - [x] `sonner`
  - [x] `spinner`
  - [x] `table`
  - [x] `typography`

### shadcn Existing Examples Needing Physical Parity Review

All current shadcn-origin examples remain unchecked until they pass side-by-side
comparison against the upstream docs/source. Start with the examples recently
flagged by user review:

- [x] `item-*`
- [x] `shadcn-accordion-*`
- [x] `shadcn-avatar-*`
- [x] `shadcn-button-*`
- [x] `shadcn-calendar-*`

Then continue through the remaining shadcn-origin entries in the audit table
below.

## Audit Table

| Component                | Origin  | Status                              | Registry examples depending on it                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------ | ------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accordion`              | Base UI | Covered, needs visual parity review | `accordion-basic`, `accordion-multiple`                                                                                                                                                                                                                                                                                                                                            |
| `alert`                  | shadcn  | Covered, needs visual parity review | `alert-basic`, `alert-destructive`                                                                                                                                                                                                                                                                                                                                                 |
| `alert-dialog`           | Base UI | Covered, needs visual parity review | `alert-dialog-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `aspect-ratio`           | shadcn  | Covered, needs visual parity review | `aspect-ratio-basic`, `aspect-ratio-portrait`, `aspect-ratio-rtl`, `aspect-ratio-square`                                                                                                                                                                                                                                                                                           |
| `autocomplete`           | Base UI | Covered, needs visual parity review | `autocomplete-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `avatar`                 | Base UI | Covered, needs visual parity review | `avatar-basic`                                                                                                                                                                                                                                                                                                                                                                     |
| `badge`                  | shadcn  | Covered, needs visual parity review | `badge-basic`, `badge-spinner`                                                                                                                                                                                                                                                                                                                                                     |
| `base-ui-button`         | Base UI | Covered, needs visual parity review | `base-ui-button-basic`                                                                                                                                                                                                                                                                                                                                                             |
| `base-ui-checkbox`       | Base UI | Covered, needs visual parity review | `base-ui-checkbox-basic`                                                                                                                                                                                                                                                                                                                                                           |
| `base-ui-combobox`       | Base UI | Covered, needs visual parity review | `base-ui-combobox-basic`                                                                                                                                                                                                                                                                                                                                                           |
| `base-ui-dialog`         | Base UI | Covered, needs visual parity review | `base-ui-dialog-basic`                                                                                                                                                                                                                                                                                                                                                             |
| `base-ui-fieldset`       | Base UI | Covered, needs visual parity review | `base-ui-fieldset-basic`                                                                                                                                                                                                                                                                                                                                                           |
| `base-ui-input`          | Base UI | Covered, needs visual parity review | `base-ui-input-basic`                                                                                                                                                                                                                                                                                                                                                              |
| `base-ui-menu`           | Base UI | Covered, needs visual parity review | `base-ui-menu-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `base-ui-popover`        | Base UI | Covered, needs visual parity review | `base-ui-popover-basic`                                                                                                                                                                                                                                                                                                                                                            |
| `base-ui-radio`          | Base UI | Covered, needs visual parity review | `base-ui-radio-basic`                                                                                                                                                                                                                                                                                                                                                              |
| `base-ui-select`         | Base UI | Covered, needs visual parity review | `base-ui-select-basic`                                                                                                                                                                                                                                                                                                                                                             |
| `base-ui-slider`         | Base UI | Covered, needs visual parity review | `base-ui-slider-basic`                                                                                                                                                                                                                                                                                                                                                             |
| `base-ui-switch`         | Base UI | Covered, needs visual parity review | `base-ui-switch-basic`                                                                                                                                                                                                                                                                                                                                                             |
| `base-ui-tabs`           | Base UI | Covered, needs visual parity review | `base-ui-tabs-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `base-ui-toast`          | Base UI | Covered, needs visual parity review | `base-ui-toast-basic`                                                                                                                                                                                                                                                                                                                                                              |
| `base-ui-tooltip`        | Base UI | Covered, needs visual parity review | `base-ui-tooltip-basic`                                                                                                                                                                                                                                                                                                                                                            |
| `breadcrumb`             | shadcn  | Covered, needs visual parity review | `breadcrumb-basic`, `breadcrumb-collapsed`, `breadcrumb-dropdown`, `breadcrumb-link`, `breadcrumb-rtl`, `breadcrumb-separator`                                                                                                                                                                                                                                                     |
| `shadcn-button-group`    | shadcn  | Covered, needs visual parity review | `button-group-basic`, `button-group-input`, `button-group-input-group`, `button-group-nested`, `button-group-orientation`, `button-group-popover`, `button-group-rtl`, `button-group-select`, `button-group-separator`, `button-group-size`, `button-group-split`                                                                                                                  |
| `shadcn-card`            | shadcn  | Covered, needs visual parity review | `card-basic`                                                                                                                                                                                                                                                                                                                                                                       |
| `shadcn-carousel`        | shadcn  | Covered, needs visual parity review | `carousel-api`, `carousel-basic`, `carousel-orientation`, `carousel-rtl`, `carousel-sizes`, `carousel-spacing`                                                                                                                                                                                                                                                                     |
| `chart`                  | shadcn  | Covered, needs visual parity review | `chart-axis`, `chart-basic`, `chart-grid`, `chart-legend`, `chart-rtl`, `chart-tooltip`                                                                                                                                                                                                                                                                                            |
| `checkbox-group`         | Base UI | Covered, needs visual parity review | `checkbox-group-basic`                                                                                                                                                                                                                                                                                                                                                             |
| `collapsible`            | Base UI | Covered, needs visual parity review | `collapsible-basic`                                                                                                                                                                                                                                                                                                                                                                |
| `command`                | shadcn  | Covered, needs visual parity review | `command-basic`                                                                                                                                                                                                                                                                                                                                                                    |
| `context-menu`           | Base UI | Covered, needs visual parity review | `context-menu-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `data-table`             | shadcn  | Covered, needs visual parity review | `data-table-basic`, `data-table-filtering`, `data-table-pagination`, `data-table-row-actions`, `data-table-row-selection`, `data-table-sorting`, `data-table-visibility`                                                                                                                                                                                                           |
| `direction`              | shadcn  | Covered, needs visual parity review | `direction-basic`                                                                                                                                                                                                                                                                                                                                                                  |
| `drawer`                 | Base UI | Covered, needs visual parity review | `drawer-basic`                                                                                                                                                                                                                                                                                                                                                                     |
| `dropdown-menu`          | shadcn  | Covered, needs visual parity review | `dropdown-menu-basic`, `shadcn-avatar-dropdown`                                                                                                                                                                                                                                                                                                                                    |
| `empty`                  | shadcn  | Covered, needs visual parity review | `empty-basic`, `empty-input-group`                                                                                                                                                                                                                                                                                                                                                 |
| `field`                  | Base UI | Covered, needs visual parity review | `field-basic`                                                                                                                                                                                                                                                                                                                                                                      |
| `form`                   | Base UI | Covered, needs visual parity review | `form-basic`                                                                                                                                                                                                                                                                                                                                                                       |
| `hover-card`             | shadcn  | Covered, needs visual parity review | `hover-card-basic`                                                                                                                                                                                                                                                                                                                                                                 |
| `input-group`            | shadcn  | Covered, needs visual parity review | `button-group-input-group`, `empty-input-group`, `input-group-basic`, `kbd-input-group`                                                                                                                                                                                                                                                                                            |
| `input-otp`              | shadcn  | Covered, needs visual parity review | `input-otp-basic`                                                                                                                                                                                                                                                                                                                                                                  |
| `item`                   | shadcn  | Covered, needs visual parity review | `item-avatar`, `item-basic`, `item-dropdown`, `item-group`, `item-header`, `item-icon`, `item-image`, `item-link`, `item-rtl`, `item-size`, `item-variant`                                                                                                                                                                                                                         |
| `kbd`                    | shadcn  | Covered, needs visual parity review | `empty-input-group`, `kbd-basic`, `kbd-input-group`                                                                                                                                                                                                                                                                                                                                |
| `label`                  | shadcn  | Covered, needs visual parity review | `label-basic`                                                                                                                                                                                                                                                                                                                                                                      |
| `menubar`                | Base UI | Covered, needs visual parity review | `menubar-basic`                                                                                                                                                                                                                                                                                                                                                                    |
| `meter`                  | Base UI | Covered, needs visual parity review | `meter-basic`                                                                                                                                                                                                                                                                                                                                                                      |
| `native-select`          | shadcn  | Covered, needs visual parity review | `native-select-basic`                                                                                                                                                                                                                                                                                                                                                              |
| `navigation-menu`        | Base UI | Covered, needs visual parity review | `navigation-menu-basic`                                                                                                                                                                                                                                                                                                                                                            |
| `number-field`           | Base UI | Covered, needs visual parity review | `number-field-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `otp-field`              | Base UI | Covered, needs visual parity review | `otp-field-basic`                                                                                                                                                                                                                                                                                                                                                                  |
| `pagination`             | shadcn  | Covered, needs visual parity review | `pagination-basic`                                                                                                                                                                                                                                                                                                                                                                 |
| `preview-card`           | Base UI | Covered, needs visual parity review | `preview-card-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `progress`               | Base UI | Covered, needs visual parity review | `progress-basic`                                                                                                                                                                                                                                                                                                                                                                   |
| `radio`                  | Base UI | Covered, needs visual parity review | `radio-basic`                                                                                                                                                                                                                                                                                                                                                                      |
| `resizable`              | shadcn  | Covered, needs visual parity review | `resizable-basic`                                                                                                                                                                                                                                                                                                                                                                  |
| `scroll-area`            | Base UI | Covered, needs visual parity review | `scroll-area-basic`                                                                                                                                                                                                                                                                                                                                                                |
| `separator`              | Base UI | Covered, needs visual parity review | `separator-basic`                                                                                                                                                                                                                                                                                                                                                                  |
| `shadcn-accordion`       | shadcn  | Covered, needs visual parity review | `shadcn-accordion-basic`, `shadcn-accordion-borders`, `shadcn-accordion-card`, `shadcn-accordion-disabled`, `shadcn-accordion-multiple`, `shadcn-accordion-rtl`                                                                                                                                                                                                                    |
| `shadcn-alert-dialog`    | shadcn  | Covered, needs visual parity review | `shadcn-alert-dialog-basic`                                                                                                                                                                                                                                                                                                                                                        |
| `shadcn-avatar`          | shadcn  | Covered, needs visual parity review | `shadcn-avatar-badge`, `shadcn-avatar-badge-icon`, `shadcn-avatar-basic`, `shadcn-avatar-dropdown`, `shadcn-avatar-group`, `shadcn-avatar-group-count`, `shadcn-avatar-group-icon`, `shadcn-avatar-sizes`                                                                                                                                                                          |
| `shadcn-button`          | shadcn  | Covered, needs visual parity review | `shadcn-button-as-child`, `shadcn-button-basic`, `shadcn-button-default`, `shadcn-button-destructive`, `shadcn-button-ghost`, `shadcn-button-button-group`, `shadcn-button-icon`, `shadcn-button-link`, `shadcn-button-outline`, `shadcn-button-rounded`, `shadcn-button-rtl`, `shadcn-button-secondary`, `shadcn-button-size`, `shadcn-button-spinner`, `shadcn-button-with-icon` |
| `shadcn-calendar`        | shadcn  | Covered, needs visual parity review | `shadcn-calendar-basic`, `shadcn-calendar-booked`, `shadcn-calendar-custom-cell-size`, `shadcn-calendar-date-of-birth`, `shadcn-calendar-date-time-picker`, `shadcn-calendar-month-year-selector`, `shadcn-calendar-presets`, `shadcn-calendar-range`, `shadcn-calendar-rtl`, `shadcn-calendar-week-numbers`                                                                       |
| `shadcn-checkbox`        | shadcn  | Covered, needs visual parity review | `shadcn-checkbox-basic`                                                                                                                                                                                                                                                                                                                                                            |
| `shadcn-collapsible`     | shadcn  | Covered, needs visual parity review | `shadcn-collapsible-basic`                                                                                                                                                                                                                                                                                                                                                         |
| `shadcn-combobox`        | shadcn  | Covered, needs visual parity review | `shadcn-combobox-basic`                                                                                                                                                                                                                                                                                                                                                            |
| `shadcn-context-menu`    | shadcn  | Covered, needs visual parity review | `shadcn-context-menu-basic`                                                                                                                                                                                                                                                                                                                                                        |
| `shadcn-date-picker`     | shadcn  | Covered, needs visual parity review | `shadcn-date-picker-basic`                                                                                                                                                                                                                                                                                                                                                         |
| `shadcn-dialog`          | shadcn  | Covered, needs visual parity review | `shadcn-dialog-basic`                                                                                                                                                                                                                                                                                                                                                              |
| `shadcn-drawer`          | shadcn  | Covered, needs visual parity review | `shadcn-drawer-basic`                                                                                                                                                                                                                                                                                                                                                              |
| `shadcn-field`           | shadcn  | Covered, needs visual parity review | `shadcn-field-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `shadcn-input`           | shadcn  | Covered, needs visual parity review | `shadcn-input-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `shadcn-menubar`         | shadcn  | Covered, needs visual parity review | `shadcn-menubar-basic`                                                                                                                                                                                                                                                                                                                                                             |
| `shadcn-navigation-menu` | shadcn  | Covered, needs visual parity review | `shadcn-navigation-menu-basic`                                                                                                                                                                                                                                                                                                                                                     |
| `shadcn-popover`         | shadcn  | Covered, needs visual parity review | `shadcn-popover-basic`                                                                                                                                                                                                                                                                                                                                                             |
| `shadcn-progress`        | shadcn  | Covered, needs visual parity review | `shadcn-progress-basic`                                                                                                                                                                                                                                                                                                                                                            |
| `shadcn-radio-group`     | shadcn  | Covered, needs visual parity review | `shadcn-radio-group-basic`                                                                                                                                                                                                                                                                                                                                                         |
| `shadcn-scroll-area`     | shadcn  | Covered, needs visual parity review | `shadcn-scroll-area-basic`                                                                                                                                                                                                                                                                                                                                                         |
| `shadcn-select`          | shadcn  | Covered, needs visual parity review | `shadcn-select-basic`                                                                                                                                                                                                                                                                                                                                                              |
| `shadcn-separator`       | shadcn  | Covered, needs visual parity review | `shadcn-separator-basic`                                                                                                                                                                                                                                                                                                                                                           |
| `shadcn-slider`          | shadcn  | Covered, needs visual parity review | `shadcn-slider-basic`                                                                                                                                                                                                                                                                                                                                                              |
| `shadcn-switch`          | shadcn  | Covered, needs visual parity review | `shadcn-switch-basic`                                                                                                                                                                                                                                                                                                                                                              |
| `shadcn-tabs`            | shadcn  | Covered, needs visual parity review | `shadcn-tabs-basic`                                                                                                                                                                                                                                                                                                                                                                |
| `shadcn-textarea`        | shadcn  | Covered, needs visual parity review | `shadcn-textarea-basic`                                                                                                                                                                                                                                                                                                                                                            |
| `shadcn-toast`           | shadcn  | Covered, needs visual parity review | `shadcn-toast-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `sheet`                  | shadcn  | Covered, needs visual parity review | `sheet-basic`                                                                                                                                                                                                                                                                                                                                                                      |
| `sidebar`                | shadcn  | Covered, needs visual parity review | `sidebar-basic`                                                                                                                                                                                                                                                                                                                                                                    |
| `skeleton`               | shadcn  | Covered, needs visual parity review | `skeleton-basic`                                                                                                                                                                                                                                                                                                                                                                   |
| `sonner`                 | shadcn  | Covered, needs visual parity review | `sonner-basic`                                                                                                                                                                                                                                                                                                                                                                     |
| `spinner`                | shadcn  | Covered, needs visual parity review | `badge-spinner`, `shadcn-button-spinner`, `spinner-basic`                                                                                                                                                                                                                                                                                                                          |
| `table`                  | shadcn  | Covered, needs visual parity review | `table-basic`                                                                                                                                                                                                                                                                                                                                                                      |
| `toggle`                 | Base UI | Covered, needs visual parity review | `toggle-basic`                                                                                                                                                                                                                                                                                                                                                                     |
| `toggle-group`           | Base UI | Covered, needs visual parity review | `toggle-group-basic`                                                                                                                                                                                                                                                                                                                                                               |
| `toolbar`                | Base UI | Covered, needs visual parity review | `toolbar-basic`                                                                                                                                                                                                                                                                                                                                                                    |
| `typography`             | shadcn  | Covered, needs visual parity review | `typography-basic`                                                                                                                                                                                                                                                                                                                                                                 |

## Next Agenda

1. Run visual parity slices in small batches, starting with examples recently
   flagged by user review: `item-*`, `shadcn-accordion-*`, `shadcn-avatar-*`,
   `shadcn-button-*`, and `shadcn-calendar-*`.
2. For each batch, capture the origin page, compare structure/orientation/design
   against local docs, fix avoidable drift, regenerate registry output, and run
   focused scene tests plus registry checks.
