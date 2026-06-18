import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Borders example", () => {
  test("opens the bordered accordion panels", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.text("Yes. It adheres to the WAI-ARIA design pattern.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Is it styled?" })),
      Scene.expect(
        Scene.text(
          "Yes. It comes with default styles that matches the other components' aesthetic."
        )
      ).toExist()
    );
  });
});
