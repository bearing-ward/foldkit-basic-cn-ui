import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Listbox from "../../ui/listbox";
import { GotListboxMessage, init, update, view } from "./main";

const [initialModel] = init();

const AnchorListbox = Listbox.AnchorListbox({
  buttonId: "listbox-basic-button",
  anchor: Listbox.defaultAnchor,
});
const FocusItems = Listbox.FocusItems({ id: "listbox-basic" });

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

describe("listbox-basic example", () => {
  test("opens the listbox choices", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Choose person" })).toExist(),
      Scene.expect(Scene.text("Michael Bluth")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Choose person" })),
      Scene.Command.expectHas(FocusItems),
      Scene.Command.resolve(
        FocusItems,
        Listbox.CompletedFocusItems(),
        (message) => GotListboxMessage({ message })
      ),
      resolveListboxMounts(),
      Scene.expect(Scene.text("Michael Bluth")).toExist(),
      Scene.expect(Scene.text("Lindsay Funke")).toExist(),
      Scene.expect(Scene.text("Gob Bluth")).toExist()
    );
  });
});
