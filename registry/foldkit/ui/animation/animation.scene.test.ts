import { Match as M, Option, Schema as S } from "effect";
import { Command, Scene, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as Animation from "./index";
const primitiveClassesKey = `${"class"}${"Name"}` as const;


const animationId = "registry-animation";
const GotAnimationMessage = m("GotAnimationMessage", {
  message: Animation.Message,
});
const ClickedToggleAnimation = m("ClickedToggleAnimation");
const Model = S.Struct({
  animation: Animation.Model,
  isShowing: S.Boolean,
  status: S.String,
});
type Model = typeof Model.Type;
const Message = S.Union([GotAnimationMessage, ClickedToggleAnimation]);
type Message = typeof Message.Type;

const [animation] = Animation.init({ id: animationId });
const initialModel: Model = {
  animation,
  isShowing: false,
  status: "Animation hidden.",
};

const toParentMessage = (message: Animation.Message): Message =>
  GotAnimationMessage({ message });

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
    Command.mapMessages([...commands, ...additionalCommands], toParentMessage),
  ];
};

const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleAnimation: () => {
        const isShowing = !model.isShowing;
        const [nextModel, commands] = delegateAnimation(
          evo(model, { isShowing: () => isShowing }),
          isShowing ? Animation.Showed() : Animation.Hid()
        );

        return [nextModel, commands];
      },
      GotAnimationMessage: ({ message }) => delegateAnimation(model, message),
    })
  );

const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.button(
        [
          h.Type("button"),
          h.Class(Animation.animationTriggerClasses),
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
          [primitiveClassesKey]: Animation.animationContentClasses,
          content: Animation.animationPanel({
            body: "Animated content stays mounted while transitions settle.",
          }),
        },
        toParentMessage,
      }),
      h.p([], [model.status]),
    ]
  );
});

describe("Animation registry view", () => {
  test("enters and leaves through the animation lifecycle", () => {
    const contentText =
      "Animated content stays mounted while transitions settle.";

    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.click(Scene.role("button", { name: "Show content" })),
      Scene.Command.resolve(
        Animation.RequestFrame,
        Animation.AdvancedAnimationFrame(),
        toParentMessage
      ),
      Scene.expect(Scene.text(contentText)).toExist(),
      Scene.Command.resolve(
        Animation.WaitForAnimationSettled({ id: animationId }),
        Animation.EndedAnimation(),
        toParentMessage
      ),
      Scene.click(Scene.role("button", { name: "Hide content" })),
      Scene.Command.resolve(
        Animation.RequestFrame,
        Animation.AdvancedAnimationFrame(),
        toParentMessage
      ),
      Scene.Command.resolve(
        Animation.WaitForAnimationSettled({ id: animationId }),
        Animation.EndedAnimation(),
        toParentMessage
      ),
      Scene.expect(Scene.text("Animation hidden.")).toExist()
    );
  });
});
