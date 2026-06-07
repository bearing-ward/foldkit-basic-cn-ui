import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Avatar from "./index";

const imageSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%234f46e5'/%3E%3Ctext x='40' y='48' text-anchor='middle' font-size='24' font-family='Arial' fill='white'%3EAL%3C/text%3E%3C/svg%3E";

const view = (): Html => {
  const h = html<never>();

  return h.div(
    [h.Class("space-y-4")],
    [
      Avatar.view({ fallback: "AL", src: imageSrc, alt: "Ada Lovelace" }),
      Avatar.view({ fallback: "GH", size: "Large" }),
      Avatar.rootView({
        children: [Avatar.fallbackView({ children: [h.span([], ["LT"])] })],
      }),
      Avatar.groupView([
        Avatar.view({ fallback: "AL", src: imageSrc, alt: "Ada Lovelace" }),
        Avatar.view({ fallback: "GH" }),
        Avatar.countView({ count: 3 }),
      ]),
    ]
  );
};

describe("Avatar registry view", () => {
  test("renders image, fallback, group, and count affordances", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("img", { name: "Ada Lovelace" })).toExist(),
      Scene.expect(Scene.text("GH")).toExist(),
      Scene.expect(Scene.text("LT")).toExist(),
      Scene.expect(Scene.role("img", { name: "3 more people" })).toExist()
    );
  });
});
