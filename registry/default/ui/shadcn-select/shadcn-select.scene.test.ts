import { Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { describe, expect, test } from "vitest";

import * as Select from "./index";

const ToggledSelect = m("ToggledSelect");
const SelectedPlan = m("SelectedPlan", { value: S.String });

type Message = typeof ToggledSelect.Type | typeof SelectedPlan.Type;

interface Model {
  readonly open: boolean;
  readonly value: string;
}

const update = (model: Model, message: Message): readonly [Model, []] => {
  if (message._tag === "ToggledSelect") {
    return [{ open: !model.open, value: model.value }, []];
  }

  return [{ open: false, value: message.value }, []];
};

const view = (model: Model): Html => {
  const h = html<Message>();

  return Select.rootView<Message>({
    children: [
      Select.triggerView<Message>({
        open: model.open,
        onToggle: ToggledSelect(),
        ariaLabel: "Plan",
        invalid: model.value === "",
        children: [
          Select.valueView<Message>({
            placeholder: model.value === "",
            children: [model.value === "" ? "Select a plan" : model.value],
          }),
          Select.iconView<Message>({ open: model.open }),
        ],
      }),
      Select.contentView<Message>({
        open: model.open,
        children: [
          Select.scrollButtonView<Message>({ direction: "up" }),
          Select.viewportView<Message>({
            children: [
              Select.groupView<Message>({
                children: [
                  Select.labelView<Message>({ children: ["Plans"] }),
                  Select.itemView<Message>({
                    selected: model.value === "Team",
                    onSelect: SelectedPlan({ value: "Team" }),
                    children: ["Team"],
                  }),
                  Select.itemView<Message>({
                    selected: model.value === "Enterprise",
                    onSelect: SelectedPlan({ value: "Enterprise" }),
                    children: ["Enterprise"],
                  }),
                ],
              }),
              Select.separatorView<Message>({}),
            ],
          }),
          Select.scrollButtonView<Message>({ direction: "down" }),
        ],
      }),
    ],
  });
};

describe("shadcn Select registry view", () => {
  test("keeps the native bridge exports available", () => {
    expect(Select.view).toBeTypeOf("function");
    expect(Select.descriptionId).toBeTypeOf("function");
  });

  test("renders composed shadcn select anatomy", () => {
    Scene.scene(
      { update, view },
      Scene.with({ open: false, value: "" }),
      Scene.expect(Scene.role("combobox", { name: "Plan" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.role("combobox", { name: "Plan" })).toHaveAttr(
        "aria-invalid",
        "true"
      ),
      Scene.expect(Scene.text("Select a plan")).toExist(),
      Scene.click(Scene.role("combobox", { name: "Plan" })),
      Scene.expect(Scene.role("listbox")).toExist(),
      Scene.expect(Scene.text("Plans")).toExist(),
      Scene.expect(Scene.role("option", { name: "Team" })).toHaveAttr(
        "aria-selected",
        "false"
      ),
      Scene.click(Scene.role("option", { name: "Team" })),
      Scene.expect(Scene.text("Team")).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Plan" })).toHaveAttr(
        "aria-expanded",
        "false"
      )
    );
  });
});
