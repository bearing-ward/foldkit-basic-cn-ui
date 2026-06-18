import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAvatarGroupIconExample from "./main";

describe("shadcn Avatar Group with Icon example", () => {
  test("renders icon content with the group count", () => {
    Scene.scene(
      {
        update: ShadcnAvatarGroupIconExample.update,
        view: ShadcnAvatarGroupIconExample.view,
      },
      Scene.with(ShadcnAvatarGroupIconExample.init()[0]),
      Scene.expect(Scene.text("CN")).toExist(),
      Scene.expect(Scene.label("Add three more people")).toExist(),
      Scene.expect(Scene.text("+")).toExist(),
      Scene.expect(Scene.label("Add three more people")).not.toHaveHandler(
        "click"
      )
    );
  });
});
