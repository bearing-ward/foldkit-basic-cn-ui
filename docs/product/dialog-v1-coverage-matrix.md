# Dialog V1 Coverage Matrix

## Purpose

This matrix defines what the first Foldkit CN `Dialog` slice must prove, what reference behavior it borrows from Base UI and shadcn, and what is intentionally deferred. It is the test and documentation checklist for the first vertical slice.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/dialog/index.d.ts`
- Local Foldkit demo: `src/ui/view/dialog.ts`
- Base UI docs: `repos/base-ui/docs/data/components/dialog/dialog.mdx`
- Base UI examples: `repos/base-ui/docs/src/app/(public)/(content)/react/components/dialog/demos/`
- Base UI tests: `repos/base-ui/packages/react/src/dialog/*.test.tsx`
- shadcn dialog docs: `repos/shadcn-ui/apps/v4/content/docs/components/base/dialog.mdx`
- shadcn dialog examples: `repos/shadcn-ui/apps/v4/registry/new-york-v4/examples/dialog-*.tsx`

## Foldkit Primitive Coverage

Foldkit `Ui.Dialog` already covers the state machine and browser side effects that this registry component should wrap:

- `Model` fields: `id`, `isOpen`, `isAnimated`, `animation`, `maybeFocusSelector`.
- `InitConfig` fields: `id`, optional `isOpen`, optional `isAnimated`, optional `focusSelector`.
- `Message`: `RequestedOpen`, `RequestedClose`, `CompletedShowDialog`, `CompletedCloseDialog`, `GotAnimationMessage`.
- `OutMessage`: `Opened`, `Closed`.
- `update` returns `[Model, Commands, Option<OutMessage>]`.
- `ShowDialog` locks scroll and calls `showModal`.
- `CloseDialog` closes the native dialog and unlocks scroll.
- `view` supplies native dialog, backdrop, panel, and `isVisible` render info.
- Native dialog `cancel` events emit `RequestedClose`, covering Escape close behavior.
- Backdrop clicks emit `RequestedClose`.
- `titleId(model)` and `descriptionId(model)` provide stable accessible labelling IDs.

The registry wrapper should not reimplement this behavior. Its responsibility is to expose the component in the registry format, provide styled composable view helpers, and prove that the wrapper preserves Foldkit behavior.

## V1 Story Tests

Story tests should run against pure update functions and command output without a browser runtime.

| Area             | Required Proof                                                                     |
| ---------------- | ---------------------------------------------------------------------------------- |
| Init wrapper     | Registry `Dialog.init(config)` returns `[model, []]`.                              |
| Default state    | A default init is closed and has no startup commands.                              |
| Open init        | `isOpen: true` is preserved when explicitly configured.                            |
| Animation config | `isAnimated: true` is preserved for animated examples.                             |
| Focus config     | `focusSelector` is stored in `maybeFocusSelector`.                                 |
| Requested open   | `RequestedOpen` opens a closed dialog, returns `ShowDialog`, and emits `Opened`.   |
| Repeated open    | `RequestedOpen` on an already-open dialog does not emit a second parent event.     |
| Requested close  | `RequestedClose` closes an open dialog, returns `CloseDialog`, and emits `Closed`. |
| Repeated close   | `RequestedClose` on an already-closed dialog does not emit a second parent event.  |
| Helper API       | `open(model)` and `close(model)` delegate to the same update behavior as messages. |
| OutMessage shape | Parent-visible events are only semantic facts: `Opened` and `Closed`.              |

## V1 Scene Tests

Scene tests should verify documented user behavior through the rendered view with accessible locators where Foldkit test APIs support it.

| Area                 | Required Proof                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Trigger              | A trigger button renders with the documented accessible name and emits `Dialog.RequestedOpen()`.                     |
| Dialog role          | Opening renders a dialog surface discoverable by role and accessible name.                                           |
| Title wiring         | The title element uses `Dialog.titleId(model)` and labels the dialog.                                                |
| Description wiring   | The description element uses `Dialog.descriptionId(model)` and describes the dialog.                                 |
| Close button         | Clicking the close button emits close behavior and hides the dialog.                                                 |
| Footer actions       | Cancel and confirm actions in the basic example close the dialog.                                                    |
| Backdrop click       | Clicking the backdrop closes the dialog when the scene driver can target it.                                         |
| Escape close         | Dispatching native cancel or Escape closes the dialog when the scene driver can represent it.                        |
| Animation visibility | Animated examples keep the surface visible for the intended animation state while open.                              |
| Focus target         | `focusSelector` behavior is covered by an integration or browser check if scene tests cannot inspect focus reliably. |

## V1 Documentation And Examples

The first docs page should match the format expectations users bring from Base UI and shadcn while using Foldkit terms.

| Item                | Required Content                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| Overview            | Explain that this is a Foldkit CN registry component wrapping Foldkit `Ui.Dialog`, not official Foldkit UI.   |
| Installation        | Show the shadcn-compatible registry command using the public registry URL placeholder.                        |
| Anatomy             | Show `Dialog` imports, trigger, root/content, title, description, footer, and close actions.                  |
| Basic example       | Runnable example with trigger, title, description, cancel, and confirm.                                       |
| Destructive example | Confirmation dialog using destructive styling only, not an `AlertDialog` API.                                 |
| Animated example    | `isAnimated: true` example using the default animated docs behavior.                                          |
| Focus example       | Document `focusSelector` and `h.OnClickFocus` for iOS keyboard warmup flows.                                  |
| Scrollable example  | Show long content inside a constrained body region while footer actions stay available.                       |
| API reference       | List `Model`, `Message`, `OutMessage`, `init`, `update`, `open`, `close`, `view`, `titleId`, `descriptionId`. |
| Accessibility       | Document title/description wiring, Escape close, backdrop close, and native dialog behavior.                  |
| Browser focus proof | Verify the focus example carries `#dialog-focus-name` through the runtime `ShowDialog` command.               |
| Traceability        | Map each documented behavior to Story, Scene, browser, registry, or deferred proof.                           |
| Tests               | Link or describe the story and scene tests that cover documented behavior.                                    |

## V1 Included Reference Behavior

These reference behaviors are in scope for the first `Dialog` slice:

- shadcn-style composition: trigger, content, header, title, description, footer, close button.
- shadcn basic dialog example.
- shadcn custom close button behavior through composable parts.
- shadcn no-close-button layout as composition, without adding new state behavior.
- Base UI open and close behavior through a trigger.
- Base UI close via close button.
- Base UI close via backdrop click.
- Base UI close via Escape or native cancel.
- Base UI accessible title and description wiring.
- Foldkit `OutMessage` propagation for parent-owned effects after open or close.
- Foldkit `focusSelector` support.
- Foldkit `h.OnClickFocus` documentation for trigger-to-input flows.
- Animated dialog examples using Foldkit animation support.
- Scrollable dialog content with persistent footer actions.
- Detached trigger in the Foldkit sense: the trigger is parent-owned and sends `Dialog.RequestedOpen()`.

## Deferred Or Not Applicable In V1

These behaviors should not block the first slice:

| Reference Behavior                                 | V1 Decision                                                                                                          |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Base UI `Portal` and `Viewport` parts              | Deferred. Foldkit v1 uses native dialog rendering from `Ui.Dialog.view`.                                             |
| Base UI uncontained dialog demos                   | Deferred until docs need explicit positioning variants.                                                              |
| Base UI controlled `open` and `onOpenChange`       | Not applicable as a public API shape. Foldkit owns state through `Model`, `Message`, `update`, and `OutMessage`.     |
| Base UI detached trigger payload tests             | Deferred. React payload-driven detached triggers do not map directly to v1 Foldkit Dialog.                           |
| Base UI trigger reparenting and Fast Refresh tests | Not applicable to the Foldkit v1 registry wrapper.                                                                   |
| Nested dialogs                                     | Unsupported in v1. Keep one active Dialog per flow; future modal stacking needs a coordinator or separate component. |
| Scrollable content and sticky footer examples      | Included through `dialog-scrollable`.                                                                                |
| RTL behavior                                       | Supported as inherited layout context through `h.Dir("rtl")`; no Dialog model state or registry example in v1.       |
| Drawer dialog                                      | Separate component or example later.                                                                                 |
| Command dialog                                     | Separate component or example later.                                                                                 |
| Alert dialog                                       | Separate component later, not a v1 Dialog variant.                                                                   |

## First TDD Order

1. Add registry source files under `registry/default/ui/dialog/` with a minimal wrapper around `Ui.Dialog`.
2. Add story tests for init, open, close, repeated open, repeated close, helper functions, and out messages.
3. Add composable view helpers and scene tests for basic open, labelled dialog rendering, close button, cancel, and confirm.
4. Add the basic runnable example under `registry/default/examples/dialog-basic/`.
5. Generate component and example registry JSON under `apps/docs/public/r/`.
6. Add the docs route and inline preview.
7. Run lint, typecheck, unit tests, build, and browser checks for the docs page and standalone example.
