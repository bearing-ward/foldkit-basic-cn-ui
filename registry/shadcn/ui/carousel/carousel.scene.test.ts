import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as Carousel from "./index";

describe("Carousel registry view", () => {
  test("renders labelled carousel anatomy", () => {
    const view = (): Html => {
      const h = html<never>();

      return Carousel.rootView<never>({
        ariaLabel: "Featured slides",
        children: [
          Carousel.viewportView<never>({
            children: [
              Carousel.contentView<never>({
                index: 0,
                children: [
                  Carousel.itemView<never>({ children: [h.div([], ["1"])] }),
                  Carousel.itemView<never>({ children: [h.div([], ["2"])] }),
                ],
              }),
            ],
          }),
        ],
      });
    };

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(
        Scene.role("region", { name: "Featured slides" })
      ).toHaveAttr("aria-roledescription", "carousel"),
      Scene.expect(Scene.text("1")).toExist(),
      Scene.expect(Scene.text("2")).toExist()
    );
  });

  test("wraps indices", () => {
    expect(Carousel.nextIndex(4, 5)).toBe(0);
    expect(Carousel.previousIndex(0, 5)).toBe(4);
  });
});
