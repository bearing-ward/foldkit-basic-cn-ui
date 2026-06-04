import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as DragAndDrop from "../../ui/drag-and-drop";

// MODEL

const Task = S.Struct({
  id: S.String,
  label: S.String,
});

export const Model = S.Struct({
  tasks: S.Array(Task),
});

export type Model = typeof Model.Type;

// MESSAGE

export const Message = S.Never;
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    tasks: [
      { id: "plan", label: "Plan" },
      { id: "build", label: "Build" },
      { id: "verify", label: "Verify" },
    ],
  },
  [],
];

// UPDATE

export const update = (
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class(DragAndDrop.dragRootClassName)],
    [
      h.div(
        [
          h.Role("list"),
          h.AriaLabel("Locked task order"),
          h.Class(DragAndDrop.dragListClassName),
        ],
        model.tasks.map((task) =>
          h.div(
            [
              h.Role("listitem"),
              h.AriaDisabled(true),
              h.Class(
                `${DragAndDrop.dragItemClassName} cursor-not-allowed opacity-60`
              ),
            ],
            [
              h.span([], [task.label]),
              h.span(
                [h.AriaHidden(true), h.Class(DragAndDrop.dragHandleClassName)],
                ["::"]
              ),
            ]
          )
        )
      ),
      h.p(
        [h.Class(DragAndDrop.dragStatusClassName)],
        ["Task order is locked."]
      ),
    ]
  );
});
