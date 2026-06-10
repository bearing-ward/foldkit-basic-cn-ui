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
  S.Literal("notifications"),
  S.Literal("privacy"),
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
] => [{ openValues: ["notifications"] }, []];

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
          value: "notifications",
          openValues: model.openValues,
          title: "Notification Settings",
          onValueChange: ToggledPanel({ value: "notifications" }),
          children: panel(
            "Manage how you receive notifications. You can enable email alerts for updates or push notifications for mobile devices."
          ),
        }),
        Accordion.itemView<Message>({
          value: "privacy",
          openValues: model.openValues,
          title: "Privacy & Security",
          onValueChange: ToggledPanel({ value: "privacy" }),
          children: panel(
            "Control your privacy settings, manage two-factor authentication, and review active sessions."
          ),
        }),
        Accordion.itemView<Message>({
          value: "billing",
          openValues: model.openValues,
          title: "Billing & Subscription",
          onValueChange: ToggledPanel({ value: "billing" }),
          children: panel(
            "Update your billing information, view invoices, and manage your subscription plan."
          ),
        }),
      ],
      className: Accordion.shadcnAccordionRootClassName,
    })
);
