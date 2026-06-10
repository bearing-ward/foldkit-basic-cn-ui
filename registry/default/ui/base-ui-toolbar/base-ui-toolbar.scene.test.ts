import { Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { describe, expect, test } from "vitest";

import * as Toolbar from "./index";

const ClickedAlignLeft = m("ClickedAlignLeft");
const UpdatedFont = m("UpdatedFont", { value: S.String });
const Message = S.Union([ClickedAlignLeft, UpdatedFont]);
type Message = typeof Message.Type;

const view = (font: string): Html => {
  const h = html<Message>();

  return Toolbar.rootView<Message>({
    ariaLabel: "Editor toolbar",
    children: [
      Toolbar.groupView<Message>({
        ariaLabel: "Alignment",
        children: [
          Toolbar.buttonView<Message>({
            ariaLabel: "Align left",
            onClick: ClickedAlignLeft(),
            children: [h.span([], ["Align Left"])],
          }),
        ],
      }),
      Toolbar.separatorView<Message>(),
      Toolbar.inputView<Message>({
        ariaLabel: "Font family",
        value: font,
        onInput: (value) => UpdatedFont({ value }),
      }),
      Toolbar.linkView<Message>({
        href: "#edited",
        children: [h.span([], ["Edited 51m ago"])],
      }),
    ],
  });
};

describe("Toolbar registry view", () => {
  test("renders Base UI toolbar parts and routes interaction", () => {
    Scene.scene(
      {
        update: (model: string, message: Message): readonly [string, []] => {
          if (message._tag === "ClickedAlignLeft") {
            return [model, []];
          }
          expect(message._tag).toBe("UpdatedFont");
          return [message.value, []];
        },
        view,
      },
      Scene.with("Helvetica"),
      Scene.expect(Scene.role("toolbar", { name: "Editor toolbar" })).toExist(),
      Scene.expect(Scene.role("group", { name: "Alignment" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Align left" })).toHaveAttr(
        "data-orientation",
        "horizontal"
      ),
      Scene.click(Scene.role("button", { name: "Align left" })),
      Scene.change(Scene.role("textbox", { name: "Font family" }), "Arial"),
      Scene.expect(Scene.role("textbox", { name: "Font family" })).toHaveValue(
        "Arial"
      ),
      Scene.expect(Scene.role("link", { name: "Edited 51m ago" })).toExist()
    );
  });
});
