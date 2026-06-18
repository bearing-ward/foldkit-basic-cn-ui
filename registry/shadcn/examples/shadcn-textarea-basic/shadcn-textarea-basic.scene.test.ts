import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnTextareaBasicExample from "./main";

describe("Shadcn Textarea Basic example", () => {
  test("renders the upstream textarea demo", () => {
    Scene.scene(
      {
        update: ShadcnTextareaBasicExample.update,
        view: ShadcnTextareaBasicExample.view,
      },
      Scene.with(ShadcnTextareaBasicExample.init()[0]),
      Scene.expect(Scene.placeholder("Type your message here.")).toExist(),
      Scene.expect(Scene.placeholder("Type your message here.")).not.toHaveHandler(
        "input"
      ),
      Scene.expect(Scene.text("Characters: 0")).not.toExist()
    );
  });
});
