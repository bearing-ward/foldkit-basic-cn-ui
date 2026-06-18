import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAvatarBadgeIconExample from "./main";

describe("shadcn Avatar Badge with Icon example", () => {
  test("renders a badge with icon content", () => {
    Scene.scene(
      {
        update: ShadcnAvatarBadgeIconExample.update,
        view: ShadcnAvatarBadgeIconExample.view,
      },
      Scene.with(ShadcnAvatarBadgeIconExample.init()[0]),
      Scene.expect(Scene.text("PP")).toExist(),
      Scene.expect(Scene.label("Add profile picture")).toExist(),
      Scene.expect(Scene.text("+")).toExist(),
      Scene.expect(Scene.text("PP")).not.toHaveHandler("click")
    );
  });
});
