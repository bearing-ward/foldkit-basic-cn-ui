import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Table from "./index";

const view = (): Html => Table.invoicesTableView<never>();

describe("Table registry view", () => {
  test("renders the shadcn invoice table anatomy", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("A list of your recent invoices.")).toHaveAttr(
        "data-slot",
        "table-caption"
      ),
      Scene.expect(Scene.text("Invoice")).toHaveAttr("data-slot", "table-head"),
      Scene.expect(Scene.text("INV001")).toHaveAttr("data-slot", "table-cell"),
      Scene.expect(Scene.text("$2,500.00")).toHaveAttr(
        "data-slot",
        "table-cell"
      )
    );
  });
});
