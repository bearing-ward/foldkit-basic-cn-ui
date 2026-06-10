import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Borders example", () => {
  test("opens the bordered accordion panels", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.text(
          "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Is my data secure?" })),
      Scene.expect(
        Scene.text(
          "Yes, we use enterprise-grade encryption, regular security audits, and comply with SOC 2 Type II standards to protect your data."
        )
      ).toExist()
    );
  });
});
