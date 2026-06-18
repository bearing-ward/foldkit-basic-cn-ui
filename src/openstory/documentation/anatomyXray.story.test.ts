import { Option } from "effect";
import { Story } from "foldkit";
import { describe, expect, test } from "vitest";

import {
  ClearedPart,
  FocusedPart,
  HoveredPart,
  SelectedPart,
  init,
  update,
} from "./anatomyXray";

describe("Anatomy x-ray update", () => {
  test("starts without an active part", () => {
    const [model] = init();

    expect(Option.isNone(model.maybeActivePartId)).toBe(true);
  });

  test("selects the hovered part", () => {
    const [model] = init();

    Story.story(
      update,
      Story.with(model),
      Story.message(HoveredPart({ partId: "avatar-root" })),
      Story.model((currentModel) => {
        expect(currentModel.maybeActivePartId).toEqual(
          Option.some("avatar-root")
        );
      })
    );
  });

  test("selects the focused part", () => {
    const [model] = init();

    Story.story(
      update,
      Story.with(model),
      Story.message(FocusedPart({ partId: "avatar-image" })),
      Story.model((currentModel) => {
        expect(currentModel.maybeActivePartId).toEqual(
          Option.some("avatar-image")
        );
      })
    );
  });

  test("selects the clicked part", () => {
    const [model] = init();

    Story.story(
      update,
      Story.with(model),
      Story.message(SelectedPart({ partId: "avatar-badge" })),
      Story.model((currentModel) => {
        expect(currentModel.maybeActivePartId).toEqual(
          Option.some("avatar-badge")
        );
      })
    );
  });

  test("clears the active part", () => {
    const [model] = update(init()[0], HoveredPart({ partId: "avatar-root" }));

    Story.story(
      update,
      Story.with(model),
      Story.message(ClearedPart()),
      Story.model((currentModel) => {
        expect(Option.isNone(currentModel.maybeActivePartId)).toBe(true);
      })
    );
  });
});
