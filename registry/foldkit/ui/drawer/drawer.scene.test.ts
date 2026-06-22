import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as Drawer from ".";

const view = (open: boolean) => {
  const h = html<boolean>();

  return Drawer.rootView<boolean>({
    children: [
      Drawer.triggerView({
        onClick: true,
        children: [h.span([], ["Open drawer"])],
      }),
      Drawer.portalView({
        open,
        children: [
          Drawer.backdropView({ children: [] }),
          Drawer.viewportView({
            children: [
              Drawer.popupView({
                titleId: "title",
                descriptionId: "description",
                children: [
                  Drawer.titleView({
                    id: "title",
                    children: [h.span([], ["Drawer"])],
                  }),
                  Drawer.descriptionView({
                    id: "description",
                    children: [h.span([], ["Drawer description"])],
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

describe("Drawer registry component", () => {
  test("opens an aria-labelled dialog drawer", () => {
    Scene.scene(
      {
        update: (_model: boolean, message: boolean) => [message, []] as const,
        view,
      },
      Scene.with(false),
      Scene.expect(Scene.role("dialog", { name: "Drawer" })).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open drawer" })),
      Scene.expect(Scene.role("dialog", { name: "Drawer" })).toHaveAttr(
        "aria-describedby",
        "description"
      )
    );
  });

  test("exports Base UI drawer class hooks", () => {
    expect(Drawer.drawerPopupClasses).toContain("shadow");
    expect(Drawer.drawerViewportClasses).toContain("justify-end");
  });
});
