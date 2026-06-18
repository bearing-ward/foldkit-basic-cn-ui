import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Menu from "../../ui/menu";
import { GotMenuMessage, init, update, view } from "./main";

const [initialModel] = init();

const AnchorMenu = Menu.AnchorMenu({
  buttonId: "menu-basic-button",
  anchor: Menu.defaultAnchor,
});
const FocusItems = Menu.FocusItems({ id: "menu-basic" });
const FocusButton = Menu.FocusButton({ id: "menu-basic" });

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

describe("menu-basic example", () => {
  test("opens items and closes through the backdrop", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Open menu" })).toExist(),
      Scene.expect(Scene.text("Edit")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open menu" })),
      Scene.Command.expectHas(FocusItems),
      Scene.Command.resolve(FocusItems, Menu.CompletedFocusItems(), (message) =>
        GotMenuMessage({ message })
      ),
      resolveMenuMounts(),
      Scene.expect(Scene.text("Edit")).toExist(),
      Scene.expect(Scene.text("Duplicate")).toExist(),
      Scene.expect(Scene.text("Delete")).toExist(),
      Scene.click(Scene.testId("menu-backdrop")),
      Scene.Command.expectHas(FocusButton),
      Scene.Command.resolve(
        FocusButton,
        Menu.CompletedFocusButton(),
        (message) => GotMenuMessage({ message })
      ),
      Scene.Mount.expectEnded(Menu.PortalMenuBackdrop, AnchorMenu),
      Scene.expect(Scene.text("Edit")).not.toExist()
    );
  });
});
