import { Option } from "effect";
import { Story } from "foldkit";
import { describe, expect, test } from "vitest";

import {
  ClearedApiReferenceCategory,
  init,
  SelectedApiReferenceCategory,
  SelectedApiReferenceGroup,
  update,
  UpdatedApiReferenceQuery,
} from "./apiReference";
import { baseUiAvatarDocumentation } from "./referenceData";

describe("API reference widget update", () => {
  test("selects the first group during init", () => {
    const [model] = init(baseUiAvatarDocumentation.apiReference);

    expect(model.selectedGroupId).toBe("view-helpers");
  });

  test("selecting a group changes group and clears category", () => {
    const [model] = init(baseUiAvatarDocumentation.apiReference);

    Story.story(
      update,
      Story.with(model),
      Story.message(
        SelectedApiReferenceCategory({ category: "Rendering" })
      ),
      Story.message(
        SelectedApiReferenceGroup({ groupId: "class-hooks" })
      ),
      Story.model((updatedModel) => {
        expect(updatedModel.selectedGroupId).toBe("class-hooks");
        expect(Option.isNone(updatedModel.maybeSelectedCategory)).toBe(true);
      })
    );
  });

  test("selecting a category stores the selected category", () => {
    const [model] = init(baseUiAvatarDocumentation.apiReference);

    Story.story(
      update,
      Story.with(model),
      Story.message(
        SelectedApiReferenceCategory({ category: "Styling" })
      ),
      Story.model((updatedModel) => {
        expect(updatedModel.maybeSelectedCategory).toEqual(
          Option.some("Styling")
        );
      })
    );
  });

  test("clearing a category removes the selected category", () => {
    const [model] = init(baseUiAvatarDocumentation.apiReference);

    Story.story(
      update,
      Story.with(model),
      Story.message(
        SelectedApiReferenceCategory({ category: "Styling" })
      ),
      Story.message(ClearedApiReferenceCategory()),
      Story.model((updatedModel) => {
        expect(Option.isNone(updatedModel.maybeSelectedCategory)).toBe(true);
      })
    );
  });

  test("updating query stores the filter text", () => {
    const [model] = init(baseUiAvatarDocumentation.apiReference);

    Story.story(
      update,
      Story.with(model),
      Story.message(UpdatedApiReferenceQuery({ value: "aria" })),
      Story.model((updatedModel) => {
        expect(updatedModel.query).toBe("aria");
      })
    );
  });
});
