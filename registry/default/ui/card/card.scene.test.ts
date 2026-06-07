import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Card from "./index";

const view = (): Html => {
  const h = html<never>();

  return Card.view([
    Card.headerView([
      Card.titleView("Project health"),
      Card.descriptionView(
        "Current registry progress and verification status."
      ),
    ]),
    Card.contentView([h.p([], ["Ready"])]),
    Card.footerView([h.span([], ["Public"])]),
  ]);
};

describe("Card registry view", () => {
  test("renders the documented static surface", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Project health")).toExist(),
      Scene.expect(
        Scene.text("Current registry progress and verification status.")
      ).toExist()
    );
  });
});
