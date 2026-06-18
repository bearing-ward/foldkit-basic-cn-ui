import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiButtonBasicExample from "./main";

describe("Base UI Button Basic example", () => {
  test("renders the Base UI default button as inert", () => {
    Scene.scene(
      {
        update: BaseUiButtonBasicExample.update,
        view: BaseUiButtonBasicExample.view,
      },
      Scene.with(BaseUiButtonBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Submit" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Submit" })).toHaveClass("h-8"),
      Scene.expect(Scene.role("button", { name: "Submit" })).toHaveClass(
        "rounded-none"
      ),
      Scene.expect(Scene.role("button", { name: "Submit" })).toHaveClass(
        "border-neutral-950"
      ),
      Scene.expect(Scene.role("button", { name: "Submit" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
