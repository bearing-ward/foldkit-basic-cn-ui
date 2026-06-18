import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as TextareaDisabledExample from "./main";

describe("Textarea Disabled example", () => {
  test("renders disabled textarea state", () => {
    Scene.scene(
      {
        update: TextareaDisabledExample.update,
        view: TextareaDisabledExample.view,
      },
      Scene.with(TextareaDisabledExample.init()[0]),
      Scene.expect(
        Scene.role("textbox", { name: "Disabled bio" })
      ).toBeDisabled(),
      Scene.expect(Scene.text("This textarea is disabled.")).toExist()
    );
  });
});
