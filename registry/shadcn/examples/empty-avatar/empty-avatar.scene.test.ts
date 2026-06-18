import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as EmptyAvatarExample from "./main";

describe("Empty Avatar example", () => {
  test("matches the upstream empty avatar example content", () => {
    Scene.scene(
      { update: EmptyAvatarExample.update, view: EmptyAvatarExample.view },
      Scene.with(EmptyAvatarExample.init()[0]),
      Scene.expect(Scene.text("LR")).toExist(),
      Scene.expect(Scene.role("heading", { name: "User Offline" })).toExist(),
      Scene.expect(
        Scene.text(
          "This user is currently offline. You can leave a message to notify them or try again later."
        )
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Leave Message" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Leave Message" })
      ).not.toHaveHandler("click")
    );
  });
});
