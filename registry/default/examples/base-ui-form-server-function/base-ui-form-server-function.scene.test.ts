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
      Scene.expect(Scene.role("button", { name: "Submit" })).toBeDisabled(),
      Scene.Command.resolve(
        FormServerFunctionExample.SubmitUsername({ username: "admin" }),
        FormServerFunctionExample.SucceededSubmitUsername({
          error: "'admin' is reserved for system use",
        })
      ),
      Scene.expect(Scene.text("'admin' is reserved for system use")).toExist(),
      Scene.expect(Scene.role("button", { name: "Submit" })).not.toBeDisabled(),
      Scene.type(Scene.role("textbox", { name: "Username" }), "alice132"),
      Scene.expect(
        Scene.text("'admin' is reserved for system use")
      ).not.toExist()
    );
  });
});
