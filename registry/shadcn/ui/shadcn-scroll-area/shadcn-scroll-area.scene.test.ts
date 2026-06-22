import { describe, expect, test } from "vitest";

import { scrollAreaScrollbarClasses } from "../../../base-ui/ui/scroll-area";
import * as ScrollArea from "./index";

describe("shadcn Scroll Area registry view", () => {
  test("exports the Foldkit Scroll Area view contract", () => {
    expect(ScrollArea.rootView).toBeTypeOf("function");
    expect(ScrollArea.viewportView).toBeTypeOf("function");
    expect(ScrollArea.view).toBeTypeOf("function");
    expect(ScrollArea.shadcnScrollAreaRootClasses).toBe(
      "relative overflow-hidden"
    );
  });

  test("uses shadcn indicator styling instead of the base scrollbar lane", () => {
    expect(ScrollArea.shadcnScrollAreaViewportClasses).toContain(
      "[scrollbar-width:none]"
    );
    expect(ScrollArea.shadcnScrollAreaViewportClasses).toContain(
      "focus-visible:ring-[3px]"
    );
    expect(ScrollArea.shadcnScrollAreaScrollbarClasses).toContain(
      "flex touch-none select-none p-px transition-colors"
    );
    expect(ScrollArea.shadcnScrollAreaScrollbarClasses).toContain(
      "h-full w-2.5 border-l border-l-transparent"
    );
    expect(ScrollArea.shadcnScrollAreaThumbClasses).toContain("flex-1");
    expect(ScrollArea.shadcnScrollAreaThumbClasses).toContain("bg-gray-200");
    expect(ScrollArea.shadcnScrollAreaScrollbarClasses).not.toEqual(
      scrollAreaScrollbarClasses
    );
  });
});
