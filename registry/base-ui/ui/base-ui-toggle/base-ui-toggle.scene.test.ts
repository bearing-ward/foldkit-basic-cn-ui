import { Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { describe, expect, test } from "vitest";

import * as Toggle from "./index";

const ClickedFavorite = m("ClickedFavorite");
const Message = S.Union([ClickedFavorite]);
type Message = typeof Message.Type;

const favoriteIcon = (): Html => {
  const h = html<Message>();

  return h.span([h.Class(Toggle.toggleIconClassName)], ["♥"]);
};

const view = (pressed: boolean, disabled = false): Html =>
  Toggle.view<Message>({
    pressed,
    disabled,
    ariaLabel: "Favorite",
    value: "favorite",
    onPressedChange: ClickedFavorite(),
    children: [favoriteIcon()],
  });

describe("Toggle registry view", () => {
  test("renders Base UI pressed button semantics and state hook", () => {
    Scene.scene(
      {
        update: (model: boolean, message: Message): readonly [boolean, []] => {
          expect(message._tag).toBe("ClickedFavorite");
          return [!model, []];
        },
        view,
      },
      Scene.with(true),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toHaveAttr(
        "data-pressed",
        ""
      ),
      Scene.click(Scene.role("button", { name: "Favorite" })),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toHaveAttr(
        "aria-pressed",
        "false"
      ),
      Scene.expect(Scene.role("button", { name: "Favorite" })).not.toHaveAttr(
        "data-pressed"
      )
    );
  });

  test("renders disabled state without click behavior", () => {
    Scene.scene(
      {
        update: (model: boolean): readonly [boolean, []] => [model, []],
        view: (pressed) => view(pressed, true),
      },
      Scene.with(false),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toBeDisabled(),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toHaveAttr(
        "aria-pressed",
        "false"
      )
    );
  });
});
