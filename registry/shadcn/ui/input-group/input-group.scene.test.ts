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
        children: [
          h.kbd([], ["⌘"]),
          h.kbd([], ["K"]),
          InputGroup.buttonView({
            ariaLabel: "Search",
            children: ["Go"],
          }),
        ],
      }),
    ],
  });
};

const textareaView = (): Html =>
  InputGroup.view({
    children: [
      InputGroup.textareaView({
        ariaLabel: "Message",
        placeholder: "Type a message...",
        value: "Draft",
      }),
      InputGroup.addonView({
        align: "BlockEnd",
        children: [InputGroup.buttonView({ children: ["Send"] })],
      }),
    ],
  });

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
      Scene.expect(Scene.role("button", { name: "Search" })).toExist(),
      Scene.expect(Scene.text("⌘")).toExist(),
      Scene.expect(Scene.text("K")).toExist()
    );
  });

  test("renders textarea controls and input group buttons", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view: textareaView,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("textbox", { name: "Message" })).toHaveValue(
        "Draft"
      ),
      Scene.expect(Scene.role("button", { name: "Send" })).toExist()
    );
  });
});
