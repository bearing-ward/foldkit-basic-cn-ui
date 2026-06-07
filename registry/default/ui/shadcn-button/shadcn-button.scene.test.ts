import { describe, expect, test } from "vitest";

import * as Button from "./index";

describe("shadcn Button registry view", () => {
  test("reuses the Foldkit Button functional contract", () => {
    expect(Button.view).toBeTypeOf("function");
    expect(Button.shadcnButtonClassName).toContain("rounded");
    expect(Button.shadcnDestructiveButtonClassName).toContain("red");
  });
});
