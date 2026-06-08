import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAvatarDropdownExample from "./main";

describe("shadcn Avatar Dropdown example", () => {
  test("uses the avatar as a dropdown trigger", () => {
    Scene.scene(
      {
        update: ShadcnAvatarDropdownExample.update,
        view: ShadcnAvatarDropdownExample.view,
      },
      Scene.with(ShadcnAvatarDropdownExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "CN" })).toExist(),
      Scene.click(Scene.role("button", { name: "CN" })),
      Scene.expect(Scene.role("menuitem", { name: "Profile" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Profile" })),
      Scene.expect(Scene.text("Selected: Profile")).toExist()
    );
  });
});
