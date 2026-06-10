import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnCollapsibleBasicExample from "./main";

describe("Shadcn Collapsible Basic example", () => {
  test("matches the shadcn order details example", () => {
    Scene.scene(
      {
        update: ShadcnCollapsibleBasicExample.update,
        view: ShadcnCollapsibleBasicExample.view,
      },
      Scene.with(ShadcnCollapsibleBasicExample.init()[0]),
      Scene.expect(Scene.text("Order #4189")).toExist(),
      Scene.expect(Scene.text("Status")).toExist(),
      Scene.expect(Scene.text("Shipped")).toExist(),
      Scene.expect(Scene.role("button", { name: "Toggle details" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.text("Shipping address")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Toggle details" })),
      Scene.expect(Scene.role("button", { name: "Toggle details" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(Scene.text("Shipping address")).toExist(),
      Scene.expect(Scene.text("100 Market St, San Francisco")).toExist(),
      Scene.expect(Scene.text("Items")).toExist(),
      Scene.expect(Scene.text("2x Studio Headphones")).toExist()
    );
  });
});
