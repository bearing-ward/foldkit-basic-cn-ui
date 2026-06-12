import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as DropdownMenu from "./index";

const view = (open: boolean): Html => {
  const h = html<string>();

  return DropdownMenu.rootView<string>({
    children: [
      DropdownMenu.triggerView<string>({
        open,
        onToggle: "toggle",
        children: [h.span([], ["Open"])],
      }),
      DropdownMenu.portalView<string>({
        open,
        children: [
          DropdownMenu.backdropView<string>({ onClose: "close" }),
          DropdownMenu.positionerView<string>({
            children: [
              DropdownMenu.popupView<string>({
                children: [
                  DropdownMenu.labelView<string>({
                    children: [h.span([], ["My Account"])],
                  }),
                  DropdownMenu.separatorView<string>({}),
                  DropdownMenu.itemView<string>({
                    onSelect: "profile",
                    children: [h.span([], ["Profile"])],
                  }),
                  DropdownMenu.itemView<string>({
                    onSelect: "billing",
                    children: [
                      h.span([], ["Billing"]),
                      DropdownMenu.shortcutView<string>("⌘B"),
                    ],
                  }),
                  DropdownMenu.separatorView<string>({}),
                  DropdownMenu.itemView<string>({
                    disabled: true,
                    onSelect: "disabled",
                    children: [h.span([], ["API"])],
                  }),
                  DropdownMenu.checkboxItemView<string>({
                    checked: true,
                    onSelect: "toggle-status",
                    children: [
                      DropdownMenu.itemIndicatorView<string>({
                        children: [h.span([], ["✓"])],
                      }),
                      h.span([], ["Status Bar"]),
                    ],
                  }),
                  DropdownMenu.radioGroupView<string>({
                    label: "Panel position",
                    children: [
                      DropdownMenu.radioItemView<string>({
                        checked: true,
                        onSelect: "panel-bottom",
                        children: [h.span([], ["Bottom"])],
                      }),
                    ],
                  }),
                  DropdownMenu.subTriggerView<string>({
                    open: true,
                    onOpen: "open-more-tools",
                    children: [h.span([], ["More Tools"]), h.span([], [">"])],
                  }),
                  DropdownMenu.subContentView<string>({
                    children: [
                      DropdownMenu.itemView<string>({
                        onSelect: "save-page",
                        children: [
                          DropdownMenu.iconView<string>({
                            children: [h.span([], ["□"])],
                          }),
                          h.span([], ["Save Page As..."]),
                        ],
                      }),
                    ],
                  }),
                  DropdownMenu.itemView<string>({
                    destructive: true,
                    onSelect: "delete",
                    children: [h.span([], ["Delete"])],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

describe("Dropdown Menu registry view", () => {
  test("renders a closed trigger", () => {
    Scene.scene(
      {
        update: (model: boolean): readonly [boolean, []] => [model, []],
        view,
      },
      Scene.with(false),
      Scene.expect(Scene.role("button", { name: "Open" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.role("menu")).toBeAbsent()
    );
  });

  test("renders open menu items, shortcuts, separators, and disabled state", () => {
    Scene.scene(
      {
        update: (model: boolean): readonly [boolean, []] => [model, []],
        view,
      },
      Scene.with(true),
      Scene.expect(Scene.role("button", { name: "Open" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.text("My Account")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Profile" })).toExist(),
      Scene.expect(Scene.text("⌘B")).toHaveAttr(
        "data-slot",
        "dropdown-menu-shortcut"
      ),
      Scene.expect(Scene.role("separator")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "API" })).toHaveAttr(
        "data-disabled",
        "true"
      ),
      Scene.expect(Scene.text("Status Bar")).toExist(),
      Scene.expect(Scene.role("menuitemcheckbox")).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(Scene.role("group", { name: "Panel position" })).toExist(),
      Scene.expect(Scene.role("menuitemradio", { name: "Bottom" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(Scene.text("More Tools")).toExist(),
      Scene.expect(Scene.text("Save Page As...")).toExist(),
      Scene.expect(Scene.text("□")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Delete" })).toHaveAttr(
        "data-variant",
        "destructive"
      )
    );
  });
});
