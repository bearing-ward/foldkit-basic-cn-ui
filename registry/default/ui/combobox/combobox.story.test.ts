import { Option } from "effect";
import { describe, expect, test } from "vitest";

import * as Combobox from "./index";

type City = "Kyiv" | "Oxford" | "Quito";

const CityCombobox = Combobox.create<City>();
const CityMultiCombobox = Combobox.Multi.create<City>();
const comboboxId = "city-combobox";

const initModel = (): Combobox.Model => Combobox.init({ id: comboboxId })[0];

const expectSelectedOutMessage = (
  maybeOutMessage: Option.Option<Combobox.OutMessage<City>>,
  value: City,
  wasAdded: boolean
) => {
  expect(Option.isSome(maybeOutMessage)).toBe(true);

  if (Option.isSome(maybeOutMessage)) {
    expect(maybeOutMessage.value).toEqual(
      Combobox.Selected({ value, wasAdded })
    );
  }
};

describe("Combobox registry component", () => {
  describe(Combobox.init, () => {
    test("returns a model with no startup commands", () => {
      const [model, commands] = Combobox.init({ id: comboboxId });

      expect(model.id).toBe(comboboxId);
      expect(model.isOpen).toBe(false);
      expect(model.inputValue).toBe("");
      expect(model.isAnimated).toBe(false);
      expect(model.isModal).toBe(false);
      expect(model.nullable).toBe(false);
      expect(model.immediate).toBe(false);
      expect(Option.isNone(model.maybeSelectedItem)).toBe(true);
      expect(commands).toEqual([]);
    });

    test("preserves selected item, display text, and behavior config", () => {
      const [model, commands] = Combobox.init({
        id: comboboxId,
        selectedItem: "Kyiv",
        selectedDisplayText: "Kyiv",
        isAnimated: true,
        isModal: true,
        nullable: true,
        immediate: true,
        selectInputOnFocus: true,
      });

      expect(model.isAnimated).toBe(true);
      expect(model.isModal).toBe(true);
      expect(model.nullable).toBe(true);
      expect(model.immediate).toBe(true);
      expect(model.selectInputOnFocus).toBe(true);
      expect(model.inputValue).toBe("");
      expect(model.maybeSelectedItem).toEqual(Option.some("Kyiv"));
      expect(model.maybeSelectedDisplayText).toEqual(Option.some("Kyiv"));
      expect(commands).toEqual([]);
    });
  });

  describe("helper API", () => {
    test("open delegates to Opened behavior", () => {
      const [model, commands, maybeOutMessage] = CityCombobox.open(initModel());

      expect(model.isOpen).toBe(true);
      expect(commands).toEqual([]);
      expect(Option.isNone(maybeOutMessage)).toBe(true);
    });

    test("selectItem closes, stores selection, and emits a typed Selected out-message", () => {
      const [openModel] = CityCombobox.open(initModel());
      const [model, commands, maybeOutMessage] = CityCombobox.selectItem(
        openModel,
        "Quito",
        "Quito"
      );

      expect(model.isOpen).toBe(false);
      expect(model.inputValue).toBe("Quito");
      expect(model.maybeSelectedItem).toEqual(Option.some("Quito"));
      expect(commands).toHaveLength(1);
      expect(commands[0]?.name).toBe(
        Combobox.FocusInput({ id: comboboxId }).name
      );
      expectSelectedOutMessage(maybeOutMessage, "Quito", true);
    });

    test("multi select toggles selected items and emits add/remove out-messages", () => {
      const initialMulti = Combobox.Multi.init({ id: comboboxId });
      const [selectedModel, , selectedOutMessage] =
        CityMultiCombobox.selectItem(initialMulti, "Oxford");
      const [removedModel, , removedOutMessage] = CityMultiCombobox.selectItem(
        selectedModel,
        "Oxford"
      );

      expect(selectedModel.selectedItems).toEqual(["Oxford"]);
      expect(removedModel.selectedItems).toEqual([]);
      expectSelectedOutMessage(selectedOutMessage, "Oxford", true);
      expectSelectedOutMessage(removedOutMessage, "Oxford", false);
    });
  });
});
