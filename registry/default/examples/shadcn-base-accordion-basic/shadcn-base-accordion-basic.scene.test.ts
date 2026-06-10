import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnBaseAccordionBasicExample from "./main";

describe("shadcn Base Accordion Basic example", () => {
  test("matches the shadcn Base Accordion single-panel behavior", () => {
    Scene.scene(
      {
        update: ShadcnBaseAccordionBasicExample.update,
        view: ShadcnBaseAccordionBasicExample.view,
      },
      Scene.with(ShadcnBaseAccordionBasicExample.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "Is it accessible?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.text("Yes. It adheres to the WAI-ARIA design pattern.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Is it accessible?" })),
      Scene.expect(
        Scene.role("button", { name: "Is it accessible?" })
      ).toHaveAttr("aria-expanded", "false"),
      Scene.expect(
        Scene.text("Yes. It adheres to the WAI-ARIA design pattern.")
      ).not.toExist()
    );
  });
});
