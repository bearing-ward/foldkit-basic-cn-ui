import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Sonner from "./index";

const view = (show: boolean): Html =>
  Sonner.viewportView<string>({
    children: show
      ? [
          Sonner.toastView<string>({
            title: "Event has been created",
            description: "Sunday, December 03, 2023 at 9:00 AM",
            onClose: "close",
          }),
        ]
      : [],
  });

describe("Sonner registry view", () => {
  test("renders an aria-live toast stack", () => {
    Scene.scene(
      {
        update: (model: boolean): readonly [boolean, []] => [model, []],
        view,
      },
      Scene.with(true),
      Scene.expect(Scene.text("Event has been created")).toExist(),
      Scene.expect(Scene.role("status")).toExist(),
      Scene.expect(Scene.role("button", { name: "Dismiss toast" })).toExist()
    );
  });
});
