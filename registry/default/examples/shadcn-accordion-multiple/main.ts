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
  S.Literal("security"),
  S.Literal("members"),
  S.Literal("billing"),
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
] => [{ openValues: ["security"] }, []];

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
          openValues: (openValues) => Accordion.toggleValue(openValues, value),
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
          value: "security",
          openValues: model.openValues,
          title: "Security alerts",
          onValueChange: ToggledPanel({ value: "security" }),
          children: panel(
            "Critical sign-in and device alerts stay open while you review other settings."
          ),
        }),
        Accordion.itemView<Message>({
          value: "members",
          openValues: model.openValues,
          title: "Member invites",
          onValueChange: ToggledPanel({ value: "members" }),
          children: panel(
            "Invite approvals, role changes, and pending seat requests."
          ),
        }),
        Accordion.itemView<Message>({
          value: "billing",
          openValues: model.openValues,
          title: "Billing notices",
          onValueChange: ToggledPanel({ value: "billing" }),
          children: panel(
            "Plan changes, failed payments, and invoice delivery settings."
          ),
        }),
      ],
      className: Accordion.shadcnAccordionRootClassName,
    })
);
