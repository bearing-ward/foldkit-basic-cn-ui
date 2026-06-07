import { describe, expect, test } from "vitest";

import * as RadioGroup from "./index";

describe("Base UI RadioGroup registry view", () => {
  test("reuses the Foldkit RadioGroup functional contract", () => {
    expect(RadioGroup.init).toBeTypeOf("function");
    expect(RadioGroup.create).toBeTypeOf("function");
    expect(RadioGroup.baseUiRadioGroupCheckIcon).toBeTypeOf("function");
    expect(RadioGroup.baseUiRadioGroupVerticalClassName).toContain("flex-col");
  });
});
