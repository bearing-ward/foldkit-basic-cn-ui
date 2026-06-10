import { Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { describe, expect, test } from "vitest";

import * as ToggleGroup from "./index";

const ClickedAlign = m("ClickedAlign", { value: S.String });
const Message = S.Union([ClickedAlign]);
type Message = typeof Message.Type;

const icon = (label: string): Html => {
  const h = html<Message>();

  return h.span([h.Class(ToggleGroup.toggleGroupIconClassName)], [label]);
};

const view = (pressedValues: readonly string[]): Html =>
  ToggleGroup.rootView<Message>({
    ariaLabel: "Text alignment",
    children: [
      ToggleGroup.itemView<Message>({
        value: "left",
        pressedValues,
        ariaLabel: "Align left",
        onPressedChange: ClickedAlign({ value: "left" }),
        children: [icon("L")],
      }),
      ToggleGroup.itemView<Message>({
        value: "center",
        pressedValues,
        ariaLabel: "Align center",
        onPressedChange: ClickedAlign({ value: "center" }),
        children: [icon("C")],
      }),
    ],
  });

describe("Toggle Group registry view", () => {
  test("renders grouped toggle buttons with selected value state", () => {
    Scene.scene(
      {
        update: (
          _model: readonly string[],
          message: Message
        ): readonly [readonly string[], []] => {
          expect(message._tag).toBe("ClickedAlign");
          return [[message.value], []];
        },
        view,
      },
      Scene.with(["left"]),
      Scene.expect(Scene.role("group", { name: "Text alignment" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Align left" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.role("button", { name: "Align center" })).toHaveAttr(
        "aria-pressed",
        "false"
      ),
      Scene.click(Scene.role("button", { name: "Align center" })),
      Scene.expect(Scene.role("button", { name: "Align left" })).toHaveAttr(
        "aria-pressed",
        "false"
      ),
      Scene.expect(Scene.role("button", { name: "Align center" })).toHaveAttr(
        "aria-pressed",
        "true"
      )
    );
  });
});
