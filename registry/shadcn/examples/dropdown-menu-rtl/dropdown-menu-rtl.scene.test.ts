import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DropdownMenuRtlExample from "./main";

describe("Dropdown Menu RTL example", () => {
  test("renders in rtl direction", () => {
    Scene.scene(
      {
        update: DropdownMenuRtlExample.update,
        view: DropdownMenuRtlExample.view,
      },
      Scene.with(DropdownMenuRtlExample.init()[0]),
      Scene.expect(Scene.text("فتح القائمة")).toExist(),
      Scene.expect(Scene.text("الحساب")).toExist(),
      Scene.click(Scene.text("الفريق")),
      Scene.expect(Scene.text("Selected: الفريق")).toExist()
    );
  });
});
