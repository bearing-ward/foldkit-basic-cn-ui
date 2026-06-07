import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Sidebar from "./index";

type Message = Readonly<{ readonly _tag: "ClickedDashboard" }>;

const view = (): Html => {
  const h = html<Message>();

  return Sidebar.view<Message>({
    state: "collapsed",
    items: [
      {
        label: "Dashboard",
        icon: "D",
        active: true,
        onClick: { _tag: "ClickedDashboard" },
      },
      { label: "Settings", icon: "S", href: "/settings" },
    ],
    children: [
      h.h2([h.Class("text-lg font-semibold text-gray-950")], ["Dashboard"]),
    ],
  });
};

describe("Sidebar registry view", () => {
  test("renders the shadcn sidebar anatomy and controlled collapsed state", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Acme Inc.")).toHaveAttr(
        "data-state",
        "collapsed"
      ),
      Scene.expect(Scene.text("Dashboard")).toHaveAttr(
        "data-slot",
        "sidebar-menu-label"
      ),
      Scene.expect(Scene.role("button", { name: "Dashboard" })).toHaveAttr(
        "data-active",
        "true"
      ),
      Scene.expect(Scene.role("button", { name: "Dashboard" })).toHaveAttr(
        "aria-current",
        "page"
      ),
      Scene.expect(Scene.role("button", { name: "Dashboard" })).toHaveHandler(
        "click"
      ),
      Scene.expect(Scene.role("link", { name: "Settings" })).toHaveAttr(
        "href",
        "/settings"
      )
    );
  });
});
