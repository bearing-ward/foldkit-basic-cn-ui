import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Card Image example", () => {
  test("renders the origin image card content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Featured")).toExist(),
      Scene.expect(Scene.text("Design systems meetup")).toExist(),
      Scene.expect(Scene.role("img", { name: "Event cover" })).toExist(),
      Scene.expect(Scene.role("button", { name: "View Event" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "View Event" })
      ).not.toHaveHandler("click")
    );
  });
});
