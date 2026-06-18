import { describe, expect, test } from "vitest";

import * as Calendar from "./index";

describe("shadcn Calendar registry view", () => {
  test("reuses the Foldkit Calendar functional contract", () => {
    expect(Calendar.init).toBeTypeOf("function");
    expect(Calendar.update).toBeTypeOf("function");
    expect(Calendar.view).toBeTypeOf("function");
    expect(Calendar.shadcnCalendarView).toBeTypeOf("function");
  });
});
