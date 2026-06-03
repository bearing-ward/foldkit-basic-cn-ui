# Slider v1 Coverage Matrix

This matrix defines the v1 registry scope for the installable Slider slice.

| Surface          | Coverage                                                                                                                                     | Proof                                                                                                                           |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper | Re-exports `Ui.Slider` model, messages, out messages, update, reflect helpers, subscriptions, and view through `registry/default/ui/slider`. | `registry/default/ui/slider/index.ts`; `bun run typecheck`; generated `apps/docs/public/r/slider.json`.                         |
| View helper      | Provides shared field, track, filled-track, thumb, label, and value classes plus `sliderFieldView`.                                          | `registry/default/ui/slider/view.ts`; `registry/default/ui/slider/slider.scene.test.ts`.                                        |
| Basic example    | Shows a rating slider with keyboard increment behavior and parent-visible value feedback.                                                    | `registry/default/examples/slider-basic/main.ts`; `registry/default/examples/slider-basic/slider-basic.scene.test.ts`.          |
| Disabled example | Shows disabled slider semantics with locked value feedback.                                                                                  | `registry/default/examples/slider-disabled/main.ts`; `registry/default/examples/slider-disabled/slider-disabled.scene.test.ts`. |
| Docs page        | Adds `/docs/components/slider`, inline previews, install commands, usage, integration, API, accessibility, and coverage sections.            | `src/main.ts`; `src/main.scene.test.ts`; HTTP probes for docs and example routes.                                               |
| Registry output  | Ships component and example JSON through the docs public registry.                                                                           | `bun run build:registry`; `bun run check:registry`; generated `/r/slider*.json`.                                                |

Deferred coverage:

- Browser pointer-drag choreography is delegated to the Foldkit primitive subscriptions and remains a later browser-backed proof.
- Range reflection examples are documented in API notes but not included as a v1 runnable example.
- Vertical or multi-thumb sliders are out of scope for the current Foldkit primitive.
