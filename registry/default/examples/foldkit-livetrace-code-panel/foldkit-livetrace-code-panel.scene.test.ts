import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("foldkit livetrace code panel example", () => {
  test("renders the active code panel and inert inspect control", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.text("src/process.ts")).toExist(),
      Scene.expect(Scene.text("line 51")).toExist(),
      Scene.expect(Scene.text('    yield* step("Parse")(')).toHaveAttr(
        "data-active",
        "true"
      ),
      Scene.expect(
        Scene.role("button", { name: "Inspect code" })
      ).not.toHaveHandler("click")
    );
  });
});
