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
  S.Literal("plan"),
  S.Literal("renewal"),
  S.Literal("receipts"),
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
] => [{ openValues: ["plan"] }, []];

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
            ["Subscription"]
          ),
          h.p(
            [h.Class("text-sm text-gray-600")],
            ["Manage billing details from one card."]
          ),
        ]
      ),
      Accordion.rootView<Message>({
        openValues: model.openValues,
        children: [
          Accordion.itemView<Message>({
            value: "plan",
            openValues: model.openValues,
            title: "Current plan",
            onValueChange: ToggledPanel({ value: "plan" }),
            children: panel(
              "Team plan with shared projects, usage alerts, and priority support."
            ),
          }),
          Accordion.itemView<Message>({
            value: "renewal",
            openValues: model.openValues,
            title: "Renewal",
            onValueChange: ToggledPanel({ value: "renewal" }),
            children: panel("Annual renewal is scheduled for April 16, 2026."),
          }),
          Accordion.itemView<Message>({
            value: "receipts",
            openValues: model.openValues,
            title: "Receipts",
            onValueChange: ToggledPanel({ value: "receipts" }),
            children: panel(
              "Monthly receipts are sent to finance@example.com."
            ),
          }),
        ],
        className: Accordion.shadcnAccordionRootClassName,
      }),
    ]
  );
});
