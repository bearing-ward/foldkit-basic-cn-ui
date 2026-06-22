import { describe, expect, test } from "vitest";

import * as Fieldset from "./index";

describe("Base UI Fieldset registry view", () => {
  test("reuses the Foldkit Fieldset functional contract", () => {
    expect(Fieldset.view).toBeTypeOf("function");
    expect(Fieldset.legendId).toBeTypeOf("function");
    expect(Fieldset.baseUiFieldsetRootClasses).toContain("rounded-lg");
  });
});
