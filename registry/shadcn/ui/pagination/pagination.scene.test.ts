import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Pagination from "./index";

const view = (): Html =>
  Pagination.rootView({
    children: [
      Pagination.contentView({
        children: [
          Pagination.itemView({
            children: [Pagination.previousView({ href: "/page/1" })],
          }),
          Pagination.itemView({
            children: [
              Pagination.linkView({
                href: "/page/1",
                label: "Page 1",
                children: ["1"],
              }),
            ],
          }),
          Pagination.itemView({
            children: [
              Pagination.linkView({
                href: "/page/2",
                label: "Page 2",
                active: true,
                children: ["2"],
              }),
            ],
          }),
          Pagination.itemView({
            children: [Pagination.ellipsisView()],
          }),
          Pagination.itemView({
            children: [Pagination.nextView({ href: "/page/3" })],
          }),
        ],
      }),
    ],
  });

describe("Pagination registry view", () => {
  test("renders the documented navigation surface", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("navigation", { name: "pagination" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Page 2" })).toHaveAttr(
        "aria-current",
        "page"
      ),
      Scene.expect(Scene.text("...")).not.toHaveHandler("click")
    );
  });
});
