import { Option } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Resizable from "./index";

type Message = Readonly<{ readonly _tag: "PressedHandle" }>;

const view = (): Html => {
  const h = html<Message>();

  return Resizable.panelGroupView<Message>({
    children: [
      Resizable.panelView<Message>({ size: 30, children: ["Sidebar"] }),
      Resizable.handleView<Message>({
        attributes: [
          h.OnPointerDown(() => Option.some({ _tag: "PressedHandle" })),
        ],
      }),
      Resizable.panelView<Message>({ size: 70, children: ["Content"] }),
    ],
  });
};

describe("Resizable registry view", () => {
  test("renders controlled panel anatomy with opt-in handle behavior", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Sidebar")).toHaveAttr("data-size", "30"),
      Scene.expect(Scene.text("Content")).toHaveAttr("data-size", "70"),
      Scene.expect(
        Scene.role("separator", { name: "Resize panels" })
      ).toExist(),
      Scene.expect(
        Scene.role("separator", { name: "Resize panels" })
      ).toHaveHandler("pointerdown")
    );
  });
});
