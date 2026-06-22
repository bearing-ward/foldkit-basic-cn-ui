import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { baseUiAvatarDocumentation } from "./referenceData";
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
});
