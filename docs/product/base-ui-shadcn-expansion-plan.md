# Base UI and shadcn Expansion Plan

## Goal

Foldkit CN should grow from “styled coverage for current Foldkit UI primitives”
into a shadcn-style registry that also covers the common Base UI and shadcn
component surface area. New items must keep the same installable slice contract:
registry item, example, docs page, source viewer, scene/e2e coverage, generated
JSON, and public install smoke compatibility.

## Current Baseline

Current registry UI items:

- animation
- button
- calendar
- checkbox
- combobox
- date-picker
- dialog
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

## shadcn Gaps

Gaps compared with the current shadcn components page:

- accordion
- alert
- alert-dialog
- aspect-ratio
- avatar
- badge
- breadcrumb
- button-group
- card
- carousel
- chart
- collapsible
- command
- context-menu
- data-table
- direction
- drawer
- dropdown-menu
- empty
- field
- hover-card
- input-group
- input-otp
- item
- kbd
- label
- menubar
- native-select
- navigation-menu
- pagination
- progress
- resizable
- scroll-area
- separator
- sheet
- sidebar
- skeleton
- sonner
- spinner
- table
- toggle
- toggle-group
- typography

## Base UI Gaps

Gaps compared with the current Base UI components navigation:

- accordion
- alert-dialog
- autocomplete
- avatar
- checkbox-group
- collapsible
- context-menu
- drawer
- field
- form
- menubar
- meter
- navigation-menu
- number-field
- otp-field
- preview-card
- progress
- radio
- scroll-area
- separator
- toggle
- toggle-group
- toolbar

## Priority Order

1. Static shadcn presentation components:
   badge, avatar, card, separator, skeleton, kbd, typography, empty.

2. Simple composite/form shell components:
   label, field, input-group, button-group, item, aspect-ratio, progress, meter.

3. Foldkit-adjacent interactive primitives:
   accordion/collapsible, toggle, toggle-group, checkbox-group, radio, native-select.

4. Popup/menu/navigation families:
   alert-dialog, context-menu/dropdown-menu, menubar, navigation-menu, hover-card,
   preview-card, drawer/sheet.

5. Data and app-layout components:
   table, data-table, pagination, scroll-area, resizable, sidebar, breadcrumb.

6. Specialized components:
   command, input-otp/otp-field, number-field, autocomplete, carousel, chart,
   sonner/spinner/direction/form.

## Slice Contract

Each new component slice should include:

- `registry/default/ui/{name}/index.ts`
- `registry/default/ui/{name}/view.ts`
- focused scene tests
- at least one runnable example under `registry/default/examples/{name}-basic`
- generated public source snapshot
- generated registry JSON
- docs page with Overview, Examples, Installation, Usage, Foldkit integration,
  Styling, Keyboard interaction where applicable, API reference, Accessibility,
  and Coverage
- public install smoke compatibility through direct URL and registry alias

## First Implementation Slice

Start with `badge`, then `avatar`.

Reasoning:

- They are shadcn staples missing from the current registry.
- They do not need Foldkit command/submodel machinery.
- They prove the docs/registry path for non-Foldkit-primitive components before
  adding larger interactive Base UI parity items.
- Avatar was already visually present in earlier docs review context, so it is a
  natural bridge into richer shadcn-style components.
