import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as DragAndDrop from "../../ui/drag-and-drop";

// MODEL

const Task = S.Struct({
  id: S.String,
  label: S.String,
});

export const Model = S.Struct({
  dragAndDrop: DragAndDrop.Model,
  tasks: S.Array(Task),
  status: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotDragAndDropMessage = m("GotDragAndDropMessage", {
  message: DragAndDrop.Message,
});

export const Message = S.Union([GotDragAndDropMessage]);
export type Message = typeof Message.Type;

// INIT

const orderStatus = (tasks: readonly (typeof Task.Type)[]): string =>
  `Task order: ${tasks.map((task) => task.label).join(", ")}`;

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [dragAndDrop, commands] = DragAndDrop.init({
    id: "drag-and-drop-basic",
  });
  const tasks = [
    { id: "plan", label: "Plan" },
    { id: "build", label: "Build" },
    { id: "verify", label: "Verify" },
  ];

  return [
    {
      dragAndDrop,
      tasks,
      status: orderStatus(tasks),
    },
    Command.mapMessages(commands, (message) =>
      GotDragAndDropMessage({ message })
    ),
  ];
};

// UPDATE

const reorderTasks = (
  tasks: readonly (typeof Task.Type)[],
  fromIndex: number,
  toIndex: number
): readonly (typeof Task.Type)[] => {
  const task = tasks[fromIndex];

  if (task === undefined) {
    return tasks;
  }

  const withoutTask = tasks.filter((_, index) => index !== fromIndex);
  const boundedTargetIndex = Math.max(0, Math.min(toIndex, withoutTask.length));

  return [
    ...withoutTask.slice(0, boundedTargetIndex),
    task,
    ...withoutTask.slice(boundedTargetIndex),
  ];
};

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotDragAndDropMessage: ({ message }) => {
        const [dragAndDrop, commands, maybeOutMessage] = DragAndDrop.update(
          model.dragAndDrop,
          message
        );

        const tasks = Option.match(maybeOutMessage, {
          onNone: () => model.tasks,
          onSome: M.type<DragAndDrop.OutMessage>().pipe(
            M.tagsExhaustive({
              Reordered: ({ fromIndex, toIndex }) =>
                reorderTasks(model.tasks, fromIndex, toIndex),
              Cancelled: () => model.tasks,
            })
          ),
        });

        return [
          evo(model, {
            dragAndDrop: () => dragAndDrop,
            tasks: () => tasks,
            status: () => orderStatus(tasks),
          }),
          Command.mapMessages(commands, (message) =>
            GotDragAndDropMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      DragAndDrop.sortableListView({
        model: model.dragAndDrop,
        containerId: "tasks",
        items: model.tasks,
        label: "Task order",
        status: model.status,
        toParentMessage: (message) => GotDragAndDropMessage({ message }),
      }),
    ]
  );
});
