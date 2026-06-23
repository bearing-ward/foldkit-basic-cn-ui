import { describe, expect, test } from "vitest";

import * as Separator from "./index";

describe("shadcn Separator registry view", () => {
  test("matches the current shadcn separator class contract", () => {
    expect(Separator.view).toBeTypeOf("function");
    expect(
      Separator.shadcnSeparatorClassesByOrientation("vertical")
    ).toBe(Separator.shadcnSeparatorBaseClasses);
    expect(Separator.shadcnSeparatorBaseClasses).toContain("bg-border");
    expect(Separator.shadcnSeparatorBaseClasses).toContain(
      "data-vertical:self-stretch"
    );
  });
});
