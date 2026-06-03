import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as CheckboxIndeterminateExample from "./main";

describe("Checkbox Indeterminate example", () => {
  test("toggles grouped checkbox state", () => {
    Scene.scene(
      {
        update: CheckboxIndeterminateExample.update,
        view: CheckboxIndeterminateExample.view,
      },
      Scene.with(CheckboxIndeterminateExample.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "All notification channels" })
      ).toExist(),
      Scene.expect(Scene.text("Selected channels: 1")).toExist(),
      Scene.click(
        Scene.role("checkbox", { name: "All notification channels" })
      ),
      Scene.expect(Scene.text("Selected channels: 2")).toExist(),
      Scene.click(Scene.role("checkbox", { name: "Email notifications" })),
      Scene.expect(Scene.text("Selected channels: 1")).toExist()
    );
  });
});
