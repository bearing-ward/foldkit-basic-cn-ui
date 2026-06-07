import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as Autocomplete from ".";

const view = (query: string) => {
  const h = html<string>();

  return Autocomplete.rootView<string>({
    children: [
      Autocomplete.labelView({
        forId: "tag-search",
        children: [h.span([], ["Search tags"])],
      }),
      Autocomplete.inputView({
        id: "tag-search",
        value: query,
        onInput: (value) => value,
        ariaLabel: "Search tags",
        listId: "tag-list",
        placeholder: "e.g. feature",
      }),
      Autocomplete.listView({
        id: "tag-list",
        children: [
          Autocomplete.itemView({
            onClick: "feature",
            children: [h.span([], ["feature"])],
          }),
        ],
      }),
    ],
  });
};

describe("Autocomplete registry component", () => {
  test("renders combobox input and selectable list option", () => {
    Scene.scene(
      {
        update: (model: string, message: string) => [message, []] as const,
        view,
      },
      Scene.with(""),
      Scene.expect(Scene.role("combobox", { name: "Search tags" })).toHaveAttr(
        "placeholder",
        "e.g. feature"
      ),
      Scene.expect(Scene.role("option", { name: "feature" })).toExist(),
      Scene.click(Scene.role("option", { name: "feature" })),
      Scene.expect(Scene.role("combobox", { name: "Search tags" })).toHaveValue(
        "feature"
      )
    );
  });

  test("exports Base UI autocomplete class hooks", () => {
    expect(Autocomplete.autocompleteRootClassName).toContain("grid");
    expect(Autocomplete.autocompleteItemClassName).toContain("data-[selected]");
  });
});
