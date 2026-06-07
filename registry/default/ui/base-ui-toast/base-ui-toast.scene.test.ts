import { describe, expect, test } from "vitest";

import * as Toast from "./index";

describe("Base UI Toast registry view", () => {
  test("reuses the Foldkit Toast functional contract", () => {
    expect(Toast.init).toBeTypeOf("function");
    expect(Toast.update).toBeTypeOf("function");
    expect(Toast.show).toBeTypeOf("function");
    expect(Toast.baseUiToastEntryView).toBeTypeOf("function");
  });
});
