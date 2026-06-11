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

describe("shadcn-popover-basic example", () => {
  test("opens the origin dimensions form and closes through the backdrop", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Open popover" })).toExist(),
      Scene.expect(Scene.text("Dimensions")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open popover" })),
      resolvePopoverMounts(),
      Scene.expect(Scene.text("Dimensions")).toExist(),
      Scene.expect(Scene.text("Set the dimensions for the layer.")).toExist(),
      Scene.expect(Scene.label("Width")).toHaveValue("100%"),
      Scene.expect(Scene.label("Max. width")).toHaveValue("300px"),
      Scene.expect(Scene.label("Height")).toHaveValue("25px"),
      Scene.expect(Scene.label("Max. height")).toHaveValue("none"),
      Scene.change(Scene.label("Width"), "80%"),
      Scene.expect(Scene.label("Width")).toHaveValue("80%"),
      Scene.click(Scene.testId("popover-backdrop")),
      Scene.Command.expectExact(FocusButton),
      Scene.Command.resolve(
        FocusButton,
        Popover.CompletedFocusButton(),
        (message) => GotPopoverMessage({ message })
      ),
      Scene.Mount.expectEnded(Popover.PortalPopoverBackdrop, AnchorPopover),
      Scene.expect(Scene.text("Dimensions")).not.toExist()
    );
  });
});
