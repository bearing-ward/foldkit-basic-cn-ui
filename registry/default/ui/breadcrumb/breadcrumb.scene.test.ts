import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Breadcrumb from "./index";

describe("Breadcrumb registry view", () => {
  test("renders hierarchy links and current page", () => {
    const view = (): Html =>
      Breadcrumb.view<never>([
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Breadcrumb" },
      ]);

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("navigation", { name: "breadcrumb" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Home" })).toHaveAttr(
        "href",
        "/"
      ),
      Scene.expect(Scene.text("Breadcrumb")).toHaveAttr("aria-current", "page")
    );
  });

  test("renders ellipsis and custom separator as inert content", () => {
    const view = (): Html =>
      Breadcrumb.rootView<never>({
        children: [
          Breadcrumb.listView<never>({
            children: [
              Breadcrumb.itemView<never>({
                children: [Breadcrumb.ellipsisView<never>()],
              }),
              Breadcrumb.separatorView<never>({ children: ["/"] }),
              Breadcrumb.itemView<never>({
                children: [
                  Breadcrumb.pageView<never>({ children: ["Breadcrumb"] }),
                ],
              }),
            ],
          }),
        ],
      });

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("img", { name: "More" })).toExist(),
      Scene.expect(Scene.text("/")).not.toHaveHandler("click")
    );
  });
});
