import { describe, expect, test } from "vitest";

import * as Checkbox from "./index";

describe("shadcn Checkbox registry view", () => {
  test("reuses the Foldkit Checkbox functional contract", () => {
    expect(Checkbox.init).toBeTypeOf("function");
    expect(Checkbox.update).toBeTypeOf("function");
    expect(Checkbox.view).toBeTypeOf("function");
    expect(Checkbox.shadcnCheckboxControlClassName).toContain("rounded");
  });
});
