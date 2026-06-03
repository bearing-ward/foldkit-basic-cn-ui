# Animation v1 Coverage Matrix

This matrix defines the v1 registry scope for the installable Animation slice.

| Surface          | Coverage                                                                                                                                    | Proof                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper | Re-exports `Ui.Animation` model, messages, out messages, update, frame command, settled-animation command, default leave command, and view. | `registry/default/ui/animation/index.ts`; `bun run typecheck`; generated `apps/docs/public/r/animation.json`.                   |
| View helper      | Provides shared trigger/content classes and `animationPanel` for example composition.                                                       | `registry/default/ui/animation/view.ts`; `registry/default/ui/animation/animation.scene.test.ts`.                               |
| Basic example    | Shows a toggle-driven animation with enter frame advancement, leave settlement, and parent-visible status feedback.                         | `registry/default/examples/animation-basic/main.ts`; `registry/default/examples/animation-basic/animation-basic.scene.test.ts`. |
| Docs page        | Adds `/docs/components/animation`, inline preview, install commands, usage, integration, API, accessibility, and coverage sections.         | `src/main.ts`; `src/main.scene.test.ts`; HTTP probes for docs and example routes.                                               |
| Registry output  | Ships component and example JSON through the docs public registry.                                                                          | `bun run build:registry`; `bun run check:registry`; generated `/r/animation*.json`.                                             |

Deferred coverage:

- More opinionated motion presets are out of scope; the registry wrapper exposes the headless primitive and reusable classes.
- Reduced-motion policy remains the responsibility of consuming CSS for now.
- Component-specific animated examples continue to live with those components.
