import { describe, expect, test } from "vitest";

import * as Menubar from "./index";

describe("shadcn Menubar registry view", () => {
  test("reuses the Foldkit Menubar view contract", () => {
    expect(Menubar.rootView).toBeTypeOf("function");
    expect(Menubar.triggerView).toBeTypeOf("function");
    expect(Menubar.popupView).toBeTypeOf("function");
    expect(Menubar.shadcnMenubarRootClasses).toContain("border");
  });
});
