import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as DataTable from "./index";

describe("DataTable registry view", () => {
  test("renders payment table anatomy", () => {
    const view = (): Html =>
      DataTable.paymentsTableView<never>({
        payments: DataTable.payments.slice(0, 2),
      });

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Status")).toExist(),
      Scene.expect(Scene.text("m@example.com")).toExist(),
      Scene.expect(Scene.text("$100.00")).toExist()
    );
  });

  test("filters, sorts, paginates, and selects rows", () => {
    expect(DataTable.filterPayments(DataTable.payments, "ken")).toHaveLength(1);
    expect(
      DataTable.sortPayments(DataTable.payments, {
        column: "amount",
        direction: "ascending",
      })[0]?.amount
    ).toBe(100);
    expect(
      DataTable.paginatePayments(DataTable.payments, {
        pageIndex: 1,
        pageSize: 3,
      })
    ).toHaveLength(3);
    expect(
      DataTable.selectedCount(
        DataTable.toggleRowSelection({}, DataTable.payments[0]?.id ?? "")
      )
    ).toBe(1);
  });
});
