import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "../wipSpace/anatomy-xray/main";

describe("Anatomy x-ray scene", () => {
  test("renders the title, summary, controls, overlay, and preview map", () => {
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
      Scene.expect(Scene.role("heading", { name: "X-ray" })).toExist(),
      Scene.expect(Scene.text("Rendered HTML map")).not.toExist(),
      Scene.expect(Scene.text("Preview map")).not.toExist(),
      Scene.expect(Scene.testId("anatomy-xray-preview")).toExist(),
      Scene.expect(Scene.testId("anatomy-xray-overlay")).toExist(),
      Scene.expect(
        Scene.testId("anatomy-xray-overlay-identity")
      ).toContainText("div"),
      Scene.expect(Scene.testId("anatomy-xray-overlay-styles")).toContainText(
        "No styles"
      ),
      Scene.expect(
        Scene.testId("anatomy-xray-overlay-attributes")
      ).toContainText("No attributes"),
      Scene.expect(
        Scene.selector(
          '[data-xray-preview-part="avatar-group"][data-xray-preview-active="true"]'
        )
      ).toHaveAttr(
        "data-xray-preview-active",
        "true"
      ),
      Scene.expect(
        Scene.role("complementary", { name: "Selected anatomy details" })
      ).not.toExist(),
      Scene.expect(
        Scene.selector('[data-xray-preview-part="avatar-root"]')
      ).toHaveAttr(
        "data-xray-preview-part",
        "avatar-root"
      )
    );
  });

  test("clicking and focusing parts changes the preview overlay", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.hover(Scene.role("button", { name: "Inspect Avatar badge span" })),
      Scene.expect(Scene.testId("anatomy-xray-overlay-styles")).toContainText(
        "anchor: right-0 bottom-0"
      ),
      Scene.expect(
        Scene.selector(
          '[data-xray-preview-part="avatar-badge"][data-xray-preview-active="true"]'
        )
      ).toHaveAttr("data-xray-preview-active", "true"),
      Scene.click(Scene.role("button", { name: "Inspect Avatar root span" })),
      Scene.expect(
        Scene.testId("anatomy-xray-overlay-identity")
      ).toContainText("span"),
      Scene.expect(
        Scene.testId("anatomy-xray-overlay-identity")
      ).toContainText(".relative"),
      Scene.expect(
        Scene.selector(
          '[data-xray-preview-part="avatar-root"][data-xray-preview-active="true"]'
        )
      ).toHaveAttr("data-xray-preview-active", "true"),
      Scene.focus(Scene.role("button", { name: "Inspect Avatar image img" })),
      Scene.expect(
        Scene.testId("anatomy-xray-overlay-attributes")
      ).toContainText('alt="Lena Taylor"')
    );
  });
});
