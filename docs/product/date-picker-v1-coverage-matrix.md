# DatePicker V1 Coverage Matrix

## Purpose

Track the first Foldkit CN DatePicker registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/datePicker/index.d.ts`
- Local Foldkit demo: `src/ui/view/datePicker.ts`
- Calendar and Popover slice precedents: `docs/product/calendar-v1-coverage-matrix.md`, `docs/product/popover-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                                              |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/date-picker/index.ts` re-exports `Ui.DatePicker` model, messages, OutMessages, init, update, imperative helpers, reflection helpers, config types, and reusable view helpers. |
| Styled helpers      | Done   | `registry/default/ui/date-picker/view.ts` exposes anchor, trigger, trigger-content, placeholder, panel, backdrop classes, `formatDate`, `triggerContent`, and `datePickerViewInputs`.              |
| Rendered behavior   | Done   | `date-picker.scene.test.ts` covers opening, popover mount resolution, disabled date attributes, selected-date OutMessage feedback, close focus, and mount cleanup.                                 |
| Basic example       | Done   | `registry/default/examples/date-picker-basic/` plus scene test for opening, selection, trigger label update, hidden input naming, and parent-visible selected-date feedback.                       |
| Bounds example      | Done   | `registry/default/examples/date-picker-bounds/` plus scene test for disabled-date attributes and allowed bounded selection.                                                                        |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/date-picker*.json` artifacts.                                                                                                                      |
| Docs app routes     | Done   | `/docs/components/date-picker`, `/docs/components/date-picker/examples/basic`, `/docs/components/date-picker/examples/bounds`, `/examples/date-picker-basic`, `/examples/date-picker-bounds`.      |
| Docs example blocks | Done   | DatePicker docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                                       |

## Deferred Or Not Applicable In V1

| Area                   | Decision                                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| Range date picking     | Deferred. V1 proves single-date selection; range semantics need a parent-owned domain model.               |
| Time picking           | Deferred. DatePicker owns dates only; time selection should be a separate composition or future primitive. |
| Custom date formatting | Deferred. `formatDate` exposes a stable ISO-style default; richer locale formatting belongs in examples.   |
| Async month event data | Deferred. `ChangedViewMonth` is exposed; event/availability loading should be a parent command example.    |

## Current Verification

- `bun run test -- registry/default/ui/date-picker/date-picker.scene.test.ts registry/default/examples/date-picker-basic/date-picker-basic.scene.test.ts registry/default/examples/date-picker-bounds/date-picker-bounds.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
