import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Typography from "./index";

const view = (): Html => {
  const h = html<never>();

  return h.div(
    [],
    [
      Typography.h1("Component registry"),
      Typography.h2("Principles"),
      Typography.p("Reusable text helpers."),
      Typography.inlineCode("className"),
    ]
  );
};

describe("Typography registry view", () => {
  test("renders the documented static surface", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Component registry")).toExist(),
      Scene.expect(Scene.text("Principles")).toExist()
    );
  });
});
