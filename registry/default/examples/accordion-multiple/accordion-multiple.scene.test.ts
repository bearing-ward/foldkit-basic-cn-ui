import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as AccordionMultipleExample from "./main";

describe("Accordion Multiple example", () => {
  test("matches the Base UI open multiple panels behavior", () => {
    Scene.scene(
      {
        update: AccordionMultipleExample.update,
        view: AccordionMultipleExample.view,
      },
      Scene.with(AccordionMultipleExample.init()[0]),
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
      ).toHaveAttr("aria-expanded", "true")
    );
  });
});
