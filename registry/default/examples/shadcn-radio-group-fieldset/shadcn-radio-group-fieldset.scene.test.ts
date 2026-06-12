import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Radio Group Fieldset example", () => {
  test("renders the origin fieldset radio group demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Subscription Plan")).toExist(),
      Scene.expect(
        Scene.text("Yearly and lifetime plans offer significant savings.")
      ).toExist(),
      Scene.expect(
        Scene.role("radio", { name: "Monthly ($9.99/month)" })
      ).toBeChecked(),
      Scene.expect(
        Scene.role("radio", { name: "Monthly ($9.99/month)" })
      ).not.toHaveHandler("click"),
      Scene.expect(
        Scene.role("radio", { name: "Lifetime ($299.99)" })
      ).not.toBeChecked()
    );
  });
});
