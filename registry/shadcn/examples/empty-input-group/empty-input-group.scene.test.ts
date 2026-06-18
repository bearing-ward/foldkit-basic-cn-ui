import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as EmptyInputGroupExample from "./main";

describe("Empty Input Group example", () => {
  test("matches the upstream empty input-group example content", () => {
    Scene.scene(
      {
        update: EmptyInputGroupExample.update,
        view: EmptyInputGroupExample.view,
      },
      Scene.with(EmptyInputGroupExample.init()[0]),
      Scene.expect(Scene.text("404 - Not Found")).toExist(),
      Scene.expect(
        Scene.text(
          "The page you're looking for doesn't exist. Try searching for what you need below."
        )
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Search pages" })).toExist(),
      Scene.expect(Scene.text("/")).toExist(),
      Scene.expect(Scene.text("Contact support")).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Search pages" })
      ).not.toHaveHandler("click")
    );
  });
});
