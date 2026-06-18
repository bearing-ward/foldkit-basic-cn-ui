import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ScrollAreaBasicExample from "./main";

describe("Scroll Area Basic example", () => {
  test("matches the Base UI scroll area hero example content", () => {
    Scene.scene(
      {
        update: ScrollAreaBasicExample.update,
        view: ScrollAreaBasicExample.view,
      },
      Scene.with(ScrollAreaBasicExample.init()[0]),
      Scene.expect(
        Scene.role("region", { name: "Vernacular architecture excerpt" })
      ).toHaveAttr("tabindex", "0"),
      Scene.expect(
        Scene.text(
          "Vernacular architecture is building done outside any academic tradition, and without professional guidance. It is not a particular architectural movement or style, but rather a broad category, encompassing a wide range and variety of building types, with differing methods of construction, from around the world, both historical and extant and classical and modern."
        )
      ).toExist(),
      Scene.expect(
        Scene.text(
          "This type of architecture usually serves immediate, local needs, is constrained by the materials available in its particular region and reflects local traditions and cultural practices."
        )
      ).toExist(),
      Scene.expect(
        Scene.text(
          "This type of architecture usually serves immediate, local needs, is constrained by the materials available in its particular region and reflects local traditions and cultural practices."
        )
      ).not.toHaveHandler("click")
    );
  });
});
