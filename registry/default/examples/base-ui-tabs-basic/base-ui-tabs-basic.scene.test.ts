import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Tabs from "../../ui/base-ui-tabs";
import * as BaseUiTabsBasicExample from "./main";

const resolveFocusTab = (index: number) =>
  Scene.Command.resolve(
    Tabs.FocusTab({ id: "tabs-basic", index }),
    Tabs.CompletedFocusTab(),
    (message) => BaseUiTabsBasicExample.GotTabsMessage({ message })
  );

describe("Base UI tabs Basic example", () => {
  test("selects a tab and updates the visible panel", () => {
    const [initialModel] = BaseUiTabsBasicExample.init();

    Scene.scene(
      {
        update: BaseUiTabsBasicExample.update,
        view: BaseUiTabsBasicExample.view,
      },
      Scene.with(initialModel),
      Scene.expect(Scene.role("tab", { name: "Overview" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(Scene.text("Workspace stats and activity.")).toExist(),
      Scene.click(Scene.role("tab", { name: "Projects" })),
      resolveFocusTab(1),
      Scene.expect(Scene.role("tab", { name: "Projects" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(Scene.text("Milestones and deadlines.")).toExist()
    );
  });
});
