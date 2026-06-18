import { Option } from "effect";
import { Story } from "foldkit";
import { describe, expect, test } from "vitest";

import * as Dialog from "./index";

const dialogId = "account-dialog";
const focusSelector = "#account-name";

const initModel = (): Dialog.Model => Dialog.init({ id: dialogId })[0];

const ShowAccountDialog = Dialog.ShowDialog({
  id: dialogId,
  maybeFocusSelector: Option.none(),
});

const CloseAccountDialog = Dialog.CloseDialog({ id: dialogId });

const expectSomeOutMessage = (
  maybeOutMessage: Option.Option<Dialog.OutMessage>,
  tag: Dialog.OutMessage["_tag"]
) => {
  expect(Option.isSome(maybeOutMessage)).toBe(true);

  if (Option.isSome(maybeOutMessage)) {
    expect(maybeOutMessage.value._tag).toBe(tag);
  }
};

describe("Dialog registry component", () => {
  describe(Dialog.init, () => {
    test("returns a model with no startup commands", () => {
      const [model, commands] = Dialog.init({ id: dialogId });

      expect(model.id).toBe(dialogId);
      expect(model.isOpen).toBe(false);
      expect(commands).toEqual([]);
    });

    test("preserves explicit open, animation, and focus configuration", () => {
      const [model, commands] = Dialog.init({
        id: dialogId,
        focusSelector,
        isAnimated: true,
        isOpen: true,
      });

      expect(model.isOpen).toBe(true);
      expect(model.isAnimated).toBe(true);
      expect(Option.isSome(model.maybeFocusSelector)).toBe(true);

      if (Option.isSome(model.maybeFocusSelector)) {
        expect(model.maybeFocusSelector.value).toBe(focusSelector);
      }

      expect(commands).toEqual([]);
    });
  });

  describe(Dialog.update, () => {
    test("opens a closed dialog and emits one parent-visible fact", () => {
      Story.story(
        Dialog.update,
        Story.with(initModel()),
        Story.message(Dialog.RequestedOpen()),
        Story.model((model) => {
          expect(model.isOpen).toBe(true);
        }),
        Story.Command.expectExact(ShowAccountDialog),
        Story.expectOutMessage(Dialog.Opened()),
        Story.Command.resolve(ShowAccountDialog, Dialog.CompletedShowDialog())
      );
    });

    test("does not re-emit Opened for an already-open dialog", () => {
      const [openModel] = Dialog.open(initModel());

      Story.story(
        Dialog.update,
        Story.with(openModel),
        Story.message(Dialog.RequestedOpen()),
        Story.model((model) => {
          expect(model.isOpen).toBe(true);
        }),
        Story.Command.expectNone(),
        Story.expectNoOutMessage()
      );
    });

    test("closes an open dialog and emits one parent-visible fact", () => {
      const [openModel] = Dialog.open(initModel());

      Story.story(
        Dialog.update,
        Story.with(openModel),
        Story.message(Dialog.RequestedClose()),
        Story.model((model) => {
          expect(model.isOpen).toBe(false);
        }),
        Story.Command.expectExact(CloseAccountDialog),
        Story.expectOutMessage(Dialog.Closed()),
        Story.Command.resolve(CloseAccountDialog, Dialog.CompletedCloseDialog())
      );
    });

    test("does not re-emit Closed for an already-closed dialog", () => {
      Story.story(
        Dialog.update,
        Story.with(initModel()),
        Story.message(Dialog.RequestedClose()),
        Story.model((model) => {
          expect(model.isOpen).toBe(false);
        }),
        Story.Command.expectNone(),
        Story.expectNoOutMessage()
      );
    });
  });

  describe("helper API", () => {
    test("open delegates to RequestedOpen behavior", () => {
      const [model, commands, maybeOutMessage] = Dialog.open(initModel());

      expect(model.isOpen).toBe(true);
      expect(commands).toHaveLength(1);
      expect(commands[0]?.name).toBe(ShowAccountDialog.name);
      expect(commands[0]?.args).toEqual(ShowAccountDialog.args);
      expectSomeOutMessage(maybeOutMessage, "Opened");
    });

    test("close delegates to RequestedClose behavior", () => {
      const [openModel] = Dialog.open(initModel());
      const [model, commands, maybeOutMessage] = Dialog.close(openModel);

      expect(model.isOpen).toBe(false);
      expect(commands).toHaveLength(1);
      expect(commands[0]?.name).toBe(CloseAccountDialog.name);
      expect(commands[0]?.args).toEqual(CloseAccountDialog.args);
      expectSomeOutMessage(maybeOutMessage, "Closed");
    });
  });
});
