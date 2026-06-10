import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Tooltip from "../../ui/shadcn-tooltip";
import * as TooltipBasicExample from "./main";

const toParentMessage = (message: Tooltip.Message) =>
  TooltipBasicExample.GotTooltipMessage({ message });

const AnchorTooltip = Tooltip.AnchorTooltip({
  buttonId: "tooltip-basic-trigger",
  anchor: Tooltip.tooltipAnchor,
});

const resolveTooltipMount = () =>
  Scene.Mount.resolve(
    AnchorTooltip,
    Tooltip.CompletedAnchorTooltip(),
    toParentMessage
  );

describe("shadcn Tooltip Basic example", () => {
  test("shows tooltip content after hover delay", () => {
    const [initialModel] = TooltipBasicExample.init();

    Scene.scene(
      {
        update: TooltipBasicExample.update,
        view: TooltipBasicExample.view,
      },
      Scene.with(initialModel),
      Scene.expect(Scene.text("This is a tooltip")).not.toExist(),
      Scene.hover(Scene.role("button", { name: "Hover or focus me" })),
      Scene.Command.resolve(
        Tooltip.ShowAfterDelay({
          delay: initialModel.tooltip.showDelay,
          version: 1,
        }),
        Tooltip.ElapsedShowDelay({ version: 1 }),
        toParentMessage
      ),
      resolveTooltipMount(),
      Scene.expect(Scene.role("tooltip")).toExist(),
      Scene.expect(Scene.text("This is a tooltip")).toExist(),
      Scene.expect(Scene.text("Tooltip shown.")).toExist()
    );
  });
});
