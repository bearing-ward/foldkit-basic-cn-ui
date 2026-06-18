import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("AI Elements Attachments Grid example", () => {
  test("renders grid media and removes an attachment through update", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("img", { name: "mountain-landscape.jpg" })
      ).toExist(),
      Scene.expect(Scene.role("img", { name: "ocean-sunset.jpg" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Remove API Documentation" })
      ).toExist(),
      Scene.click(
        Scene.role("button", { name: "Remove mountain-landscape.jpg" })
      ),
      Scene.expect(
        Scene.role("img", { name: "mountain-landscape.jpg" })
      ).toBeAbsent()
    );
  });
});
