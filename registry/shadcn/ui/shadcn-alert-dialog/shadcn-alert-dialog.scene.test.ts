import { describe, expect, test } from "vitest";

import * as AlertDialog from "./index";

describe("shadcn AlertDialog registry view", () => {
  test("reuses the Foldkit AlertDialog view contract", () => {
    expect(AlertDialog.rootView).toBeTypeOf("function");
    expect(AlertDialog.contentView).toBeTypeOf("function");
    expect(AlertDialog.headerView).toBeTypeOf("function");
    expect(AlertDialog.footerView).toBeTypeOf("function");
    expect(AlertDialog.mediaView).toBeTypeOf("function");
    expect(AlertDialog.closeView).toBeTypeOf("function");
    expect(AlertDialog.shadcnAlertDialogPopupClassName).toContain("rounded");
    expect(AlertDialog.shadcnAlertDialogContentSmClassName).toContain(
      "max-w-xs"
    );
  });
});
