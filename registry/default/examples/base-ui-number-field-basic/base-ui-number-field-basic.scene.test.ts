import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as NumberFieldBasicExample from "./main";

describe("Base UI Number Field Basic example", () => {
  test("matches the Base UI default Amount number field example", () => {
    Scene.scene(
      {
        update: NumberFieldBasicExample.update,
        view: NumberFieldBasicExample.view,
      },
      Scene.with(NumberFieldBasicExample.init()[0]),
      Scene.expect(Scene.text("Amount")).toExist(),
      Scene.expect(Scene.role("spinbutton", { name: "Amount" })).toHaveValue(
        "100"
      ),
      Scene.click(Scene.role("button", { name: "Increase" })),
      Scene.expect(Scene.role("spinbutton", { name: "Amount" })).toHaveValue(
        "101"
      ),
      Scene.click(Scene.role("button", { name: "Decrease" })),
      Scene.expect(Scene.role("spinbutton", { name: "Amount" })).toHaveValue(
        "100"
      )
    );
  });
});
