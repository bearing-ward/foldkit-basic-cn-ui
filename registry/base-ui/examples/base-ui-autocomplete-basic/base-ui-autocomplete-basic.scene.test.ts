import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiAutocompleteBasicExample from "./main";

describe("Base UI Autocomplete Basic example", () => {
  test("matches the Base UI default Search tags example", () => {
    Scene.scene(
      {
        update: BaseUiAutocompleteBasicExample.update,
        view: BaseUiAutocompleteBasicExample.view,
      },
      Scene.with(BaseUiAutocompleteBasicExample.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "Search tags" })).toHaveAttr(
        "placeholder",
        "e.g. feature"
      ),
      Scene.expect(
        Scene.role("option", { name: "component: accordion" })
      ).toExist(),
      Scene.type(Scene.role("combobox", { name: "Search tags" }), "zzzz"),
      Scene.expect(Scene.text("No tags found.")).toExist()
    );
  });
});
