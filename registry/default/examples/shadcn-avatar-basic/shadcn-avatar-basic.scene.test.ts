import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAvatarBasicExample from "./main";

describe("shadcn Avatar Basic example", () => {
  test("renders a basic avatar image with fallback text", () => {
    Scene.scene(
      {
        update: ShadcnAvatarBasicExample.update,
        view: ShadcnAvatarBasicExample.view,
      },
      Scene.with(ShadcnAvatarBasicExample.init()[0]),
      Scene.expect(Scene.role("img", { name: "@shadcn" })).toExist(),
      Scene.expect(Scene.role("img", { name: "@shadcn" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
