import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { ts } from "foldkit/schema";
import { evo } from "foldkit/struct";

import * as Drawer from "../../ui/base-ui-drawer";

// MODEL

const Idle = ts("Idle");
const Dragging = ts("Dragging", {
  startScreenX: S.Number,
  currentScreenX: S.Number,
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
  screenX: S.Number,
});
export const MovedDrawerPointer = m("MovedDrawerPointer", {
  screenX: S.Number,
});
export const ReleasedDrawerPointer = m("ReleasedDrawerPointer", {
  screenX: S.Number,
});

export const Message = S.Union([
  ClickedOpenDrawer,
  ClickedCloseDrawer,
  PressedDrawerPointer,
  MovedDrawerPointer,
  ReleasedDrawerPointer,
]);
export type Message = typeof Message.Type;
type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

// INIT

export const init = (): UpdateReturn => [
  { open: false, dragState: Idle() },
  [],
];

// UPDATE

const swipeDismissThreshold = 80;
const updateReturn = M.withReturnType<UpdateReturn>();

const closeDrawer = (model: Model): UpdateReturn => [
  evo(model, { open: () => false, dragState: () => Idle() }),
  [],
];

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    updateReturn,
    M.tagsExhaustive({
      ClickedOpenDrawer: () => [
        evo(model, { open: () => true, dragState: () => Idle() }),
        [],
      ],
      ClickedCloseDrawer: () => closeDrawer(model),
      PressedDrawerPointer: ({ screenX }) => [
        evo(model, {
          dragState: () =>
            Dragging({ startScreenX: screenX, currentScreenX: screenX }),
        }),
        [],
      ],
      MovedDrawerPointer: ({ screenX }) =>
        M.value(model.dragState).pipe(
          updateReturn,
          M.tagsExhaustive({
            Idle: () => [model, []],
            Dragging: ({ startScreenX }) => [
              evo(model, {
                dragState: () =>
                  Dragging({ startScreenX, currentScreenX: screenX }),
              }),
              [],
            ],
          })
        ),
      ReleasedDrawerPointer: ({ screenX }) =>
        M.value(model.dragState).pipe(
          updateReturn,
          M.tagsExhaustive({
            Idle: () => [model, []],
            Dragging: ({ startScreenX }) =>
              screenX - startScreenX >= swipeDismissThreshold
                ? closeDrawer(model)
                : [evo(model, { dragState: () => Idle() }), []],
          })
        ),
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "non-modal-drawer-title";
  const descriptionId = "non-modal-drawer-description";

  return Drawer.rootView<Message>({
    children: [
      Drawer.triggerView<Message>({
        onClick: ClickedOpenDrawer(),
        children: [h.span([], ["Open non-modal drawer"])],
      }),
      Drawer.portalView<Message>({
        open: model.open,
        children: [
          Drawer.viewportView<Message>({
            state: { open: model.open },
            children: [
              Drawer.popupView<Message>({
                titleId,
                descriptionId,
                state: { open: model.open },
                modal: false,
                testId: "base-ui-drawer-non-modal-popup",
                onPointerDown: (screenX) => PressedDrawerPointer({ screenX }),
                onPointerMove: (screenX) => MovedDrawerPointer({ screenX }),
                onPointerUp: (screenX) => ReleasedDrawerPointer({ screenX }),
                children: [
                  Drawer.contentView<Message>({
                    children: [
                      Drawer.titleView<Message>({
                        id: titleId,
                        children: [h.span([], ["Non-modal drawer"])],
                      }),
                      Drawer.descriptionView<Message>({
                        id: descriptionId,
                        children: [
                          h.span(
                            [],
                            [
                              "This drawer does not trap focus and ignores outside clicks. Use the close button or swipe to dismiss it.",
                            ]
                          ),
                        ],
                      }),
                      Drawer.closeView<Message>({
                        onClick: ClickedCloseDrawer(),
                        children: [h.span([], ["Close"])],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
});
