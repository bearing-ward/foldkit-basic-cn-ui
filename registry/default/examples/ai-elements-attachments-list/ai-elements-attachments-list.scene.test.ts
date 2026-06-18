import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("AI Elements Attachments List example", () => {
  test("renders list labels and removes an attachment through update", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("product-demo.mp4")).toExist(),
      Scene.expect(Scene.text("video/mp4")).toExist(),
      Scene.expect(Scene.text("quarterly-report.pdf")).toExist(),
      Scene.expect(Scene.text("API Documentation")).toExist(),
      Scene.expect(Scene.text("podcast-episode.mp3")).toExist(),
      Scene.click(Scene.role("button", { name: "Remove product-demo.mp4" })),
      Scene.expect(Scene.text("product-demo.mp4")).toBeAbsent()
    );
  });
});
