import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
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

// VIEW

export const view = Submodel.defineView<Model, Message>(
  (model): Html =>
    CheckboxGroup.groupView<Message>({
      label: "Allowed network protocols",
      labelId: "protocols-label",
      name: "allowedNetworkProtocols",
      children: [
        CheckboxGroup.itemView<Message>({
          value: "http",
          selectedValues: model.selectedProtocols,
          label: "HTTP",
          onValueChange: ToggledProtocol({ value: "http" }),
        }),
        CheckboxGroup.itemView<Message>({
          value: "https",
          selectedValues: model.selectedProtocols,
          label: "HTTPS",
          onValueChange: ToggledProtocol({ value: "https" }),
        }),
        CheckboxGroup.itemView<Message>({
          value: "ssh",
          selectedValues: model.selectedProtocols,
          label: "SSH",
          onValueChange: ToggledProtocol({ value: "ssh" }),
        }),
      ],
    })
);
