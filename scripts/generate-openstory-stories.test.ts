import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, test } from "vitest";

import {
  createCatalog,
  discoverExamples,
  renderGeneratedFiles,
  storyId,
} from "./generate-openstory-stories.mjs";

const item = ({
  name,
  title,
  component,
  example,
  registryDependencies = [],
}: {
  name: string;
  title: string;
  component: string;
  example: string;
  registryDependencies?: ReadonlyArray<string>;
}) => ({
  name,
  title,
  type: "registry:example",
  registryDependencies,
  meta: {
    foldkit: {
      component,
      example,
    },
  },
});

const catalogFor = (
  exampleSlugs: ReadonlyArray<
    | string
    | Readonly<{
        modulePath: string;
        slug: string;
        sourceLane: string;
      }>
  >,
  registryItems: ReadonlyArray<ReturnType<typeof item>> = []
) => createCatalog({ exampleSlugs, registryItems });

describe("generate Openstory stories", () => {
  test("discovers examples from all lane folders", async () => {
    const rootDir = await mkdtemp(path.join(os.tmpdir(), "foldkit-cn-stories-"));

    try {
      await Promise.all(
        [
          "registry/foldkit/examples/button-basic",
          "registry/base-ui/examples/base-ui-button-basic",
          "registry/shadcn/examples/shadcn-button-basic",
          "registry/ai-elements/examples/ai-elements-attachments-list",
        ].map(async (directory) => {
          await mkdir(path.join(rootDir, directory), { recursive: true });
          await writeFile(path.join(rootDir, directory, "main.ts"), "");
        })
      );

      expect(discoverExamples(rootDir).map((example) => example.modulePath)).toEqual(
        [
          "../../../registry/ai-elements/examples/ai-elements-attachments-list/main",
          "../../../registry/base-ui/examples/base-ui-button-basic/main",
          "../../../registry/foldkit/examples/button-basic/main",
          "../../../registry/shadcn/examples/shadcn-button-basic/main",
        ]
      );
    } finally {
      await rm(rootDir, { recursive: true, force: true });
    }
  });

  test("groups shadcn examples by component", () => {
    const [group] = catalogFor(
      ["shadcn-calendar-basic"],
      [
        item({
          name: "shadcn-calendar-basic",
          title: "shadcn Calendar Basic",
          component: "Calendar",
          example: "shadcn-basic",
        }),
      ]
    );

    expect(group?.title).toBe("shadcn/Calendar");
    expect(group?.stories[0]?.name).toBe("Basic");
  });

  test("groups base-ui examples by component", () => {
    const [group] = catalogFor(
      ["base-ui-menu-basic"],
      [
        item({
          name: "base-ui-menu-basic",
          title: "Base UI Menu Basic",
          component: "Menu",
          example: "basic",
        }),
      ]
    );

    expect(group?.title).toBe("base-ui/Menu");
    expect(group?.stories[0]?.name).toBe("Basic");
  });

  test("groups default registry examples by component", () => {
    const [group] = catalogFor(
      ["alert-dialog-basic"],
      [
        item({
          name: "alert-dialog-basic",
          title: "Alert Dialog Basic",
          component: "AlertDialog",
          example: "basic",
        }),
      ]
    );

    expect(group?.title).toBe("registry/Alert Dialog");
    expect(group?.stories[0]?.name).toBe("Basic");
  });

  test("groups AI Elements examples by component", () => {
    const [group] = catalogFor(
      ["ai-elements-attachments-list"],
      [
        item({
          name: "ai-elements-attachments-list",
          title: "AI Elements Attachments List",
          component: "Attachments",
          example: "list",
        }),
      ]
    );

    expect(group?.title).toBe("ai-elements/Attachments");
    expect(group?.stories[0]?.name).toBe("List");
  });

  test("generates imports to lane example paths", () => {
    const catalog = catalogFor(["button-basic", "shadcn-button-basic"]);
    const source = [...renderGeneratedFiles(catalog).values()].join("\n");

    expect(source).toContain("../../../registry/foldkit/examples/button-basic/main");
    expect(source).toContain(
      "../../../registry/shadcn/examples/shadcn-button-basic/main"
    );
  });

  test("prepends a documented component reference story", () => {
    const [group] = catalogFor(
      [
        {
          modulePath: "../../../registry/base-ui/examples/avatar-basic/main",
          slug: "avatar-basic",
          sourceLane: "base-ui",
        },
        "base-ui-avatar-basic",
      ],
      [
        item({
          name: "avatar-basic",
          title: "Base UI Avatar Basic",
          component: "Avatar",
          example: "basic",
        }),
        item({
          name: "base-ui-avatar-basic",
          title: "Base UI Avatar Basic",
          component: "Avatar",
          example: "basic",
          registryDependencies: ["base-ui-avatar"],
        }),
      ]
    );

    expect(group?.title).toBe("base-ui/Avatar");
    expect(group?.stories.map((story) => story.name)).toEqual([
      "Documentation",
      "Basic",
      "Basic 2",
    ]);
    expect(
      group?.stories.map((story) =>
        storyId({ title: group.title, name: story.name })
      )
    ).toEqual([
      "base-ui-avatar--documentation",
      "base-ui-avatar--basic",
      "base-ui-avatar--basic-2",
    ]);
  });

  test("generates documentation imports only for documented groups", () => {
    const catalog = catalogFor(
      [
        "base-ui-avatar-basic",
        {
          modulePath: "../../../registry/base-ui/examples/base-ui-menu-basic/main",
          slug: "base-ui-menu-basic",
          sourceLane: "base-ui",
        },
      ],
      [
        item({
          name: "base-ui-avatar-basic",
          title: "Base UI Avatar Basic",
          component: "Avatar",
          example: "basic",
          registryDependencies: ["base-ui-avatar"],
        }),
        item({
          name: "base-ui-menu-basic",
          title: "Base UI Menu Basic",
          component: "Menu",
          example: "basic",
        }),
      ]
    );
    const files = renderGeneratedFiles(catalog);
    const avatarSource =
      files.get("src/openstory/generated/base-ui-avatar.stories.ts") ?? "";
    const menuSource =
      files.get("src/openstory/generated/base-ui-menu.stories.ts") ?? "";

    expect(storyId({ title: "base-ui/Avatar", name: "Documentation" })).toBe(
      "base-ui-avatar--documentation"
    );
    expect(avatarSource).toContain(
      'import { createDocumentationReferenceProgram } from "../documentation/referenceProgram"'
    );
    expect(avatarSource).toContain(
      'import { baseUiAvatarDocumentation } from "../documentation/referenceData"'
    );
    expect(avatarSource.indexOf("export const Documentation")).toBeLessThan(
      avatarSource.indexOf("export const Basic")
    );
    expect(avatarSource).toContain(
      "render: () => createDocumentationReferenceProgram(baseUiAvatarDocumentation)"
    );
    expect(menuSource).not.toContain("createDocumentationReferenceProgram");
    expect(menuSource).not.toContain("referenceData");
  });

  test("uses filesystem examples as the inventory during metadata drift", () => {
    const catalog = catalogFor(
      ["base-ui-checkbox-form"],
      [
        item({
          name: "base-ui-checkbox-missing",
          title: "Base UI Checkbox Missing",
          component: "Checkbox",
          example: "missing",
        }),
      ]
    );
    const files = renderGeneratedFiles(catalog);

    expect(catalog).toHaveLength(1);
    expect(catalog[0]?.stories.map((story) => story.slug)).toEqual([
      "base-ui-checkbox-form",
    ]);
    expect([...files.values()].join("\n")).toContain(
      "registry/base-ui/examples/base-ui-checkbox-form/main"
    );
    expect([...files.values()].join("\n")).not.toContain(
      "base-ui-checkbox-missing/main"
    );
  });

  test("disambiguates duplicate story names within one title group", () => {
    const [group] = catalogFor(
      ["button-basic", "button-default"],
      [
        item({
          name: "button-basic",
          title: "Button Basic",
          component: "Button",
          example: "basic",
        }),
        item({
          name: "button-default",
          title: "Button Basic",
          component: "Button",
          example: "basic",
        }),
      ]
    );

    expect(group?.stories.map((story) => story.exportName)).toEqual([
      "Basic",
      "Basic2",
    ]);
    expect(group?.stories.map((story) => story.name)).toEqual([
      "Basic",
      "Basic 2",
    ]);
  });

  test("preserves the current calendar Openstory ids", () => {
    const calendarItems = [
      item({
        name: "shadcn-calendar-basic",
        title: "shadcn Calendar Basic",
        component: "Calendar",
        example: "shadcn-basic",
      }),
      item({
        name: "shadcn-calendar-booked",
        title: "shadcn Calendar Booked Dates",
        component: "shadcn-calendar",
        example: "Booked Dates",
      }),
      item({
        name: "shadcn-calendar-custom-cell-size",
        title: "shadcn Calendar Custom Cell Size",
        component: "Calendar",
        example: "custom-cell-size",
      }),
      item({
        name: "shadcn-calendar-date-of-birth",
        title: "shadcn Calendar Date of Birth",
        component: "shadcn-calendar",
        example: "Date of Birth",
      }),
      item({
        name: "shadcn-calendar-date-time-picker",
        title: "shadcn Calendar Date and Time Picker",
        component: "Calendar",
        example: "date-time-picker",
      }),
      item({
        name: "shadcn-calendar-month-year-selector",
        title: "shadcn Calendar Month and Year Selector",
        component: "shadcn-calendar",
        example: "Month and Year Selector",
      }),
      item({
        name: "shadcn-calendar-presets",
        title: "shadcn Calendar Presets",
        component: "shadcn-calendar",
        example: "Presets",
      }),
      item({
        name: "shadcn-calendar-range",
        title: "shadcn Calendar Range",
        component: "Calendar",
        example: "range",
      }),
      item({
        name: "shadcn-calendar-rtl",
        title: "shadcn Calendar RTL",
        component: "shadcn-calendar",
        example: "RTL",
      }),
      item({
        name: "shadcn-calendar-week-numbers",
        title: "shadcn Calendar Week Numbers",
        component: "Calendar",
        example: "week-numbers",
      }),
    ];
    const [group] = catalogFor(
      calendarItems.map(({ name }) => name),
      calendarItems
    );

    expect(
      group?.stories.map((story) =>
        storyId({ title: group.title, name: story.name })
      )
    ).toEqual([
      "shadcn-calendar--basic",
      "shadcn-calendar--booked-dates",
      "shadcn-calendar--custom-cell-size",
      "shadcn-calendar--date-of-birth",
      "shadcn-calendar--date-and-time-picker",
      "shadcn-calendar--month-and-year-selector",
      "shadcn-calendar--presets",
      "shadcn-calendar--range",
      "shadcn-calendar--rtl",
      "shadcn-calendar--week-numbers",
    ]);
  });
});
