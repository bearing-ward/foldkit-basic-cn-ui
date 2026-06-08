import { describe, expect, test } from "vitest";

import * as Switch from "./index";

describe("shadcn Switch registry view", () => {
  test("reuses the Foldkit Switch functional contract", () => {
    expect(Switch.init).toBeTypeOf("function");
    expect(Switch.update).toBeTypeOf("function");
    expect(Switch.view).toBeTypeOf("function");
    expect(Switch.shadcnSwitchButtonClassName).toContain("data-[checked]");
  });
});
