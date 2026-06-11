import { describe, expect, test } from "vitest";

import { scrollAreaScrollbarClassName } from "../scroll-area";
import * as ScrollArea from "./index";

describe("shadcn Scroll Area registry view", () => {
  test("exports the Foldkit Scroll Area view contract", () => {
    expect(ScrollArea.rootView).toBeTypeOf("function");
    expect(ScrollArea.viewportView).toBeTypeOf("function");
    expect(ScrollArea.view).toBeTypeOf("function");
    expect(ScrollArea.shadcnScrollAreaRootClassName).toBe(
      "relative overflow-hidden"
    );
  });

  test("uses shadcn indicator styling instead of the base scrollbar lane", () => {
    expect(ScrollArea.shadcnScrollAreaViewportClassName).toContain(
      "[scrollbar-width:none]"
    );
    expect(ScrollArea.shadcnScrollAreaViewportClassName).toContain(
      "focus-visible:ring-[3px]"
    );
    expect(ScrollArea.shadcnScrollAreaScrollbarClassName).toContain(
      "flex touch-none select-none p-px transition-colors"
    );
    expect(ScrollArea.shadcnScrollAreaScrollbarClassName).toContain(
      "h-full w-2.5 border-l border-l-transparent"
    );
    expect(ScrollArea.shadcnScrollAreaThumbClassName).toContain("flex-1");
    expect(ScrollArea.shadcnScrollAreaThumbClassName).toContain("bg-gray-200");
    expect(ScrollArea.shadcnScrollAreaScrollbarClassName).not.toEqual(
      scrollAreaScrollbarClassName
    );
  });
});
