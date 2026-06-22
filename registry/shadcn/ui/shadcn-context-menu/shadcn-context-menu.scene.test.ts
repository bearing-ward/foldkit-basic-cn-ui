import { describe, expect, test } from "vitest";

import * as ContextMenu from "./index";

describe("shadcn Context Menu registry view", () => {
  test("reuses the Foldkit Context Menu view contract", () => {
    expect(ContextMenu.rootView).toBeTypeOf("function");
    expect(ContextMenu.triggerView).toBeTypeOf("function");
    expect(ContextMenu.itemView).toBeTypeOf("function");
    expect(ContextMenu.shadcnContextMenuPopupClasses).toContain("rounded");
  });
});
