import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnProgressBasicExample from "./main";

describe("Shadcn Progress Basic example", () => {
  test("matches the Base UI progress hero example content", () => {
    Scene.scene(
      {
        update: ShadcnProgressBasicExample.update,
        view: ShadcnProgressBasicExample.view,
      },
      Scene.with(ShadcnProgressBasicExample.init()[0]),
      Scene.expect(Scene.text("Export data")).toExist(),
      Scene.expect(Scene.text("20%")).toExist(),
      Scene.expect(
        Scene.role("progressbar", { name: "Export data" })
      ).toHaveAttr("aria-valuenow", "20"),
      Scene.expect(
        Scene.role("progressbar", { name: "Export data" })
      ).toHaveAttr("aria-valuemin", "0"),
      Scene.expect(
        Scene.role("progressbar", { name: "Export data" })
      ).toHaveAttr("aria-valuemax", "100"),
      Scene.expect(
        Scene.role("progressbar", { name: "Export data" })
      ).toHaveAttr("aria-valuetext", "20%"),
      Scene.expect(
        Scene.role("progressbar", { name: "Export data" })
      ).toHaveAttr("data-progressing", ""),
      Scene.expect(Scene.text("Export data")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("20%")).not.toHaveHandler("click")
    );
  });
});
