import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as Field from ".";

const view = (value: string, touched = false) => {
  const h = html<string>();
  const invalid = touched && value === "";
  const errorId = "name-error";
  const descriptionId = "name-description";

  return Field.rootView<string>({
    name: "name",
    required: true,
    invalid,
    touched,
    filled: value !== "",
    children: [
      Field.labelView({ forId: "name", children: [h.span([], ["Name"])] }),
      Field.controlView({
        id: "name",
        ariaLabel: "Name",
        name: "name",
        value,
        onInput: (nextValue) => nextValue,
        placeholder: "Required",
        required: true,
        invalid,
        touched,
        filled: value !== "",
        describedByIds: [errorId, descriptionId],
      }),
      Field.errorView({
        id: errorId,
        show: invalid,
        children: [h.span([], ["Please enter your name"])],
      }),
      Field.descriptionView({
        id: descriptionId,
        children: [h.span([], ["Visible on your profile"])],
      }),
      Field.validityView([h.span([], [invalid ? "Invalid" : "Valid"])]),
    ],
  });
};

describe("Field registry component", () => {
  test("links label, description, error, and input state", () => {
    Scene.scene(
      {
        update: (model: string, message: string) => [message, []] as const,
        view: (value) => view(value, true),
      },
      Scene.with(""),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveAttr(
        "aria-describedby",
        "name-error name-description"
      ),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveAttr(
        "aria-invalid",
        "true"
      ),
      Scene.expect(Scene.text("Please enter your name")).toExist(),
      Scene.expect(Scene.text("Visible on your profile")).toExist()
    );
  });

  test("omits error content when valid", () => {
    Scene.scene(
      {
        update: (model: string, message: string) => [message, []] as const,
        view: (value) => view(value, true),
      },
      Scene.with("Ada Lovelace"),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveAttr(
        "aria-invalid",
        "false"
      ),
      Scene.expect(Scene.text("Please enter your name")).not.toExist()
    );
  });

  test("exports Base UI state class hooks", () => {
    expect(Field.fieldControlClassName).toContain("aria-[invalid=true]");
    expect(Field.fieldErrorClassName).toContain("text-red");
  });
});
