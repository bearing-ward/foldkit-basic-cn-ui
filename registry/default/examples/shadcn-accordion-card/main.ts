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
  S.Literal("plans"),
  S.Literal("billing"),
  S.Literal("cancel"),
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
] => [{ openValues: ["plans"] }, []];

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
    [
      h.Class(
        "w-full max-w-2xl rounded-md border border-gray-200 bg-white p-5 shadow-sm"
      ),
    ],
    [
      h.div(
        [h.Class("mb-4 space-y-1")],
        [
          h.h3(
            [h.Class("text-base font-semibold text-gray-950")],
            ["Subscription & Billing"]
          ),
          h.p(
            [h.Class("text-sm text-gray-600")],
            [
              "Common questions about your account, plans, payments and cancellations.",
            ]
          ),
        ]
      ),
      Accordion.rootView<Message>({
        openValues: model.openValues,
        children: [
          Accordion.itemView<Message>({
            value: "plans",
            openValues: model.openValues,
            title: "What subscription plans do you offer?",
            onValueChange: ToggledPanel({ value: "plans" }),
            children: panel(
              "We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month). Each plan includes increasing storage limits, API access, priority support, and team collaboration features."
            ),
          }),
          Accordion.itemView<Message>({
            value: "billing",
            openValues: model.openValues,
            title: "How does billing work?",
            onValueChange: ToggledPanel({ value: "billing" }),
            children: panel(
              "Billing is monthly or annual depending on your plan. You can update your payment method, download invoices, and change billing contacts from account settings."
            ),
          }),
          Accordion.itemView<Message>({
            value: "cancel",
            openValues: model.openValues,
            title: "How do I cancel my subscription?",
            onValueChange: ToggledPanel({ value: "cancel" }),
            children: panel(
              "You can cancel from the billing page at any time. Your account keeps access until the end of the current billing period."
            ),
          }),
        ],
        className: Accordion.shadcnAccordionRootClassName,
      }),
    ]
  );
});
