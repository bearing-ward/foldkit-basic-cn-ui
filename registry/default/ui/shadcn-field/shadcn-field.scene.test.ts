import { describe, expect, test } from "vitest";

import * as Field from "./index";

describe("shadcn Field registry view", () => {
  test("reuses the Foldkit Field view contract", () => {
    expect(Field.rootView).toBeTypeOf("function");
    expect(Field.labelView).toBeTypeOf("function");
    expect(Field.controlView).toBeTypeOf("function");
    expect(Field.shadcnFieldControlClassName).toContain("aria-[invalid=true]");
  });
});
