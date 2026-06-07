import { describe, expect, test } from "vitest";

import * as Slider from "./index";

describe("shadcn Slider registry view", () => {
  test("reuses the Foldkit Slider functional contract", () => {
    expect(Slider.init).toBeTypeOf("function");
    expect(Slider.update).toBeTypeOf("function");
    expect(Slider.sliderFieldView).toBeTypeOf("function");
    expect(Slider.shadcnSliderThumbClassName).toContain("rounded-full");
  });
});
