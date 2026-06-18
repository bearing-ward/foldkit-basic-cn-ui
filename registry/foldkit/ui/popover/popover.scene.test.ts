import { Scene, Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Popover from "./index";

const popoverId = "account-popover";
const titleText = "Workspace actions";
const bodyText = "Invite members, review access, and manage billing.";

const anchor = {
  placement: "bottom-start" as const,
  gap: 4,
  padding: 8,
};

const [initialModel] = Popover.init({ id: popoverId });
const [animatedModel] = Popover.init({ id: popoverId, isAnimated: true });
const AnchorAccountPopover = Popover.AnchorPopover({
  buttonId: `${popoverId}-button`,
  anchor,
});
const SettlePanelAnimation = Ui.Animation.WaitForAnimationSettled({
  id: `${popoverId}-panel`,
});

const resolvePopoverMounts = () =>
  Scene.Mount.resolveAll(
    [Popover.PortalPopoverBackdrop, Popover.CompletedPortalPopoverBackdrop()],
    [AnchorAccountPopover, Popover.CompletedAnchorPopover()]
  );

const toAnimationMessage = (message: Ui.Animation.Message) =>
  Popover.GotAnimationMessage({ message });

const view = (model: Popover.Model): Html => {
  const h = html<Popover.Message>();

  return h.submodel({
    slotId: model.id,
    model,
    view: Popover.view,
    viewInputs: {
      anchor,
      toView: (render) =>
        Popover.root<Popover.Message>({
          children: [
            Popover.trigger<Popover.Message>({
              render,
              label: "Open workspace actions",
            }),
            ...(render.isVisible
              ? [
                  Popover.backdrop<Popover.Message>({ render }),
                  Popover.panel<Popover.Message>({
                    render,
                    children: [
                      h.p([h.Class("text-sm font-semibold")], [titleText]),
                      h.p([h.Class("text-sm text-gray-600")], [bodyText]),
                    ],
                  }),
                ]
              : []),
          ],
        }),
    },
    toParentMessage: (message) => message,
  });
};

describe("Popover registry view helpers", () => {
  test("opens panel content from the trigger", () => {
    Scene.scene(
      { update: Popover.update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("button", { name: "Open workspace actions" })
      ).toExist(),
      Scene.expect(Scene.text(titleText)).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open workspace actions" })),
      resolvePopoverMounts(),
      Scene.expect(Scene.text(titleText)).toExist(),
      Scene.expect(Scene.text(bodyText)).toExist()
    );
  });

  test("closes panel content through RequestedClose", () => {
    Scene.scene(
      { update: Popover.update, view },
      Scene.with(initialModel),
      Scene.click(Scene.role("button", { name: "Open workspace actions" })),
      resolvePopoverMounts(),
      Scene.click(Scene.testId("popover-backdrop")),
      Scene.Command.expectExact(Popover.FocusButton({ id: popoverId })),
      Scene.Command.resolve(
        Popover.FocusButton({ id: popoverId }),
        Popover.CompletedFocusButton()
      ),
      Scene.Mount.expectEnded(
        Popover.PortalPopoverBackdrop,
        AnchorAccountPopover
      ),
      Scene.expect(Scene.text(titleText)).not.toExist()
    );
  });

  test("animated popover keeps content visible while open", () => {
    Scene.scene(
      { update: Popover.update, view },
      Scene.with(animatedModel),
      Scene.click(Scene.role("button", { name: "Open workspace actions" })),
      Scene.Command.expectHas(Ui.Animation.RequestFrame),
      Scene.Command.resolve(
        Ui.Animation.RequestFrame,
        Ui.Animation.AdvancedAnimationFrame(),
        toAnimationMessage
      ),
      resolvePopoverMounts(),
      Scene.Command.resolve(
        SettlePanelAnimation,
        Ui.Animation.EndedAnimation(),
        toAnimationMessage
      ),
      Scene.expect(Scene.text(titleText)).toExist(),
      Scene.expect(Scene.text(bodyText)).toExist()
    );
  });
});
