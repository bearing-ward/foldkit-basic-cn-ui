import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SonnerBasicExample from "./main";

describe("Sonner Basic example", () => {
  test("shows and dismisses a toast", () => {
    Scene.scene(
      {
        update: SonnerBasicExample.update,
        view: SonnerBasicExample.view,
      },
      Scene.with(SonnerBasicExample.init()[0]),
      Scene.expect(Scene.role("status")).toBeAbsent(),
      Scene.click(Scene.role("button", { name: "Show toast" })),
      Scene.expect(Scene.role("status")).toExist(),
      Scene.expect(Scene.text("Event has been created")).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss toast" })),
      Scene.expect(Scene.role("status")).toBeAbsent()
    );
  });
});
