import { describe, expect, test } from "vitest";

import * as Popover from "./index";

describe("shadcn Popover registry view", () => {
  test("reuses the Foldkit Popover functional contract", () => {
    expect(Popover.init).toBeTypeOf("function");
    expect(Popover.update).toBeTypeOf("function");
    expect(Popover.trigger).toBeTypeOf("function");
    expect(Popover.shadcnPopoverPanelClassName).toContain("shadow");
  });
});
