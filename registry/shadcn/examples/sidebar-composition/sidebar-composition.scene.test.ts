import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Sidebar composition example", () => {
  test("renders origin-style composition plus menu action, badge, submenu, and skeleton anatomy", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Acme Inc" })).toHaveAttr(
        "data-size",
        "lg"
      ),
      Scene.expect(Scene.role("button", { name: "Add Project" })).toHaveHandler(
        "click"
      ),
      Scene.click(Scene.role("button", { name: "Add Project" })),
      Scene.expect(
        Scene.role("button", { name: "Project actions" })
      ).toHaveHandler("click"),
      Scene.click(Scene.role("button", { name: "Project actions" })),
      Scene.expect(Scene.text("24")).toHaveAttr(
        "data-slot",
        "sidebar-menu-badge"
      ),
      Scene.expect(Scene.role("link", { name: "Milestones" })).toHaveAttr(
        "aria-current",
        "page"
      ),
      Scene.expect(Scene.role("link", { name: "Settings" })).toHaveAttr(
        "href",
        "/settings"
      ),
      Scene.expect(Scene.text("m@example.com")).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Sidebar menu composition" })
      ).toExist(),
      Scene.expect(
        Scene.role("complementary", { name: "Application sidebar" })
      ).toHaveAttr("data-collapsible", "")
    );
  });
});
