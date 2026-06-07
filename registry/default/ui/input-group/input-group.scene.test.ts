import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as InputGroup from "./index";

const view = (): Html => {
  const h = html<never>();

  return InputGroup.view({
    children: [
      InputGroup.inputView({
        ariaLabel: "Search",
        placeholder: "Search...",
      }),
      InputGroup.addonView({ children: ["S"] }),
      InputGroup.addonView({
        align: "InlineEnd",
        children: [h.kbd([], ["⌘"]), h.kbd([], ["K"])],
      }),
    ],
  });
};

describe("InputGroup registry view", () => {
  test("renders grouped input, addons, and shortcut content", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("group")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toExist(),
      Scene.expect(Scene.text("⌘")).toExist(),
      Scene.expect(Scene.text("K")).toExist()
    );
  });
});
