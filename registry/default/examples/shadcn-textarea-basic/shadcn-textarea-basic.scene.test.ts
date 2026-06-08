import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnTextareaBasicExample from "./main";

describe("Shadcn Textarea Basic example", () => {
  test("updates typed feedback", () => {
    Scene.scene(
      {
        update: ShadcnTextareaBasicExample.update,
        view: ShadcnTextareaBasicExample.view,
      },
      Scene.with(ShadcnTextareaBasicExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Bio" })).toExist(),
      Scene.expect(Scene.text("Characters: 0")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Bio" }), "Ada"),
      Scene.expect(Scene.text("Characters: 3")).toExist()
    );
  });
});
