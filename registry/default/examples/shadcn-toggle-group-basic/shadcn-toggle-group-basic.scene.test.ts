import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ToggleGroupBasicExample from "./main";

describe("shadcn Toggle Group Basic example", () => {
  test("matches the upstream formatting toggle group behavior", () => {
    Scene.scene(
      {
        update: ToggleGroupBasicExample.update,
        view: ToggleGroupBasicExample.view,
      },
      Scene.with(ToggleGroupBasicExample.init()[0]),
      Scene.expect(Scene.role("group", { name: "Text formatting" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Text formatting bold" })).toHaveAttr(
        "aria-pressed",
        "false"
      ),
      Scene.click(Scene.role("button", { name: "Text formatting italic" })),
      Scene.expect(Scene.role("button", { name: "Text formatting italic" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.role("group", { name: "Outline filters" })).toExist(),
      Scene.expect(Scene.role("group", { name: "Vertical formatting" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Disabled italic" })).toHaveAttr(
        "disabled",
        "true"
      ),
      Scene.expect(Scene.role("group", { name: "Font weight" })).toExist(),
      Scene.expect(Scene.role("group", { name: "قائمة شبكة بطاقات" })).toExist()
    );
  });
});
