import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAccordionBasicExample from "./main";

describe("shadcn Accordion Basic example", () => {
  test("opens one shadcn accordion panel at a time", () => {
    Scene.scene(
      {
        update: ShadcnAccordionBasicExample.update,
        view: ShadcnAccordionBasicExample.view,
      },
      Scene.with(ShadcnAccordionBasicExample.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "How do I reset my password?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.text(
          "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours."
        )
      ).toExist(),
      Scene.click(
        Scene.role("button", { name: "Can I change my subscription plan?" })
      ),
      Scene.expect(
        Scene.role("button", { name: "Can I change my subscription plan?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.text(
          "Yes, you can upgrade or downgrade your subscription plan at any time from your account settings. Changes will take effect immediately."
        )
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "How do I reset my password?" })
      ).toHaveAttr("aria-expanded", "false")
    );
  });
});
