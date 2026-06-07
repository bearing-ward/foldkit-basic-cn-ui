import { describe, expect, test } from "vitest";

import * as RadioGroup from "./index";

describe("shadcn Radio Group registry view", () => {
  test("reuses the Foldkit Radio Group functional contract", () => {
    expect(RadioGroup.init).toBeTypeOf("function");
    expect(RadioGroup.create).toBeTypeOf("function");
    expect(RadioGroup.checkIcon).toBeTypeOf("function");
    expect(RadioGroup.shadcnRadioGroupVerticalOptionClassName).toContain(
      "data-[checked]"
    );
  });
});
