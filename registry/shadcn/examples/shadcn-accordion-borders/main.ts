import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Accordion from "../../ui/shadcn-accordion";

// MODEL

export const AccordionValue = S.Union([
  S.Literal("accessible"),
  S.Literal("styled"),
  S.Literal("animated"),
]);
export type AccordionValue = typeof AccordionValue.Type;

export const Model = S.Struct({
  openValues: S.Array(AccordionValue),
});

export type Model = typeof Model.Type;

// MESSAGE

export const ToggledPanel = m("ToggledPanel", { value: AccordionValue });

export const Message = S.Union([ToggledPanel]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ openValues: ["accessible"] }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledPanel: ({ value }) => [
        evo(model, {
          openValues: (openValues) =>
            Accordion.includesValue(openValues, value) ? [] : [value],
        }),
        [],
      ],
    })
  );

// VIEW

const panel = (content: string): readonly Html[] => {
  const h = html<Message>();

  return [h.p([], [content])];
};

export const view = Submodel.defineView<Model, Message>(
  (model): Html =>
    Accordion.rootView<Message>({
      openValues: model.openValues,
      children: [
        Accordion.itemView<Message>({
          value: "accessible",
          openValues: model.openValues,
          title: "Is it accessible?",
          onValueChange: ToggledPanel({ value: "accessible" }),
          className: "last:border-b-0",
          children: panel("Yes. It adheres to the WAI-ARIA design pattern."),
        }),
        Accordion.itemView<Message>({
          value: "styled",
          openValues: model.openValues,
          title: "Is it styled?",
          onValueChange: ToggledPanel({ value: "styled" }),
          className: "last:border-b-0",
          children: panel(
            "Yes. It comes with default styles that matches the other components' aesthetic."
          ),
        }),
        Accordion.itemView<Message>({
          value: "animated",
          openValues: model.openValues,
          title: "Is it animated?",
          onValueChange: ToggledPanel({ value: "animated" }),
          className: "last:border-b-0",
          children: panel(
            "Yes. It's animated by default, but you can disable it if you prefer."
          ),
        }),
      ],
      className: `${
        Accordion.shadcnAccordionRootClassName
      } rounded-md border border-gray-200 bg-white`,
    })
);
