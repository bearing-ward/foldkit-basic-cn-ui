import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SpinnerBasicExample from "./main";

describe("Spinner Basic example", () => {
  test("renders an inert loading indicator", () => {
    Scene.scene(
      {
        update: SpinnerBasicExample.update,
        view: SpinnerBasicExample.view,
      },
      Scene.with(SpinnerBasicExample.init()[0]),
      Scene.expect(Scene.role("status", { name: "Loading" })).toExist(),
      Scene.expect(Scene.text("Loading")).not.toHaveHandler("click")
    );
  });
});
