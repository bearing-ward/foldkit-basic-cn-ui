import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as Form from ".";

const view = (value: string, invalid = false) => {
  const h = html<string>();

  return Form.rootView<string>({
    onSubmit: "submitted",
    invalid,
    children: [
      Form.fieldView({
        invalid,
        children: [
          Form.labelView({
            forId: "homepage",
            children: [h.span([], ["Homepage"])],
          }),
          Form.controlView({
            id: "homepage",
            name: "homepage",
            type: "url",
            value,
            onInput: (nextValue) => nextValue,
            ariaLabel: "Homepage",
            placeholder: "https://example.com",
            required: true,
            pattern: "https?://.*",
            describedById: "homepage-error",
            invalid,
          }),
          Form.errorView({
            id: "homepage-error",
            show: invalid,
            children: [h.span([], ["Use a domain other than example.com"])],
          }),
        ],
      }),
      Form.submitView({ children: [h.span([], ["Submit"])] }),
    ],
  });
};

describe("Base UI Form registry component", () => {
  test("renders labelled control, submit, and error state", () => {
    Scene.scene(
      {
        update: (model: string, message: string) => [message, []] as const,
        view: (value) => view(value, true),
      },
      Scene.with("https://example.com"),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveValue(
        "https://example.com"
      ),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveAttr(
        "aria-invalid",
        "true"
      ),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveAttr(
        "required",
        ""
      ),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveAttr(
        "pattern",
        "https?://.*"
      ),
      Scene.expect(Scene.text("Use a domain other than example.com")).toExist(),
      Scene.click(Scene.role("button", { name: "Submit" })),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveValue(
        "submitted"
      )
    );
  });

  test("exports Base UI form class hooks", () => {
    expect(Form.formRootClassName).toContain("grid");
    expect(Form.formControlClassName).toContain("aria-[invalid=true]");
  });
});
