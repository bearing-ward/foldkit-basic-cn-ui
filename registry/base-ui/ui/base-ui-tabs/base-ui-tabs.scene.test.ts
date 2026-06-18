import { describe, expect, test } from "vitest";

import * as Tabs from "./index";

describe("Base UI Tabs registry view", () => {
  test("reuses the Foldkit Tabs functional contract", () => {
    expect(Tabs.init).toBeTypeOf("function");
    expect(Tabs.create).toBeTypeOf("function");
    expect(Tabs.baseUiTabsView).toBeTypeOf("function");
    expect(Tabs.baseUiTabsTabClassName).toContain("data-[selected]");
  });
});
