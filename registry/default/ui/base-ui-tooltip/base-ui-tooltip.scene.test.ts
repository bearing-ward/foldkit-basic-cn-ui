import { describe, expect, test } from "vitest";

import * as Tooltip from "./index";

describe("Base UI Tooltip registry view", () => {
  test("reuses the Foldkit Tooltip functional contract", () => {
    expect(Tooltip.init).toBeTypeOf("function");
    expect(Tooltip.update).toBeTypeOf("function");
    expect(Tooltip.baseUiTooltipView).toBeTypeOf("function");
    expect(Tooltip.baseUiTooltipTriggerClassName).toContain("rounded-lg");
  });
});
