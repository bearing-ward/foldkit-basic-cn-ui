import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Textarea Disabled example", () => {
  test("renders the origin disabled textarea demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Message")).toExist(),
      Scene.expect(Scene.placeholder("Type your message here.")).toBeDisabled()
    );
  });
});
