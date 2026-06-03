import { Option } from "effect";
import { describe, expect, test } from "vitest";

import * as Listbox from "./index";

type Person = "Michael Bluth" | "Lindsay Funke" | "Gob Bluth";

const PersonListbox = Listbox.create<Person>();
const listboxId = "people-listbox";

const initModel = (): Listbox.Model => Listbox.init({ id: listboxId })[0];

const FocusPeopleItems = Listbox.FocusItems({ id: listboxId });
const FocusPeopleButton = Listbox.FocusButton({ id: listboxId });

const expectSelectedOutMessage = (
  maybeOutMessage: Option.Option<Listbox.OutMessage<Person>>,
  value: Person
) => {
  expect(Option.isSome(maybeOutMessage)).toBe(true);

  if (Option.isSome(maybeOutMessage)) {
    expect(maybeOutMessage.value).toEqual(
      Listbox.Selected({ value, wasAdded: true })
    );
  }
};

describe("Listbox registry component", () => {
  describe(Listbox.init, () => {
    test("returns a model with no startup commands", () => {
      const [model, commands] = Listbox.init({ id: listboxId });

      expect(model.id).toBe(listboxId);
      expect(model.isOpen).toBe(false);
      expect(model.isAnimated).toBe(false);
      expect(model.isModal).toBe(false);
      expect(model.orientation).toBe("Vertical");
      expect(Option.isNone(model.maybeSelectedItem)).toBe(true);
      expect(commands).toEqual([]);
    });

    test("preserves selection, animation, modal, and orientation config", () => {
      const [model, commands] = Listbox.init({
        id: listboxId,
        selectedItem: "Gob Bluth",
        isAnimated: true,
        isModal: true,
        orientation: "Horizontal",
      });

      expect(model.isAnimated).toBe(true);
      expect(model.isModal).toBe(true);
      expect(model.orientation).toBe("Horizontal");
      expect(model.maybeSelectedItem).toEqual(Option.some("Gob Bluth"));
      expect(commands).toEqual([]);
    });
  });

  describe("helper API", () => {
    test("open delegates to Opened behavior", () => {
      const [model, commands, maybeOutMessage] =
        PersonListbox.open(initModel());

      expect(model.isOpen).toBe(true);
      expect(commands).toHaveLength(1);
      expect(commands[0]?.name).toBe(FocusPeopleItems.name);
      expect(commands[0]?.args).toEqual(FocusPeopleItems.args);
      expect(Option.isNone(maybeOutMessage)).toBe(true);
    });

    test("close delegates to Closed behavior", () => {
      const [openModel] = PersonListbox.open(initModel());
      const [model, commands, maybeOutMessage] = PersonListbox.close(openModel);

      expect(model.isOpen).toBe(false);
      expect(commands).toHaveLength(1);
      expect(commands[0]?.name).toBe(FocusPeopleButton.name);
      expect(commands[0]?.args).toEqual(FocusPeopleButton.args);
      expect(Option.isNone(maybeOutMessage)).toBe(true);
    });

    test("selectItem closes, stores selection, and emits a typed Selected out-message", () => {
      const [openModel] = PersonListbox.open(initModel());
      const [model, commands, maybeOutMessage] = PersonListbox.selectItem(
        openModel,
        "Lindsay Funke"
      );

      expect(model.isOpen).toBe(false);
      expect(model.maybeSelectedItem).toEqual(Option.some("Lindsay Funke"));
      expect(commands).toHaveLength(1);
      expect(commands[0]?.name).toBe(FocusPeopleButton.name);
      expectSelectedOutMessage(maybeOutMessage, "Lindsay Funke");
    });

    test("reflectSelectedItem mirrors external truth without commands", () => {
      const model = PersonListbox.reflectSelectedItem(
        initModel(),
        Option.some("Michael Bluth")
      );

      expect(model.maybeSelectedItem).toEqual(Option.some("Michael Bluth"));
    });

    test("modal open and close include scroll and inert commands", () => {
      const [closedModel] = Listbox.init({
        id: listboxId,
        isModal: true,
      });
      const [openModel, openCommands] = PersonListbox.open(closedModel);
      const [, closeCommands] = PersonListbox.close(openModel);

      expect(openCommands.map((command) => command.name)).toEqual([
        Listbox.LockScroll().name,
        Listbox.InertOthers({ id: listboxId }).name,
        Listbox.FocusItems({ id: listboxId }).name,
      ]);
      expect(closeCommands.map((command) => command.name)).toEqual([
        Listbox.FocusButton({ id: listboxId }).name,
        Listbox.UnlockScroll().name,
        Listbox.RestoreInert({ id: listboxId }).name,
      ]);
    });
  });
});
