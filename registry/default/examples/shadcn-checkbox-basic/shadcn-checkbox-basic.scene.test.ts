import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnCheckboxBasicExample from "./main";

describe("Shadcn Checkbox Basic example", () => {
  test("matches the shadcn terms example", () => {
    Scene.scene(
      {
        update: ShadcnCheckboxBasicExample.update,
        view: ShadcnCheckboxBasicExample.view,
      },
      Scene.with(ShadcnCheckboxBasicExample.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toExist(),
      Scene.expect(
        Scene.text("You agree to our Terms of Service and Privacy Policy.")
      ).toExist(),
      Scene.click(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toBeChecked()
    );
  });
});
