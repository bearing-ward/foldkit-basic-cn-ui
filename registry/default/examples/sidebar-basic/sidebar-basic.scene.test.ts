import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SidebarBasicExample from "./main";

describe("Sidebar Basic example", () => {
  test("matches the shadcn origin Acme sidebar composition", () => {
    Scene.scene(
      {
        update: SidebarBasicExample.update,
        view: SidebarBasicExample.view,
      },
      Scene.with(SidebarBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Acme Inc" })).toHaveAttr(
        "data-size",
        "lg"
      ),
      Scene.expect(Scene.text("Enterprise")).toExist(),
      Scene.expect(Scene.role("button", { name: "Models" })).toHaveAttr(
        "aria-current",
        "page"
      ),
      Scene.expect(Scene.role("button", { name: "Documentation" })).toExist(),
      Scene.expect(Scene.text("Projects")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Design Engineering" })
      ).toExist(),
      Scene.expect(Scene.text("m@example.com")).toExist(),
      Scene.expect(Scene.role("button", { name: "Toggle Sidebar" })).toHaveAttr(
        "data-slot",
        "sidebar-rail"
      )
    );
  });

  test("keeps the active origin item in Foldkit model state", () => {
    Scene.scene(
      {
        update: SidebarBasicExample.update,
        view: SidebarBasicExample.view,
      },
      Scene.with(SidebarBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Travel" })),
      Scene.expect(Scene.role("button", { name: "Travel" })).toHaveAttr(
        "aria-current",
        "page"
      )
    );
  });

  test("collapses to the icon rail through the shadcn rail control", () => {
    Scene.scene(
      {
        update: SidebarBasicExample.update,
        view: SidebarBasicExample.view,
      },
      Scene.with(SidebarBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Toggle Sidebar" })),
      Scene.expect(
        Scene.role("complementary", { name: "Application sidebar" })
      ).toHaveAttr("data-collapsible", "icon")
    );
  });
});
