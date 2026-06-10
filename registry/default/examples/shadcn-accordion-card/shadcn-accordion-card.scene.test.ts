import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Card example", () => {
  test("renders accordion content inside the card shell", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Accordion")).toExist(),
      Scene.expect(
        Scene.text("Common questions about the accordion component.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Is it animated?" })),
      Scene.expect(
        Scene.text(
          "Yes. It's animated by default, but you can disable it if you prefer."
        )
      ).toExist()
    );
  });
});
