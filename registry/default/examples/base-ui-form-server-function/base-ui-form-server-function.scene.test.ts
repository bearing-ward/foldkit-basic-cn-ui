import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as FormServerFunctionExample from "./main";

describe("Base UI Form Server Function example", () => {
  test("matches the Base UI server function username submission example", () => {
    Scene.scene(
      {
        update: FormServerFunctionExample.update,
        view: FormServerFunctionExample.view,
      },
      Scene.with(FormServerFunctionExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Username" })).toHaveValue(
        "admin"
      ),
      Scene.expect(Scene.placeholder("e.g. alice132")).toExist(),
      Scene.click(Scene.role("button", { name: "Submit" })),
      Scene.expect(Scene.text("This username is reserved")).toExist(),
      Scene.expect(Scene.role("button", { name: "Submit" })).toBeDisabled(),
      Scene.type(Scene.role("textbox", { name: "Username" }), "alice132"),
      Scene.expect(Scene.text("This username is reserved")).not.toExist()
    );
  });
});
