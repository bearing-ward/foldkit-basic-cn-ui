import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnInputFileExample from "./main";

describe("Shadcn Input File example", () => {
  test("renders the origin picture file input", () => {
    Scene.scene(
      {
        update: ShadcnInputFileExample.update,
        view: ShadcnInputFileExample.view,
      },
      Scene.with(ShadcnInputFileExample.init()[0]),
      Scene.expect(Scene.text("Picture")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Picture" })).toHaveAttr(
        "type",
        "file"
      ),
      Scene.expect(Scene.role("textbox", { name: "Picture" })).not.toHaveAttr(
        "disabled",
        "true"
      )
    );
  });
});
