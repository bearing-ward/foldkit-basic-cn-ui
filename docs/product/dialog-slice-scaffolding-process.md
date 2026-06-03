# Dialog Slice Scaffolding Process

## Purpose

Use this checklist to delegate future Foldkit CN component slices to a smaller model. It describes the process used to scaffold the first `Dialog` registry slice and the traps that caused or could cause rework.

## Inputs To Read First

Read these files before changing code:

- `docs/product/foldkit-shadcn-registry-plan.md`
- `docs/product/dialog-v1-coverage-matrix.md`
- `registry/default/ui/dialog/index.ts`
- `registry/default/ui/dialog/view.ts`
- `registry/default/ui/dialog/dialog.story.test.ts`
- `registry/default/ui/dialog/dialog.scene.test.ts`
- `src/ui/view/dialog.ts`
- `node_modules/foldkit/dist/ui/dialog/index.d.ts`

Use `repos/base-ui/` and `repos/shadcn-ui/` as behavior and documentation references only. Do not copy React implementation patterns directly into Foldkit code.

## Slice Order

1. Confirm the component API in `node_modules/foldkit/dist/ui/<component>/index.d.ts`.
2. Write or update the coverage matrix before code if behavior scope is unclear.
3. Create `registry/default/ui/<component>/`.
4. Add a thin `index.ts` wrapper around the Foldkit primitive.
5. Normalize `init` to return `[model, commands]` for registry stateful components.
6. Re-export the Foldkit model, message, out-message, update, command definitions, and helper IDs.
7. Add `*.story.test.ts` for pure model/update behavior.
8. Add `view.ts` for styled helper functions that compose the primitive view.
9. Add `*.scene.test.ts` for rendered behavior through accessible locators.
10. Run focused tests for the component.
11. Run full validation.
12. Only then move to examples, generated registry JSON, and docs pages.

## Dialog Wrapper Pattern

The registry wrapper should be thin:

- Export `Ui.Dialog.Model` as both value and type.
- Export `RequestedOpen`, `RequestedClose`, completion messages, `Message`, `OutMessage`, `Opened`, and `Closed`.
- Export `ShowDialog` and `CloseDialog` so tests can assert queued command names and args.
- Export `update`, `open`, `close`, `titleId`, and `descriptionId` directly from `Ui.Dialog`.
- Wrap only `init`, because registry stateful components return a tuple:

```ts
export const init = (config: InitConfig): InitReturn => [
  Ui.Dialog.init(config),
  [],
];
```

Do not reimplement the Dialog state machine or browser commands in the registry wrapper.

## Story Test Pattern

Use `Story.story` for message/update behavior:

- Send `RequestedOpen`.
- Assert `model.isOpen === true`.
- Assert `Story.Command.expectExact(Dialog.ShowDialog(...))`.
- Assert `Story.expectOutMessage(Dialog.Opened())`.
- Resolve the command with `CompletedShowDialog`.
- Repeat the same pattern for close.
- Assert repeated open and repeated close with `Story.Command.expectNone()` and `Story.expectNoOutMessage()`.

Use direct pure-function assertions for helper functions like `open(model)` and `close(model)`. `Story.story` advances by sending messages through an update function; it does not call helper functions as the first step.

## Scene Test Pattern

Create a tiny local test app in the Scene test:

- Model is `Dialog.Model`.
- Update is `Dialog.update`.
- View renders a parent trigger plus `h.submodel`.
- The `h.submodel` uses `Dialog.view`.
- `viewInputs.toView` composes `Dialog.root`, `Dialog.backdrop`, `Dialog.panel`, `Dialog.title`, `Dialog.description`, `Dialog.footer`, and action buttons.
- `toParentMessage` returns the child message unchanged when the parent message type is exactly `Dialog.Message`.

Scene tests should verify:

- Trigger exists by role and accessible name.
- Dialog title is absent before open.
- Clicking trigger queues `ShowDialog`.
- Resolving `ShowDialog` renders a role `dialog` with accessible name from title text.
- Dialog has accessible description from description text.
- Cancel and confirm buttons queue `CloseDialog`.
- Resolving `CloseDialog` removes the dialog content.

## Caveats

- `Ui.Dialog.view` must be rendered through `h.submodel`; do not call it like an ordinary helper view.
- `Dialog.trigger` emits a `Message`, not a `Command`. The command is produced later by `Dialog.update`.
- `focusSelector` belongs in Dialog init config. `h.OnClickFocus` is a separate trigger-time helper for iOS keyboard warmup flows.
- `titleId(model)` and `descriptionId(model)` must be applied to rendered title and description elements for accessible naming.
- `Dialog.root` must render a native `h.dialog`; Foldkit `ShowDialog` and `CloseDialog` commands target the native dialog element by ID.
- `render.isVisible` controls whether backdrop and panel children render. Closed dialogs should not keep title/body content in the tree.
- The registry helper layer can add styling and composition, but not new state semantics.

## Common Pitfalls

- Forgetting to add `registry/**/*` to `tsconfig.json`, leaving registry source outside typecheck.
- Comparing full command objects with `toEqual`; command effects have different identities. Compare command names and args, or use `Story.Command.expectExact`.
- Using `Story.story` directly with `Dialog.open` or `Dialog.close`; these are helper functions, not message-driven update functions.
- Importing non-exported internals from `foldkit/html`. If a type is not exported by the package surface, define the minimal local type instead.
- Porting Base UI controlled props like `open` and `onOpenChange` into the public API. Foldkit owns state with `Model`, `Message`, `update`, and `OutMessage`.
- Treating detached trigger payload tests from Base UI as v1 requirements. The Foldkit v1 trigger is parent-owned and sends `Dialog.RequestedOpen()`.
- Adding `AlertDialog` behavior as a Dialog variant. `AlertDialog` is a separate component later.
- Adding docs or generated registry JSON before source and tests are green.

## Validation Commands

Run focused checks first:

```sh
bunx vitest run registry/default/ui/dialog/dialog.story.test.ts registry/default/ui/dialog/dialog.scene.test.ts
bun run typecheck
```

Run the full chain before closing the slice:

```sh
bun run lint
bun run test
bun run build
```

## Future Improvement Notes

- Add a reusable test harness for registry components that need a parent `h.submodel` wrapper.
- Add a registry manifest generator that typechecks file paths before writing JSON.
- Add browser checks for focus behavior once docs and standalone examples exist.
- Add a docs-page checklist that maps every documented behavior to either a Story test, Scene test, or browser check.
- Add component-scaffold scripts once two or three components prove the same file pattern.
