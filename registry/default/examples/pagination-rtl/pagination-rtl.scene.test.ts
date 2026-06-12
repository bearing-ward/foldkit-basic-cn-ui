import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Pagination RTL example", () => {
  test("renders right-to-left pagination labels", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("navigation", { name: "ترقيم الصفحات" })).toExist(),
      Scene.expect(Scene.role("link", { name: "الصفحة السابقة" })).toExist(),
      Scene.expect(Scene.role("link", { name: "اذهب إلى الصفحة 2" })).toExist(),
      Scene.expect(Scene.role("link", { name: "الصفحة التالية" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "الصفحة التالية" })
      ).not.toHaveHandler("click")
    );
  });
});
