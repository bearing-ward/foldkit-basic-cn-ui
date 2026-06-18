import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as NavigationMenu from ".";

const view = (open: boolean) => {
  const h = html<boolean>();

  return NavigationMenu.rootView<boolean>({
    children: [
      NavigationMenu.listView<boolean>({
        children: [
          NavigationMenu.itemView<boolean>({
            children: [
              NavigationMenu.triggerView<boolean>({
                open,
                onToggle: !open,
                children: [h.span([], ["Overview"])],
              }),
            ],
          }),
        ],
      }),
      NavigationMenu.portalView<boolean>({
        open,
        children: [
          NavigationMenu.positionerView<boolean>({
            children: [
              NavigationMenu.popupView<boolean>({
                children: [
                  NavigationMenu.arrowView<boolean>({}),
                  NavigationMenu.viewportView<boolean>({
                    children: [
                      NavigationMenu.contentView<boolean>({
                        children: [h.span([], ["Introduction"])],
                      }),
                    ],
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

describe("Base UI Navigation Menu registry component", () => {
  test("renders controlled trigger and popup anatomy", () => {
    Scene.scene(
      {
        update: (_model: boolean, message: boolean) => [message, []] as const,
        view,
      },
      Scene.with(false),
      Scene.expect(Scene.role("button", { name: "Overview" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Overview" })),
      Scene.expect(Scene.role("button", { name: "Overview" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.text("Introduction")).toExist()
    );
  });

  test("exports Base UI navigation menu class hooks", () => {
    expect(NavigationMenu.navigationMenuRootClassName).toContain("relative");
    expect(NavigationMenu.navigationMenuTriggerClassName).toContain(
      "data-[open]"
    );
    expect(NavigationMenu.navigationMenuPopupClassName).toContain("shadow");
  });
});
