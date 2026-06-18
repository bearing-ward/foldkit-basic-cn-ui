import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Spinner from "./index";

const view = (): Html => {
  const h = html<never>();

  return h.div([], [Spinner.view()]);
};

describe("Spinner registry view", () => {
  test("renders the upstream loading status affordance", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("status", { name: "Loading" })).toExist()
    );
  });
});
