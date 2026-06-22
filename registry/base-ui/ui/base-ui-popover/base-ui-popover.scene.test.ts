import { describe, expect, test } from "vitest";

import * as Popover from "./index";

describe("Base UI Popover registry view", () => {
  test("reuses the Foldkit Popover functional contract", () => {
    expect(Popover.init).toBeTypeOf("function");
    expect(Popover.update).toBeTypeOf("function");
    expect(Popover.view).toBeTypeOf("function");
    expect(Popover.baseUiPopoverPanelClasses).toContain("rounded-lg");
  });
});
