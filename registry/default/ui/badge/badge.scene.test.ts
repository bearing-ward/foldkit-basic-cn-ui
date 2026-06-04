import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Badge from "./index";

const view = (): Html => {
  const h = html<never>();

  return h.div(
    [h.Class("flex flex-wrap gap-2")],
    [
      Badge.view({ label: "Default" }),
      Badge.view({ label: "Secondary", variant: "Secondary" }),
      Badge.view({ label: "Destructive", variant: "Destructive" }),
      Badge.view({ label: "Outline", variant: "Outline" }),
    ]
  );
};

describe("Badge registry view", () => {
  test("renders every documented variant", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Default")).toExist(),
      Scene.expect(Scene.text("Secondary")).toExist(),
      Scene.expect(Scene.text("Destructive")).toExist(),
      Scene.expect(Scene.text("Outline")).toExist()
    );
  });
});
