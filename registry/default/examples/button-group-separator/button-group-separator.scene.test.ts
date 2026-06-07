import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-separator example", () => {
  test("renders the shadcn Button Group Separator example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("group", { name: "Clipboard actions" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Paste" })).toExist(),
      Scene.expect(Scene.role("separator")).toHaveAttr("aria-hidden", "true"),
      Scene.expect(
        Scene.role("group", { name: "Clipboard actions" })
      ).not.toHaveHandler("click")
    );
  });
});
