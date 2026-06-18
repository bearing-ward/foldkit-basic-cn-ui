import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Skeleton from "./index";

const view = (): Html => {
  const h = html<never>();

  return h.div(
    [],
    [
      h.span([], ["Loading placeholder"]),
      Skeleton.view({ shape: "Avatar" }),
      Skeleton.view({ shape: "Text" }),
      Skeleton.view({ shape: "Button" }),
      Skeleton.view({ shape: "Block" }),
    ]
  );
};

describe("Skeleton registry view", () => {
  test("renders the documented static surface", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Loading placeholder")).toExist()
    );
  });
});
