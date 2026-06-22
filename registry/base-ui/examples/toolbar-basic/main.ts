import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Toolbar from "../../../foldkit/ui/toolbar";

// MODEL

const Alignment = S.Union([S.Literal("left"), S.Literal("right")]);
const NumericFormat = S.Union([S.Literal("currency"), S.Literal("percent")]);

export const Model = S.Struct({
  alignment: Alignment,
  numericFormat: NumericFormat,
  fontFamily: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedAlign = m("ClickedAlign", { value: Alignment });
export const ClickedNumericFormat = m("ClickedNumericFormat", {
  value: NumericFormat,
});
export const UpdatedFontFamily = m("UpdatedFontFamily", { value: S.String });

export const Message = S.Union([
  ClickedAlign,
  ClickedNumericFormat,
  UpdatedFontFamily,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  { alignment: "left", numericFormat: "currency", fontFamily: "Helvetica" },
  [],
];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedAlign: ({ value }) => [evo(model, { alignment: () => value }), []],
      ClickedNumericFormat: ({ value }) => [
        evo(model, { numericFormat: () => value }),
        [],
      ],
      UpdatedFontFamily: ({ value }) => [
        evo(model, { fontFamily: () => value }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return Toolbar.rootView<Message>({
    ariaLabel: "Editor toolbar",
    children: [
      Toolbar.groupView<Message>({
        ariaLabel: "Alignment",
        children: [
          Toolbar.buttonView<Message>({
            ariaLabel: "Align left",
            onClick: ClickedAlign({ value: "left" }),
            children: [h.span([], ["Align Left"])],
            classes: model.alignment === "left" ? "bg-accent-50" : undefined,
          }),
          Toolbar.buttonView<Message>({
            ariaLabel: "Align right",
            onClick: ClickedAlign({ value: "right" }),
            children: [h.span([], ["Align Right"])],
            classes: model.alignment === "right" ? "bg-accent-50" : undefined,
          }),
        ],
      }),
      Toolbar.separatorView<Message>(),
      Toolbar.groupView<Message>({
        ariaLabel: "Numerical format",
        children: [
          Toolbar.buttonView<Message>({
            ariaLabel: "Format as currency",
            onClick: ClickedNumericFormat({ value: "currency" }),
            children: [h.span([], ["$"])],
            classes:
              model.numericFormat === "currency" ? "bg-accent-50" : undefined,
          }),
          Toolbar.buttonView<Message>({
            ariaLabel: "Format as percent",
            onClick: ClickedNumericFormat({ value: "percent" }),
            children: [h.span([], ["%"])],
            classes:
              model.numericFormat === "percent" ? "bg-accent-50" : undefined,
          }),
        ],
      }),
      Toolbar.separatorView<Message>(),
      Toolbar.inputView<Message>({
        ariaLabel: "Font family",
        value: model.fontFamily,
        onInput: (value) => UpdatedFontFamily({ value }),
      }),
      Toolbar.separatorView<Message>(),
      Toolbar.linkView<Message>({
        href: "#edited",
        children: [h.span([], ["Edited 51m ago"])],
      }),
    ],
  });
});
