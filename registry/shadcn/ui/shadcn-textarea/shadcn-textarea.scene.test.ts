import { describe, expect, test } from "vitest";

import * as Textarea from "./index";

describe("shadcn Textarea registry view", () => {
  test("reuses the Foldkit Textarea view contract", () => {
    expect(Textarea.view).toBeTypeOf("function");
    expect(Textarea.descriptionId).toBeTypeOf("function");
    expect(Textarea.shadcnTextareaClasses).toContain("rounded");
  });
});
