import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnDrawerSidesExample from "./main";

describe("shadcn Drawer Sides example", () => {
  test("renders the side triggers in origin order", () => {
    Scene.scene(
      {
        update: ShadcnDrawerSidesExample.update,
        view: ShadcnDrawerSidesExample.view,
      },
      Scene.with(ShadcnDrawerSidesExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "top" })).toExist(),
      Scene.expect(Scene.role("button", { name: "right" })).toExist(),
      Scene.expect(Scene.role("button", { name: "bottom" })).toExist(),
      Scene.expect(Scene.role("button", { name: "left" })).toExist()
    );
  });

  test("opens and closes each drawer side with the shared goal content", () => {
    ["top", "right", "bottom", "left"].forEach((side) => {
      Scene.scene(
        {
          update: ShadcnDrawerSidesExample.update,
          view: ShadcnDrawerSidesExample.view,
        },
        Scene.with(ShadcnDrawerSidesExample.init()[0]),
        Scene.click(Scene.role("button", { name: side })),
        Scene.expect(Scene.role("dialog", { name: "Move Goal" })).toExist(),
        Scene.expect(Scene.text("Set your daily activity goal.")).toExist(),
        Scene.click(Scene.role("button", { name: "Cancel" })),
        Scene.expect(Scene.role("dialog", { name: "Move Goal" })).not.toExist()
      );
    });
  });
});
