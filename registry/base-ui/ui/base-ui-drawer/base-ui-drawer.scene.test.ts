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
                testId: "drawer-popup",
                onKeyDown: () => true,
                onPointerDown: () => true,
                onPointerMove: () => true,
                onPointerUp: () => true,
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

describe("Base UI Drawer registry component", () => {
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
      ),
      Scene.expect(Scene.testId("drawer-popup")).toHaveAttr("tabindex", "-1"),
      Scene.expect(Scene.testId("drawer-popup")).toHaveHandler("keydown"),
      Scene.expect(Scene.testId("drawer-popup")).toHaveHandler("pointerdown"),
      Scene.expect(Scene.testId("drawer-popup")).toHaveHandler("pointermove"),
      Scene.expect(Scene.testId("drawer-popup")).toHaveHandler("pointerup")
    );
  });

  test("exports Base UI drawer class hooks", () => {
    expect(Drawer.drawerPopupClasses).toContain("shadow");
    expect(Drawer.drawerViewportClasses).toContain("justify-end");
  });
});
