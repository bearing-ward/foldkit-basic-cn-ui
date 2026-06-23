import { Scene } from "foldkit";
import { describe, test } from "vitest";

import {
  baseUiAlertDialogDocumentation,
  baseUiAvatarDocumentation,
} from "./referenceData";
import { createDocumentationReferenceProgram } from "./referenceProgram";

describe("Documentation reference program", () => {
  test("renders the Base UI Avatar reference sections and x-ray details", () => {
    const program = createDocumentationReferenceProgram(
      baseUiAvatarDocumentation
    );
    const [model] = program.init();

    Scene.scene(
      { update: program.update, view: program.view },
      Scene.with(model),
      Scene.expect(Scene.role("heading", { name: "Avatar" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.text("registry/base-ui/ui/base-ui-avatar")).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Description/Overview" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Preview and source" })
      ).toExist(),
      Scene.expect(Scene.text("Local source only")).toExist(),
      Scene.expect(Scene.text("/__story/base-ui-avatar--basic-2")).toExist(),
      Scene.expect(
        Scene.text("/sources/base-ui-avatar-basic.txt")
      ).not.toExist(),
      Scene.click(Scene.role("button", { name: "Source" })),
      Scene.expect(Scene.text("/sources/base-ui-avatar-basic.txt")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Styling" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Existing coverage" })
      ).toExist(),
      Scene.expect(Scene.text("Keyboard interaction")).not.toExist(),
      Scene.expect(
        Scene.role("button", { name: "Inspect Avatar root span" })
      ).toExist(),
      Scene.expect(Scene.text("rounded-full", { exact: false })).toExist(),
      Scene.expect(Scene.text("Avatar API reference")).toExist(),
      Scene.expect(Scene.role("button", { name: "View helpers 7" })).toExist(),
      Scene.expect(Scene.text("rootView")).toExist(),
      Scene.expect(Scene.text("imageView")).toExist(),
      Scene.expect(Scene.text("fallbackView")).toExist(),
      Scene.expect(Scene.text("badgeView")).toExist(),
      Scene.expect(Scene.text("groupView")).toExist(),
      Scene.expect(Scene.text("countView")).toExist(),
      Scene.click(Scene.role("button", { name: "Class hooks 7" })),
      Scene.expect(Scene.text("avatarBadgeClasses")).toExist(),
      Scene.click(Scene.role("button", { name: "Coverage 4" })),
      Scene.expect(
        Scene.text("base-ui-avatar.scene.test.ts", { exact: false })
      ).toExist(),
      Scene.expect(
        Scene.text("base-ui-avatar-basic.scene.test.ts", { exact: false })
      ).toExist()
    );
  });

  test("renders the Base UI Alert Dialog reference through the shared template", () => {
    const program = createDocumentationReferenceProgram(
      baseUiAlertDialogDocumentation
    );
    const [model] = program.init();

    Scene.scene(
      { update: program.update, view: program.view },
      Scene.with(model),
      Scene.expect(Scene.role("heading", { name: "Alert Dialog" })).toExist(),
      Scene.expect(
        Scene.text("registry/base-ui/ui/base-ui-alert-dialog")
      ).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Description/Overview" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Preview and source" })
      ).toExist(),
      Scene.expect(
        Scene.text("/__story/base-ui-alert-dialog--basic-2")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Source" })),
      Scene.expect(
        Scene.text("/sources/base-ui-alert-dialog-basic.txt")
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Styling" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Existing coverage" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Inspect Popup div" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Inspect Popup div" })),
      Scene.expect(Scene.text('role="alertdialog"')).toExist(),
      Scene.expect(Scene.text("Alert Dialog API reference")).toExist(),
      Scene.expect(Scene.role("button", { name: "View helpers 5" })).toExist(),
      Scene.expect(Scene.text("triggerView")).toExist(),
      Scene.expect(Scene.text("portalView")).toExist(),
      Scene.expect(Scene.text("popupView")).toExist(),
      Scene.click(Scene.role("button", { name: "Coverage 4" })),
      Scene.expect(
        Scene.text("base-ui-alert-dialog.scene.test.ts", { exact: false })
      ).toExist(),
      Scene.expect(
        Scene.text("base-ui-alert-dialog-basic.scene.test.ts", {
          exact: false,
        })
      ).toExist()
    );
  });
});
