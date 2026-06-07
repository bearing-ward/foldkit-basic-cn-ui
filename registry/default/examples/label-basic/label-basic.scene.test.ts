import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as LabelBasicExample from "./main";

describe("Label Basic example", () => {
  test("matches the shadcn Label basic example", () => {
    Scene.scene(
      { update: LabelBasicExample.update, view: LabelBasicExample.view },
      Scene.with(LabelBasicExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveAttr(
        "placeholder",
        "m@example.com"
      ),
      Scene.expect(Scene.text("Current value: empty")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Email" }), "ada@example.com"),
      Scene.expect(Scene.text("Current value: ada@example.com")).toExist()
    );
  });
});
