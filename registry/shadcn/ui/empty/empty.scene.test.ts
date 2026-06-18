import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Empty from "./index";

const view = (): Html =>
  Empty.view({
    title: "No projects yet",
    description: "Create a project to start collecting registry slices.",
    icon: "+",
  });

describe("Empty registry view", () => {
  test("renders the documented static surface", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("No projects yet")).toExist(),
      Scene.expect(
        Scene.text("Create a project to start collecting registry slices.")
      ).toExist()
    );
  });
});
