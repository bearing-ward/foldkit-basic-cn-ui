import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Textarea Invalid example", () => {
  test("renders the origin invalid textarea demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.placeholder("Type your message here.")).toHaveAttr(
        "aria-invalid",
        "true"
      ),
      Scene.expect(Scene.text("Please enter a valid message.")).toExist(),
      Scene.expect(Scene.placeholder("Type your message here.")).not.toHaveHandler(
        "input"
      )
    );
  });
});
