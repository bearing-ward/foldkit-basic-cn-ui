import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnFieldBasicExample from "./main";

describe("Shadcn Field Basic example", () => {
  test("shows validation feedback for empty and filled values", () => {
    Scene.scene(
      {
        update: ShadcnFieldBasicExample.update,
        view: ShadcnFieldBasicExample.view,
      },
      Scene.with(ShadcnFieldBasicExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveAttr(
        "placeholder",
        "Required"
      ),
      Scene.expect(Scene.text("Visible on your profile")).toExist(),
      Scene.expect(Scene.text("Please enter your name")).not.toExist(),
      Scene.expect(Scene.text("Name looks good")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Validate" })),
      Scene.expect(Scene.text("Please enter your name")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada Lovelace"),
      Scene.expect(Scene.text("Please enter your name")).not.toExist(),
      Scene.expect(Scene.text("Name looks good")).toExist()
    );
  });

  test("shows success feedback when validating a filled value first", () => {
    Scene.scene(
      {
        update: ShadcnFieldBasicExample.update,
        view: ShadcnFieldBasicExample.view,
      },
      Scene.with(ShadcnFieldBasicExample.init()[0]),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada Lovelace"),
      Scene.expect(Scene.text("Name looks good")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Validate" })),
      Scene.expect(Scene.text("Please enter your name")).not.toExist(),
      Scene.expect(Scene.text("Name looks good")).toExist()
    );
  });
});
