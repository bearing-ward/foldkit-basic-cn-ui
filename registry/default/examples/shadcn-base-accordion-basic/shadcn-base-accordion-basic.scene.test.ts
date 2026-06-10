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
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.text(
          "Base UI is a library of high-quality unstyled components for design systems and web apps."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "How do I get started?" })),
      Scene.expect(
        Scene.role("button", { name: "How do I get started?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "false")
    );
  });
});
