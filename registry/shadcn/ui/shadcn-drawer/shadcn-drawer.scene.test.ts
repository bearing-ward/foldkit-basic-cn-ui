import { describe, expect, test } from "vitest";

import * as Drawer from "./index";

describe("shadcn Drawer registry view", () => {
  test("reuses the Foldkit Drawer view contract", () => {
    expect(Drawer.rootView).toBeTypeOf("function");
    expect(Drawer.triggerView).toBeTypeOf("function");
    expect(Drawer.popupView).toBeTypeOf("function");
    expect(Drawer.shadcnDrawerPopupClassName).toContain("shadow");
  });
});
