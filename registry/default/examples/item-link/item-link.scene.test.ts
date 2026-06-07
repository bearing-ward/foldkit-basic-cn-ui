import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("item-link example", () => {
  test("renders the shadcn Item Link example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("link", { name: /Visit our documentation/u })
      ).toHaveAttr("href", "/docs"),
      Scene.expect(Scene.text("↗")).not.toHaveHandler("click")
    );
  });
});
