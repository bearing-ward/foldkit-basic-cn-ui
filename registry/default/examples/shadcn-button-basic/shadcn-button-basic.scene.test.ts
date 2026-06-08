import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnButtonBasicExample from "./main";

describe("shadcn Button Basic example", () => {
  test("increments save feedback", () => {
    Scene.scene(
      {
        update: ShadcnButtonBasicExample.update,
        view: ShadcnButtonBasicExample.view,
      },
      Scene.with(ShadcnButtonBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Save changes" })).toExist(),
      Scene.expect(Scene.text("Saved 0 times")).toExist(),
      Scene.click(Scene.role("button", { name: "Save changes" })),
      Scene.expect(Scene.text("Saved 1 time")).toExist()
    );
  });
});
