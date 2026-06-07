import { describe, expect, test } from "vitest";

import * as Select from "./index";

describe("shadcn Select registry view", () => {
  test("reuses the Foldkit Select view contract", () => {
    expect(Select.view).toBeTypeOf("function");
    expect(Select.descriptionId).toBeTypeOf("function");
    expect(Select.shadcnSelectClassName).toContain("rounded");
  });
});
