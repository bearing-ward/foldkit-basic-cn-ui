import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "../wipSpace/anatomy-xray/main";

describe("Anatomy x-ray scene", () => {
  test("renders the title, summary, controls, metadata, and preview map", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.text("Base UI Avatar Anatomy")).toExist(),
      Scene.expect(
        Scene.text("Inspect the explicit parts, classes, attributes", {
          exact: false,
        })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Inspect Avatar root span" })
      ).toExist(),
      Scene.expect(Scene.text("rounded-full", { exact: false })).toExist(),
      Scene.expect(Scene.text('alt="Lena Taylor"', { exact: false })).toExist(),
      Scene.expect(Scene.selector('[data-xray-part="avatar-root"]')).toHaveAttr(
        "data-xray-part",
        "avatar-root"
      )
    );
  });

  test("clicking and focusing parts changes the details panel", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(
        Scene.text("The group container arranges avatar roots", {
          exact: false,
        })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Inspect Avatar root span" })),
      Scene.expect(
        Scene.text("The root span establishes", {
          exact: false,
        })
      ).toExist(),
      Scene.focus(Scene.role("button", { name: "Inspect Avatar image img" })),
      Scene.expect(
        Scene.text("The image fills the root circle", {
          exact: false,
        })
      ).toExist(),
      Scene.expect(Scene.text('alt="Lena Taylor"', { exact: false })).toExist()
    );
  });
});
