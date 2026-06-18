import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SpinnerBasicExample from "./main";

describe("Spinner Basic example", () => {
  test("renders the upstream payment loading example", () => {
    Scene.scene(
      {
        update: SpinnerBasicExample.update,
        view: SpinnerBasicExample.view,
      },
      Scene.with(SpinnerBasicExample.init()[0]),
      Scene.expect(Scene.text("Processing payment...")).toExist(),
      Scene.expect(Scene.text("$100.00")).toExist(),
      Scene.expect(Scene.role("status", { name: "Loading" })).toExist(),
      Scene.expect(Scene.text("Loading...")).toExist(),
      Scene.expect(Scene.text("Syncing")).toExist(),
      Scene.expect(Scene.placeholder("Validating...")).toExist(),
      Scene.expect(Scene.text("Processing your request")).toExist(),
      Scene.expect(Scene.text("Please wait while we process your request. Do not refresh the page.")).toExist(),
      Scene.expect(Scene.text("جاري معالجة الدفع...")).toExist(),
      Scene.expect(Scene.text("١٠٠.٠٠ دولار")).toExist(),
      Scene.expect(Scene.text("Processing payment...")).not.toHaveHandler("click")
    );
  });
});
