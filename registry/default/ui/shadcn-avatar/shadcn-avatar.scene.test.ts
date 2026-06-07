import { describe, expect, test } from "vitest";

import * as Avatar from "./index";

describe("shadcn Avatar registry view", () => {
  test("reuses the Foldkit Avatar view contract", () => {
    expect(Avatar.view).toBeTypeOf("function");
    expect(Avatar.rootView).toBeTypeOf("function");
    expect(Avatar.shadcnAvatarClassNameBySize()).toContain("rounded-full");
  });
});
