import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Combobox from "../../ui/combobox";
import * as ShadcnComboboxBasicExample from "./main";

const toParentMessage = (message: Combobox.Message) =>
  ShadcnComboboxBasicExample.GotComboboxMessage({ message });

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

describe("Shadcn Combobox Basic example", () => {
  test("filters the shadcn framework options", () => {
    Scene.scene(
      {
        update: ShadcnComboboxBasicExample.update,
        view: ShadcnComboboxBasicExample.view,
      },
      Scene.with(ShadcnComboboxBasicExample.init()[0]),
      Scene.expect(Scene.placeholder("Select framework...")).toExist(),
      resolvePreventBlurMount(),
      Scene.type(Scene.placeholder("Select framework..."), "sv"),
      resolveComboboxMounts(),
      Scene.expect(Scene.text("SvelteKit")).toExist(),
      Scene.expect(Scene.text("Next.js")).toExist(),
      Scene.expect(Scene.text("Multiple")).toExist(),
      Scene.expect(Scene.text("Clear Button")).toExist(),
      Scene.expect(Scene.role("button", { name: "Clear selection" })).toExist(),
      Scene.expect(Scene.text("Groups")).toExist(),
      Scene.expect(Scene.text("Frontend")).toExist(),
      Scene.expect(Scene.text("Custom Items")).toExist(),
      Scene.expect(Scene.text("The React framework for production")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Invalid framework" }))
        .toHaveAttr("aria-invalid", "true"),
      Scene.expect(
        Scene.role("textbox", { name: "Disabled framework" })
      ).toBeDisabled(),
      Scene.expect(Scene.text("Auto Highlight")).toExist(),
      Scene.expect(Scene.text("Popup")).toExist(),
      Scene.expect(Scene.role("button", { name: "Open popup" })).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Framework input group" })
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "إطار العمل" })).toExist()
    );
  });
});
