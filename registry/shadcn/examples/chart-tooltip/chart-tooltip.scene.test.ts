import { Scene } from "foldkit";
import { expect } from "vitest";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("chart-tooltip example", () => {
  test("renders the shadcn Chart Tooltip example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("img", { name: "Bar chart" })).not.toHaveHandler(
        "click"
      ),
      Scene.expect(Scene.text("February")).not.toExist()
    );
  });

  test("updates tooltip content from hovered chart datum", () => {
    const [model] = Example.init();
    const [hoveredModel] = Example.update(
      model,
      Example.HoveredChartDatum({ label: "March" })
    );
    const [leftModel] = Example.update(hoveredModel, Example.LeftChart());

    expect(hoveredModel.tooltip).toEqual(Example.activeTooltip("March"));
    expect(leftModel.tooltip).toEqual(Example.noActiveTooltip());
  });
});
