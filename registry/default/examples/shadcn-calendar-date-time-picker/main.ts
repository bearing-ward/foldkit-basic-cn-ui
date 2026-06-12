import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

// MODEL

export const Model = S.Struct({
  selectedDay: S.Number,
  startTime: S.String,
  endTime: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedDate = m("ClickedDate", { day: S.Number });
export const UpdatedStartTime = m("UpdatedStartTime", { value: S.String });
export const UpdatedEndTime = m("UpdatedEndTime", { value: S.String });

export const Message = S.Union([
  ClickedDate,
  UpdatedStartTime,
  UpdatedEndTime,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ selectedDay: 12, startTime: "09:00", endTime: "17:00" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedDate: ({ day }) => [evo(model, { selectedDay: () => day }), []],
      UpdatedStartTime: ({ value }) => [
        evo(model, { startTime: () => value }),
        [],
      ],
      UpdatedEndTime: ({ value }) => [evo(model, { endTime: () => value }), []],
    })
  );

// VIEW

const dayLabels = Array.from({ length: 35 }, (_, index) =>
  String(index < 1 ? 31 : index)
);

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-4 rounded-lg border border-gray-200 bg-white p-3")],
    [
      h.div([h.Class("text-center text-sm font-medium")], ["June 2026"]),
      h.div(
        [h.Class("grid grid-cols-7 gap-1 text-center text-sm")],
        [
          ...["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) =>
            h.div([h.Class("h-8 text-gray-500")], [day])
          ),
          ...dayLabels.map((label, index) => {
            const day = Number(label);
            const outsideMonth = index === 0 || day > 30;
            const selected = !outsideMonth && day === model.selectedDay;

            return h.button(
              [
                h.Type("button"),
                h.Attribute("aria-pressed", selected ? "true" : "false"),
                ...(outsideMonth ? [] : [h.OnClick(ClickedDate({ day }))]),
                h.Class(
                  [
                    "size-8 rounded-md text-sm tabular-nums",
                    outsideMonth ? "text-gray-400" : "text-gray-900",
                    selected ? "bg-accent-600 text-white" : "hover:bg-gray-100",
                  ].join(" ")
                ),
              ],
              [label]
            );
          }),
        ]
      ),
      h.div(
        [h.Class("grid gap-3 sm:grid-cols-2")],
        [
          h.label(
            [h.Class("grid gap-1 text-sm font-medium text-gray-900")],
            [
              "Start Time",
              h.input([
                h.Type("time"),
                h.Value(model.startTime),
                h.OnChange((value) => UpdatedStartTime({ value })),
                h.OnInput((value) => UpdatedStartTime({ value })),
                h.Class("h-9 rounded-md border border-gray-300 px-3 text-sm"),
              ]),
            ]
          ),
          h.label(
            [h.Class("grid gap-1 text-sm font-medium text-gray-900")],
            [
              "End Time",
              h.input([
                h.Type("time"),
                h.Value(model.endTime),
                h.OnChange((value) => UpdatedEndTime({ value })),
                h.OnInput((value) => UpdatedEndTime({ value })),
                h.Class("h-9 rounded-md border border-gray-300 px-3 text-sm"),
              ]),
            ]
          ),
        ]
      ),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [
          `Selected appointment: 2026-06-${String(model.selectedDay).padStart(2, "0")} ${model.startTime}-${model.endTime}`,
        ]
      ),
    ]
  );
});
