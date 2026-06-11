import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnProgressBasicExample from "./main";

describe("Shadcn Progress Basic example", () => {
  test("matches the shadcn progress demo settled state", () => {
    Scene.scene(
      {
        update: ShadcnProgressBasicExample.update,
        view: ShadcnProgressBasicExample.view,
      },
      Scene.with(ShadcnProgressBasicExample.init()[0]),
      Scene.expect(
        Scene.role("progressbar")
      ).toHaveAttr("aria-valuenow", "66"),
      Scene.expect(
        Scene.role("progressbar")
      ).toHaveAttr("aria-valuemin", "0"),
      Scene.expect(
        Scene.role("progressbar")
      ).toHaveAttr("aria-valuemax", "100"),
      Scene.expect(
        Scene.role("progressbar")
      ).toHaveAttr("aria-valuetext", "66%"),
      Scene.expect(
        Scene.role("progressbar")
      ).toHaveAttr("data-progressing", ""),
      Scene.expect(Scene.role("progressbar")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("Export data")).not.toExist()
    );
  });
});
