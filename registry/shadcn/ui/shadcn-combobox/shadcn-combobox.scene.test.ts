import { describe, expect, test } from "vitest";

import * as Combobox from "./index";

describe("shadcn Combobox registry view", () => {
  test("reuses the Foldkit Combobox functional contract", () => {
    expect(Combobox.init).toBeTypeOf("function");
    expect(Combobox.create).toBeTypeOf("function");
    expect(Combobox.Multi.create).toBeTypeOf("function");
    expect(Combobox.shadcnComboboxWrapperClasses).toContain("relative");
  });
});
