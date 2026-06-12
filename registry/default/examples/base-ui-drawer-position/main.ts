import { Effect, Match as M, Schema as S } from "effect";
import { Command, Dom, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { ts } from "foldkit/schema";
import { evo } from "foldkit/struct";

import * as Drawer from "../../ui/base-ui-drawer";

// MODEL

const Idle = ts("Idle");
const Dragging = ts("Dragging", {
  startScreenY: S.Number,
  currentScreenY: S.Number,
});
const DragState = S.Union([Idle, Dragging]);
type DragState = typeof DragState.Type;

export const Model = S.Struct({
  open: S.Boolean,
  dragState: DragState,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedOpenDrawer = m("ClickedOpenDrawer");
export const ClickedCloseDrawer = m("ClickedCloseDrawer");
export const PressedDrawerPointer = m("PressedDrawerPointer", {
  screenY: S.Number,
});
export const MovedDrawerPointer = m("MovedDrawerPointer", {
  screenY: S.Number,
});
export const ReleasedDrawerPointer = m("ReleasedDrawerPointer", {
  screenY: S.Number,
});
export const PressedDrawerTabKey = m("PressedDrawerTabKey");
export const FocusedBeforeDrawer = m("FocusedBeforeDrawer");
export const FocusedAfterDrawer = m("FocusedAfterDrawer");
export const CompletedFocusDrawerClose = m("CompletedFocusDrawerClose");
export const CompletedFocusDrawerTrigger = m("CompletedFocusDrawerTrigger");

export const Message = S.Union([
  ClickedOpenDrawer,
  ClickedCloseDrawer,
  PressedDrawerPointer,
  MovedDrawerPointer,
  ReleasedDrawerPointer,
  PressedDrawerTabKey,
  FocusedBeforeDrawer,
  FocusedAfterDrawer,
  CompletedFocusDrawerClose,
  CompletedFocusDrawerTrigger,
]);
export type Message = typeof Message.Type;
type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

// INIT

export const init = (): UpdateReturn => [
  { open: false, dragState: Idle() },
  [],
];

// UPDATE

const triggerId = "base-ui-drawer-position-trigger";
const closeId = "base-ui-drawer-position-close";
const swipeDismissThreshold = 80;
const updateReturn = M.withReturnType<UpdateReturn>();

export const FocusDrawerClose = Command.define(
  "FocusDrawerClose",
  CompletedFocusDrawerClose
)(
  Dom.focus(`#${closeId}`).pipe(
    Effect.as(CompletedFocusDrawerClose()),
    Effect.catchEager(() => Effect.succeed(CompletedFocusDrawerClose()))
  )
);

export const FocusDrawerTrigger = Command.define(
  "FocusDrawerTrigger",
  CompletedFocusDrawerTrigger
)(
  Dom.focus(`#${triggerId}`).pipe(
    Effect.as(CompletedFocusDrawerTrigger()),
    Effect.catchEager(() => Effect.succeed(CompletedFocusDrawerTrigger()))
  )
);

const closeDrawer = (model: Model): UpdateReturn => [
  evo(model, { open: () => false, dragState: () => Idle() }),
  [FocusDrawerTrigger()],
];

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    updateReturn,
    M.tagsExhaustive({
      ClickedOpenDrawer: () => [
        evo(model, { open: () => true, dragState: () => Idle() }),
        [FocusDrawerClose()],
      ],
      ClickedCloseDrawer: () => closeDrawer(model),
      PressedDrawerPointer: ({ screenY }) => [
        evo(model, {
          dragState: () =>
            Dragging({ startScreenY: screenY, currentScreenY: screenY }),
        }),
        [],
      ],
      MovedDrawerPointer: ({ screenY }) =>
        M.value(model.dragState).pipe(
          updateReturn,
          M.tagsExhaustive({
            Idle: () => [model, []],
            Dragging: ({ startScreenY }) => [
              evo(model, {
                dragState: () =>
                  Dragging({ startScreenY, currentScreenY: screenY }),
              }),
              [],
            ],
          })
        ),
      ReleasedDrawerPointer: ({ screenY }) =>
        M.value(model.dragState).pipe(
          updateReturn,
          M.tagsExhaustive({
            Idle: () => [model, []],
            Dragging: ({ startScreenY }) =>
              screenY - startScreenY >= swipeDismissThreshold
                ? closeDrawer(model)
                : [evo(model, { dragState: () => Idle() }), []],
          })
        ),
      PressedDrawerTabKey: () => [model, [FocusDrawerClose()]],
      FocusedBeforeDrawer: () => [model, [FocusDrawerClose()]],
      FocusedAfterDrawer: () => [model, [FocusDrawerClose()]],
      CompletedFocusDrawerClose: () => [model, []],
      CompletedFocusDrawerTrigger: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "bottom-drawer-title";
  const descriptionId = "bottom-drawer-description";

  return Drawer.rootView<Message>({
    children: [
      Drawer.triggerView<Message>({
        id: triggerId,
        onClick: ClickedOpenDrawer(),
        children: [h.span([], ["Open bottom drawer"])],
      }),
      Drawer.portalView<Message>({
        open: model.open,
        children: [
          Drawer.backdropView<Message>({
            state: { open: model.open },
            children: [],
          }),
          Drawer.viewportView<Message>({
            state: { open: model.open },
            className: "items-end justify-stretch",
            testId: "base-ui-drawer-bottom-viewport",
            children: [
              Drawer.focusGuardView<Message>({
                onFocus: FocusedBeforeDrawer(),
                testId: "base-ui-drawer-bottom-before-focus-guard",
              }),
              Drawer.popupView<Message>({
                titleId,
                descriptionId,
                state: { open: model.open },
                className: "h-auto max-h-[50vh] max-w-none rounded-t-2xl",
                testId: "base-ui-drawer-bottom-popup",
                onKeyDown: () => PressedDrawerTabKey(),
                onPointerDown: (_screenX, screenY) =>
                  PressedDrawerPointer({ screenY }),
                onPointerMove: (_screenX, screenY) =>
                  MovedDrawerPointer({ screenY }),
                onPointerUp: (_screenX, screenY) =>
                  ReleasedDrawerPointer({ screenY }),
                style: {
                  maxWidth: "none",
                  width: "100%",
                },
                children: [
                  h.div(
                    [
                      h.Class(
                        "mx-auto mt-3 h-1.5 w-10 rounded-full bg-gray-300"
                      ),
                    ],
                    []
                  ),
                  Drawer.contentView<Message>({
                    children: [
                      Drawer.titleView<Message>({
                        id: titleId,
                        children: [h.span([], ["Notifications"])],
                      }),
                      Drawer.descriptionView<Message>({
                        id: descriptionId,
                        children: [
                          h.span([], ["You are all caught up. Good job!"]),
                        ],
                      }),
                      Drawer.closeView<Message>({
                        id: closeId,
                        onClick: ClickedCloseDrawer(),
                        children: [h.span([], ["Close"])],
                      }),
                    ],
                  }),
                ],
              }),
              Drawer.focusGuardView<Message>({
                onFocus: FocusedAfterDrawer(),
                testId: "base-ui-drawer-bottom-after-focus-guard",
              }),
            ],
          }),
        ],
      }),
    ],
  });
});
