import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ScrollAreaBothScrollbarsExample from "./main";

describe("Base UI Scroll Area Both Scrollbars example", () => {
  test("renders two-axis scroll content", () => {
    Scene.scene(
      {
        update: ScrollAreaBothScrollbarsExample.update,
        view: ScrollAreaBothScrollbarsExample.view,
      },
      Scene.with(ScrollAreaBothScrollbarsExample.init()[0]),
      Scene.expect(
        Scene.role("region", { name: "Two axis content" })
      ).toExist(),
      Scene.expect(Scene.text("Navigation")).toExist(),
      Scene.expect(Scene.text("Column E")).toExist(),
      Scene.expect(Scene.text("Column E")).not.toHaveHandler("click")
    );
  });
});
