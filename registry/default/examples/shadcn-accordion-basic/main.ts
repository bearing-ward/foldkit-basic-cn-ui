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
  S.Literal("product"),
  S.Literal("billing"),
  S.Literal("team"),
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
] => [{ openValues: ["product"] }, []];

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
          value: "product",
          openValues: model.openValues,
          title: "Product updates",
          onValueChange: ToggledPanel({ value: "product" }),
          children: panel("Ship notes, releases, and roadmap changes."),
        }),
        Accordion.itemView<Message>({
          value: "billing",
          openValues: model.openValues,
          title: "Billing",
          onValueChange: ToggledPanel({ value: "billing" }),
          children: panel("Manage invoices, plans, and payment methods."),
        }),
        Accordion.itemView<Message>({
          value: "team",
          openValues: model.openValues,
          title: "Team access",
          onValueChange: ToggledPanel({ value: "team" }),
          children: panel("Invite teammates and adjust permissions."),
        }),
      ],
      className: Accordion.shadcnAccordionRootClassName,
    })
);
