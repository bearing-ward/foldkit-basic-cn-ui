import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnCheckboxBasicExample from "./main";

describe("Shadcn Checkbox Basic example", () => {
  test("toggles accepted feedback", () => {
    Scene.scene(
      {
        update: ShadcnCheckboxBasicExample.update,
        view: ShadcnCheckboxBasicExample.view,
      },
      Scene.with(ShadcnCheckboxBasicExample.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toExist(),
      Scene.expect(Scene.text("Accepted: no")).toExist(),
      Scene.click(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ),
      Scene.expect(Scene.text("Accepted: yes")).toExist()
    );
  });
});
