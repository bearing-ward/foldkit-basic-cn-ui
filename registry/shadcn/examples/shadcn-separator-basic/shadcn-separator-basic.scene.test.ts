import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnSeparatorBasicExample from "./main";

describe("Shadcn Separator Basic example", () => {
  test("matches the shadcn separator demo content", () => {
    Scene.scene(
      {
        update: ShadcnSeparatorBasicExample.update,
        view: ShadcnSeparatorBasicExample.view,
      },
      Scene.with(ShadcnSeparatorBasicExample.init()[0]),
      Scene.expect(Scene.text("shadcn/ui")).toExist(),
      Scene.expect(
        Scene.text("The Foundation for your Design System")
      ).toExist(),
      Scene.expect(
        Scene.text(
          "A set of beautifully designed components that you can customize, extend, and build on."
        )
      ).toExist(),
      Scene.expect(Scene.text("Blog")).toExist(),
      Scene.expect(Scene.text("Docs")).toExist(),
      Scene.expect(Scene.text("Source")).toExist(),
      Scene.expect(Scene.text("Blog")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("Docs")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("Source")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("Settings")).toExist(),
      Scene.expect(Scene.text("Manage preferences")).toExist(),
      Scene.expect(Scene.text("Account")).toExist(),
      Scene.expect(Scene.text("Profile & security")).toExist(),
      Scene.expect(Scene.text("Help")).toExist(),
      Scene.expect(Scene.text("Support & docs")).toExist(),
      Scene.expect(Scene.text("Item 1")).toExist(),
      Scene.expect(Scene.text("Value 1")).toExist(),
      Scene.expect(Scene.text("Item 2")).toExist(),
      Scene.expect(Scene.text("Value 2")).toExist(),
      Scene.expect(Scene.text("Item 3")).toExist(),
      Scene.expect(Scene.text("Value 3")).toExist(),
      Scene.expect(Scene.role("button", { name: "Toggle label" })).not.toExist()
    );
  });
});
