import { Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { m } from "foldkit/message";
import { describe, expect, test } from "vitest";

import * as Radio from "./index";

const SelectedApple = m("SelectedApple", { value: S.String });
const Message = S.Union([SelectedApple]);
type Message = typeof Message.Type;

const view = (selectedValue: string): Html =>
  Radio.groupView<Message>({
    label: "Best apple",
    labelId: "best-apple-label",
    children: [
      Radio.itemView<Message>({
        value: "fuji-apple",
        selectedValue,
        label: "Fuji",
        onValueChange: SelectedApple({ value: "fuji-apple" }),
      }),
      Radio.itemView<Message>({
        value: "gala-apple",
        selectedValue,
        label: "Gala",
        onValueChange: SelectedApple({ value: "gala-apple" }),
      }),
    ],
  });

describe("Radio registry view", () => {
  test("renders Base UI group and radio checked state", () => {
    Scene.scene(
      {
        update: (_model: string, message: Message): readonly [string, []] => {
          expect(message._tag).toBe("SelectedApple");
          return [message.value, []];
        },
        view,
      },
      Scene.with("fuji-apple"),
      Scene.expect(Scene.role("radiogroup", { name: "Best apple" })).toExist(),
      Scene.expect(Scene.role("radio", { name: "Fuji" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(Scene.role("radio", { name: "Gala" })).toHaveAttr(
        "aria-checked",
        "false"
      ),
      Scene.click(Scene.text("Gala")),
      Scene.expect(Scene.role("radio", { name: "Fuji" })).toHaveAttr(
        "aria-checked",
        "false"
      ),
      Scene.expect(Scene.role("radio", { name: "Gala" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });
});
