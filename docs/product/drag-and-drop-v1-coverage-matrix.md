# DragAndDrop v1 Coverage Matrix

This matrix defines the v1 registry scope for the installable DragAndDrop slice.

| Surface          | Coverage                                                                                                                                               | Proof                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper | Re-exports `Ui.DragAndDrop` model, messages, out messages, commands, subscriptions, and primitive helpers through `registry/default/ui/drag-and-drop`. | `registry/default/ui/drag-and-drop/index.ts`; `bun run typecheck`; generated `apps/docs/public/r/drag-and-drop.json`.                                |
| View helper      | Provides shared sortable list classes and `sortableListView` for parent-owned item arrays.                                                             | `registry/default/ui/drag-and-drop/view.ts`; `registry/default/ui/drag-and-drop/drag-and-drop.scene.test.ts`.                                        |
| Basic example    | Shows a sortable task list with keyboard reorder update flow and parent-visible order feedback.                                                        | `registry/default/examples/drag-and-drop-basic/main.ts`; `registry/default/examples/drag-and-drop-basic/drag-and-drop-basic.scene.test.ts`.          |
| Disabled example | Shows a locked task list presentation that does not bind drag messages.                                                                                | `registry/default/examples/drag-and-drop-disabled/main.ts`; `registry/default/examples/drag-and-drop-disabled/drag-and-drop-disabled.scene.test.ts`. |
| Docs page        | Adds `/docs/components/drag-and-drop`, inline previews, install commands, usage, integration, API, accessibility, and coverage sections.               | `src/main.ts`; `src/main.scene.test.ts`; HTTP probes for docs and example routes.                                                                    |
| Registry output  | Ships component and example JSON through the docs public registry.                                                                                     | `bun run build:registry`; `bun run check:registry`; generated `/r/drag-and-drop*.json`.                                                              |

Deferred coverage:

- Browser pointer-drag choreography and auto-scroll behavior remain primitive-level behavior for a later browser-backed proof.
- Cross-container sorting is not covered by the v1 example.
- Drag ghost positioning is re-exported but not styled by the v1 helper.
