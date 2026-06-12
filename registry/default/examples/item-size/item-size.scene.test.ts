import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("item-size example", () => {
  test("renders the shadcn Item Size example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Default Size")).not.toHaveHandler("click"),
      Scene.expect(
        Scene.text("The standard size for most use cases.")
      ).toExist(),
      Scene.expect(Scene.text("Small Size")).toExist(),
      Scene.expect(Scene.text("A compact size for dense layouts.")).toExist(),
      Scene.expect(Scene.text("Extra Small Size")).toExist(),
      Scene.expect(
        Scene.text("The most compact size available.")
      ).toExist()
    );
  });
});
