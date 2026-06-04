import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Animation from "../../ui/animation";

// MODEL

export const Model = S.Struct({
  animation: Animation.Model,
  isShowing: S.Boolean,
  status: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleAnimation = m("ClickedToggleAnimation");
export const GotAnimationMessage = m("GotAnimationMessage", {
  message: Animation.Message,
});

export const Message = S.Union([ClickedToggleAnimation, GotAnimationMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [animation, commands] = Animation.init({ id: "animation-basic" });

  return [
    { animation, isShowing: false, status: "Animation hidden." },
    Command.mapMessages(commands, (message) =>
      GotAnimationMessage({ message })
    ),
  ];
};

// UPDATE

const delegateAnimation = (
  model: Model,
  message: Animation.Message
): readonly [Model, readonly Command.Command<Message>[]] => {
  const [animation, commands, maybeOutMessage] = Animation.update(
    model.animation,
    message
  );
  const additionalCommands = Option.match(maybeOutMessage, {
    onNone: (): readonly Command.Command<Animation.Message>[] => [],
    onSome: M.type<Animation.OutMessage>().pipe(
      M.tagsExhaustive({
        StartedLeaveAnimating: () => [Animation.defaultLeaveCommand(animation)],
        TransitionedOut: () => [],
      })
    ),
  });
  const status = Option.match(maybeOutMessage, {
    onNone: () => model.status,
    onSome: M.type<Animation.OutMessage>().pipe(
      M.tagsExhaustive({
        StartedLeaveAnimating: () => "Animation leaving.",
        TransitionedOut: () => "Animation hidden.",
      })
    ),
  });

  return [
    evo(model, { animation: () => animation, status: () => status }),
    Command.mapMessages([...commands, ...additionalCommands], (message) =>
      GotAnimationMessage({ message })
    ),
  ];
};

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleAnimation: () => {
        const isShowing = !model.isShowing;
        const [nextModel, commands] = delegateAnimation(
          evo(model, {
            isShowing: () => isShowing,
            status: () => (isShowing ? "Animation shown." : model.status),
          }),
          isShowing ? Animation.Showed() : Animation.Hid()
        );

        return [nextModel, commands];
      },
      GotAnimationMessage: ({ message }) => delegateAnimation(model, message),
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.button(
        [
          h.Type("button"),
          h.Class(Animation.animationTriggerClassName),
          h.OnClick(ClickedToggleAnimation()),
        ],
        [model.isShowing ? "Hide content" : "Show content"]
      ),
      h.submodel({
        slotId: model.animation.id,
        model: model.animation,
        view: Animation.view,
        viewInputs: {
          animateSize: true,
          className: Animation.animationContentClassName,
          content: Animation.animationPanel({
            body: "This content animates in and out with Foldkit lifecycle messages.",
          }),
        },
        toParentMessage: (message) => GotAnimationMessage({ message }),
      }),
      h.p([h.Class("text-sm text-gray-700")], [model.status]),
    ]
  );
});
