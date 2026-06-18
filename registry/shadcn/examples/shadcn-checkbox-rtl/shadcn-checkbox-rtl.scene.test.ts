import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Checkbox RTL example", () => {
  test("renders the origin Arabic RTL checkbox demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "قبول الشروط والأحكام" })
      ).toExist(),
      Scene.expect(Scene.text("بالنقر على هذا المربع، فإنك توافق على الشروط.")).toExist(),
      Scene.expect(Scene.role("checkbox", { name: "تفعيل الإشعارات" })).toHaveAttr(
        "disabled",
        "true"
      )
    );
  });
});
