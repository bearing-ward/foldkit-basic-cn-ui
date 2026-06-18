import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Textarea Button example", () => {
  test("renders the origin textarea with button demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.placeholder("Type your message here.")).toExist(),
      Scene.expect(Scene.role("button", { name: "Send message" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Send message" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
