import { describe, expect, test } from "vitest";

import * as Select from "./index";

describe("Base UI Select registry view", () => {
  test("reuses the Foldkit Select functional contract", () => {
    expect(Select.view).toBeTypeOf("function");
    expect(Select.descriptionId).toBeTypeOf("function");
    expect(Select.baseUiSelectControlClasses).toContain("rounded");
  });
});
