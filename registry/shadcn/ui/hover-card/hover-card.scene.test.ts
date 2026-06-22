import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as HoverCard from "./index";

const view = (open: boolean): Html => {
  const h = html<string>();

  return HoverCard.rootView<string>({
    children: [
      HoverCard.triggerView<string>({
        open,
        onOpen: "open",
        children: [h.span([], ["@foldkit"])],
      }),
      HoverCard.portalView<string>({
        open,
        children: [
          HoverCard.backdropView<string>({ onClose: "close" }),
          HoverCard.positionerView<string>({
            children: [
              HoverCard.popupView<string>({
                children: [
                  h.div([h.Class(HoverCard.hoverCardAvatarClasses)], ["FK"]),
                  h.h3(
                    [h.Class(HoverCard.hoverCardTitleClasses)],
                    ["@foldkit"]
                  ),
                  h.p(
                    [h.Class(HoverCard.hoverCardDescriptionClasses)],
                    ["A toolkit for Elm-style Effect applications."]
                  ),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

describe("Hover Card registry view", () => {
  test("renders trigger and closed state", () => {
    Scene.scene(
      {
        update: (model: boolean): readonly [boolean, []] => [model, []],
        view,
      },
      Scene.with(false),
      Scene.expect(Scene.role("button", { name: "@foldkit" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.role("dialog")).toBeAbsent()
    );
  });

  test("renders controlled popup content", () => {
    Scene.scene(
      {
        update: (model: boolean): readonly [boolean, []] => [model, []],
        view,
      },
      Scene.with(true),
      Scene.expect(Scene.role("button", { name: "@foldkit" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(
        Scene.text("A toolkit for Elm-style Effect applications.")
      ).toExist()
    );
  });
});
