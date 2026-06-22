import { describe, expect, test } from "vitest";

import * as Combobox from "./index";

describe("Base UI Combobox registry view", () => {
  test("reuses the Foldkit Combobox functional contract", () => {
    expect(Combobox.init).toBeTypeOf("function");
    expect(Combobox.create).toBeTypeOf("function");
    expect(Combobox.Multi.create).toBeTypeOf("function");
    expect(Combobox.baseUiComboboxWrapperClasses).toContain("relative");
  });
});
