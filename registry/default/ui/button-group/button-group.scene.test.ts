import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as ButtonGroup from "./index";

describe("ButtonGroup registry view", () => {
  test("renders a labelled horizontal group", () => {
    const view = (): Html => {
      const h = html<never>();

      return ButtonGroup.view<never>({
        ariaLabel: "Report actions",
        children: [
          ButtonGroup.itemView<never>({
            children: [h.button([], ["Archive Report"])],
          }),
          ButtonGroup.itemView<never>({
            children: [h.button([], ["Snooze"])],
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
      Scene.expect(Scene.role("group", { name: "Report actions" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Archive Report" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Snooze" })).toExist()
    );
  });

  test("renders vertical orientation and inert separators", () => {
    const view = (): Html => {
      const h = html<never>();

      return ButtonGroup.view<never>({
        orientation: "vertical",
        ariaLabel: "Vertical actions",
        children: [
          ButtonGroup.itemView<never>({ children: [h.button([], ["Plus"])] }),
          ButtonGroup.separatorView<never>({ orientation: "vertical" }),
          ButtonGroup.itemView<never>({ children: [h.button([], ["Minus"])] }),
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
        Scene.role("group", { name: "Vertical actions" })
      ).toHaveAttr("data-orientation", "vertical"),
      Scene.expect(Scene.role("separator")).toHaveAttr("aria-hidden", "true")
    );
  });
});
