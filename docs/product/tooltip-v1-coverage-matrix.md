# Tooltip v1 Coverage Matrix

This matrix defines the v1 registry scope for the installable Tooltip slice.

| Surface          | Coverage                                                                                                                               | Proof                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper | Re-exports `Ui.Tooltip` model, messages, out messages, update, delay command, anchor mount, reflection helper, view, and tuple `init`. | `registry/default/ui/tooltip/index.ts`; `bun run typecheck`; generated `apps/docs/public/r/tooltip.json`.                          |
| View helper      | Provides shared trigger, panel, root, and anchor helpers plus `tooltipView` for conditional panel rendering.                           | `registry/default/ui/tooltip/view.ts`; `registry/default/ui/tooltip/tooltip.scene.test.ts`.                                        |
| Basic example    | Shows delayed hover opening and parent-visible Shown feedback.                                                                         | `registry/default/examples/tooltip-basic/main.ts`; `registry/default/examples/tooltip-basic/tooltip-basic.scene.test.ts`.          |
| No-delay example | Shows immediate focus opening with zero delay configuration and parent-visible Shown feedback.                                         | `registry/default/examples/tooltip-no-delay/main.ts`; `registry/default/examples/tooltip-no-delay/tooltip-no-delay.scene.test.ts`. |
| Docs page        | Adds `/docs/components/tooltip`, inline previews, install commands, usage, integration, API, accessibility, and coverage sections.     | `src/main.ts`; `src/main.scene.test.ts`; HTTP probes for docs and example routes.                                                  |
| Registry output  | Ships component and example JSON through the docs public registry.                                                                     | `bun run build:registry`; `bun run check:registry`; generated `/r/tooltip*.json`.                                                  |

Deferred coverage:

- Rich hover-card style interactive content is out of scope; Tooltip remains non-interactive help text.
- Animated tooltip transitions are out of scope for this first Tooltip slice.
- Browser timer behavior is covered through Foldkit command resolution in scene tests rather than a dedicated Playwright test.
