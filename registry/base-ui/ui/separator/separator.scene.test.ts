import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Separator from "./index";

const view = (): Html => {
  const h = html<never>();

  return h.div([], [h.p([], ["Account"]), Separator.view()]);
};

const verticalView = (): Html => {
  const h = html<never>();

  return h.div(
    [],
    [
      h.div(
        [h.Class("flex items-center gap-3")],
        [
          h.span([], ["Preview"]),
          Separator.view({
            orientation: "vertical",
            classes: "separator-override",
            style: { blockSize: "2rem" },
          }),
          h.span([], ["Code"]),
        ]
      ),
    ]
  );
};

describe("Separator registry view", () => {
  test("renders Base UI horizontal separator attributes", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Account")).toExist(),
      Scene.expect(Scene.role("separator")).toHaveAttr(
        "aria-orientation",
        "horizontal"
      ),
      Scene.expect(Scene.role("separator")).toHaveAttr(
        "data-orientation",
        "horizontal"
      ),
      Scene.expect(Scene.role("separator")).toHaveClass("bg-gray-200")
    );
  });

  test("renders Base UI vertical separator attributes and style hooks", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view: verticalView,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Preview")).toExist(),
      Scene.expect(Scene.role("separator")).toHaveAttr(
        "aria-orientation",
        "vertical"
      ),
      Scene.expect(Scene.role("separator")).toHaveAttr(
        "data-orientation",
        "vertical"
      ),
      Scene.expect(Scene.role("separator")).toHaveClass("separator-override"),
      Scene.expect(Scene.role("separator")).toHaveStyle("blockSize", "2rem")
    );
  });
});
