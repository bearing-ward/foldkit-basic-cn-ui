import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Meter from "./index";

const view = (): Html => {
  const h = html<never>();

  return h.div(
    [],
    [
      Meter.view({
        value: 24,
        label: "Storage Used",
        id: "storage-used-label",
      }),
      Meter.view({
        value: 24,
        label: "Custom storage",
        id: "custom-storage-label",
        formatValue: (value) => `${value} units`,
        getAriaValueText: ({ value }) => `${value} of 100 units`,
        renderValue: ({ formattedValue }) => formattedValue,
        classes: "meter-root-override",
        style: { inlineSize: "18rem" },
        labelClasses: "meter-label-override",
        labelStyle: { color: "rgb(17, 24, 39)" },
        valueClasses: "meter-value-override",
        valueStyle: { fontVariantNumeric: "tabular-nums" },
        trackClasses: "meter-track-override",
        trackStyle: { blockSize: "0.5rem" },
        indicatorClasses: "meter-indicator-override",
        indicatorStyle: { backgroundColor: "rgb(5, 150, 105)" },
      }),
    ]
  );
};

describe("Meter registry view", () => {
  test("renders Base UI meter ARIA and status attributes", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuenow",
        "24"
      ),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuemin",
        "0"
      ),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuemax",
        "100"
      ),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuetext",
        "24%"
      ),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "data-metering",
        ""
      ),
      Scene.expect(Scene.text("24%")).toExist(),
      Scene.expect(Scene.role("meter", { name: "Custom storage" })).toHaveAttr(
        "aria-valuetext",
        "24 of 100 units"
      ),
      Scene.expect(Scene.role("meter", { name: "Custom storage" })).toHaveClass(
        "meter-root-override"
      ),
      Scene.expect(Scene.role("meter", { name: "Custom storage" })).toHaveStyle(
        "inlineSize",
        "18rem"
      ),
      Scene.expect(Scene.text("Custom storage")).toHaveClass(
        "meter-label-override"
      ),
      Scene.expect(Scene.text("24 units")).toHaveClass("meter-value-override"),
      Scene.expect(Scene.text("24 units")).toExist()
    );
  });
});
