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
  test("renders the origin account and password tabs", () => {
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
      Scene.expect(
        Scene.text("Make changes to your account here. Click save when you're done.")
      ).toExist(),
      Scene.expect(Scene.label("Name")).toHaveValue("Pedro Duarte"),
      Scene.expect(Scene.label("Username")).toHaveValue("@peduarte"),
      Scene.expect(Scene.role("button", { name: "Save changes" })).toExist(),
      Scene.expect(Scene.role("tab", { name: "Notifications" })).not.toExist(),
      Scene.click(Scene.role("tab", { name: "Password" })),
      resolveFocusTab(1),
      Scene.expect(Scene.role("tab", { name: "Password" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(
        Scene.text("Change your password here. After saving, you'll be logged out.")
      ).toExist(),
      Scene.expect(Scene.label("Current password")).toHaveValue(""),
      Scene.expect(Scene.label("New password")).toHaveValue(""),
      Scene.expect(Scene.role("button", { name: "Save password" })).toExist()
    );
  });
});
