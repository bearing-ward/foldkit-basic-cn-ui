import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputGroupAlignExample from "./main";

describe("Input Group Align example", () => {
  test("renders all addon alignments", () => {
    Scene.scene(
      { update: InputGroupAlignExample.update, view: InputGroupAlignExample.view },
      Scene.with(InputGroupAlignExample.init()[0]),
      Scene.expect(Scene.text("https://")).toExist(),
      Scene.expect(Scene.text("www.")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Website" })).toExist(),
      Scene.expect(Scene.text(".com")).toExist(),
      Scene.expect(Scene.text("Enter your website URL")).not.toHaveHandler("click")
    );
  });
});
