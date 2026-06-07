import { Calendar } from "foldkit";
import { describe, expect, test } from "vitest";

import * as DatePicker from "./index";

describe("shadcn Date Picker registry view", () => {
  test("reuses the Foldkit Date Picker functional contract", () => {
    expect(DatePicker.init).toBeTypeOf("function");
    expect(DatePicker.update).toBeTypeOf("function");
    expect(DatePicker.formatDate(Calendar.make(2026, 4, 16))).toBe(
      "2026-04-16"
    );
    expect(DatePicker.shadcnDatePickerTriggerClassName).toContain("rounded");
  });
});
