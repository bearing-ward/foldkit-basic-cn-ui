import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./newComponentAuthoring";

describe("new component authoring", () => {
  test("updates the scaffold checklist from model-owned inputs", () => {
    Scene.scene(
      { update, view },
      Scene.with(init()[0]),
      Scene.expect(
        Scene.role("heading", { name: "New component interface" })
      ).toExist(),
      Scene.expect(
        Scene.text("registry/foldkit/example-panel/ui/index.ts")
      ).toExist(),
      Scene.change(
        Scene.role("textbox", { name: "Component name" }),
        "Command Menu"
      ),
      Scene.expect(Scene.text("registry/foldkit/command-menu/ui/index.ts")).toExist(),
      Scene.change(Scene.role("combobox", { name: "Origin" }), "shadcn"),
      Scene.expect(Scene.role("combobox", { name: "Origin" })).toHaveValue(
        "shadcn"
      ),
      Scene.expect(Scene.text("bun run build:registry")).toExist(),
      Scene.expect(Scene.text("bun run check:registry")).toExist(),
      Scene.expect(Scene.text("bun run typecheck")).toExist(),
      Scene.expect(Scene.text("bun run test")).toExist(),
      Scene.expect(Scene.text("bun run build")).toExist()
    );
  });
});
