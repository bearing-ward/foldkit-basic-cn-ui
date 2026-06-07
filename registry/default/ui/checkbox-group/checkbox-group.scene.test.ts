import { Match as M, Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, expect, test } from "vitest";

import * as CheckboxGroup from "./index";

const ToggledValue = m("ToggledValue", { value: S.String });
const ToggledAll = m("ToggledAll");
const Message = S.Union([ToggledValue, ToggledAll]);
type Message = typeof Message.Type;

type Model = Readonly<{
  selectedValues: readonly string[];
}>;

const allValues = ["fuji-apple", "gala-apple", "granny-smith-apple"];

const update = (
  model: Model,
  message: Message
): readonly [Model, readonly []] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly []]>(),
    M.tagsExhaustive({
      ToggledValue: ({ value }) => [
        evo(model, {
          selectedValues: (selectedValues) =>
            CheckboxGroup.toggleValue(selectedValues, value),
        }),
        [],
      ],
      ToggledAll: () => [
        evo(model, {
          selectedValues: (selectedValues) =>
            CheckboxGroup.parentState(selectedValues, allValues) === "checked"
              ? []
              : allValues,
        }),
        [],
      ],
    })
  );

const view = (model: Model): Html =>
  CheckboxGroup.groupView<Message>({
    label: "Apples",
    labelId: "apples-label",
    children: [
      CheckboxGroup.parentItemView<Message>({
        selectedValues: model.selectedValues,
        allValues,
        label: "All apples",
        onValueChange: ToggledAll(),
      }),
      CheckboxGroup.itemView<Message>({
        value: "fuji-apple",
        selectedValues: model.selectedValues,
        label: "Fuji",
        onValueChange: ToggledValue({ value: "fuji-apple" }),
      }),
      CheckboxGroup.itemView<Message>({
        value: "gala-apple",
        selectedValues: model.selectedValues,
        label: "Gala",
        onValueChange: ToggledValue({ value: "gala-apple" }),
      }),
      CheckboxGroup.itemView<Message>({
        value: "granny-smith-apple",
        selectedValues: model.selectedValues,
        label: "Granny Smith",
        onValueChange: ToggledValue({ value: "granny-smith-apple" }),
      }),
    ],
  });

describe("Checkbox Group registry view", () => {
  test("renders Base UI group anatomy and toggles values", () => {
    Scene.scene(
      { update, view },
      Scene.with({ selectedValues: ["fuji-apple"] }),
      Scene.expect(Scene.role("group", { name: "Apples" })).toExist(),
      Scene.expect(Scene.role("checkbox", { name: "Fuji" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(Scene.role("checkbox", { name: "Gala" })).toHaveAttr(
        "aria-checked",
        "false"
      ),
      Scene.expect(Scene.role("checkbox", { name: "All apples" })).toHaveAttr(
        "aria-checked",
        "mixed"
      ),
      Scene.click(Scene.text("Gala")),
      Scene.expect(Scene.role("checkbox", { name: "Gala" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(Scene.role("checkbox", { name: "All apples" })).toHaveAttr(
        "aria-checked",
        "mixed"
      ),
      Scene.click(Scene.text("All apples")),
      Scene.expect(Scene.role("checkbox", { name: "Granny Smith" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(Scene.role("checkbox", { name: "All apples" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });

  test("computes next array values and parent state", () => {
    expect(CheckboxGroup.toggleValue(["fuji-apple"], "gala-apple")).toEqual([
      "fuji-apple",
      "gala-apple",
    ]);
    expect(
      CheckboxGroup.toggleValue(["fuji-apple", "gala-apple"], "fuji-apple")
    ).toEqual(["gala-apple"]);
    expect(CheckboxGroup.parentState([], allValues)).toBe("unchecked");
    expect(CheckboxGroup.parentState(["fuji-apple"], allValues)).toBe(
      "indeterminate"
    );
    expect(CheckboxGroup.parentState(allValues, allValues)).toBe("checked");
  });
});
