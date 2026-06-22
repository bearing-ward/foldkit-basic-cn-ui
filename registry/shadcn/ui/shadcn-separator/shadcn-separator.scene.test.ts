import { describe, expect, test } from "vitest";

import * as Separator from "./index";

describe("shadcn Separator registry view", () => {
  test("reuses the Foldkit Separator view contract", () => {
    expect(Separator.view).toBeTypeOf("function");
    expect(
      Separator.shadcnSeparatorClassesByOrientation("vertical")
    ).toContain("w-px");
    expect(Separator.shadcnSeparatorBaseClasses).toContain("shrink-0");
  });
});
