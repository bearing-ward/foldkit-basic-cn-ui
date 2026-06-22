import { describe, expect, test } from "vitest";

import * as Input from "./index";

describe("Base UI Input registry view", () => {
  test("reuses the Foldkit Input functional contract", () => {
    expect(Input.view).toBeTypeOf("function");
    expect(Input.descriptionId).toBeTypeOf("function");
    expect(Input.baseUiInputControlClasses).toContain("border");
  });
});
