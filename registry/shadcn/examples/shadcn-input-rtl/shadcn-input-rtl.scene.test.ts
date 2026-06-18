import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnInputRtlExample from "./main";

describe("Shadcn Input RTL example", () => {
  test("renders and updates email input in RTL context", () => {
    Scene.scene(
      {
        update: ShadcnInputRtlExample.update,
        view: ShadcnInputRtlExample.view,
      },
      Scene.with(ShadcnInputRtlExample.init()[0]),
      Scene.expect(
        Scene.role("textbox", { name: "البريد الإلكتروني" })
      ).toHaveAttr("placeholder", "البريد الإلكتروني"),
      Scene.type(
        Scene.role("textbox", { name: "البريد الإلكتروني" }),
        "m@example.com"
      ),
      Scene.expect(
        Scene.role("textbox", { name: "البريد الإلكتروني" })
      ).toHaveAttr("value", "m@example.com")
    );
  });
});
