import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as PreviewCardBasicExample from "../../../base-ui/examples/preview-card-basic/main";

describe("preview-card", () => {
  test("renders trigger and keeps popup closed by default", () => {
    const [model] = PreviewCardBasicExample.init();

    Scene.scene(
      {
        update: PreviewCardBasicExample.update,
        view: PreviewCardBasicExample.view,
      },
      Scene.with(model),
      Scene.expect(Scene.role("button", { name: "Base UI" })).toExist(),
      Scene.expect(Scene.role("dialog")).not.toExist()
    );
  });

  test("opens and closes controlled preview content", () => {
    const [model] = PreviewCardBasicExample.init();

    Scene.scene(
      {
        update: PreviewCardBasicExample.update,
        view: PreviewCardBasicExample.view,
      },
      Scene.with(model),
      Scene.click(Scene.role("button", { name: "Base UI" })),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(Scene.text("@base-ui")).toExist(),
      Scene.click(Scene.role("button", { name: "Close preview card" })),
      Scene.expect(Scene.role("dialog")).not.toExist()
    );
  });
});
