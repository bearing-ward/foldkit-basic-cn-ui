import { Option } from "effect";
import { Story } from "foldkit";
import { describe, expect, test } from "vitest";

import * as Popover from "./index";

const popoverId = "account-popover";

const initModel = (): Popover.Model => Popover.init({ id: popoverId })[0];

const FocusAccountButton = Popover.FocusButton({ id: popoverId });

const expectSomeOutMessage = (
  maybeOutMessage: Option.Option<Popover.OutMessage>,
  tag: Popover.OutMessage["_tag"]
) => {
  expect(Option.isSome(maybeOutMessage)).toBe(true);

  if (Option.isSome(maybeOutMessage)) {
    expect(maybeOutMessage.value._tag).toBe(tag);
  }
};

describe("Popover registry component", () => {
  describe(Popover.init, () => {
    test("returns a model with no startup commands", () => {
      const [model, commands] = Popover.init({ id: popoverId });

      expect(model.id).toBe(popoverId);
      expect(model.isOpen).toBe(false);
      expect(model.isAnimated).toBe(false);
      expect(model.isModal).toBe(false);
      expect(model.contentFocus).toBe(false);
      expect(commands).toEqual([]);
    });

    test("preserves animation, modal, and content-focus configuration", () => {
      const [model, commands] = Popover.init({
        id: popoverId,
        isAnimated: true,
        isModal: true,
        contentFocus: true,
      });

      expect(model.isAnimated).toBe(true);
      expect(model.isModal).toBe(true);
      expect(model.contentFocus).toBe(true);
      expect(commands).toEqual([]);
    });
  });

  describe(Popover.update, () => {
    test("opens a closed popover and emits one parent-visible fact", () => {
      Story.story(
        Popover.update,
        Story.with(initModel()),
        Story.message(Popover.RequestedOpen()),
        Story.model((model) => {
          expect(model.isOpen).toBe(true);
        }),
        Story.Command.expectNone(),
        Story.expectOutMessage(Popover.Opened())
      );
    });

    test("re-emits Opened for an already-open popover", () => {
      const [openModel] = Popover.open(initModel());

      Story.story(
        Popover.update,
        Story.with(openModel),
        Story.message(Popover.RequestedOpen()),
        Story.model((model) => {
          expect(model.isOpen).toBe(true);
        }),
        Story.Command.expectNone(),
        Story.expectOutMessage(Popover.Opened())
      );
    });

    test("closes an open popover and emits one parent-visible fact", () => {
      const [openModel] = Popover.open(initModel());

      Story.story(
        Popover.update,
        Story.with(openModel),
        Story.message(Popover.RequestedClose()),
        Story.model((model) => {
          expect(model.isOpen).toBe(false);
        }),
        Story.Command.expectExact(FocusAccountButton),
        Story.expectOutMessage(Popover.Closed()),
        Story.Command.resolve(
          FocusAccountButton,
          Popover.CompletedFocusButton()
        )
      );
    });

    test("focuses the button but does not re-emit Closed for an already-closed popover", () => {
      Story.story(
        Popover.update,
        Story.with(initModel()),
        Story.message(Popover.RequestedClose()),
        Story.model((model) => {
          expect(model.isOpen).toBe(false);
        }),
        Story.Command.expectExact(FocusAccountButton),
        Story.expectNoOutMessage(),
        Story.Command.resolve(
          FocusAccountButton,
          Popover.CompletedFocusButton()
        )
      );
    });
  });

  describe("helper API", () => {
    test("open delegates to RequestedOpen behavior", () => {
      const [model, commands, maybeOutMessage] = Popover.open(initModel());

      expect(model.isOpen).toBe(true);
      expect(commands).toEqual([]);
      expectSomeOutMessage(maybeOutMessage, "Opened");
    });

    test("close delegates to RequestedClose behavior", () => {
      const [openModel] = Popover.open(initModel());
      const [model, commands, maybeOutMessage] = Popover.close(openModel);

      expect(model.isOpen).toBe(false);
      expect(commands).toHaveLength(1);
      expect(commands[0]?.name).toBe(FocusAccountButton.name);
      expect(commands[0]?.args).toEqual(FocusAccountButton.args);
      expectSomeOutMessage(maybeOutMessage, "Closed");
    });

    test("modal open and close include scroll and inert commands", () => {
      const [closedModel] = Popover.init({
        id: popoverId,
        isModal: true,
      });
      const [openModel, openCommands] = Popover.open(closedModel);
      const [, closeCommands] = Popover.close(openModel);

      expect(openCommands.map((command) => command.name)).toEqual([
        Popover.LockScroll().name,
        Popover.InertOthers({ id: popoverId }).name,
      ]);
      expect(closeCommands.map((command) => command.name)).toEqual([
        Popover.FocusButton({ id: popoverId }).name,
        Popover.UnlockScroll().name,
        Popover.RestoreInert({ id: popoverId }).name,
      ]);
    });
  });
});
