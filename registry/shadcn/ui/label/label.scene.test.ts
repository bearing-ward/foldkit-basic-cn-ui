import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Label from "./index";

const view = (): Html => {
  const h = html<never>();

  return h.div(
    [],
    [
      Label.view({ forId: "email", required: true, children: "Email" }),
      h.input([h.Id("email"), h.Type("email")]),
      Label.view({ disabled: true, children: "Disabled label" }),
    ]
  );
};

describe("Label registry view", () => {
  test("renders the documented native label surface", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toExist(),
      Scene.expect(Scene.text("Email")).toHaveAttr("data-required", "true"),
      Scene.expect(Scene.text("Disabled label")).toHaveAttr(
        "data-disabled",
        "true"
      )
    );
  });
});
