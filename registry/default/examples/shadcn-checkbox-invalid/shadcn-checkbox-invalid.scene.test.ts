import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Checkbox Invalid example", () => {
  test("renders the origin invalid checkbox demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toHaveAttr("aria-invalid", "true"),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).not.toHaveHandler("click")
    );
  });
});
