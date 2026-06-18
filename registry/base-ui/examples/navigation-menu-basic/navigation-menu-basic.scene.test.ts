import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as NavigationMenuBasicExample from "./main";

describe("Navigation Menu Basic example", () => {
  test("matches the Base UI default navigation menu content", () => {
    Scene.scene(
      {
        update: NavigationMenuBasicExample.update,
        view: NavigationMenuBasicExample.view,
      },
      Scene.with(NavigationMenuBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Handbook" })).toExist(),
      Scene.expect(Scene.role("link", { name: "GitHub" })).toHaveAttr(
        "href",
        "https://github.com/"
      ),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Overview" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.text("Introduction")).toExist(),
      Scene.expect(Scene.text("Installation")).toExist(),
      Scene.click(Scene.role("button", { name: "Handbook" })),
      Scene.expect(Scene.text("Components")).toExist(),
      Scene.expect(Scene.text("Patterns")).toExist(),
      Scene.click(Scene.role("button", { name: "Handbook" })),
      Scene.expect(Scene.role("menu")).not.toExist()
    );
  });
});
