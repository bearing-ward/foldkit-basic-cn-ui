import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Menu from "../../ui/base-ui-menu";
import * as Example from "./main";
import { GotMenuMessage } from "./main";

const [initialModel] = Example.init();

const AnchorMenu = Menu.AnchorMenu({
  buttonId: "item-dropdown-menu-button",
  anchor: Menu.baseUiMenuDefaultAnchor,
});
const FocusItems = Menu.FocusItems({ id: "item-dropdown-menu" });

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

describe("item-dropdown example", () => {
  test("opens the shadcn Item Dropdown action menu", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(initialModel),
      Scene.expect(Scene.text("Evil Rabbit")).toExist(),
      Scene.click(Scene.role("button", { name: "Open menu" })),
      Scene.Command.expectHas(FocusItems),
      Scene.Command.resolve(FocusItems, Menu.CompletedFocusItems(), (message) =>
        GotMenuMessage({ message })
      ),
      resolveMenuMounts(),
      Scene.expect(Scene.role("menuitem", { name: "Edit" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Duplicate" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Archive" })).toExist()
    );
  });
});
