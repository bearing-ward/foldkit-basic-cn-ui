import { describe, expect, test } from "vitest";

import * as AlertDialog from "./index";

describe("shadcn AlertDialog registry view", () => {
  test("reuses the Foldkit AlertDialog view contract", () => {
    expect(AlertDialog.rootView).toBeTypeOf("function");
    expect(AlertDialog.popupView).toBeTypeOf("function");
    expect(AlertDialog.closeView).toBeTypeOf("function");
    expect(AlertDialog.shadcnAlertDialogPopupClassName).toContain("rounded");
  });
});
