import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as AccordionBasicExample from "./main";

describe("Accordion Basic example", () => {
  test("matches the Base UI single-panel accordion behavior", () => {
    Scene.scene(
      {
        update: AccordionBasicExample.update,
        view: AccordionBasicExample.view,
      },
      Scene.with(AccordionBasicExample.init()[0]),
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
