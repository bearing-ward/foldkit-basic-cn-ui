import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Animation from "../../ui/animation";
import * as AnimationBasicExample from "./main";

const toParentMessage = (message: Animation.Message) =>
  AnimationBasicExample.GotAnimationMessage({ message });

const resolveFrame = () =>
  Scene.Command.resolve(
    Animation.RequestFrame,
    Animation.AdvancedAnimationFrame(),
    toParentMessage
  );

describe("Animation Basic example", () => {
  test("shows and hides content through lifecycle commands", () => {
    const contentText =
      "This content animates in and out with Foldkit lifecycle messages.";

    Scene.scene(
      {
        update: AnimationBasicExample.update,
        view: AnimationBasicExample.view,
      },
      Scene.with(AnimationBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Show content" })),
      resolveFrame(),
      Scene.expect(Scene.text(contentText)).toExist(),
      Scene.expect(Scene.text("Animation shown.")).toExist(),
      Scene.Command.resolve(
        Animation.WaitForAnimationSettled({ id: "animation-basic" }),
        Animation.EndedAnimation(),
        toParentMessage
      ),
      Scene.click(Scene.role("button", { name: "Hide content" })),
      resolveFrame(),
      Scene.Command.resolve(
        Animation.WaitForAnimationSettled({ id: "animation-basic" }),
        Animation.EndedAnimation(),
        toParentMessage
      ),
      Scene.expect(Scene.text("Animation hidden.")).toExist()
    );
  });
});
