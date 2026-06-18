import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("alert-custom-colors example", () => {
  test("renders the shadcn custom colors alert copy", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.role("alert")).toExist(),
      Scene.expect(Scene.role("alert")).toHaveClass("bg-amber-50"),
      Scene.expect(
        Scene.role("heading", {
          name: "Your subscription will expire in 3 days.",
        })
      ).toExist(),
      Scene.expect(
        Scene.text(
          "Renew now to avoid service interruption or upgrade to a paid plan to continue using the service."
        )
      ).toExist(),
      Scene.expect(
        Scene.text("Your subscription will expire in 3 days.")
      ).not.toHaveHandler("click")
    );
  });
});
