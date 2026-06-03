import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as CheckboxBasicExample from "./main";

describe("Checkbox Basic example", () => {
  test("toggles accepted feedback", () => {
    Scene.scene(
      {
        update: CheckboxBasicExample.update,
        view: CheckboxBasicExample.view,
      },
      Scene.with(CheckboxBasicExample.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toExist(),
      Scene.expect(Scene.text("Accepted: no")).toExist(),
      Scene.click(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ),
      Scene.expect(Scene.text("Accepted: yes")).toExist()
    );
  });
});
