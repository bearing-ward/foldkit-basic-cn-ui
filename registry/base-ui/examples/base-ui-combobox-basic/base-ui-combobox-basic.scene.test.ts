import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Combobox from "../../../foldkit/ui/combobox";
import * as BaseUiComboboxBasicExample from "./main";

const toParentMessage = (message: Combobox.Message) =>
  BaseUiComboboxBasicExample.GotComboboxMessage({ message });

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

describe("Base UI combobox Basic example", () => {
  test("filters fruits in the popup", () => {
    Scene.scene(
      {
        update: BaseUiComboboxBasicExample.update,
        view: BaseUiComboboxBasicExample.view,
      },
      Scene.with(BaseUiComboboxBasicExample.init()[0]),
      Scene.expect(Scene.text("Choose a fruit")).toExist(),
      Scene.expect(Scene.placeholder("e.g. Apple")).toExist(),
      Scene.expect(
        Scene.text("Selected fruit: No fruit selected")
      ).not.toExist(),
      resolvePreventBlurMount(),
      Scene.type(Scene.placeholder("e.g. Apple"), "ap"),
      resolveComboboxMounts(),
      Scene.expect(Scene.text("Apple")).toExist(),
      Scene.expect(Scene.text("Pineapple")).toExist(),
      Scene.expect(Scene.text("Papaya")).toExist(),
      Scene.expect(Scene.text("Grape")).toExist(),
      Scene.expect(Scene.text("Grapefruit")).toExist(),
      Scene.expect(Scene.text("Banana")).not.toExist()
    );
  });

  test("matches the origin clear button and empty state affordances", () => {
    Scene.scene(
      {
        update: BaseUiComboboxBasicExample.update,
        view: BaseUiComboboxBasicExample.view,
      },
      Scene.with(BaseUiComboboxBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Clear selection" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open popup" })).toExist(),
      resolvePreventBlurMount(),
      Scene.type(Scene.placeholder("e.g. Apple"), "ap"),
      resolveComboboxMounts(),
      Scene.expect(Scene.placeholder("e.g. Apple")).toHaveValue("ap"),
      Scene.click(Scene.role("button", { name: "Clear selection" })),
      Scene.expect(Scene.placeholder("e.g. Apple")).toHaveValue(""),
      Scene.type(Scene.placeholder("e.g. Apple"), "zzz"),
      Scene.Mount.expectEnded(
        Combobox.PortalComboboxBackdrop,
        Combobox.AnchorCombobox({
          buttonId: "combobox-basic-input-wrapper",
          anchor: Combobox.defaultAnchor,
        })
      ),
      Scene.expect(Scene.text("No fruits found.")).toExist()
    );
  });
});
