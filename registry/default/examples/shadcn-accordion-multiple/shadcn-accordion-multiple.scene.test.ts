import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Multiple example", () => {
  test("keeps multiple panels open", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "Is it accessible?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.click(Scene.role("button", { name: "Is it styled?" })),
      Scene.expect(
        Scene.role("button", { name: "Is it accessible?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(Scene.role("button", { name: "Is it styled?" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(
        Scene.text(
          "Yes. It comes with default styles that matches the other components' aesthetic."
        )
      ).toExist()
    );
  });
});
