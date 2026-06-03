import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Popover from "../../ui/popover";
import { GotPopoverMessage, init, update, view } from "./main";

const [initialModel] = init();

const AnchorPopover = Popover.AnchorPopover({
  buttonId: "popover-basic-button",
  anchor: {
    placement: "bottom-start",
    gap: 4,
    padding: 8,
  },
});

const FocusButton = Popover.FocusButton({ id: "popover-basic" });

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

describe("popover-basic example", () => {
  test("opens and closes through the backdrop", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Open popover" })).toExist(),
      Scene.expect(Scene.text("Analytics")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open popover" })),
      resolvePopoverMounts(),
      Scene.expect(Scene.text("Analytics")).toExist(),
      Scene.expect(
        Scene.text(
          "Get a better understanding of where your traffic is coming from."
        )
      ).toExist(),
      Scene.click(Scene.testId("popover-backdrop")),
      Scene.Command.expectExact(FocusButton),
      Scene.Command.resolve(
        FocusButton,
        Popover.CompletedFocusButton(),
        (message) => GotPopoverMessage({ message })
      ),
      Scene.Mount.expectEnded(Popover.PortalPopoverBackdrop, AnchorPopover),
      Scene.expect(Scene.text("Analytics")).not.toExist()
    );
  });
});
