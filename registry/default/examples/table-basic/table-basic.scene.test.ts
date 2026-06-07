import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as TableBasicExample from "./main";

describe("Table Basic example", () => {
  test("matches the shadcn invoice table example", () => {
    Scene.scene(
      {
        update: TableBasicExample.update,
        view: TableBasicExample.view,
      },
      Scene.with(TableBasicExample.init()[0]),
      Scene.expect(Scene.text("A list of your recent invoices.")).toExist(),
      Scene.expect(Scene.text("INV001")).toExist(),
      Scene.expect(Scene.text("Credit Card")).toExist(),
      Scene.expect(Scene.text("$2,500.00")).toExist(),
      Scene.expect(Scene.text("INV001")).not.toHaveHandler("click")
    );
  });
});
