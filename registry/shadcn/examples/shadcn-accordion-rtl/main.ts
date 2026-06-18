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

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Attribute("dir", "rtl"), h.Class("w-full max-w-2xl")],
    [
      Accordion.rootView<Message>({
        openValues: model.openValues,
        children: [
          Accordion.itemView<Message>({
            value: "accessible",
            openValues: model.openValues,
            title: "هل يمكن الوصول إليه؟",
            onValueChange: ToggledPanel({ value: "accessible" }),
            children: panel("نعم. يلتزم بنمط تصميم WAI-ARIA."),
          }),
          Accordion.itemView<Message>({
            value: "styled",
            openValues: model.openValues,
            title: "هل يأتي بتنسيق جاهز؟",
            onValueChange: ToggledPanel({ value: "styled" }),
            children: panel(
              "نعم. يأتي بأنماط افتراضية تتوافق مع جمالية المكونات الأخرى."
            ),
          }),
          Accordion.itemView<Message>({
            value: "animated",
            openValues: model.openValues,
            title: "هل يحتوي على حركة؟",
            onValueChange: ToggledPanel({ value: "animated" }),
            children: panel(
              "نعم. يحتوي على حركة افتراضيًا، ويمكنك تعطيلها إذا رغبت."
            ),
          }),
        ],
        className: Accordion.shadcnAccordionRootClassName,
      }),
    ]
  );
});
