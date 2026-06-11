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
      Scene.expect(Scene.text("Radix Primitives")).toExist(),
      Scene.expect(Scene.text("An open-source UI component library.")).toExist(),
      Scene.expect(Scene.text("Blog")).toExist(),
      Scene.expect(Scene.text("Docs")).toExist(),
      Scene.expect(Scene.text("Source")).toExist(),
      Scene.expect(Scene.text("Blog")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("Docs")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("Source")).not.toHaveHandler("click"),
      Scene.expect(Scene.role("button", { name: "Toggle label" })).not.toExist()
    );
  });
});
