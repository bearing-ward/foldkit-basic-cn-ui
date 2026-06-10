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
  S.Literal("password"),
  S.Literal("subscription"),
  S.Literal("payment"),
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
] => [{ openValues: ["password"] }, []];

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
          value: "password",
          openValues: model.openValues,
          title: "How do I reset my password?",
          onValueChange: ToggledPanel({ value: "password" }),
          children: panel(
            "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours."
          ),
        }),
        Accordion.itemView<Message>({
          value: "subscription",
          openValues: model.openValues,
          title: "Can I change my subscription plan?",
          onValueChange: ToggledPanel({ value: "subscription" }),
          children: panel(
            "Yes, you can upgrade or downgrade your subscription plan at any time from your account settings. Changes will take effect immediately."
          ),
        }),
        Accordion.itemView<Message>({
          value: "payment",
          openValues: model.openValues,
          title: "What payment methods do you accept?",
          onValueChange: ToggledPanel({ value: "payment" }),
          children: panel(
            "We accept all major credit cards, PayPal, and bank transfers for annual plans."
          ),
        }),
      ],
      className: Accordion.shadcnAccordionRootClassName,
    })
);
