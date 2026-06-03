import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Combobox from "../../ui/combobox";
import * as ComboboxMultiExample from "./main";

const toParentMessage = (message: Combobox.Message) =>
  ComboboxMultiExample.GotComboboxMessage({ message });

const resolveComboboxMounts = () =>
  Scene.Mount.resolveAll(
    [
      Combobox.AnchorCombobox({
        buttonId: "combobox-multi-input-wrapper",
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

describe("Combobox Multi example", () => {
  test("filters and toggles city tags", () => {
    Scene.scene(
      {
        update: ComboboxMultiExample.update,
        view: ComboboxMultiExample.view,
      },
      Scene.with(ComboboxMultiExample.init()[0]),
      Scene.expect(Scene.placeholder("Search cities...")).toExist(),
      Scene.expect(Scene.text("No cities selected")).toExist(),
      resolvePreventBlurMount(),
      Scene.type(Scene.placeholder("Search cities..."), "ox"),
      resolveComboboxMounts(),
      Scene.click(Scene.text("Oxford")),
      Scene.expect(Scene.text("Oxford")).toExist()
    );
  });
});
