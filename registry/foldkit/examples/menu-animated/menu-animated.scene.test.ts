import { Scene } from "foldkit";
import * as Ui from "@foldkit/ui";
import { describe, test } from "vitest";

import * as Menu from "../../ui/menu";
import { GotMenuMessage, init, update, view } from "./main";

const [initialModel] = init();

const AnchorMenu = Menu.AnchorMenu({
  buttonId: "menu-animated-button",
  anchor: Menu.defaultAnchor,
});
const FocusItems = Menu.FocusItems({ id: "menu-animated" });
const SettleItemsAnimation = Ui.Animation.WaitForAnimationSettled({
  id: "menu-animated-items",
});

const toAnimationMessage = (message: Ui.Animation.Message) =>
  GotMenuMessage({ message: Menu.GotAnimationMessage({ message }) });

const resolveMenuMounts = () =>
  Scene.Mount.resolveAll(
    [
      Menu.PortalMenuBackdrop,
      Menu.CompletedPortalMenuBackdrop(),
      (message) => GotMenuMessage({ message }),
    ],
    [
      AnchorMenu,
      Menu.CompletedAnchorMenu(),
      (message) => GotMenuMessage({ message }),
    ]
  );

describe("menu-animated example", () => {
  test("opens through the animated menu lifecycle", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("button", { name: "Open animated menu" })
      ).toExist(),
      Scene.expect(Scene.text("Edit")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open animated menu" })),
      Scene.Command.expectHas(FocusItems, Ui.Animation.RequestFrame),
      Scene.Command.resolve(FocusItems, Menu.CompletedFocusItems(), (message) =>
        GotMenuMessage({ message })
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
      Scene.expect(Scene.text("Edit")).toExist(),
      Scene.expect(Scene.text("Duplicate")).toExist(),
      Scene.expect(Scene.text("Delete")).toExist()
    );
  });
});
