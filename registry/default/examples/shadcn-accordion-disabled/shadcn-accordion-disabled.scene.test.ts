import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Disabled example", () => {
  test("renders disabled items without click handlers", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "Premium feature information" })
      ).toBeDisabled(),
      Scene.expect(
        Scene.role("button", { name: "Premium feature information" })
      ).not.toHaveHandler("click"),
      Scene.click(
        Scene.role("button", { name: "How do I update my email address?" })
      ),
      Scene.expect(
        Scene.role("button", { name: "How do I update my email address?" })
      ).toHaveAttr("aria-expanded", "true")
    );
  });
});
