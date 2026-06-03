import { Option } from "effect";
import { describe, expect, test } from "vitest";

import * as Menu from "./index";

type Action = "Edit" | "Duplicate" | "Delete";

const ActionMenu = Menu.create<Action>();
const menuId = "account-menu";

const initModel = (): Menu.Model => Menu.init({ id: menuId })[0];

const FocusAccountItems = Menu.FocusItems({ id: menuId });
const FocusAccountButton = Menu.FocusButton({ id: menuId });

const expectSomeOutMessage = (
  maybeOutMessage: Option.Option<Menu.OutMessage<Action>>,
  value: Action,
  index: number
) => {
  expect(Option.isSome(maybeOutMessage)).toBe(true);

  if (Option.isSome(maybeOutMessage)) {
    expect(maybeOutMessage.value).toEqual(Menu.Selected({ value, index }));
  }
};

describe("Menu registry component", () => {
  describe(Menu.init, () => {
    test("returns a model with no startup commands", () => {
      const [model, commands] = Menu.init({ id: menuId });

      expect(model.id).toBe(menuId);
      expect(model.isOpen).toBe(false);
      expect(model.isAnimated).toBe(false);
      expect(model.isModal).toBe(false);
      expect(commands).toEqual([]);
    });

    test("preserves animation and modal configuration", () => {
      const [model, commands] = Menu.init({
        id: menuId,
        isAnimated: true,
        isModal: true,
      });

      expect(model.isAnimated).toBe(true);
      expect(model.isModal).toBe(true);
      expect(commands).toEqual([]);
    });
  });

  describe("helper API", () => {
    test("open delegates to Opened behavior", () => {
      const [model, commands, maybeOutMessage] = ActionMenu.open(initModel());

      expect(model.isOpen).toBe(true);
      expect(commands).toHaveLength(1);
      expect(commands[0]?.name).toBe(FocusAccountItems.name);
      expect(commands[0]?.args).toEqual(FocusAccountItems.args);
      expect(Option.isNone(maybeOutMessage)).toBe(true);
    });

    test("close delegates to Closed behavior", () => {
      const [openModel] = ActionMenu.open(initModel());
      const [model, commands, maybeOutMessage] = ActionMenu.close(openModel);

      expect(model.isOpen).toBe(false);
      expect(commands).toHaveLength(1);
      expect(commands[0]?.name).toBe(FocusAccountButton.name);
      expect(commands[0]?.args).toEqual(FocusAccountButton.args);
      expect(Option.isNone(maybeOutMessage)).toBe(true);
    });

    test("selectItem closes and emits a typed Selected out-message", () => {
      const [openModel] = ActionMenu.open(initModel());
      const [model, commands, maybeOutMessage] = ActionMenu.selectItem(
        openModel,
        "Delete",
        2
      );

      expect(model.isOpen).toBe(false);
      expect(commands).toHaveLength(1);
      expect(commands[0]?.name).toBe(FocusAccountButton.name);
      expectSomeOutMessage(maybeOutMessage, "Delete", 2);
    });

    test("modal open and close include scroll and inert commands", () => {
      const [closedModel] = Menu.init({
        id: menuId,
        isModal: true,
      });
      const [openModel, openCommands] = ActionMenu.open(closedModel);
      const [, closeCommands] = ActionMenu.close(openModel);

      expect(openCommands.map((command) => command.name)).toEqual([
        Menu.LockScroll().name,
        Menu.InertOthers({ id: menuId }).name,
        Menu.FocusItems({ id: menuId }).name,
      ]);
      expect(closeCommands.map((command) => command.name)).toEqual([
        Menu.FocusButton({ id: menuId }).name,
        Menu.UnlockScroll().name,
        Menu.RestoreInert({ id: menuId }).name,
      ]);
    });
  });
});
