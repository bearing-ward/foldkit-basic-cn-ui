import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Tooltip from "../../ui/tooltip";
import * as TooltipNoDelayExample from "./main";

const toParentMessage = (message: Tooltip.Message) =>
  TooltipNoDelayExample.GotTooltipMessage({ message });

const AnchorTooltip = Tooltip.AnchorTooltip({
  buttonId: "tooltip-no-delay-trigger",
  anchor: Tooltip.tooltipAnchor,
});

const resolveTooltipMount = () =>
  Scene.Mount.resolve(
    AnchorTooltip,
    Tooltip.CompletedAnchorTooltip(),
    toParentMessage
  );

describe("Tooltip No Delay example", () => {
  test("opens from focus without a hover timer", () => {
    Scene.scene(
      {
        update: TooltipNoDelayExample.update,
        view: TooltipNoDelayExample.view,
      },
      Scene.with(TooltipNoDelayExample.init()[0]),
      Scene.expect(Scene.text("Shows immediately")).not.toExist(),
      Scene.focus(Scene.role("button", { name: "No delay" })),
      resolveTooltipMount(),
      Scene.expect(Scene.role("tooltip")).toExist(),
      Scene.expect(Scene.text("Shows immediately")).toExist(),
      Scene.expect(Scene.text("Tooltip shown immediately.")).toExist()
    );
  });
});
