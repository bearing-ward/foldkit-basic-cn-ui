import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as Command from "./index";

const view = (query: string): Html =>
  Command.rootView<string>({
    children: [
      Command.inputView({
        value: query,
        onInput: (value) => value,
        listId: "command-list",
      }),
      Command.listView({
        attributes: [],
        children: Command.filterItems(Command.defaultItems, query).map((item) =>
          Command.itemView({
            item,
            selected: item.label === "Calendar",
            onSelect: item.label,
          })
        ),
      }),
    ],
  });

describe("Command registry view", () => {
  test("renders command input, list items, and shortcuts", () => {
    Scene.scene(
      {
        update: (_model: string, message: string): readonly [string, []] => [
          message,
          [],
        ],
        view,
      },
      Scene.with(""),
      Scene.expect(
        Scene.role("combobox", { name: "Command search" })
      ).toHaveAttr("placeholder", "Type a command or search..."),
      Scene.expect(Scene.role("option", { name: "Calendar" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(Scene.text("⌘P")).toHaveAttr(
        "data-slot",
        "command-shortcut"
      ),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "bill"),
      Scene.expect(Scene.text("Billing")).toExist(),
      Scene.expect(Scene.role("option", { name: "Calendar" })).toBeAbsent()
    );
  });

  test("filters command items by label and group", () => {
    expect(Command.filterItems(Command.defaultItems, "settings")).toHaveLength(
      3
    );
  });
});
