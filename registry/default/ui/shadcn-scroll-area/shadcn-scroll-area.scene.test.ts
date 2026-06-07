import { describe, expect, test } from "vitest";

import * as ScrollArea from "./index";

describe("shadcn Scroll Area registry view", () => {
  test("reuses the Foldkit Scroll Area view contract", () => {
    expect(ScrollArea.rootView).toBeTypeOf("function");
    expect(ScrollArea.viewportView).toBeTypeOf("function");
    expect(ScrollArea.view).toBeTypeOf("function");
    expect(ScrollArea.shadcnScrollAreaRootClassName).toContain("overflow");
  });
});
