import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("aspect-ratio-rtl example", () => {
  test("renders the shadcn RTL image example", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.role("img", { name: "Photo" })).toExist(),
      Scene.expect(Scene.text("منظر طبيعي جميل")).toExist(),
      Scene.expect(Scene.text("منظر طبيعي جميل")).not.toHaveHandler("click")
    );
  });
});
