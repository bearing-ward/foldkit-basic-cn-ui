import { describe, expect, test } from "vitest";

import * as Progress from "./index";

describe("shadcn Progress registry view", () => {
  test("reuses the Foldkit Progress view contract", () => {
    expect(Progress.rootView).toBeTypeOf("function");
    expect(Progress.indicatorView).toBeTypeOf("function");
    expect(Progress.progressPercent(50, 0, 100)).toBe(50);
    expect(Progress.shadcnProgressIndicatorClassName).toContain("transition");
  });
});
