import { Scene } from "foldkit";
import * as Ui from "@foldkit/ui";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Listbox from "./index";

type Person = "Michael Bluth" | "Lindsay Funke" | "Gob Bluth";

const PersonListbox = Listbox.create<Person>();
const listboxId = "people-listbox";
const people: readonly Person[] = [
  "Michael Bluth",
  "Lindsay Funke",
  "Gob Bluth",
];
const anchor = Listbox.defaultAnchor;

const [initialModel] = Listbox.init({ id: listboxId });
const [animatedModel] = Listbox.init({ id: listboxId, isAnimated: true });

const AnchorPeopleListbox = Listbox.AnchorListbox({
  buttonId: `${listboxId}-button`,
  anchor,
});
const SettleItemsAnimation = Ui.Animation.WaitForAnimationSettled({
  id: `${listboxId}-listbox`,
});

const toAnimationMessage = (message: Ui.Animation.Message) =>
  Listbox.GotAnimationMessage({ message });

const resolveListboxMounts = () =>
  Scene.Mount.resolveAll(
    [Listbox.PortalListboxBackdrop, Listbox.CompletedPortalListboxBackdrop()],
    [AnchorPeopleListbox, Listbox.CompletedAnchorListbox()]
  );

const view = (model: Listbox.Model): Html => {
  const h = html<Listbox.Message>();

  return h.submodel({
    slotId: model.id,
    model,
    view: PersonListbox.view,
    viewInputs: {
      anchor,
      items: people,
      itemToConfig: (item) => ({
        classes: Listbox.itemClasses,
        content: h.span([], [item]),
      }),
      buttonContent: h.span([], ["Choose person"]),
      buttonAttributes: childAttributes([h.Class(Listbox.triggerClasses)]),
      itemsAttributes: childAttributes([
        h.Class(Listbox.defaultItemsClasses),
      ]),
      backdropAttributes: childAttributes([
        h.DataAttribute("testid", "listbox-backdrop"),
        h.Class(Listbox.backdropClasses),
      ]),
      attributes: childAttributes([h.Class(Listbox.rootClasses)]),
    },
    toParentMessage: (message) => message,
  });
};

const animatedView = (model: Listbox.Model): Html => {
  const h = html<Listbox.Message>();

  return h.submodel({
    slotId: model.id,
    model,
    view: PersonListbox.view,
    viewInputs: {
      anchor,
      items: people,
      itemToConfig: (item) => ({
        classes: Listbox.itemClasses,
        content: h.span([], [item]),
      }),
      buttonContent: h.span([], ["Choose animated person"]),
      buttonAttributes: childAttributes([h.Class(Listbox.triggerClasses)]),
      itemsAttributes: childAttributes([
        h.Class(Listbox.animatedItemsClasses),
      ]),
      backdropAttributes: childAttributes([
        h.DataAttribute("testid", "listbox-backdrop"),
        h.Class(Listbox.backdropClasses),
      ]),
      attributes: childAttributes([h.Class(Listbox.rootClasses)]),
    },
    toParentMessage: (message) => message,
  });
};

describe("Listbox registry view", () => {
  test("opens listbox items from the trigger", () => {
    Scene.scene(
      { update: PersonListbox.update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Choose person" })).toExist(),
      Scene.expect(Scene.text("Michael Bluth")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Choose person" })),
      Scene.Command.expectHas(Listbox.FocusItems({ id: listboxId })),
      Scene.Command.resolve(
        Listbox.FocusItems({ id: listboxId }),
        Listbox.CompletedFocusItems()
      ),
      resolveListboxMounts(),
      Scene.expect(Scene.text("Michael Bluth")).toExist(),
      Scene.expect(Scene.text("Lindsay Funke")).toExist(),
      Scene.expect(Scene.text("Gob Bluth")).toExist()
    );
  });

  test("closes through the backdrop", () => {
    Scene.scene(
      { update: PersonListbox.update, view },
      Scene.with(initialModel),
      Scene.click(Scene.role("button", { name: "Choose person" })),
      Scene.Command.resolve(
        Listbox.FocusItems({ id: listboxId }),
        Listbox.CompletedFocusItems()
      ),
      resolveListboxMounts(),
      Scene.click(Scene.testId("listbox-backdrop")),
      Scene.Command.expectHas(Listbox.FocusButton({ id: listboxId })),
      Scene.Command.resolve(
        Listbox.FocusButton({ id: listboxId }),
        Listbox.CompletedFocusButton()
      ),
      Scene.Mount.expectEnded(
        Listbox.PortalListboxBackdrop,
        AnchorPeopleListbox
      ),
      Scene.expect(Scene.text("Michael Bluth")).not.toExist()
    );
  });

  test("animated listbox keeps items visible after animation settles", () => {
    Scene.scene(
      { update: PersonListbox.update, view: animatedView },
      Scene.with(animatedModel),
      Scene.click(Scene.role("button", { name: "Choose animated person" })),
      Scene.Command.expectHas(
        Listbox.FocusItems({ id: listboxId }),
        Ui.Animation.RequestFrame
      ),
      Scene.Command.resolve(
        Listbox.FocusItems({ id: listboxId }),
        Listbox.CompletedFocusItems()
      ),
      Scene.Command.resolve(
        Ui.Animation.RequestFrame,
        Ui.Animation.AdvancedAnimationFrame(),
        toAnimationMessage
      ),
      resolveListboxMounts(),
      Scene.Command.resolve(
        SettleItemsAnimation,
        Ui.Animation.EndedAnimation(),
        toAnimationMessage
      ),
      Scene.expect(Scene.text("Michael Bluth")).toExist()
    );
  });
});
