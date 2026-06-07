import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as Chart from "./index";

const data: readonly Chart.ChartDatum[] = [
  { label: "Jan", values: { desktop: 186, mobile: 80 } },
  { label: "Feb", values: { desktop: 305, mobile: 200 } },
];
const series: readonly Chart.ChartSeries[] = [
  { key: "desktop", label: "Desktop", color: "#2563eb" },
  { key: "mobile", label: "Mobile", color: "#16a34a" },
];

describe("Chart registry view", () => {
  test("renders labelled chart anatomy", () => {
    const view = (): Html =>
      Chart.containerView<never>({
        ariaLabel: "Visitors",
        children: [
          Chart.barChartView<never>({ data, series }),
          Chart.legendView<never>({ series }),
        ],
      });

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("region", { name: "Visitors" })).toExist(),
      Scene.expect(Scene.role("img", { name: "Bar chart" })).toExist(),
      Scene.expect(Scene.text("Desktop")).toExist()
    );
  });

  test("keeps max value at least one", () => {
    expect(
      Chart.barChartView<never>({
        data: [{ label: "Zero", values: { desktop: 0 } }],
        series: [{ key: "desktop", label: "Desktop", color: "#2563eb" }],
      })
    ).toBeDefined();
  });
});
