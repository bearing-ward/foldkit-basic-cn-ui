import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Sidebar from "./index";

type Message =
  | Readonly<{ readonly _tag: "ClickedDashboard" }>
  | Readonly<{ readonly _tag: "ClickedToggle" }>
  | Readonly<{ readonly _tag: "ClickedAddProject" }>
  | Readonly<{ readonly _tag: "ClickedProjectActions" }>
  | Readonly<{ readonly _tag: "UpdatedSearch"; readonly value: string }>;

const view = (): Html => {
  const h = html<Message>();

  return Sidebar.view<Message>({
    state: "collapsed",
    variant: "floating",
    collapsible: "icon",
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

const composedView = (): Html => {
  const h = html<Message>();

  return Sidebar.providerView<Message>({
    children: [
      Sidebar.sidebarView<Message>({
        state: "expanded",
        side: "right",
        variant: "inset",
        collapsible: "none",
        children: [
          Sidebar.headerView<Message>({
            children: [
              Sidebar.triggerView<Message>({
                label: "Toggle Sidebar",
                onClick: { _tag: "ClickedToggle" },
                children: ["T"],
              }),
              Sidebar.inputView<Message>({
                label: "Search projects",
                placeholder: "Search",
                value: "roadmap",
                onInput: (value) => ({ _tag: "UpdatedSearch", value }),
              }),
            ],
          }),
          Sidebar.separatorView<Message>(),
          Sidebar.contentView<Message>({
            children: [
              Sidebar.groupView<Message>({
                children: [
                  Sidebar.groupLabelView<Message>("Projects"),
                  Sidebar.groupActionView<Message>({
                    label: "Add project",
                    onClick: { _tag: "ClickedAddProject" },
                  }),
                  Sidebar.groupContentView<Message>({
                    children: [
                      Sidebar.menuView<Message>({
                        children: [
                          Sidebar.menuItemView<Message>({
                            children: [
                              Sidebar.menuButtonView<Message>({
                                item: {
                                  label: "Roadmap",
                                  icon: "R",
                                  active: true,
                                },
                              }),
                              Sidebar.menuActionView<Message>({
                                label: "Project actions",
                                onClick: { _tag: "ClickedProjectActions" },
                              }),
                              Sidebar.menuBadgeView<Message>({ label: "3" }),
                              Sidebar.menuSubView<Message>({
                                children: [
                                  Sidebar.menuSubItemView<Message>({
                                    children: [
                                      Sidebar.menuSubButtonView<Message>({
                                        label: "Milestones",
                                        href: "/milestones",
                                        active: true,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          Sidebar.menuItemView<Message>({
                            children: [Sidebar.menuSkeletonView<Message>()],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      Sidebar.insetView<Message>({
        children: [h.h2([h.Class("text-lg font-semibold")], ["Inbox"])],
      }),
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
      Scene.expect(Scene.role("complementary", { name: "Application sidebar" })).toHaveAttr(
        "data-variant",
        "floating"
      ),
      Scene.expect(Scene.role("complementary", { name: "Application sidebar" })).toHaveAttr(
        "data-collapsible",
        "icon"
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

  test("exposes provider and sidebar subcomponent slots", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view: composedView,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("complementary", { name: "Application sidebar" })).toHaveAttr(
        "data-side",
        "right"
      ),
      Scene.expect(Scene.role("complementary", { name: "Application sidebar" })).toHaveAttr(
        "data-variant",
        "inset"
      ),
      Scene.expect(Scene.role("complementary", { name: "Application sidebar" })).toHaveAttr(
        "data-collapsible",
        ""
      ),
      Scene.expect(Scene.role("button", { name: "Toggle Sidebar" })).toHaveAttr(
        "data-slot",
        "sidebar-trigger"
      ),
      Scene.expect(Scene.role("button", { name: "Toggle Sidebar" })).toHaveHandler(
        "click"
      ),
      Scene.expect(Scene.role("textbox", { name: "Search projects" })).toHaveAttr(
        "data-slot",
        "sidebar-input"
      ),
      Scene.expect(Scene.role("button", { name: "Add project" })).toHaveAttr(
        "data-slot",
        "sidebar-group-action"
      ),
      Scene.expect(Scene.role("button", { name: "Project actions" })).toHaveAttr(
        "data-slot",
        "sidebar-menu-action"
      ),
      Scene.expect(Scene.text("3")).toHaveAttr(
        "data-slot",
        "sidebar-menu-badge"
      ),
      Scene.expect(Scene.role("link", { name: "Milestones" })).toHaveAttr(
        "data-slot",
        "sidebar-menu-sub-button"
      ),
      Scene.expect(Scene.role("link", { name: "Milestones" })).toHaveAttr(
        "aria-current",
        "page"
      )
    );
  });
});
