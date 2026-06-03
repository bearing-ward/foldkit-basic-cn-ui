import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Tabs from "../../ui/tabs";
import * as TabsBasicExample from "./main";

const resolveFocusTab = (index: number) =>
  Scene.Command.resolve(
    Tabs.FocusTab({ id: "tabs-basic", index }),
    Tabs.CompletedFocusTab(),
    (message) => TabsBasicExample.GotTabsMessage({ message })
  );

describe("Tabs Basic example", () => {
  test("selects a tab and emits parent-visible feedback", () => {
    const [initialModel] = TabsBasicExample.init();

    Scene.scene(
      { update: TabsBasicExample.update, view: TabsBasicExample.view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("tab", { name: "Overview" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(Scene.text("Selected tab: Overview")).toExist(),
      Scene.click(Scene.role("tab", { name: "Usage" })),
      resolveFocusTab(1),
      Scene.expect(Scene.role("tab", { name: "Usage" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(Scene.text("Selected tab: Usage")).toExist()
    );
  });
});
