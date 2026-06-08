import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAvatarBasicExample from "./main";

describe("shadcn Avatar Basic example", () => {
  test("renders image, fallback, and overflow count", () => {
    Scene.scene(
      {
        update: ShadcnAvatarBasicExample.update,
        view: ShadcnAvatarBasicExample.view,
      },
      Scene.with(ShadcnAvatarBasicExample.init()[0]),
      Scene.expect(Scene.role("img", { name: "Lena Taylor" })).toExist(),
      Scene.expect(Scene.text("BW")).toExist(),
      Scene.expect(Scene.text("+3")).toExist(),
      Scene.expect(Scene.text("BW")).not.toHaveHandler("click")
    );
  });
});
