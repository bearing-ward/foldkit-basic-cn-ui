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
        Scene.role("button", { name: "Is it accessible?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.text("Yes. It adheres to the WAI-ARIA design pattern.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Is it styled?" })),
      Scene.expect(Scene.role("button", { name: "Is it styled?" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(
        Scene.text(
          "Yes. It comes with default styles that matches the other components' aesthetic."
        )
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Is it accessible?" })
      ).toHaveAttr("aria-expanded", "false")
    );
  });
});
