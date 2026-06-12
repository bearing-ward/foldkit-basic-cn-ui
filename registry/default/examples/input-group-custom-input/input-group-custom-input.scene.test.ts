import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputGroupCustomInputExample from "./main";

describe("Input Group Custom Input example", () => {
  test("uses the input-group control slot on a custom textarea", () => {
    Scene.scene(
      {
        update: InputGroupCustomInputExample.update,
        view: InputGroupCustomInputExample.view,
      },
      Scene.with(InputGroupCustomInputExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Custom message" }))
        .toHaveAttr("data-slot", "input-group-control"),
      Scene.change(
        Scene.role("textbox", { name: "Custom message" }),
        "Third-party textarea"
      ),
      Scene.click(Scene.role("button", { name: "Submit" })),
      Scene.expect(Scene.text("Submitted custom input")).toExist()
    );
  });
});
