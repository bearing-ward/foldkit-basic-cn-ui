import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as RadioBasicExample from "./main";

describe("Radio Basic example", () => {
  test("matches the Base UI radio hero selection behavior", () => {
    Scene.scene(
      {
        update: RadioBasicExample.update,
        view: RadioBasicExample.view,
      },
      Scene.with(RadioBasicExample.init()[0]),
      Scene.expect(Scene.role("radiogroup", { name: "Best apple" })).toExist(),
      Scene.expect(Scene.role("radio", { name: "Fuji" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.click(Scene.text("Granny Smith")),
      Scene.expect(Scene.role("radio", { name: "Fuji" })).toHaveAttr(
        "aria-checked",
        "false"
      ),
      Scene.expect(Scene.role("radio", { name: "Granny Smith" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });
});
