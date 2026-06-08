import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Button As Child example", () => {
  test("renders the As Child anchor without a click handler", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("link", { name: "Login" })).toExist(),
      Scene.expect(
        Scene.text("Rendered as an anchor with the shadcn button class.")
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Login" })).toHaveAttr(
        "href",
        "/login"
      ),
      Scene.expect(Scene.role("link", { name: "Login" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
