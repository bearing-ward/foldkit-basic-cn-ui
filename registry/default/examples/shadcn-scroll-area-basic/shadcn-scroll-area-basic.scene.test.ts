import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnScrollAreaBasicExample from "./main";

describe("Shadcn Scroll Area Basic example", () => {
  test("matches the shadcn tags scroll area demo content", () => {
    Scene.scene(
      {
        update: ShadcnScrollAreaBasicExample.update,
        view: ShadcnScrollAreaBasicExample.view,
      },
      Scene.with(ShadcnScrollAreaBasicExample.init()[0]),
      Scene.expect(
        Scene.role("region", { name: "Tags" })
      ).toHaveAttr("tabindex", "0"),
      Scene.expect(Scene.text("Tags")).toExist(),
      Scene.expect(Scene.text("v1.2.0-beta.50")).toExist(),
      Scene.expect(Scene.text("v1.2.0-beta.1")).toExist(),
      Scene.expect(Scene.text("v1.2.0-beta.50")).not.toHaveHandler("click")
    );
  });
});
