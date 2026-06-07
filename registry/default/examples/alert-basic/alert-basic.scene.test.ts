import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("alert-basic example", () => {
  test("renders the shadcn default alert copy", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.role("alert")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Heads up!" })).toExist(),
      Scene.expect(
        Scene.text(
          "You can add components and dependencies to your app using the cli."
        )
      ).toExist(),
      Scene.expect(Scene.text("Heads up!")).not.toHaveHandler("click")
    );
  });
});
