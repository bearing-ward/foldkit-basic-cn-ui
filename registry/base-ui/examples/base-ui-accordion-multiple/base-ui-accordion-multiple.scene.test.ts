import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiAccordionMultipleExample from "./main";

describe("Base UI Accordion Multiple example", () => {
  test("matches the Base UI open multiple panels behavior", () => {
    Scene.scene(
      {
        update: BaseUiAccordionMultipleExample.update,
        view: BaseUiAccordionMultipleExample.view,
      },
      Scene.with(BaseUiAccordionMultipleExample.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.click(Scene.role("button", { name: "How do I get started?" })),
      Scene.expect(
        Scene.role("button", { name: "How do I get started?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.click(Scene.role("button", { name: "What is Base UI?" })),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "false"),
      Scene.expect(
        Scene.role("button", { name: "How do I get started?" })
      ).toHaveAttr("aria-expanded", "true")
    );
  });
});
