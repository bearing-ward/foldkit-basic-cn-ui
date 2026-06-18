import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Popover from "../../../foldkit/ui/popover";
import * as Example from "./main";
import { GotPopoverMessage } from "./main";

const AnchorPopover = Popover.AnchorPopover({
  buttonId: "button-group-popover-button",
  anchor: {
    placement: "bottom-start",
    gap: 6,
    padding: 8,
  },
});

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

describe("button-group-popover example", () => {
  test("opens the popover from the grouped trigger", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("group", { name: "Assistant actions" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Open AI options" })),
      resolvePopoverMounts(),
      Scene.expect(
        Scene.text("Generate, summarize, or rewrite the current selection.")
      ).toExist()
    );
  });
});
