import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";

import * as Alert from "../../ui/alert";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const Message = S.Never;
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    Alert.view<Message>({
      title: "Your subscription will expire in 3 days.",
      description:
        "Renew now to avoid service interruption or upgrade to a paid plan to continue using the service.",
      icon: "!",
      variant: "Default",
      className: Alert.alertCustomColorClassName,
    })
);
