import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as ScrollArea from "./index";

const paragraphs = (): readonly Html[] => {
  const h = html<never>();

  return [
    h.p(
      [],
      [
        "Vernacular architecture is building done outside any academic tradition.",
      ]
    ),
    h.p(
      [],
      ["This type of architecture usually serves immediate, local needs."]
    ),
  ];
};

const view = (): Html =>
  ScrollArea.view<never>({
    ariaLabel: "Article excerpt",
    hasFade: true,
    classes: "scroll-area-root-override",
    style: { inlineSize: "22rem" },
    viewportClasses: "scroll-area-viewport-override",
    viewportStyle: { maxBlockSize: "12rem" },
    contentClasses: "scroll-area-content-override",
    contentStyle: { paddingInlineEnd: "0.5rem" },
    children: paragraphs(),
  });

const customView = (): Html =>
  ScrollArea.rootView<never>({
    hasOverflowX: true,
    hasOverflowY: true,
    isScrolling: true,
    children: [
      ScrollArea.viewportView<never>({
        ariaLabel: "Number list",
        children: [
          ScrollArea.contentView<never>({
            children: paragraphs(),
          }),
        ],
      }),
      ScrollArea.scrollbarView<never>({
        children: [
          ScrollArea.thumbView<never>({
            classes: "scroll-area-thumb-override",
          }),
        ],
      }),
      ScrollArea.cornerView<never>({
        classes: "scroll-area-corner-override",
      }),
    ],
  });

describe("Scroll Area registry view", () => {
  test("renders native viewport anatomy and style hooks", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(
        Scene.text(
          "Vernacular architecture is building done outside any academic tradition."
        )
      ).toExist(),
      Scene.expect(
        Scene.text(
          "This type of architecture usually serves immediate, local needs."
        )
      ).toExist(),
      Scene.expect(
        Scene.role("region", { name: "Article excerpt" })
      ).toHaveAttr("tabindex", "0"),
      Scene.expect(
        Scene.role("region", { name: "Article excerpt" })
      ).toHaveClass("scroll-area-viewport-override"),
      Scene.expect(
        Scene.role("region", { name: "Article excerpt" })
      ).toHaveStyle("maxBlockSize", "12rem"),
      Scene.expect(
        Scene.role("region", { name: "Article excerpt" })
      ).toHaveClass("scroll-area-fade")
    );
  });

  test("renders state data attributes and visual scrollbar parts", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view: customView,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("region", { name: "Number list" })).toExist(),
      Scene.expect(Scene.role("region", { name: "Number list" })).toHaveAttr(
        "tabindex",
        "0"
      ),
      Scene.expect(Scene.role("region", { name: "Number list" })).toHaveClass(
        "overflow-auto"
      ),
      Scene.expect(
        Scene.text(
          "Vernacular architecture is building done outside any academic tradition."
        )
      ).toExist()
    );
  });
});
