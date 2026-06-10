import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("alert-action example", () => {
  test("renders the shadcn action alert copy", () => {
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
      Scene.expect(Scene.role("button", { name: "Enable" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Enable" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
