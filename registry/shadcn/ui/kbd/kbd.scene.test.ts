import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Kbd from "./index";

const view = (): Html => {
  const h = html<never>();

  return Kbd.groupView([
    Kbd.view({ label: "Cmd" }),
    h.span([], ["+"]),
    Kbd.view({ label: "K" }),
  ]);
};

describe("Kbd registry view", () => {
  test("renders the documented static surface", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Cmd")).toExist(),
      Scene.expect(Scene.text("K")).toExist()
    );
  });
});
