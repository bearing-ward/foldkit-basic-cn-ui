import { Scene } from "foldkit";
import * as Ui from "@foldkit/ui";
import { describe, test } from "vitest";

import * as Listbox from "../../ui/listbox";
import { GotListboxMessage, init, update, view } from "./main";

const [initialModel] = init();

const AnchorListbox = Listbox.AnchorListbox({
  buttonId: "listbox-animated-button",
  anchor: Listbox.defaultAnchor,
});
const FocusItems = Listbox.FocusItems({ id: "listbox-animated" });
const SettleItemsAnimation = Ui.Animation.WaitForAnimationSettled({
  id: "listbox-animated-listbox",
});

const toAnimationMessage = (message: Ui.Animation.Message) =>
  GotListboxMessage({ message: Listbox.GotAnimationMessage({ message }) });

const resolveListboxMounts = () =>
  Scene.Mount.resolveAll(
    [
      Listbox.PortalListboxBackdrop,
      Listbox.CompletedPortalListboxBackdrop(),
      (message) => GotListboxMessage({ message }),
    ],
    [
      AnchorListbox,
      Listbox.CompletedAnchorListbox(),
      (message) => GotListboxMessage({ message }),
    ]
  );

describe("listbox-animated example", () => {
  test("opens through the animated listbox lifecycle", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("button", { name: "Choose animated person" })
      ).toExist(),
      Scene.expect(Scene.text("Michael Bluth")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Choose animated person" })),
      Scene.Command.expectHas(FocusItems, Ui.Animation.RequestFrame),
      Scene.Command.resolve(
        FocusItems,
        Listbox.CompletedFocusItems(),
        (message) => GotListboxMessage({ message })
      ),
      Scene.Command.resolve(
        Ui.Animation.RequestFrame,
        Ui.Animation.AdvancedAnimationFrame(),
        toAnimationMessage
      ),
      resolveListboxMounts(),
      Scene.Command.resolve(
        SettleItemsAnimation,
        Ui.Animation.EndedAnimation(),
        toAnimationMessage
      ),
      Scene.expect(Scene.text("Michael Bluth")).toExist(),
      Scene.expect(Scene.text("Lindsay Funke")).toExist(),
      Scene.expect(Scene.text("Gob Bluth")).toExist()
    );
  });
});
