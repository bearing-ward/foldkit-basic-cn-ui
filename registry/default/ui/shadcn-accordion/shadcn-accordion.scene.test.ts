import { describe, expect, test } from "vitest";

import * as Accordion from "./index";

describe("shadcn Accordion registry view", () => {
  test("reuses the Foldkit Accordion view contract", () => {
    expect(Accordion.rootView).toBeTypeOf("function");
    expect(Accordion.itemView).toBeTypeOf("function");
    expect(Accordion.toggleValue(["one"], "one")).toEqual([]);
    expect(Accordion.shadcnAccordionTriggerClassName).toContain("font-medium");
  });
});
