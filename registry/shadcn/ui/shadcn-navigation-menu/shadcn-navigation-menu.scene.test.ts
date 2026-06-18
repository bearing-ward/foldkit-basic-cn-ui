import { describe, expect, test } from "vitest";

import * as NavigationMenu from "./index";

describe("shadcn Navigation Menu registry view", () => {
  test("reuses the Foldkit Navigation Menu view contract", () => {
    expect(NavigationMenu.rootView).toBeTypeOf("function");
    expect(NavigationMenu.triggerView).toBeTypeOf("function");
    expect(NavigationMenu.linkView).toBeTypeOf("function");
    expect(NavigationMenu.shadcnNavigationMenuPopupClassName).toContain(
      "shadow"
    );
  });
});
