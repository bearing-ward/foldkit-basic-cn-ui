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
      ).toHaveAttr("aria-valuenow", "33"),
      Scene.expect(
        Scene.role("progressbar")
      ).toHaveAttr("aria-valuemin", "0"),
      Scene.expect(
        Scene.role("progressbar")
      ).toHaveAttr("aria-valuemax", "100"),
      Scene.expect(
        Scene.role("progressbar")
      ).toHaveAttr("aria-valuetext", "33%"),
      Scene.expect(
        Scene.role("progressbar")
      ).toHaveAttr("data-progressing", ""),
      Scene.expect(Scene.role("progressbar")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("Upload progress")).toExist(),
      Scene.expect(Scene.text("Controlled")).toExist(),
      Scene.expect(Scene.text("تقدم الرفع")).toExist(),
      Scene.expect(Scene.text("66%")).toExist(),
      Scene.click(Scene.role("button", { name: "Advance progress" })),
      Scene.expect(Scene.text("58%")).toExist(),
      Scene.expect(Scene.text("Export data")).not.toExist()
    );
  });
});
