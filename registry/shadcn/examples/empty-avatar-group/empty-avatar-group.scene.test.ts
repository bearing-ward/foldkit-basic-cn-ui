import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as EmptyAvatarGroupExample from "./main";

describe("Empty Avatar Group example", () => {
  test("matches the upstream empty avatar group example content", () => {
    Scene.scene(
      {
        update: EmptyAvatarGroupExample.update,
        view: EmptyAvatarGroupExample.view,
      },
      Scene.with(EmptyAvatarGroupExample.init()[0]),
      Scene.expect(Scene.text("CN")).toExist(),
      Scene.expect(Scene.text("LR")).toExist(),
      Scene.expect(Scene.text("ER")).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "No Team Members" })
      ).toExist(),
      Scene.expect(
        Scene.text("Invite your team to collaborate on this project.")
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Invite Members" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Invite Members" })
      ).not.toHaveHandler("click")
    );
  });
});
