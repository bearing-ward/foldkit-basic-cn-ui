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
  S.Literal("billing"),
  S.Literal("secure"),
  S.Literal("integrations"),
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
] => [{ openValues: ["billing"] }, []];

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
          value: "billing",
          openValues: model.openValues,
          title: "How does billing work?",
          onValueChange: ToggledPanel({ value: "billing" }),
          className: "last:border-b-0",
          children: panel(
            "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members."
          ),
        }),
        Accordion.itemView<Message>({
          value: "secure",
          openValues: model.openValues,
          title: "Is my data secure?",
          onValueChange: ToggledPanel({ value: "secure" }),
          className: "last:border-b-0",
          children: panel(
            "Yes, we use enterprise-grade encryption, regular security audits, and comply with SOC 2 Type II standards to protect your data."
          ),
        }),
        Accordion.itemView<Message>({
          value: "integrations",
          openValues: model.openValues,
          title: "What integrations do you support?",
          onValueChange: ToggledPanel({ value: "integrations" }),
          className: "last:border-b-0",
          children: panel(
            "We support integrations with Slack, GitHub, Google Workspace, Microsoft Teams, Zapier, and over 100 other popular tools."
          ),
        }),
      ],
      className: `${
        Accordion.shadcnAccordionRootClassName
      } rounded-md border border-gray-200 bg-white`,
    })
);
