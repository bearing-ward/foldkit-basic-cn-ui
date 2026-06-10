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
  S.Literal("history"),
  S.Literal("premium"),
  S.Literal("email"),
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
] => [{ openValues: ["history"] }, []];

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
          value: "history",
          openValues: model.openValues,
          title: "Can I access my account history?",
          onValueChange: ToggledPanel({ value: "history" }),
          children: panel(
            "Yes, you can view your account history in the dashboard under the Activity tab."
          ),
        }),
        Accordion.itemView<Message>({
          value: "premium",
          openValues: model.openValues,
          title: "Premium feature information",
          onValueChange: ToggledPanel({ value: "premium" }),
          children: panel(
            "This feature is available for Premium subscribers only. Upgrade your plan to access advanced analytics."
          ),
          disabled: true,
        }),
        Accordion.itemView<Message>({
          value: "email",
          openValues: model.openValues,
          title: "How do I update my email address?",
          onValueChange: ToggledPanel({ value: "email" }),
          children: panel(
            "Go to your account settings and update your email address in the Profile section."
          ),
        }),
      ],
      className: Accordion.shadcnAccordionRootClassName,
    })
);
