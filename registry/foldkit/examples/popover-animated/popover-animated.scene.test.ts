import { Scene } from "foldkit";
import * as Ui from "@foldkit/ui";
import { describe, test } from "vitest";

import * as Popover from "../../ui/popover";
import { GotPopoverMessage, init, update, view } from "./main";

const [initialModel] = init();

const AnchorPopover = Popover.AnchorPopover({
  buttonId: "popover-animated-button",
  anchor: {
    placement: "bottom-start",
    gap: 4,
    padding: 8,
  },
});

const SettlePanelAnimation = Ui.Animation.WaitForAnimationSettled({
  id: "popover-animated-panel",
});

const toAnimationMessage = (message: Ui.Animation.Message) =>
  GotPopoverMessage({ message: Popover.GotAnimationMessage({ message }) });

const resolvePopoverMounts = () =>
  Scene.Mount.resolveAll(
    [
      Popover.PortalPopoverBackdrop,
      Popover.CompletedPortalPopoverBackdrop(),
      (message) => GotPopoverMessage({ message }),
    ],
    [
      AnchorPopover,
      Popover.CompletedAnchorPopover(),
      (message) => GotPopoverMessage({ message }),
    ]
  );

describe("popover-animated example", () => {
  test("opens through the animated popover lifecycle", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("button", { name: "Open animated popover" })
      ).toExist(),
      Scene.expect(Scene.text("Animated popover")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open animated popover" })),
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
      Scene.expect(Scene.text("Animated popover")).toExist(),
      Scene.expect(
        Scene.text(
          "Foldkit keeps the panel mounted while animation state settles."
        )
      ).toExist()
    );
  });
});
