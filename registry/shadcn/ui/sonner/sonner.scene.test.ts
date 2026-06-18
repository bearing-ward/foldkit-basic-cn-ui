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

const flavorView = (): Html =>
  Sonner.viewportView<string>({
    children: [
      Sonner.toastView<string>({
        title: "Success toast",
        variant: "success",
      }),
      Sonner.toastView<string>({
        title: "Info toast",
        variant: "info",
      }),
      Sonner.toastView<string>({
        title: "Warning toast",
        variant: "warning",
      }),
      Sonner.toastView<string>({
        title: "Error toast",
        variant: "error",
      }),
    ],
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

  test("renders status icons for every flavored toast", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view: flavorView,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("img", { name: "Success icon" })).toHaveAttr(
        "data-slot",
        "sonner-icon"
      ),
      Scene.expect(Scene.role("img", { name: "Info icon" })).toHaveAttr(
        "data-slot",
        "sonner-icon"
      ),
      Scene.expect(Scene.role("img", { name: "Warning icon" })).toHaveAttr(
        "data-slot",
        "sonner-icon"
      ),
      Scene.expect(Scene.role("img", { name: "Error icon" })).toHaveAttr(
        "data-slot",
        "sonner-icon"
      )
    );
  });
});
