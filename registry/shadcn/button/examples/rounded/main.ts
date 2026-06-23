import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Button from "../../ui";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const Message = S.Never;
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

const arrowUpIcon = (): Html => {
  const h = html<Message>();

  return h.svg(
    [
      h.Attribute("xmlns", "http://www.w3.org/2000/svg"),
      h.Attribute("width", "24"),
      h.Attribute("height", "24"),
      h.Attribute("viewBox", "0 0 24 24"),
      h.Attribute("fill", "none"),
      h.Attribute("stroke", "currentColor"),
      h.Attribute("stroke-width", "2"),
      h.Attribute("stroke-linecap", "round"),
      h.Attribute("stroke-linejoin", "round"),
      h.Class("lucide lucide-arrow-up"),
    ],
    [
      h.path([h.Attribute("d", "m5 12 7-7 7 7")], []),
      h.path([h.Attribute("d", "M12 19V5")], []),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Style({
        "--background": "lab(100 0 0)",
        "--border": "lab(90.952 0 -0.0000119209)",
        color: "lab(0 0 0)",
      }),
      h.Class("flex flex-col items-start gap-2"),
    ],
    [
      Button.view<Message>({
        variant: "outline",
        size: "icon",
        style: "base-nova",
        className: "rounded-full",
        children: [arrowUpIcon()],
      }),
    ]
  );
});
