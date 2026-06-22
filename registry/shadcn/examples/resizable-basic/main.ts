import { Match as M, Option, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { ts } from "foldkit/schema";
import { evo } from "foldkit/struct";

import * as Resizable from "../../ui/resizable";

// MODEL

const Idle = ts("Idle");
const Dragging = ts("Dragging", {
  startScreenX: S.Number,
  startLeftSize: S.Number,
});
const ResizeState = S.Union([Idle, Dragging]);
type ResizeState = typeof ResizeState.Type;

export const Model = S.Struct({
  leftSize: S.Number,
  resizeState: ResizeState,
});
export type Model = typeof Model.Type;

// MESSAGE

export const PressedResizeHandle = m("PressedResizeHandle", {
  screenX: S.Number,
});
export const MovedResizePointer = m("MovedResizePointer", {
  screenX: S.Number,
});
export const ReleasedResizePointer = m("ReleasedResizePointer");
export const PressedResizeKey = m("PressedResizeKey", { key: S.String });
export const Message = S.Union([
  PressedResizeHandle,
  MovedResizePointer,
  ReleasedResizePointer,
  PressedResizeKey,
]);
export type Message = typeof Message.Type;
type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

// INIT

export const init = (): UpdateReturn => [
  { leftSize: 50, resizeState: Idle() },
  [],
];

// UPDATE

const updateReturn = M.withReturnType<UpdateReturn>();

const clampPanelSize = (size: number): number =>
  Math.min(75, Math.max(25, size));

const resizeByKey = (leftSize: number, key: string): number =>
  M.value(key).pipe(
    M.when("ArrowLeft", () => clampPanelSize(leftSize - 5)),
    M.when("ArrowRight", () => clampPanelSize(leftSize + 5)),
    M.orElse(() => leftSize)
  );

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    updateReturn,
    M.tagsExhaustive({
      PressedResizeHandle: ({ screenX }) => [
        evo(model, {
          resizeState: () =>
            Dragging({ startScreenX: screenX, startLeftSize: model.leftSize }),
        }),
        [],
      ],
      MovedResizePointer: ({ screenX }) =>
        M.value(model.resizeState).pipe(
          updateReturn,
          M.tagsExhaustive({
            Idle: () => [model, []],
            Dragging: ({ startScreenX, startLeftSize }) => [
              evo(model, {
                leftSize: () =>
                  clampPanelSize(startLeftSize + (screenX - startScreenX) / 4),
              }),
              [],
            ],
          })
        ),
      ReleasedResizePointer: () => [
        evo(model, { resizeState: () => Idle() }),
        [],
      ],
      PressedResizeKey: ({ key }) => [
        evo(model, { leftSize: (leftSize) => resizeByKey(leftSize, key) }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const rightSize = 100 - model.leftSize;

  return h.div(
    [
      h.Class("w-full"),
      h.OnPointerMove((screenX) =>
        M.value(model.resizeState).pipe(
          M.tagsExhaustive({
            Idle: () => Option.none(),
            Dragging: () => Option.some(MovedResizePointer({ screenX })),
          })
        )
      ),
      h.OnPointerUp(() =>
        M.value(model.resizeState).pipe(
          M.tagsExhaustive({
            Idle: () => Option.none(),
            Dragging: () => Option.some(ReleasedResizePointer()),
          })
        )
      ),
    ],
    [
      Resizable.panelGroupView<Message>({
        className: "min-h-48 w-full",
        children: [
          Resizable.panelView<Message>({
            size: model.leftSize,
            children: ["One"],
          }),
          Resizable.handleView<Message>({
            attributes: [
              h.Tabindex(0),
              h.AriaValuemin(25),
              h.AriaValuemax(75),
              h.AriaValuenow(model.leftSize),
              h.OnPointerDown((_pointerType, _button, screenX) =>
                Option.some(PressedResizeHandle({ screenX }))
              ),
              h.OnKeyDownPreventDefault((key) =>
                key === "ArrowLeft" || key === "ArrowRight"
                  ? Option.some(PressedResizeKey({ key }))
                  : Option.none()
              ),
            ],
          }),
          Resizable.panelView<Message>({
            size: rightSize,
            children: ["Two"],
          }),
        ],
      }),
    ]
  );
});
