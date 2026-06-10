import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Tooltip from "../../ui/base-ui-tooltip";
import * as BaseUiTooltipBasicExample from "./main";

const toParentMessage = (message: Tooltip.Message) =>
  BaseUiTooltipBasicExample.GotTooltipMessage({ message });

const AnchorTooltip = Tooltip.AnchorTooltip({
  buttonId: "tooltip-basic-trigger",
  anchor: Tooltip.baseUiTooltipAnchor,
});

const resolveTooltipMount = () =>
  Scene.Mount.resolve(
    AnchorTooltip,
    Tooltip.CompletedAnchorTooltip(),
    toParentMessage
  );

describe("Base UI tooltip Basic example", () => {
  test("shows tooltip content after hover delay", () => {
    const [initialModel] = BaseUiTooltipBasicExample.init();

    Scene.scene(
      {
        update: BaseUiTooltipBasicExample.update,
        view: BaseUiTooltipBasicExample.view,
      },
      Scene.with(initialModel),
      Scene.expect(Scene.text("This is a tooltip")).not.toExist(),
      Scene.hover(Scene.role("button", { name: "Hover me" })),
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
      Scene.expect(Scene.text("This is a tooltip")).toExist()
    );
  });
});
