import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAvatarGroupExample from "./main";

describe("shadcn Avatar Group example", () => {
  test("renders a group of avatars", () => {
    Scene.scene(
      {
        update: ShadcnAvatarGroupExample.update,
        view: ShadcnAvatarGroupExample.view,
      },
      Scene.with(ShadcnAvatarGroupExample.init()[0]),
      Scene.expect(Scene.text("CN")).toExist(),
      Scene.expect(Scene.text("LR")).toExist(),
      Scene.expect(Scene.text("ER")).toExist(),
      Scene.expect(Scene.text("CN")).not.toHaveHandler("click")
    );
  });
});
