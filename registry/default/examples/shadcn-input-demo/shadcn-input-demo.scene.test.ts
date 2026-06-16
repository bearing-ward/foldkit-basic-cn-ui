import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Input Demo example", () => {
  test("renders the current origin Demo content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "API Key" })).toHaveAttr(
        "value",
        "sk_live_123456789"
      ),
      Scene.expect(Scene.role("button", { name: "Copy" })).toExist(),
      Scene.expect(
        Scene.text("Your API key is encrypted and stored securely.")
      ).toExist(),
      Scene.type(Scene.role("textbox", { name: "API Key" }), "x"),
      Scene.expect(Scene.role("textbox", { name: "API Key" })).toHaveAttr(
        "value",
        "x"
      )
    );
  });
});
