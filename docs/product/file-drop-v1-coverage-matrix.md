# FileDrop V1 Coverage Matrix

## Purpose

Track the first Foldkit CN FileDrop registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/fileDrop/index.d.ts`
- Local Foldkit demo: `src/ui/view/fileDrop.ts`
- Fieldset and Input slice precedents: `docs/product/fieldset-v1-coverage-matrix.md`, `docs/product/input-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                                   |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/file-drop/index.ts` re-exports `Ui.FileDrop` model, messages, OutMessages, init, update, view, config types, and reusable view helpers.                            |
| Styled helpers      | Done   | `registry/default/ui/file-drop/view.ts` exposes drop-zone, text, file-list, file-row, file-name, file-size classes, and `formatFileSize`.                                               |
| Rendered behavior   | Done   | `file-drop.scene.test.ts` covers dropped files, file input changes, rendered file metadata, and disabled state.                                                                         |
| Basic example       | Done   | `registry/default/examples/file-drop-basic/` plus scene test for selected file feedback and removal.                                                                                    |
| Disabled example    | Done   | `registry/default/examples/file-drop-disabled/` plus scene test for disabled upload input.                                                                                              |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/file-drop*.json` artifacts.                                                                                                             |
| Docs app routes     | Done   | `/docs/components/file-drop`, `/docs/components/file-drop/examples/basic`, `/docs/components/file-drop/examples/disabled`, `/examples/file-drop-basic`, `/examples/file-drop-disabled`. |
| Docs example blocks | Done   | FileDrop docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                              |

## Deferred Or Not Applicable In V1

| Area             | Decision                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| File validation  | Deferred. Accept filters are exposed; validation messaging belongs in richer parent examples.  |
| Upload commands  | Deferred. V1 proves file intake; upload/persistence should be a parent-owned command example.  |
| File previews    | Deferred. Preview rendering depends on file type and should be component-specific composition. |
| Progress display | Deferred. Progress belongs with async upload command lifecycle, not file intake itself.        |

## Current Verification

- `bun run test -- registry/default/ui/file-drop/file-drop.scene.test.ts registry/default/examples/file-drop-basic/file-drop-basic.scene.test.ts registry/default/examples/file-drop-disabled/file-drop-disabled.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
