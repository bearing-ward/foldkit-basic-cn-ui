import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as NumberField from ".";

const view = (value: string) => {
  const h = html<string>();
  const labelId = "amount-label";

  return NumberField.rootView<string>({
    children: [
      NumberField.scrubAreaView({
        id: labelId,
        children: [h.span([], ["Amount"])],
      }),
      NumberField.groupView({
        children: [
          NumberField.decrementView({
            ariaLabel: "Decrease",
            onClick: String(Number(value) - 1),
            children: [h.span([], ["-"])],
          }),
          NumberField.inputView({
            id: "amount",
            value,
            onInput: (nextValue) => nextValue,
            ariaLabel: "Amount",
            labelledById: labelId,
            min: 0,
            step: 1,
          }),
          NumberField.incrementView({
            ariaLabel: "Increase",
            onClick: String(Number(value) + 1),
            children: [h.span([], ["+"])],
          }),
        ],
      }),
    ],
  });
};

describe("NumberField registry component", () => {
  test("renders amount input with increment and decrement controls", () => {
    Scene.scene(
      {
        update: (model: string, message: string) => [message, []] as const,
        view,
      },
      Scene.with("100"),
      Scene.expect(Scene.text("Amount")).toExist(),
      Scene.expect(Scene.role("spinbutton", { name: "Amount" })).toHaveValue(
        "100"
      ),
      Scene.click(Scene.role("button", { name: "Increase" })),
      Scene.expect(Scene.role("spinbutton", { name: "Amount" })).toHaveValue(
        "101"
      ),
      Scene.click(Scene.role("button", { name: "Decrease" })),
      Scene.expect(Scene.role("spinbutton", { name: "Amount" })).toHaveValue(
        "100"
      )
    );
  });

  test("exports Base UI anatomy class hooks", () => {
    expect(NumberField.numberFieldRootClassName).toContain("grid");
    expect(NumberField.numberFieldInputClassName).toContain(
      "aria-[invalid=true]"
    );
  });
});
