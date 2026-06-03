import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as TabsManualExample from "./main";

describe("Tabs Manual example", () => {
  test("renders manual tabs with a disabled tab", () => {
    const [initialModel] = TabsManualExample.init();

    Scene.scene(
      { update: TabsManualExample.update, view: TabsManualExample.view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("tab", { name: "Preview" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(Scene.role("tab", { name: "Billing" })).toBeDisabled(),
      Scene.expect(Scene.text("Selected tab: Preview")).toExist()
    );
  });
});
