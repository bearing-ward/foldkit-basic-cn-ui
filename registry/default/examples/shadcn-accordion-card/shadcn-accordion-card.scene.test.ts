import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Card example", () => {
  test("renders accordion content inside the card shell", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Subscription & Billing")).toExist(),
      Scene.expect(
        Scene.text(
          "Common questions about your account, plans, payments and cancellations."
        )
      ).toExist(),
      Scene.click(
        Scene.role("button", { name: "How do I cancel my subscription?" })
      ),
      Scene.expect(
        Scene.text(
          "You can cancel from the billing page at any time. Your account keeps access until the end of the current billing period."
        )
      ).toExist()
    );
  });
});
