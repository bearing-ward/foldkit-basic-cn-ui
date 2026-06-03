# Calendar V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Calendar registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/calendar/index.d.ts`
- Local Foldkit demo: `src/ui/view/calendar.ts`
- FileDrop and Fieldset slice precedents: `docs/product/file-drop-v1-coverage-matrix.md`, `docs/product/fieldset-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                           |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/calendar/index.ts` re-exports `Ui.Calendar` model, messages, OutMessages, init, update, view, reflection helpers, config types, and reusable view helpers. |
| Styled helpers      | Done   | `registry/default/ui/calendar/view.ts` exposes container, header, navigation, day grid, day cell, month grid, and year grid classes plus `calendarView`.                        |
| Rendered behavior   | Done   | `calendar.scene.test.ts` covers selectable dates, disabled date attributes, and Days-to-Months mode switching with `FocusGrid` command resolution.                              |
| Basic example       | Done   | `registry/default/examples/calendar-basic/` plus scene test for selected date feedback and viewed-month feedback.                                                               |
| Bounds example      | Done   | `registry/default/examples/calendar-bounds/` plus scene test for disabled-date attributes and allowed bounded selection.                                                        |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/calendar*.json` artifacts.                                                                                                      |
| Docs app routes     | Done   | `/docs/components/calendar`, `/docs/components/calendar/examples/basic`, `/docs/components/calendar/examples/bounds`, `/examples/calendar-basic`, `/examples/calendar-bounds`.  |
| Docs example blocks | Done   | Calendar docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                      |

## Deferred Or Not Applicable In V1

| Area                    | Decision                                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Date range selection    | Deferred. V1 proves single-date selection; range semantics need a parent-owned domain model.             |
| Event density rendering | Deferred. Event markers and agenda summaries belong in composition examples once data loading is scoped. |
| Custom locale examples  | Deferred. Locale config is exposed by `init`, but v1 keeps the examples focused on core interaction.     |
| DatePicker integration  | Deferred. DatePicker already owns its Calendar child; this slice proves standalone Calendar install.     |

## Current Verification

- `bun run test -- registry/default/ui/calendar/calendar.scene.test.ts registry/default/examples/calendar-basic/calendar-basic.scene.test.ts registry/default/examples/calendar-bounds/calendar-bounds.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
