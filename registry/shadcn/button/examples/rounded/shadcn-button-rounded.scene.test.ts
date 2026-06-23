import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn button rounded example", () => {
  test("renders the origin visual button as inert", () => {
    const roundedButton = Scene.role("button");

    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(roundedButton).toExist(),
      Scene.expect(roundedButton).toHaveAttr(
        "data-variant",
        "outline",
      ),
      Scene.expect(roundedButton).toHaveAttr(
        "data-size",
        "icon",
      ),
      Scene.expect(roundedButton).toHaveAttr(
        "data-style",
        "base-nova",
      ),
      Scene.expect(roundedButton).toHaveClass(
        "rounded-full",
      ),
      Scene.expect(roundedButton).toHaveClass("size-8"),
      Scene.expect(roundedButton).not.toHaveHandler(
        "click",
      ),
    );
  });
});
