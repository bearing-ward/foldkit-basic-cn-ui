import { describe, expect, test } from "vitest";

import * as Menu from "./index";

describe("Base UI Menu registry view", () => {
  test("reuses the Foldkit Menu functional contract", () => {
    expect(Menu.init).toBeTypeOf("function");
    expect(Menu.create).toBeTypeOf("function");
    expect(Menu.Message).toBeTypeOf("object");
    expect(Menu.baseUiMenuPopupClassName).toContain("rounded");
  });
});
