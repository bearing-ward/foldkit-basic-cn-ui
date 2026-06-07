import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SidebarBasicExample from "./main";

describe("Sidebar Basic example", () => {
  test("matches the shadcn collapsible sidebar composition", () => {
    Scene.scene(
      {
        update: SidebarBasicExample.update,
        view: SidebarBasicExample.view,
      },
      Scene.with(SidebarBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Dashboard" })).toHaveAttr(
        "aria-current",
        "page"
      ),
      Scene.expect(Scene.role("button", { name: "Collapse" })).toExist(),
      Scene.click(Scene.role("button", { name: "Collapse" })),
      Scene.expect(Scene.role("button", { name: "Expand" })).toExist(),
      Scene.expect(Scene.text("Acme Inc.")).toHaveAttr(
        "data-state",
        "collapsed"
      )
    );
  });

  test("keeps the active item in Foldkit model state", () => {
    Scene.scene(
      {
        update: SidebarBasicExample.update,
        view: SidebarBasicExample.view,
      },
      Scene.with(SidebarBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Projects" })),
      Scene.expect(Scene.role("button", { name: "Projects" })).toHaveAttr(
        "aria-current",
        "page"
      ),
      Scene.expect(Scene.role("heading", { name: "Projects" })).toExist()
    );
  });
});
