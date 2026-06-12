import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputGroupTextareaExample from "./main";

describe("Input Group Textarea example", () => {
  test("updates textarea content and runs the script", () => {
    Scene.scene(
      {
        update: InputGroupTextareaExample.update,
        view: InputGroupTextareaExample.view,
      },
      Scene.with(InputGroupTextareaExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Script" })).toHaveValue(
        "console.log('Hello, world!')"
      ),
      Scene.change(Scene.role("textbox", { name: "Script" }), "alert('ok')"),
      Scene.expect(Scene.role("textbox", { name: "Script" })).toHaveValue(
        "alert('ok')"
      ),
      Scene.click(Scene.role("button", { name: "Run" })),
      Scene.expect(Scene.text("Ran script.js")).toExist()
    );
  });
});
