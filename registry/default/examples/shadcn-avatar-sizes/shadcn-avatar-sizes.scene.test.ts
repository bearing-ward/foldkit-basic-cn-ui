import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAvatarSizesExample from "./main";

describe("shadcn Avatar Sizes example", () => {
  test("renders small, default, and large avatars", () => {
    Scene.scene(
      {
        update: ShadcnAvatarSizesExample.update,
        view: ShadcnAvatarSizesExample.view,
      },
      Scene.with(ShadcnAvatarSizesExample.init()[0]),
      Scene.expect(Scene.text("CN")).toExist(),
      Scene.expect(Scene.text("CN")).not.toHaveHandler("click")
    );
  });
});
