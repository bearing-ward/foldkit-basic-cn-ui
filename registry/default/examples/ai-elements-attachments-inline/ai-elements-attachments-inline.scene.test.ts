import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("AI Elements Attachments Inline example", () => {
  test("renders inline labels and removes an attachment through update", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("quarterly-report-2024.pdf")).toExist(),
      Scene.expect(Scene.text("React Documentation")).toExist(),
      Scene.expect(Scene.text("meeting-recording.mp3")).toExist(),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.click(
        Scene.role("button", { name: "Remove quarterly-report-2024.pdf" })
      ),
      Scene.expect(Scene.text("quarterly-report-2024.pdf")).toBeAbsent()
    );
  });
});
