import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("alert-destructive example", () => {
  test("renders the shadcn destructive alert copy", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.role("alert")).toHaveAttr(
        "data-variant",
        "Destructive"
      ),
      Scene.expect(Scene.role("heading", { name: "Error" })).toExist(),
      Scene.expect(
        Scene.text("Your session has expired. Please log in again.")
      ).toExist(),
      Scene.expect(Scene.text("Error")).not.toHaveHandler("click")
    );
  });
});
