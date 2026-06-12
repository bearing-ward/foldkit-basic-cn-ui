import { describe, expect, test } from "vitest";

import * as Menu from "./index";

describe("Base UI Menu registry view", () => {
  test("reuses the Foldkit Menu functional contract", () => {
    expect(Menu.init).toBeTypeOf("function");
    expect(Menu.create).toBeTypeOf("function");
    expect(Menu.Message).toBeTypeOf("object");
    expect(Menu.Selected).toBeTypeOf("function");
    expect(Menu.AnchorMenu).toBeTypeOf("function");
    expect(Menu.PortalMenuBackdrop).toBeTypeOf("function");
    expect(Menu.FocusItems).toBeTypeOf("function");
    expect(Menu.FocusButton).toBeTypeOf("function");
  });

  test("exports Base UI class aliases for trigger, popup, item, and backdrop anatomy", () => {
    expect(Menu.baseUiMenuTriggerClassName).toContain("inline-flex");
    expect(Menu.baseUiMenuRootClassName).toContain("relative");
    expect(Menu.baseUiMenuPopupClassName).toContain("rounded");
    expect(Menu.baseUiMenuAnimatedPopupClassName).toContain("transition");
    expect(Menu.baseUiMenuItemClassName).toContain("data-[active]");
    expect(Menu.baseUiMenuBackdropClassName).toContain("fixed");
    expect(Menu.baseUiMenuDefaultAnchor).toEqual({
      placement: "bottom-start",
      gap: 4,
      padding: 8,
    });
  });
});
