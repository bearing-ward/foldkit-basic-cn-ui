import { describe, expect, test } from "vitest";

import * as Dialog from "./index";

describe("shadcn Dialog registry view", () => {
  test("reuses the Foldkit Dialog functional contract", () => {
    expect(Dialog.init).toBeTypeOf("function");
    expect(Dialog.update).toBeTypeOf("function");
    expect(Dialog.root).toBeTypeOf("function");
    expect(Dialog.headerView).toBeTypeOf("function");
    expect(Dialog.footerView).toBeTypeOf("function");
    expect(Dialog.shadcnDialogPanelClasses).toContain("rounded");
  });
});
