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
          Typography.h3("Details"),
          Typography.h4("Fine print"),
          Typography.p("Reusable text helpers."),
          Typography.blockquote("A useful quotation."),
          Typography.table(["Name", "Value"], [["Status", "Ready"]]),
          Typography.inlineCode("className"),
          Typography.lead("Lead copy."),
          Typography.large("Large copy."),
          Typography.small("Small copy."),
          Typography.muted("Muted copy."),
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
      Scene.expect(Scene.text("Principles")).toExist(),
      Scene.expect(Scene.text("Fine print")).toExist(),
      Scene.expect(Scene.text("Status")).toExist(),
      Scene.expect(Scene.text("Muted copy.")).toExist()
    );
  });
});
