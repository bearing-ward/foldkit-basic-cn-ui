import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnNavigationMenuBasicExample from "./main";

describe("Shadcn Navigation Menu Basic example", () => {
  test("matches the shadcn navigation menu demo content", () => {
    Scene.scene(
      {
        update: ShadcnNavigationMenuBasicExample.update,
        view: ShadcnNavigationMenuBasicExample.view,
      },
      Scene.with(ShadcnNavigationMenuBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Home" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Components" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Docs" })).toHaveAttr(
        "href",
        "/docs"
      ),
      Scene.expect(Scene.role("link", { name: "Documentation" })).toHaveAttr(
        "href",
        "/docs"
      ),
      Scene.expect(Scene.role("button", { name: "List" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Simple" })).toExist(),
      Scene.expect(Scene.role("button", { name: "With Icon" })).toExist(),
      Scene.expect(Scene.role("link", { name: "الوثائق" })).toExist(),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Home" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.text("shadcn/ui")).toExist(),
      Scene.expect(
        Scene.text("Beautifully designed components built with Tailwind CSS.")
      ).toExist(),
      Scene.expect(Scene.text("Introduction")).toExist(),
      Scene.expect(Scene.text("Installation")).toExist(),
      Scene.expect(Scene.text("Typography")).toExist(),
      Scene.click(Scene.role("button", { name: "Components" })),
      Scene.expect(Scene.text("Alert Dialog")).toExist(),
      Scene.expect(Scene.text("Hover Card")).toExist(),
      Scene.expect(Scene.text("Progress")).toExist(),
      Scene.expect(Scene.text("Scroll-area")).toExist(),
      Scene.expect(Scene.text("Tabs")).toExist(),
      Scene.expect(Scene.text("Tooltip")).toExist(),
      Scene.click(Scene.role("button", { name: "List" })),
      Scene.expect(
        Scene.text("Browse all components in the library.")
      ).toExist(),
      Scene.expect(Scene.text("Learn how to use the library.")).toExist(),
      Scene.expect(Scene.text("Read our latest blog posts.")).toExist(),
      Scene.click(Scene.role("button", { name: "Simple" })),
      Scene.expect(Scene.text("Blocks")).toExist(),
      Scene.click(Scene.role("button", { name: "With Icon" })),
      Scene.expect(Scene.text("Backlog")).toExist(),
      Scene.expect(Scene.text("To Do")).toExist(),
      Scene.expect(Scene.text("Done")).toExist(),
      Scene.click(Scene.role("button", { name: "With Icon" })),
      Scene.expect(Scene.role("menu")).not.toExist()
    );
  });
});
