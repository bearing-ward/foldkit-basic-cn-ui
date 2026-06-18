import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Input Badge example", () => {
  test("renders the current origin Badge content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Webhook URL" })).toExist(),
      Scene.expect(Scene.text("Beta")).toExist(),
      Scene.type(
        Scene.role("textbox", { name: "Webhook URL" }),
        "https://example.com"
      ),
      Scene.expect(Scene.role("textbox", { name: "Webhook URL" })).toHaveAttr(
        "value",
        "https://example.com"
      )
    );
  });
});
