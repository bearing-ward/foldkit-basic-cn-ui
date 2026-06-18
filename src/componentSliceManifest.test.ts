import { describe, expect, test } from "vitest";

import { createScaffoldPlan, createSliceManifest } from "./componentSliceManifest";

const validationCommandList = [
  "bun run build:registry",
  "bun run check:registry",
  "bun run typecheck",
  "bun run test",
  "bun run build",
];

describe("component slice manifest", () => {
  test("normalizes the public slice name and checklist", () => {
    const manifest = createSliceManifest({
      origin: "base-ui",
      name: "  Alert Dialog  ",
      primitiveName: "AlertDialog",
    });

    expect(manifest).toMatchObject({
      origin: "base-ui",
      name: "alert-dialog",
      publicName: "Alert Dialog",
      artifactType: "registry:ui",
      primitiveName: "AlertDialog",
      examples: ["alert-dialog-basic"],
    });
    expect(manifest.checklistItems).toContain(
      "Create registry/base-ui/ui/alert-dialog/index.ts"
    );
    expect(manifest.checklistItems).toContain(
      "Run install smoke compatibility before review"
    );
  });

  test("creates one shared scaffold plan for CLI and web flows", () => {
    const plan = createScaffoldPlan({
      origin: "shadcn",
      name: "Command Menu",
    });

    expect(plan.files.map((file) => file.path)).toEqual([
      "registry/shadcn/ui/command-menu/index.ts",
      "registry/shadcn/ui/command-menu/view.ts",
      "registry/shadcn/ui/command-menu/command-menu.scene.test.ts",
      "registry/shadcn/examples/command-menu-basic/main.ts",
      "registry/shadcn/examples/command-menu-basic/entry.ts",
      "registry/shadcn/examples/command-menu-basic/index.html",
      "registry/shadcn/examples/command-menu-basic/command-menu-basic.scene.test.ts",
      "registry/shadcn/registry.json",
      "apps/docs/public/command-menu.json",
    ]);
    expect(plan.validationCommands).toEqual(validationCommandList);
    expect(plan.sceneTestGuidance).toContain(
      "registry/shadcn/examples/command-menu-basic"
    );
  });
});
