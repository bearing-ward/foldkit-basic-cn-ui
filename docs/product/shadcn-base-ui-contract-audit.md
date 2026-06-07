# shadcn Base UI Contract Audit

## Purpose

This audit records whether already-promoted shadcn-origin registry slices have a
matching Base UI behavior or accessibility contract that should override their
current shadcn-style implementation.

The component-entry contract remains canonical for file shape, docs sections,
tests, metadata, generated artifacts, and completion criteria:
[`component-entry-contract.md`](./component-entry-contract.md).

## Source Of Truth

- Current Base UI component navigation, checked June 5, 2026:
  <https://base-ui.com/react/components/avatar>
- Current local registry metadata:
  `registry/default/items.json`
- Current component source and scene tests under `registry/default/ui/*` and
  `registry/default/examples/*`

## Audit Summary

| Component           | Current Origin | Base UI Match           | Verdict          | Required Change   |
| ------------------- | -------------- | ----------------------- | ---------------- | ----------------- |
| `badge`             | `shadcn`       | None                    | Audited clear    | None              |
| `avatar`            | `base-ui`      | `Avatar`                | Already promoted | None in this pass |
| `card`              | `shadcn`       | None                    | Audited clear    | None              |
| `skeleton`          | `shadcn`       | None                    | Audited clear    | None              |
| `spinner`           | `shadcn`       | None                    | Audited clear    | None              |
| `kbd`               | `shadcn`       | None                    | Audited clear    | None              |
| `typography`        | `shadcn`       | None                    | Audited clear    | None              |
| `empty`             | `shadcn`       | No standalone component | Audited clear    | None              |
| `input-group`       | `shadcn`       | No direct component     | Audited clear    | None              |
| `badge-spinner`     | example        | Composition only        | Audited clear    | None              |
| `empty-input-group` | example        | Composition only        | Audited clear    | None              |
| `kbd-input-group`   | example        | Composition only        | Audited clear    | None              |

## Findings

### badge

`badge` is a stateless shadcn presentation component. Current Base UI does not
expose a Badge component in its component navigation. There is no Base UI
keyboard, focus, role, data attribute, controlled/uncontrolled state, or
composition contract to apply.

Verdict: no modification needed.

### avatar

`avatar` is no longer a shadcn-origin item in local metadata; it is already
`origin: "base-ui"`. The local implementation matches the Base UI anatomy at
the level required by this registry pass: `Root`, `Image`, and `Fallback`.

Known Base UI details not implemented in the local Foldkit slice:

- image loading-status state
- fallback delay timing
- image transition data attributes such as `data-starting-style` and
  `data-ending-style`
- render-prop replacement API

Those are not regressions in the shadcn-origin audit lane because `avatar` has
already been promoted and documented as a scoped Base UI-informed component.
They remain possible future hardening work if image loading state becomes a
product requirement.

Verdict: no modification needed in this audit.

### card

`card` is a static layout shell for grouped content. Current Base UI does not
expose a Card component. The local docs correctly leave roles to inner content
and warn consumers to use meaningful headings, links, and buttons.

Verdict: no modification needed.

### skeleton

`skeleton` is a visual loading placeholder. Current Base UI does not expose a
Skeleton component. The local component is intentionally static and
`aria-hidden`; announced loading state remains the responsibility of nearby
status text when needed.

Verdict: no modification needed.

### spinner

`spinner` is a loading status affordance. Current Base UI does not expose a
Spinner component. The local component already carries `role=status` and
`aria-label=Loading`, which is the relevant accessibility contract for this
presentation slice.

Verdict: no modification needed.

### kbd

`kbd` renders inline keyboard tokens. Current Base UI does not expose a Kbd
component. No behavior contract applies.

Verdict: no modification needed.

### typography

`typography` is a set of static prose helpers. Current Base UI does not expose
a Typography component. Heading level and semantic element choices remain
consumer-owned through the helper selected at the call site.

Verdict: no modification needed.

### empty

`empty` is a static empty-state layout. Base UI exposes an `Empty` part inside
components such as Autocomplete, but not a standalone Empty component with this
shadcn-style page-level layout contract. The local component has no hidden
state machine and no Base UI behavior contract to apply.

Verdict: no modification needed.

### input-group

`input-group` is a shadcn-style composition wrapper around a native input and
addon slots. Base UI exposes `Input`, but not a direct Input Group component.
The local `inputView` uses native textbox semantics and requires explicit
accessible naming at the call site.

Verdict: no modification needed.

## Composed Examples

`badge-spinner`, `empty-input-group`, and `kbd-input-group` compose already
audited presentation slices. They do not introduce new component-owned state,
keyboard behavior, or focus management. Their tests verify visible composition
and the native input semantics where applicable.

Verdict: no modification needed.

## Follow-Up Queue

No immediate code changes are required from this audit batch.

Future hardening candidates, outside this audit lane:

- `avatar`: add image loading-status state, fallback delay, and image
  transition data attributes if runtime image lifecycle parity becomes
  important.
- `input-group`: revisit if Base UI adds a direct Input Group component.
- `empty`: revisit if Base UI adds a standalone Empty component.
