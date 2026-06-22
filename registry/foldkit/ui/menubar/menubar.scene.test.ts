import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as Menubar from ".";

const view = () => {
  const h = html<never>();

  return Menubar.rootView<never>({
    children: [
      Menubar.menuView<never>({
        children: [
          Menubar.triggerView<never>({
            open: true,
            children: [h.span([], ["File"])],
          }),
          Menubar.popupView<never>({
            children: [
              Menubar.itemView<never>({
                children: [h.span([], ["New"])],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

describe("Menubar registry component", () => {
  test("renders static menubar anatomy", () => {
    Scene.scene(
      {
        update: (model: undefined) => [model, []] as const,
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("menubar")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "File" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "New" })).toExist()
    );
  });

  test("supports controlled closed popup state", () => {
    const h = html<never>();

    Scene.scene(
      {
        update: (model: undefined) => [model, []] as const,
        view: () =>
          Menubar.rootView<never>({
            children: [
              Menubar.menuView<never>({
                children: [
                  Menubar.triggerView<never>({
                    open: false,
                    children: [h.span([], ["File"])],
                  }),
                  Menubar.popupView<never>({
                    open: false,
                    children: [
                      Menubar.itemView<never>({
                        children: [h.span([], ["New"])],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("menuitem", { name: "File" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.role("menu")).not.toExist()
    );
  });

  test("exports Base UI menubar class hooks", () => {
    expect(Menubar.menubarRootClasses).toContain("inline-flex");
    expect(Menubar.menubarTriggerClasses).toContain("data-[open]");
    expect(Menubar.menubarPopupClasses).toContain("shadow");
  });
});
