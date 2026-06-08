import { describe, expect, test } from "vitest";

import * as Tabs from "./index";

describe("shadcn Tabs registry view", () => {
  test("reuses the Foldkit Tabs functional contract", () => {
    expect(Tabs.initialize).toBeTypeOf("function");
    expect(Tabs.create).toBeTypeOf("function");
    expect(Tabs.shadcnTabsView).toBeTypeOf("function");
    expect(Tabs.shadcnTabsTabClassName).toContain("data-[selected]");
  });
});
