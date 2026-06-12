import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as HoverCardBasicExample from "./main";

describe("Hover Card Basic example", () => {
  test("opens and closes the controlled preview", () => {
    Scene.scene(
      {
        update: HoverCardBasicExample.update,
        view: HoverCardBasicExample.view,
      },
      Scene.with(HoverCardBasicExample.init()[0]),
      Scene.expect(Scene.role("dialog")).toBeAbsent(),
      Scene.click(Scene.role("button", { name: "Hover Here" })),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(Scene.text("@vercel")).toExist(),
      Scene.expect(
        Scene.text("The React Framework – created and maintained by @vercel.")
      ).toExist(),
      Scene.expect(Scene.text("Joined December 2021")).toExist(),
      Scene.click(Scene.role("button", { name: "Close hover card" })),
      Scene.expect(Scene.role("dialog")).toBeAbsent()
    );
  });
});
