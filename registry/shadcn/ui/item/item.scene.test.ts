import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Item from "./index";

describe("Item registry view", () => {
  test("renders item anatomy", () => {
    const view = (): Html =>
      Item.view<never>({
        variant: "outline",
        children: [
          Item.mediaView<never>({ variant: "icon", children: ["✓"] }),
          Item.contentView<never>({
            children: [
              Item.titleView<never>({ children: ["Verified"] }),
              Item.descriptionView<never>({
                children: ["Your profile has been verified."],
              }),
            ],
          }),
        ],
      });

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Verified")).toExist(),
      Scene.expect(Scene.text("Your profile has been verified.")).toExist()
    );
  });
});
