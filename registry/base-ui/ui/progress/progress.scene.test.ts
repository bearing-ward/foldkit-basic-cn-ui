import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Progress from "./index";

const view = (): Html => {
  const h = html<never>();

  return h.div(
    [],
    [
      Progress.view({
        value: 30,
        label: "Downloading",
        id: "downloading-label",
      }),
      Progress.rootView({
        value: null,
        children: [
          Progress.labelView({ label: "Preparing", id: "preparing-label" }),
          Progress.trackView({
            children: [Progress.indicatorView({ value: null })],
          }),
          Progress.valueView({ value: null }),
        ],
        labelId: "preparing-label",
      }),
      Progress.view({
        value: 30,
        label: "Custom export",
        id: "custom-export-label",
        formatValue: (value) => `${value} units`,
        getAriaValueText: ({ value }) => `${value ?? 0} of 100 units`,
        renderValue: ({ formattedValue }) => formattedValue ?? "Waiting",
        className: "progress-root-override",
        style: { inlineSize: "18rem" },
        labelClasses: "progress-label-override",
        labelStyle: { color: "rgb(17, 24, 39)" },
        valueClasses: "progress-value-override",
        valueStyle: { fontVariantNumeric: "tabular-nums" },
        trackClasses: "progress-track-override",
        trackStyle: { blockSize: "0.5rem" },
        indicatorClasses: "progress-indicator-override",
        indicatorStyle: { backgroundColor: "rgb(5, 150, 105)" },
      }),
    ]
  );
};

describe("Progress registry view", () => {
  test("renders Base UI progress ARIA and status attributes", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(
        Scene.role("progressbar", { name: "Downloading" })
      ).toHaveAttr("aria-valuenow", "30"),
      Scene.expect(
        Scene.role("progressbar", { name: "Downloading" })
      ).toHaveAttr("aria-valuemin", "0"),
      Scene.expect(
        Scene.role("progressbar", { name: "Downloading" })
      ).toHaveAttr("aria-valuemax", "100"),
      Scene.expect(
        Scene.role("progressbar", { name: "Downloading" })
      ).toHaveAttr("aria-valuetext", "30%"),
      Scene.expect(
        Scene.role("progressbar", { name: "Downloading" })
      ).toHaveAttr("data-progressing", ""),
      Scene.expect(Scene.text("30%")).toExist(),
      Scene.expect(
        Scene.role("progressbar", { name: "Preparing" })
      ).not.toHaveAttr("aria-valuenow"),
      Scene.expect(Scene.role("progressbar", { name: "Preparing" })).toHaveAttr(
        "aria-valuetext",
        "indeterminate progress"
      ),
      Scene.expect(Scene.role("progressbar", { name: "Preparing" })).toHaveAttr(
        "data-indeterminate",
        ""
      ),
      Scene.expect(
        Scene.role("progressbar", { name: "Custom export" })
      ).toHaveAttr("aria-valuetext", "30 of 100 units"),
      Scene.expect(
        Scene.role("progressbar", { name: "Custom export" })
      ).toHaveClass("progress-root-override"),
      Scene.expect(
        Scene.role("progressbar", { name: "Custom export" })
      ).toHaveStyle("inlineSize", "18rem"),
      Scene.expect(Scene.text("Custom export")).toHaveClass(
        "progress-label-override"
      ),
      Scene.expect(Scene.text("30 units")).toHaveClass(
        "progress-value-override"
      ),
      Scene.expect(Scene.text("30 units")).toExist()
    );
  });
});
