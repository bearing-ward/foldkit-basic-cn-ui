import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as NativeSelect from "./index";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
] as const;

const view = (value: string): Html => {
  const h = html<string>();

  return NativeSelect.rootView<string>({
    children: [
      NativeSelect.labelView<string>({
        forId: "fruit",
        children: [h.span([], ["Fruit"])],
      }),
      NativeSelect.triggerView<string>({
        id: "fruit",
        value,
        onChange: (nextValue) => nextValue,
        options,
        describedById: "fruit-description",
      }),
      NativeSelect.descriptionView<string>({
        id: "fruit-description",
        children: [h.span([], ["Choose a fruit"])],
      }),
    ],
  });
};

describe("Native Select registry view", () => {
  test("renders labelled native select and updates value", () => {
    Scene.scene(
      {
        update: (_model: string, message: string): readonly [string, []] => [
          message,
          [],
        ],
        view,
      },
      Scene.with("apple"),
      Scene.expect(Scene.role("combobox", { name: "Fruit" })).toHaveValue(
        "apple"
      ),
      Scene.change(Scene.role("combobox", { name: "Fruit" }), "banana"),
      Scene.expect(Scene.role("combobox", { name: "Fruit" })).toHaveValue(
        "banana"
      )
    );
  });
});
