import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAvatarBadgeExample from "./main";

describe("shadcn Avatar Badge example", () => {
  test("renders an avatar with a status badge", () => {
    Scene.scene(
      {
        update: ShadcnAvatarBadgeExample.update,
        view: ShadcnAvatarBadgeExample.view,
      },
      Scene.with(ShadcnAvatarBadgeExample.init()[0]),
      Scene.expect(Scene.role("img", { name: "Colm Tuite" })).toExist(),
      Scene.expect(Scene.label("Online")).toExist(),
      Scene.expect(Scene.role("img", { name: "Colm Tuite" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
