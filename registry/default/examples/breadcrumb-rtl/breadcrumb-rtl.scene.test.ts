import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("breadcrumb-rtl example", () => {
  test("renders the shadcn Breadcrumb RTL example", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.role("navigation", { name: "breadcrumb" })).toExist(),
      Scene.expect(Scene.text("مسار التنقل")).toExist(),
      Scene.expect(Scene.text("مسار التنقل")).not.toHaveHandler("click")
    );
  });
});
