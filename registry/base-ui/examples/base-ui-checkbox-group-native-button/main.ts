import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as CheckboxGroup from "../../ui/base-ui-checkbox-group";

// MODEL

export const ProtocolValue = S.Union([
  S.Literal("http"),
  S.Literal("https"),
  S.Literal("ssh"),
]);
export type ProtocolValue = typeof ProtocolValue.Type;

export const Model = S.Struct({
  selectedProtocols: S.Array(ProtocolValue),
});

export type Model = typeof Model.Type;

// MESSAGE

export const ToggledProtocol = m("ToggledProtocol", { value: ProtocolValue });

export const Message = S.Union([ToggledProtocol]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ selectedProtocols: ["http"] }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledProtocol: ({ value }) => [
        evo(model, {
          selectedProtocols: (selectedProtocols) =>
            CheckboxGroup.toggleValue(selectedProtocols, value),
        }),
        [],
      ],
    })
  );

const protocolRow = (
  value: ProtocolValue,
  label: string,
  selectedProtocols: readonly ProtocolValue[]
): Html => {
  const h = html<Message>();
  const checked = CheckboxGroup.includesValue(selectedProtocols, value);
  const controlId = `protocol-${value}`;

  return h.div(
    [h.Class("flex items-center gap-3")],
    [
      h.label(
        [h.For(controlId), h.Class(CheckboxGroup.checkboxGroupItemClasses)],
        [label]
      ),
      h.button(
        [
          h.Id(controlId),
          h.Type("button"),
          h.Attribute("role", "checkbox"),
          h.AriaLabel(label),
          h.Attribute("aria-checked", checked ? "true" : "false"),
          ...(checked
            ? [h.DataAttribute("checked", "")]
            : [h.DataAttribute("unchecked", "")]),
          h.OnClick(ToggledProtocol({ value })),
          h.Class(CheckboxGroup.checkboxGroupControlClasses),
        ],
        [
          h.span(
            [
              ...(checked ? [h.DataAttribute("checked", "")] : []),
              h.Class(CheckboxGroup.checkboxGroupIndicatorClasses),
            ],
            [checked ? "✓" : ""]
          ),
        ]
      ),
    ]
  );
};

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.Attribute("aria-labelledby", "protocols-label"),
      h.Class(CheckboxGroup.checkboxGroupRootClasses),
    ],
    [
      h.div(
        [
          h.Id("protocols-label"),
          h.Class(CheckboxGroup.checkboxGroupCaptionClasses),
        ],
        ["Allowed network protocols"]
      ),
      h.div(
        [h.Class(CheckboxGroup.checkboxGroupItemsClasses)],
        [
          protocolRow("http", "HTTP", model.selectedProtocols),
          protocolRow("https", "HTTPS", model.selectedProtocols),
          protocolRow("ssh", "SSH", model.selectedProtocols),
        ]
      ),
    ]
  );
});
