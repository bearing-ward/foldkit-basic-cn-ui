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
      Scene.expect(
        Scene.text("Sunday, December 03, 2023 at 9:00 AM")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss toast" })),
      Scene.expect(Scene.role("status")).toBeAbsent()
    );
  });

  test("shows type and position variants", () => {
    Scene.scene(
      {
        update: SonnerBasicExample.update,
        view: SonnerBasicExample.view,
      },
      Scene.with(SonnerBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Success" })),
      Scene.expect(Scene.text("Success toast")).toExist(),
      Scene.expect(Scene.role("img", { name: "Success icon" })).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss toast" })),
      Scene.click(Scene.role("button", { name: "Info" })),
      Scene.expect(Scene.text("Info toast")).toExist(),
      Scene.expect(Scene.role("img", { name: "Info icon" })).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss toast" })),
      Scene.click(Scene.role("button", { name: "Warning" })),
      Scene.expect(Scene.text("Warning toast")).toExist(),
      Scene.expect(Scene.role("img", { name: "Warning icon" })).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss toast" })),
      Scene.click(Scene.role("button", { name: "Error" })),
      Scene.expect(Scene.text("Error toast")).toExist(),
      Scene.expect(Scene.role("img", { name: "Error icon" })).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss toast" })),
      Scene.click(Scene.role("button", { name: "Default" })),
      Scene.expect(Scene.text("Event has been created")).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss toast" })),
      Scene.click(Scene.role("button", { name: "top left" })),
      Scene.expect(Scene.text("Event has been created")).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss toast" })),
      Scene.click(Scene.role("button", { name: "bottom center" })),
      Scene.expect(Scene.text("Event has been created")).toExist()
    );
  });
});
