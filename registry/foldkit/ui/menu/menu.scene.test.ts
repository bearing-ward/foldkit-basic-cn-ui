import { Scene, Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Menu from "./index";

type Action = "Edit" | "Duplicate" | "Delete";

const ActionMenu = Menu.create<Action>();
const menuId = "account-menu";
const actions: readonly Action[] = ["Edit", "Duplicate", "Delete"];
const anchor = Menu.defaultAnchor;

const [initialModel] = Menu.init({ id: menuId });
const [animatedModel] = Menu.init({ id: menuId, isAnimated: true });

const AnchorAccountMenu = Menu.AnchorMenu({
  buttonId: `${menuId}-button`,
  anchor,
});
const SettleItemsAnimation = Ui.Animation.WaitForAnimationSettled({
  id: `${menuId}-items`,
});

const toAnimationMessage = (message: Ui.Animation.Message) =>
  Menu.GotAnimationMessage({ message });

const resolveMenuMounts = () =>
  Scene.Mount.resolveAll(
    [Menu.PortalMenuBackdrop, Menu.CompletedPortalMenuBackdrop()],
    [AnchorAccountMenu, Menu.CompletedAnchorMenu()]
  );

const view = (model: Menu.Model): Html => {
  const h = html<Menu.Message>();

  return h.submodel({
    slotId: model.id,
    model,
    view: ActionMenu.view,
    viewInputs: {
      anchor,
      items: actions,
      itemToConfig: (item) => ({
        classes: Menu.itemClasses,
        content: h.span([], [item]),
      }),
      buttonContent: h.span([], ["Open actions"]),
      buttonAttributes: childAttributes([h.Class(Menu.triggerClasses)]),
      itemsAttributes: childAttributes([h.Class(Menu.defaultItemsClasses)]),
      backdropAttributes: childAttributes([
        h.DataAttribute("testid", "menu-backdrop"),
        h.Class(Menu.backdropClasses),
      ]),
      attributes: childAttributes([h.Class(Menu.rootClasses)]),
    },
    toParentMessage: (message) => message,
  });
};

const animatedView = (model: Menu.Model): Html => {
  const h = html<Menu.Message>();

  return h.submodel({
    slotId: model.id,
    model,
    view: ActionMenu.view,
    viewInputs: {
      anchor,
      items: actions,
      itemToConfig: (item) => ({
        classes: Menu.itemClasses,
        content: h.span([], [item]),
      }),
      buttonContent: h.span([], ["Open animated actions"]),
      buttonAttributes: childAttributes([h.Class(Menu.triggerClasses)]),
      itemsAttributes: childAttributes([h.Class(Menu.animatedItemsClasses)]),
      backdropAttributes: childAttributes([
        h.DataAttribute("testid", "menu-backdrop"),
        h.Class(Menu.backdropClasses),
      ]),
      attributes: childAttributes([h.Class(Menu.rootClasses)]),
    },
    toParentMessage: (message) => message,
  });
};

describe("Menu registry view", () => {
  test("opens menu items from the trigger", () => {
    Scene.scene(
      { update: ActionMenu.update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Open actions" })).toExist(),
      Scene.expect(Scene.text("Edit")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open actions" })),
      Scene.Command.expectHas(Menu.FocusItems({ id: menuId })),
      Scene.Command.resolve(
        Menu.FocusItems({ id: menuId }),
        Menu.CompletedFocusItems()
      ),
      resolveMenuMounts(),
      Scene.expect(Scene.text("Edit")).toExist(),
      Scene.expect(Scene.text("Duplicate")).toExist(),
      Scene.expect(Scene.text("Delete")).toExist()
    );
  });

  test("closes through the backdrop", () => {
    Scene.scene(
      { update: ActionMenu.update, view },
      Scene.with(initialModel),
      Scene.click(Scene.role("button", { name: "Open actions" })),
      Scene.Command.resolve(
        Menu.FocusItems({ id: menuId }),
        Menu.CompletedFocusItems()
      ),
      resolveMenuMounts(),
      Scene.click(Scene.testId("menu-backdrop")),
      Scene.Command.expectHas(Menu.FocusButton({ id: menuId })),
      Scene.Command.resolve(
        Menu.FocusButton({ id: menuId }),
        Menu.CompletedFocusButton()
      ),
      Scene.Mount.expectEnded(Menu.PortalMenuBackdrop, AnchorAccountMenu),
      Scene.expect(Scene.text("Edit")).not.toExist()
    );
  });

  test("animated menu keeps items visible after animation settles", () => {
    Scene.scene(
      { update: ActionMenu.update, view: animatedView },
      Scene.with(animatedModel),
      Scene.click(Scene.role("button", { name: "Open animated actions" })),
      Scene.Command.expectHas(
        Menu.FocusItems({ id: menuId }),
        Ui.Animation.RequestFrame
      ),
      Scene.Command.resolve(
        Menu.FocusItems({ id: menuId }),
        Menu.CompletedFocusItems()
      ),
      Scene.Command.resolve(
        Ui.Animation.RequestFrame,
        Ui.Animation.AdvancedAnimationFrame(),
        toAnimationMessage
      ),
      resolveMenuMounts(),
      Scene.Command.resolve(
        SettleItemsAnimation,
        Ui.Animation.EndedAnimation(),
        toAnimationMessage
      ),
      Scene.expect(Scene.text("Edit")).toExist()
    );
  });
});
