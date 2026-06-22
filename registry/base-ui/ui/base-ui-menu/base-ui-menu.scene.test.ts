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
    expect(Menu.baseUiMenuTriggerClasses).toContain("inline-flex");
    expect(Menu.baseUiMenuRootClasses).toContain("relative");
    expect(Menu.baseUiMenuPopupClasses).toContain("rounded");
    expect(Menu.baseUiMenuAnimatedPopupClasses).toContain("transition");
    expect(Menu.baseUiMenuItemClasses).toContain("data-[active]");
    expect(Menu.baseUiMenuBackdropClasses).toContain("fixed");
    expect(Menu.baseUiMenuDefaultAnchor).toEqual({
      placement: "bottom-start",
      gap: 4,
      padding: 8,
    });
  });
});
