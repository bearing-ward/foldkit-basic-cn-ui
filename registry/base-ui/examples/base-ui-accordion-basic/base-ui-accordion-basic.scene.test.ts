import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiAccordionBasicExample from "./main";

describe("Base UI Accordion Basic example", () => {
  test("matches the Base UI single-panel accordion behavior", () => {
    Scene.scene(
      {
        update: BaseUiAccordionBasicExample.update,
        view: BaseUiAccordionBasicExample.view,
      },
      Scene.with(BaseUiAccordionBasicExample.init()[0]),
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
        Scene.text(
          "Head to the Quick start guide in the docs. If you've used unstyled libraries before, you'll feel at home."
        )
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "false"),
      Scene.click(
        Scene.role("button", { name: "Can I use it for my project?" })
      ),
      Scene.expect(
        Scene.role("button", { name: "Can I use it for my project?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.text("Of course! Base UI is free and open source.")
      ).toExist()
    );
  });
});
