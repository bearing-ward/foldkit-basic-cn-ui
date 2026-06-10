import { describe, expect, test } from "vitest";

import { scrollAreaScrollbarClassName } from "../scroll-area";
import * as ScrollArea from "./index";

describe("shadcn Scroll Area registry view", () => {
  test("exports the Foldkit Scroll Area view contract", () => {
    expect(ScrollArea.rootView).toBeTypeOf("function");
    expect(ScrollArea.viewportView).toBeTypeOf("function");
    expect(ScrollArea.view).toBeTypeOf("function");
    expect(ScrollArea.shadcnScrollAreaRootClassName).toContain("overflow");
  });

  test("uses shadcn indicator styling instead of the base scrollbar lane", () => {
    expect(ScrollArea.shadcnScrollAreaViewportClassName).toContain(
      "[scrollbar-width:none]"
    );
    expect(ScrollArea.shadcnScrollAreaScrollbarClassName).toContain("flex");
    expect(ScrollArea.shadcnScrollAreaThumbClassName).toContain("flex-1");
    expect(ScrollArea.shadcnScrollAreaScrollbarClassName).not.toEqual(
      scrollAreaScrollbarClassName
    );
  });
});
