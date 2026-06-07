import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Accordion from "../../ui/accordion";

// MODEL

export const AccordionValue = S.Union([
  S.Literal("base-ui"),
  S.Literal("getting-started"),
  S.Literal("design-systems"),
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
] => [{ openValues: ["base-ui"] }, []];

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

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return Accordion.rootView<Message>({
    openValues: model.openValues,
    children: [
      Accordion.itemView<Message>({
        value: "base-ui",
        openValues: model.openValues,
        title: "What is Base UI?",
        onValueChange: ToggledPanel({ value: "base-ui" }),
        children: [
          h.p(
            [],
            [
              "Base UI is a library of high-quality unstyled components for design systems and web apps.",
            ]
          ),
        ],
      }),
      Accordion.itemView<Message>({
        value: "getting-started",
        openValues: model.openValues,
        title: "How do I get started?",
        onValueChange: ToggledPanel({ value: "getting-started" }),
        children: [
          h.p(
            [],
            [
              "Install the registry item, keep state in your Foldkit model, and route trigger clicks through messages.",
            ]
          ),
        ],
      }),
      Accordion.itemView<Message>({
        value: "design-systems",
        openValues: model.openValues,
        title: "Can I use it for my design system?",
        onValueChange: ToggledPanel({ value: "design-systems" }),
        children: [
          h.p(
            [],
            [
              "Yes. The default classes are replaceable, and each public anatomy part has a class export.",
            ]
          ),
        ],
      }),
    ],
  });
});
