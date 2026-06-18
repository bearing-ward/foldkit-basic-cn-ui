import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as FormBasicExample from "./main";

describe("Base UI Form Basic example", () => {
  test("matches the Base UI default Homepage submission example", () => {
    Scene.scene(
      { update: FormBasicExample.update, view: FormBasicExample.view },
      Scene.with(FormBasicExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveValue(
        "https://example.com"
      ),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveAttr(
        "placeholder",
        "https://example.com"
      ),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveAttr(
        "required",
        ""
      ),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveAttr(
        "pattern",
        "https?://.*"
      ),
      Scene.expect(
        Scene.text("The example domain is not allowed")
      ).not.toExist(),
      Scene.click(Scene.role("button", { name: "Submit" })),
      Scene.expect(Scene.text("The example domain is not allowed")).toExist(),
      Scene.type(
        Scene.role("textbox", { name: "Homepage" }),
        "https://foldkit.dev"
      ),
      Scene.expect(
        Scene.text("The example domain is not allowed")
      ).not.toExist()
    );
  });
});
