import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Tabs from "../../ui/base-ui-tabs";
import * as ScrollAreaTabsExample from "./main";

const resolveFocusTab = (index: number) =>
  Scene.Command.resolve(
    Tabs.FocusTab({ id: "scroll-area-tabs", index }),
    Tabs.CompletedFocusTab(),
    (message) => ScrollAreaTabsExample.GotTabsMessage({ message })
  );

describe("Base UI Scroll Area Tabs example", () => {
  test("renders scrollable tab panels", () => {
    Scene.scene(
      {
        update: ScrollAreaTabsExample.update,
        view: ScrollAreaTabsExample.view,
      },
      Scene.with(ScrollAreaTabsExample.init()[0]),
      Scene.expect(Scene.role("tab", { name: "Account" })).toExist(),
      Scene.expect(
        Scene.role("region", { name: "Account settings" })
      ).toExist(),
      Scene.click(Scene.role("tab", { name: "Notifications" })),
      resolveFocusTab(2),
      Scene.expect(
        Scene.role("region", { name: "Notifications settings" })
      ).toExist(),
      Scene.expect(Scene.text("Security alerts")).toExist()
    );
  });
});
