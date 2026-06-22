import { Array } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Combobox from "./index";

type City = "Kyiv" | "Oxford" | "Quito";

const CityCombobox = Combobox.create<City>();
const comboboxId = "city-combobox";
const cities: readonly City[] = ["Kyiv", "Oxford", "Quito"];
const anchor = Combobox.defaultAnchor;
const [initialModel] = Combobox.init({ id: comboboxId });

const filterCities = (inputValue: string): readonly City[] =>
  inputValue === ""
    ? cities
    : Array.filter(cities, (city) =>
        city.toLowerCase().includes(inputValue.toLowerCase())
      );

const resolveComboboxMounts = () =>
  Scene.Mount.resolveAll(
    [
      Combobox.AnchorCombobox({
        buttonId: `${comboboxId}-input-wrapper`,
        anchor,
      }),
      Combobox.CompletedAnchorCombobox(),
    ],
    [
      Combobox.PortalComboboxBackdrop,
      Combobox.CompletedPortalComboboxBackdrop(),
    ]
  );

const resolvePreventBlurMount = () =>
  Scene.Mount.resolve(
    Combobox.AttachComboboxPreventBlur,
    Combobox.CompletedAttachComboboxPreventBlur()
  );

const viewInputs = (inputValue: string): Combobox.ViewInputs<City> => {
  const h = html<Combobox.Message>();

  return {
    items: filterCities(inputValue),
    itemToConfig: (city) => ({
      classes: Combobox.itemClasses,
      content: h.span([], [city]),
    }),
    itemToValue: (city) => city,
    itemToDisplayText: (city) => city,
    inputAttributes: childAttributes([
      h.Class(Combobox.inputClasses),
      h.Placeholder("Search cities..."),
      h.AriaLabel("City"),
    ]),
    inputWrapperAttributes: childAttributes([
      h.Class(Combobox.inputWrapperClasses),
    ]),
    itemsAttributes: childAttributes([h.Class(Combobox.itemsClasses)]),
    backdropAttributes: childAttributes([
      h.DataAttribute("testid", "combobox-backdrop"),
      h.Class(Combobox.backdropClasses),
    ]),
    attributes: childAttributes([h.Class(Combobox.wrapperClasses)]),
    buttonContent: h.span([], ["v"]),
    buttonAttributes: childAttributes([h.Class(Combobox.buttonClasses)]),
    anchor,
  };
};

const view = (model: Combobox.Model): Html => {
  const h = html<Combobox.Message>();

  return h.submodel({
    slotId: model.id,
    model,
    view: CityCombobox.view,
    viewInputs: viewInputs(model.inputValue),
    toParentMessage: (message) => message,
  });
};

describe("Combobox registry view", () => {
  test("opens filtered items from the input", () => {
    Scene.scene(
      { update: CityCombobox.update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.placeholder("Search cities...")).toExist(),
      Scene.expect(Scene.text("Oxford")).not.toExist(),
      resolvePreventBlurMount(),
      Scene.type(Scene.placeholder("Search cities..."), "o"),
      resolveComboboxMounts(),
      Scene.expect(Scene.text("check")).not.toExist(),
      Scene.expect(Scene.text("Oxford")).toExist(),
      Scene.expect(Scene.text("Quito")).toExist(),
      Scene.expect(Scene.text("Kyiv")).not.toExist()
    );
  });

  test("selects an item and closes the popup", () => {
    Scene.scene(
      { update: CityCombobox.update, view },
      Scene.with(initialModel),
      resolvePreventBlurMount(),
      Scene.type(Scene.placeholder("Search cities..."), "o"),
      resolveComboboxMounts(),
      Scene.click(Scene.text("Oxford")),
      Scene.Command.expectHas(Combobox.FocusInput({ id: comboboxId })),
      Scene.Command.resolve(
        Combobox.FocusInput({ id: comboboxId }),
        Combobox.CompletedFocusInput()
      ),
      Scene.Mount.expectEnded(
        Combobox.PortalComboboxBackdrop,
        Combobox.AnchorCombobox({
          buttonId: `${comboboxId}-input-wrapper`,
          anchor,
        })
      ),
      Scene.expect(Scene.placeholder("Search cities...")).toHaveValue("Oxford"),
      Scene.expect(Scene.text("Quito")).not.toExist()
    );
  });
});
