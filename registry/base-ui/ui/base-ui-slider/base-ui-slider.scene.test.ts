import { describe, expect, test } from "vitest";

import * as Slider from "./index";

describe("Base UI Slider registry view", () => {
  test("reuses the Foldkit Slider functional contract", () => {
    expect(Slider.init).toBeTypeOf("function");
    expect(Slider.update).toBeTypeOf("function");
    expect(Slider.view).toBeTypeOf("function");
    expect(Slider.baseUiSliderRootClassName).toContain("relative");
  });
});
