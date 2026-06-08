import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAvatarGroupCountExample from "./main";

describe("shadcn Avatar Group Count example", () => {
  test("renders a group count", () => {
    Scene.scene(
      {
        update: ShadcnAvatarGroupCountExample.update,
        view: ShadcnAvatarGroupCountExample.view,
      },
      Scene.with(ShadcnAvatarGroupCountExample.init()[0]),
      Scene.expect(Scene.text("CN")).toExist(),
      Scene.expect(Scene.text("+3")).toExist(),
      Scene.expect(Scene.role("img", { name: "3 more people" })).toExist(),
      Scene.expect(
        Scene.role("img", { name: "3 more people" })
      ).not.toHaveHandler("click")
    );
  });
});
