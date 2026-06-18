import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputGroupRtlExample from "./main";

describe("Input Group RTL example", () => {
  test("renders rtl search input", () => {
    Scene.scene(
      { update: InputGroupRtlExample.update, view: InputGroupRtlExample.view },
      Scene.with(InputGroupRtlExample.init()[0]),
      Scene.expect(Scene.text("⌕")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "بحث" })).toHaveAttr(
        "placeholder",
        "ابحث..."
      ),
      Scene.expect(Scene.text("⌕")).not.toHaveHandler("click")
    );
  });
});
