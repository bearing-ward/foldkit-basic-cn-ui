import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Sheet from "./index";

const view = (open: boolean): Html => {
  const h = html<string>();

  return Sheet.rootView<string>({
    children: [
      Sheet.triggerView<string>({
        onOpen: "open",
        children: [h.span([], ["Open"])],
      }),
      Sheet.portalView<string>({
        open,
        children: [
          Sheet.overlayView<string>({}),
          Sheet.contentView<string>({
            ariaDescribedBy: "sheet-description",
            ariaLabelledBy: "sheet-title",
            children: [
              Sheet.headerView<string>({
                children: [
                  Sheet.titleView<string>({
                    id: "sheet-title",
                    label: "Edit profile",
                  }),
                  Sheet.descriptionView<string>({
                    id: "sheet-description",
                    label: "Make changes to your profile.",
                  }),
                ],
              }),
              Sheet.closeView<string>({
                onClose: "close",
                children: [h.span([], ["x"])],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

describe("Sheet registry view", () => {
  test("renders controlled dialog content", () => {
    Scene.scene(
      {
        update: (model: boolean): readonly [boolean, []] => [model, []],
        view,
      },
      Scene.with(true),
      Scene.expect(Scene.role("dialog")).toHaveAttr("aria-modal", "true"),
      Scene.expect(Scene.role("dialog")).toHaveAttr(
        "aria-labelledby",
        "sheet-title"
      ),
      Scene.expect(Scene.role("dialog")).toHaveAttr(
        "aria-describedby",
        "sheet-description"
      ),
      Scene.expect(Scene.text("Edit profile")).toExist(),
      Scene.expect(Scene.role("button", { name: "Close sheet" })).toExist()
    );
  });
});
