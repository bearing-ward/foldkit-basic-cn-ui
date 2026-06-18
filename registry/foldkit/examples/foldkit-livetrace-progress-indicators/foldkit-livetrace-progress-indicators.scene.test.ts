import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("foldkit livetrace progress indicators example", () => {
  test("renders progress primitives and keeps the inspect control inert", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.text("completed")).toExist(),
      Scene.expect(Scene.role("progressbar", { name: "42%" })).toHaveAttr(
        "data-progress",
        "42"
      ),
      Scene.expect(
        Scene.role("button", { name: "Inspect progress" })
      ).not.toHaveHandler("click")
    );
  });
});
