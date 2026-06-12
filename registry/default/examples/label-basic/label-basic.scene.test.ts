import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as LabelBasicExample from "./main";

describe("Label Basic example", () => {
  test("matches the shadcn Label basic example", () => {
    Scene.scene(
      { update: LabelBasicExample.update, view: LabelBasicExample.view },
      Scene.with(LabelBasicExample.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toHaveAttr("aria-checked", "false"),
      Scene.click(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toHaveAttr("aria-checked", "true")
    );
  });
});
