import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Checkbox Description example", () => {
  test("renders the origin checkbox description demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toHaveAttr("aria-checked", "true"),
      Scene.expect(
        Scene.text(
          "By clicking this checkbox, you agree to the terms and conditions."
        )
      ).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).not.toHaveHandler("click")
    );
  });
});
