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
  S.Literal("usage"),
  S.Literal("sso"),
  S.Literal("retention"),
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
] => [{ openValues: ["usage"] }, []];

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
          value: "usage",
          openValues: model.openValues,
          title: "Usage reports",
          onValueChange: ToggledPanel({ value: "usage" }),
          children: panel(
            "Review workspace activity, audit trails, and export history."
          ),
        }),
        Accordion.itemView<Message>({
          value: "sso",
          openValues: model.openValues,
          title: "Single sign-on",
          onValueChange: ToggledPanel({ value: "sso" }),
          children: panel(
            "SAML setup is available after your organization upgrades."
          ),
          disabled: true,
        }),
        Accordion.itemView<Message>({
          value: "retention",
          openValues: model.openValues,
          title: "Retention policy",
          onValueChange: ToggledPanel({ value: "retention" }),
          children: panel(
            "Set how long events and attachments remain available."
          ),
        }),
      ],
      className: Accordion.shadcnAccordionRootClassName,
    })
);
