import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Tabs from "../../ui/shadcn-tabs";
import * as ShadcnTabsBasicExample from "./main";

const resolveFocusTab = (index: number) =>
  Scene.Command.resolve(
    Tabs.FocusTab({ id: "shadcn-tabs-basic", index }),
    Tabs.CompletedFocusTab(),
    (message) => ShadcnTabsBasicExample.GotTabsMessage({ message })
  );

describe("shadcn Tabs Basic example", () => {
  test("selects a tab and emits parent-visible feedback", () => {
    const [initialModel] = ShadcnTabsBasicExample.init();

    Scene.scene(
      {
        update: ShadcnTabsBasicExample.update,
        view: ShadcnTabsBasicExample.view,
      },
      Scene.with(initialModel),
      Scene.expect(Scene.role("tab", { name: "Account" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(Scene.text("Selected tab: Account")).toExist(),
      Scene.click(Scene.role("tab", { name: "Notifications" })),
      resolveFocusTab(2),
      Scene.expect(Scene.role("tab", { name: "Notifications" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(Scene.text("Selected tab: Notifications")).toExist()
    );
  });
});
