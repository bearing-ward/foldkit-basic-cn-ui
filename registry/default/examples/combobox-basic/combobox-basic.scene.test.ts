import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Combobox from "../../ui/combobox";
import * as ComboboxBasicExample from "./main";

const toParentMessage = (message: Combobox.Message) =>
  ComboboxBasicExample.GotComboboxMessage({ message });

const resolveComboboxMounts = () =>
  Scene.Mount.resolveAll(
    [
      Combobox.AnchorCombobox({
        buttonId: "combobox-basic-input-wrapper",
        anchor: Combobox.defaultAnchor,
      }),
      Combobox.CompletedAnchorCombobox(),
      toParentMessage,
    ],
    [
      Combobox.PortalComboboxBackdrop,
      Combobox.CompletedPortalComboboxBackdrop(),
      toParentMessage,
    ]
  );

const resolvePreventBlurMount = () =>
  Scene.Mount.resolve(
    Combobox.AttachComboboxPreventBlur,
    Combobox.CompletedAttachComboboxPreventBlur(),
    toParentMessage
  );

describe("Combobox Basic example", () => {
  test("filters cities in the popup", () => {
    Scene.scene(
      {
        update: ComboboxBasicExample.update,
        view: ComboboxBasicExample.view,
      },
      Scene.with(ComboboxBasicExample.init()[0]),
      Scene.expect(Scene.placeholder("Search cities...")).toExist(),
      Scene.expect(Scene.text("Selected city: No city selected")).toExist(),
      resolvePreventBlurMount(),
      Scene.type(Scene.placeholder("Search cities..."), "qui"),
      resolveComboboxMounts(),
      Scene.expect(Scene.text("Quito")).toExist(),
      Scene.expect(Scene.text("Oxford")).not.toExist()
    );
  });
});
