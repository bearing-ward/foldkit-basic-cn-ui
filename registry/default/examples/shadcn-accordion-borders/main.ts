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
  S.Literal("overview"),
  S.Literal("security"),
  S.Literal("exports"),
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
] => [{ openValues: ["overview"] }, []];

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
          value: "overview",
          openValues: model.openValues,
          title: "Account overview",
          onValueChange: ToggledPanel({ value: "overview" }),
          className: "last:border-b-0",
          children: panel(
            "Workspace identity, billing contact, and owner details."
          ),
        }),
        Accordion.itemView<Message>({
          value: "security",
          openValues: model.openValues,
          title: "Security posture",
          onValueChange: ToggledPanel({ value: "security" }),
          className: "last:border-b-0",
          children: panel(
            "Password policy, device sessions, and recovery settings."
          ),
        }),
        Accordion.itemView<Message>({
          value: "exports",
          openValues: model.openValues,
          title: "Exports",
          onValueChange: ToggledPanel({ value: "exports" }),
          className: "last:border-b-0",
          children: panel(
            "CSV, JSON, and archive exports for compliance workflows."
          ),
        }),
      ],
      className: `${
        Accordion.shadcnAccordionRootClassName
      } rounded-md border border-gray-200 bg-white`,
    })
);
