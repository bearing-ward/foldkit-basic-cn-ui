import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnDrawerScrollableContentExample from "./main";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

describe("shadcn Drawer Scrollable Content example", () => {
  test("opens the scrollable goal drawer and closes from the footer action", () => {
    Scene.scene(
      {
        update: ShadcnDrawerScrollableContentExample.update,
        view: ShadcnDrawerScrollableContentExample.view,
      },
      Scene.with(ShadcnDrawerScrollableContentExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Scrollable Content" })),
      Scene.expect(Scene.role("dialog", { name: "Move Goal" })).toExist(),
      Scene.expect(Scene.text("Set your daily activity goal.")).toExist(),
      Scene.expect(Scene.text(`10. ${loremIpsum}`)).toExist(),
      Scene.click(Scene.role("button", { name: "Cancel" })),
      Scene.expect(Scene.role("dialog", { name: "Move Goal" })).not.toExist()
    );
  });
});
