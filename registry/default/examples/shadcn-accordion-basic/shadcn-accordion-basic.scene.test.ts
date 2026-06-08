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
        Scene.role("button", { name: "Product updates" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.text("Ship notes, releases, and roadmap changes.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Billing" })),
      Scene.expect(Scene.role("button", { name: "Billing" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(
        Scene.text("Manage invoices, plans, and payment methods.")
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Product updates" })
      ).toHaveAttr("aria-expanded", "false")
    );
  });
});
