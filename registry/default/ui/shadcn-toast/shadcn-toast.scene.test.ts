import { describe, expect, test } from "vitest";

import * as Toast from "./index";

describe("shadcn Toast registry view", () => {
  test("reuses the Foldkit Toast functional contract", () => {
    expect(Toast.init).toBeTypeOf("function");
    expect(Toast.show).toBeTypeOf("function");
    expect(Toast.shadcnToastEntryView).toBeTypeOf("function");
    expect(Toast.shadcnToastClassName).toContain("data-[closed]");
  });
});
