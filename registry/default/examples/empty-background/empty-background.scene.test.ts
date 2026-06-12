import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as EmptyBackgroundExample from "./main";

describe("Empty Background example", () => {
  test("matches the upstream empty background example content", () => {
    Scene.scene(
      {
        update: EmptyBackgroundExample.update,
        view: EmptyBackgroundExample.view,
      },
      Scene.with(EmptyBackgroundExample.init()[0]),
      Scene.expect(
        Scene.role("heading", { name: "No Notifications" })
      ).toExist(),
      Scene.expect(
        Scene.text("You're all caught up. New notifications will appear here.")
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Refresh" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Refresh" })
      ).not.toHaveHandler("click")
    );
  });
});
