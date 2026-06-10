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
      Scene.expect(Scene.role("button", { name: "Song" })).toExist(),
      Scene.expect(Scene.text("Bold")).not.toExist(),
      Scene.expect(Scene.text("Add to Library")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Song" })),
      Scene.Command.expectHas(FocusItems),
      Scene.Command.resolve(FocusItems, Menu.CompletedFocusItems(), (message) =>
        GotMenuMessage({ message })
      ),
      resolveMenuMounts(),
      Scene.expect(Scene.text("Add to Library")).toExist(),
      Scene.expect(Scene.text("Add to Playlist")).toExist(),
      Scene.expect(Scene.text("Play Next")).toExist(),
      Scene.expect(Scene.text("Play Last")).toExist(),
      Scene.expect(Scene.text("Favorite")).toExist(),
      Scene.expect(Scene.text("Share")).toExist(),
      Scene.click(Scene.testId("menu-backdrop")),
      Scene.Command.expectHas(FocusButton),
      Scene.Command.resolve(
        FocusButton,
        Menu.CompletedFocusButton(),
        (message) => GotMenuMessage({ message })
      ),
      Scene.Mount.expectEnded(Menu.PortalMenuBackdrop, AnchorMenu),
      Scene.expect(Scene.text("Add to Library")).not.toExist()
    );
  });
});
