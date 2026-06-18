import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Textarea Field example", () => {
  test("renders the origin field textarea demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Message")).toExist(),
      Scene.expect(Scene.text("Enter your message below.")).toExist(),
      Scene.expect(Scene.placeholder("Type your message here.")).toExist(),
      Scene.expect(Scene.placeholder("Type your message here.")).not.toHaveHandler(
        "input"
      )
    );
  });
});
