import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Card example", () => {
  test("renders accordion content inside the card shell", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Subscription")).toExist(),
      Scene.click(Scene.role("button", { name: "Receipts" })),
      Scene.expect(
        Scene.text("Monthly receipts are sent to finance@example.com.")
      ).toExist()
    );
  });
});
