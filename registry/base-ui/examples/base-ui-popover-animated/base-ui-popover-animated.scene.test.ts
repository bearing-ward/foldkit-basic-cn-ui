import { Scene } from "foldkit";
import * as Ui from "@foldkit/ui";
import { describe, test } from "vitest";

import * as Popover from "../../ui/base-ui-popover";
import { GotPopoverMessage, init, update, view } from "./main";

const [initialModel] = init();

const AnchorPopover = Popover.AnchorPopover({
  buttonId: "base-ui-popover-animated-button",
  anchor: {
    placement: "bottom-start",
    gap: 8,
    padding: 8,
  },
});

const SettlePanelAnimation = Ui.Animation.WaitForAnimationSettled({
  id: "base-ui-popover-animated-panel",
});
const bodyText =
  "Animated popover content enters and exits with the Foldkit Popover animation lifecycle.";

const toPopoverMessage = (message: Popover.Message) =>
  GotPopoverMessage({ message });

const toAnimationMessage = (message: Ui.Animation.Message) =>
  GotPopoverMessage({ message: Popover.GotAnimationMessage({ message }) });

describe("Base UI Popover Animated example", () => {
  test("opens through the animated Foldkit popover lifecycle", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.text(bodyText)).not.toExist(),
      Scene.click(Scene.role("button", { name: "Notifications" })),
      Scene.Command.expectHas(Ui.Animation.RequestFrame),
      Scene.Command.resolve(
        Ui.Animation.RequestFrame,
        Ui.Animation.AdvancedAnimationFrame(),
        toAnimationMessage
      ),
      Scene.Mount.resolveAll(
        [
          Popover.PortalPopoverBackdrop,
          Popover.CompletedPortalPopoverBackdrop(),
          toPopoverMessage,
        ],
        [AnchorPopover, Popover.CompletedAnchorPopover(), toPopoverMessage]
      ),
      Scene.Command.resolve(
        SettlePanelAnimation,
        Ui.Animation.EndedAnimation(),
        toAnimationMessage
      ),
      Scene.expect(Scene.text("Notifications")).toExist(),
      Scene.expect(Scene.text(bodyText)).toExist()
    );
  });
});
