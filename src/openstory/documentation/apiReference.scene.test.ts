import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { defineProgram } from "./apiReference";
import { baseUiAvatarDocumentation } from "./referenceData";

describe("API reference widget", () => {
  const program = defineProgram(baseUiAvatarDocumentation.apiReference);

  test("renders Avatar API groups and initial helper rows", () => {
    Scene.scene(
      { update: program.update, view: program.view },
      Scene.with(program.init()[0]),
      Scene.expect(Scene.text("Avatar API reference")).toExist(),
      Scene.expect(Scene.role("button", { name: "View helpers 7" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Config types 8" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Class hooks 7" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Accessibility 6" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Coverage 4" })).toExist(),
      Scene.expect(Scene.text("rootView")).toExist()
    );
  });

  test("shows rows for each selected group", () => {
    Scene.scene(
      { update: program.update, view: program.view },
      Scene.with(program.init()[0]),
      Scene.click(Scene.role("button", { name: "Config types 8" })),
      Scene.expect(Scene.text("RootViewConfig")).toExist(),
      Scene.click(Scene.role("button", { name: "Class hooks 7" })),
      Scene.expect(Scene.text("avatarBaseClasses")).toExist(),
      Scene.expect(Scene.text("avatarImageClasses")).toExist(),
      Scene.click(Scene.role("button", { name: "Accessibility 6" })),
      Scene.expect(Scene.text("count role=\"img\"")).toExist(),
      Scene.click(Scene.role("button", { name: "Coverage 4" })),
      Scene.expect(
        Scene.text("base-ui-avatar.scene.test.ts", { exact: false })
      ).toExist()
    );
  });

  test("filters accessibility rows by query", () => {
    Scene.scene(
      { update: program.update, view: program.view },
      Scene.with(program.init()[0]),
      Scene.click(Scene.role("button", { name: "Accessibility 6" })),
      Scene.type(Scene.role("textbox", { name: "Filter API reference" }), "aria"),
      Scene.expect(Scene.text("aria-label", { exact: false })).toExist(),
      Scene.expect(Scene.text("fallback text")).not.toExist()
    );
  });

  test("renders an empty state for a no-match query", () => {
    Scene.scene(
      { update: program.update, view: program.view },
      Scene.with(program.init()[0]),
      Scene.type(
        Scene.role("textbox", { name: "Filter API reference" }),
        "no-match-query"
      ),
      Scene.expect(Scene.text("No API entries match this filter")).toExist()
    );
  });
});
