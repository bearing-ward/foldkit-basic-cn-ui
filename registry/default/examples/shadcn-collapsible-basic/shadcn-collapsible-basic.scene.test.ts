import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnCollapsibleBasicExample from "./main";

describe("Shadcn Collapsible Basic example", () => {
  test("matches the shadcn starred repositories example", () => {
    Scene.scene(
      {
        update: ShadcnCollapsibleBasicExample.update,
        view: ShadcnCollapsibleBasicExample.view,
      },
      Scene.with(ShadcnCollapsibleBasicExample.init()[0]),
      Scene.expect(Scene.text("@peduarte starred 3 repositories")).toExist(),
      Scene.expect(Scene.text("@radix-ui/primitives")).toExist(),
      Scene.expect(Scene.role("button", { name: "Toggle" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.text("@radix-ui/colors")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Toggle" })),
      Scene.expect(Scene.role("button", { name: "Toggle" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(Scene.text("@radix-ui/colors")).toExist(),
      Scene.expect(Scene.text("@stitches/react")).toExist()
    );
  });
});
