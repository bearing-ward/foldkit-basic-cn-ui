import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as ContextMenu from ".";

const view = (open: boolean) => {
  const h = html<boolean>();

  return ContextMenu.rootView<boolean>({
    children: [
      ContextMenu.triggerView({
        onOpen: true,
        children: [h.span([], ["Right click here"])],
      }),
      ContextMenu.portalView({
        open,
        children: [
          ContextMenu.backdropView({ onClose: false }),
          ContextMenu.positionerView({
            children: [
              ContextMenu.popupView({
                children: [
                  ContextMenu.itemView({
                    onSelect: false,
                    children: [h.span([], ["Add to Library"])],
                  }),
                  ContextMenu.separatorView({}),
                  ContextMenu.itemView({
                    onSelect: false,
                    disabled: true,
                    children: [h.span([], ["Disabled item"])],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

describe("Context Menu registry component", () => {
  test("opens a menu from the context-menu trigger", () => {
    Scene.scene(
      {
        update: (_model: boolean, message: boolean) => [message, []] as const,
        view,
      },
      Scene.with(false),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Right click here" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Add to Library" })).toExist()
    );
  });

  test("exports Base UI context menu class hooks", () => {
    expect(ContextMenu.contextMenuTriggerClasses).toContain("border-dashed");
    expect(ContextMenu.contextMenuBackdropClasses).toContain("fixed");
    expect(ContextMenu.contextMenuPopupClasses).toContain("shadow");
    expect(ContextMenu.contextMenuSeparatorClasses).toContain("bg-gray-200");
  });
});
