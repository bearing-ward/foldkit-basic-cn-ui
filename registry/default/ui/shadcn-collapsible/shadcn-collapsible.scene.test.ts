import { describe, expect, test } from "vitest";

import * as Collapsible from "./index";

describe("shadcn Collapsible registry view", () => {
  test("reuses the Foldkit Collapsible view contract", () => {
    expect(Collapsible.rootView).toBeTypeOf("function");
    expect(Collapsible.triggerView).toBeTypeOf("function");
    expect(Collapsible.panelView).toBeTypeOf("function");
    expect(Collapsible.shadcnCollapsibleTriggerClassName).toContain(
      "font-medium"
    );
  });
});
