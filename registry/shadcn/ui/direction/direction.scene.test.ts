import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Direction from "./index";

describe("Direction registry view", () => {
  test("renders children under a dir attribute", () => {
    const view = (): Html => {
      const h = html<never>();

      return Direction.view<never>({
        direction: "rtl",
        children: [h.p([], ["مرحبا"])],
      });
    };

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("مرحبا")).toExist()
    );
  });
});
