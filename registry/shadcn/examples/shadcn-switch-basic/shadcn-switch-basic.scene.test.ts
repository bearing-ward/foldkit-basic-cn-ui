import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnSwitchBasicExample from "./main";

describe("shadcn Switch Basic example", () => {
  test("renders the origin Airplane Mode switch", () => {
    Scene.scene(
      {
        update: ShadcnSwitchBasicExample.update,
        view: ShadcnSwitchBasicExample.view,
      },
      Scene.with(ShadcnSwitchBasicExample.init()[0]),
      Scene.expect(Scene.role("switch", { name: "Airplane Mode" })).toExist(),
      Scene.expect(Scene.text("Email alerts")).not.toExist(),
      Scene.click(Scene.role("switch", { name: "Airplane Mode" })),
      Scene.expect(
        Scene.role("switch", { name: "Airplane Mode" })
      ).toBeChecked()
    );
  });
});
