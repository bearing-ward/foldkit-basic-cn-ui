import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, test } from "vitest";

import * as AspectRatio from "./index";

describe("AspectRatio registry view", () => {
  test("renders fixed-ratio image content and data attributes", () => {
    const view = (): Html =>
      AspectRatio.view<never>({
        ratio: 16 / 9,
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E",
        alt: "Photo",
        caption: "Beautiful landscape",
      });

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("img", { name: "Photo" })).toExist(),
      Scene.expect(Scene.text("Beautiful landscape")).toExist(),
      Scene.expect(Scene.role("img", { name: "Photo" })).toHaveClass(
        "object-cover"
      ),
      Scene.expect(Scene.text("Beautiful landscape")).not.toHaveHandler("click")
    );
  });

  test("composes caller-owned content with custom ratio style", () => {
    const view = (): Html =>
      AspectRatio.rootView<never>({
        ratio: 1,
        children: [
          AspectRatio.captionView<never>({ children: ["Square image"] }),
        ],
      });

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Square image")).toExist(),
      Scene.expect(Scene.text("Square image")).not.toHaveHandler("click")
    );
  });
});
