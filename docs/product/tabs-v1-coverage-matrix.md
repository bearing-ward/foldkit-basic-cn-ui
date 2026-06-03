# Tabs v1 Coverage Matrix

This matrix defines the v1 registry scope for the installable Tabs slice.

| Surface          | Coverage                                                                                                                            | Proof                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper | Re-exports `Ui.Tabs` model, messages, out messages, typed `create`, focus command, update, selection helpers, and keyboard helpers. | `registry/default/ui/tabs/index.ts`; `bun run typecheck`; generated `apps/docs/public/r/tabs.json`.                 |
| View helper      | Provides shared tablist, tab, panel, and root classes plus `tabsView`.                                                              | `registry/default/ui/tabs/view.ts`; `registry/default/ui/tabs/tabs.scene.test.ts`.                                  |
| Basic example    | Shows automatic tab selection and parent-visible selected-tab feedback.                                                             | `registry/default/examples/tabs-basic/main.ts`; `registry/default/examples/tabs-basic/tabs-basic.scene.test.ts`.    |
| Manual example   | Shows manual activation mode and disabled tab rendering.                                                                            | `registry/default/examples/tabs-manual/main.ts`; `registry/default/examples/tabs-manual/tabs-manual.scene.test.ts`. |
| Docs page        | Adds `/docs/components/tabs`, inline previews, install commands, usage, integration, API, accessibility, and coverage sections.     | `src/main.ts`; `src/main.scene.test.ts`; HTTP probes for docs and example routes.                                   |
| Registry output  | Ships component and example JSON through the docs public registry.                                                                  | `bun run build:registry`; `bun run check:registry`; generated `/r/tabs*.json`.                                      |

Deferred coverage:

- Vertical orientation is supported by the primitive but not included as a v1 example.
- Animated tab panel transitions remain out of scope for the first Tabs slice.
