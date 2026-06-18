import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as FormSchemaValidationExample from "./main";

describe("Base UI Form Schema Validation example", () => {
  test("validates Name and Age with effect Schema", () => {
    Scene.scene(
      {
        update: FormSchemaValidationExample.update,
        view: FormSchemaValidationExample.view,
      },
      Scene.with(FormSchemaValidationExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveValue(""),
      Scene.expect(Scene.role("textbox", { name: "Age" })).toHaveValue(""),
      Scene.expect(Scene.placeholder("Enter name")).toExist(),
      Scene.expect(Scene.placeholder("Enter age")).toExist(),
      Scene.click(Scene.role("button", { name: "Submit" })),
      Scene.expect(Scene.text("Name is required")).toExist(),
      Scene.expect(Scene.text("Age must be a number")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada"),
      Scene.type(Scene.role("textbox", { name: "Age" }), "-1"),
      Scene.click(Scene.role("button", { name: "Submit" })),
      Scene.expect(Scene.text("Name is required")).not.toExist(),
      Scene.expect(Scene.text("Age must be a positive number")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Age" }), "42"),
      Scene.expect(Scene.text("Age must be a positive number")).not.toExist()
    );
  });
});
