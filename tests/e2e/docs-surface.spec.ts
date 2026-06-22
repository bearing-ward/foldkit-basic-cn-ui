import { readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { expect, test } from "@playwright/test";

const publicRegistry = JSON.parse(
  readFileSync("apps/docs/public/registry.json", "utf-8")
) as {
  items: readonly {
    name: string;
    registryDependencies?: readonly string[];
    type: string;
  }[];
};

type GeneratedStory = {
  kind: "documentation" | "example";
  name: string;
  registryItemName?: string;
  slug?: string;
};

type GeneratedOpenStoryModule = {
  generateOpenstoryStories: () => {
    catalog: readonly {
      stories: readonly GeneratedStory[];
      title: string;
    }[];
  };
  storyId: (story: { name: string; title: string }) => string;
};

const publicUiItems = publicRegistry.items.filter(
  (item) => item.type === "registry:ui"
);
const publicExampleItems = publicRegistry.items.filter(
  (item) => item.type === "registry:example"
);
const publicExampleNames = new Set(publicExampleItems.map((item) => item.name));

const normalizeDependencyName = (dependency: string) =>
  dependency.replace(/^@foldkit-cn\//u, "");

const loadGeneratedOpenStory = async () => {
  const moduleUrl = pathToFileURL(
    path.resolve("scripts/generate-openstory-stories.mjs")
  ).href;

  return (await import(moduleUrl)) as GeneratedOpenStoryModule;
};

test("OpenStory manifest covers every public registry item and source snapshot", async ({
  request,
}) => {
  const generatedModule = await loadGeneratedOpenStory();
  const generated = generatedModule.generateOpenstoryStories();
  const generatedExampleStories = generated.catalog.flatMap((group) =>
    group.stories
      .filter(
        (story): story is GeneratedStory & { kind: "example"; slug: string } =>
          story.kind === "example" && typeof story.slug === "string"
      )
      .map((story) => ({
        id: generatedModule.storyId({ title: group.title, name: story.name }),
        slug: story.slug,
      }))
  );
  const generatedDocumentationStories = generated.catalog.flatMap((group) =>
    group.stories
      .filter(
        (
          story
        ): story is GeneratedStory & {
          kind: "documentation";
          registryItemName: string;
        } =>
          story.kind === "documentation" &&
          typeof story.registryItemName === "string"
      )
      .map((story) => ({
        id: generatedModule.storyId({ title: group.title, name: story.name }),
        registryItemName: story.registryItemName,
      }))
  );
  const manifestResponse = await request.get("/__openstory/manifest.json");

  expect(manifestResponse.ok()).toBe(true);

  const manifest = (await manifestResponse.json()) as {
    stories?: readonly { id: string }[] | Record<string, unknown>;
  };
  const storyIds = new Set(
    Array.isArray(manifest.stories)
      ? manifest.stories.map((story) => story.id)
      : Object.keys(manifest.stories ?? {})
  );
  const generatedStoryIds = new Set(
    [...generatedExampleStories, ...generatedDocumentationStories].map(
      (story) => story.id
    )
  );
  const examplesBySlug = new Map(
    generatedExampleStories.map((story) => [story.slug, story])
  );
  const documentationByRegistryItemName = new Map(
    generatedDocumentationStories.map((story) => [
      story.registryItemName,
      story,
    ])
  );
  const exampleStoriesByDependency = new Map<string, string[]>();

  for (const item of publicExampleItems) {
    for (const dependency of item.registryDependencies ?? []) {
      const dependencyName = normalizeDependencyName(dependency);
      const story = examplesBySlug.get(item.name);

      if (story === undefined) {
        continue;
      }

      exampleStoriesByDependency.set(dependencyName, [
        ...(exampleStoriesByDependency.get(dependencyName) ?? []),
        story.id,
      ]);
    }
  }

  const missingManifestStories = [...generatedStoryIds].filter(
    (storyId) => !storyIds.has(storyId)
  );

  expect(missingManifestStories, "generated stories missing from manifest").toEqual([]);

  const uncoveredUiItems = publicUiItems
    .map((item) => item.name)
    .filter(
      (name) =>
        !documentationByRegistryItemName.has(name) &&
        (exampleStoriesByDependency.get(name)?.length ?? 0) === 0
    );

  expect(uncoveredUiItems, "public registry:ui items without generated stories").toEqual([]);

  const missingGeneratedExamples = publicExampleItems
    .map((item) => item.name)
    .filter((name) => !examplesBySlug.has(name));

  expect(
    missingGeneratedExamples,
    "public registry:example items without generated OpenStory stories"
  ).toEqual([]);

  for (const exampleName of publicExampleNames) {
    const story = examplesBySlug.get(exampleName);

    expect(story, `${exampleName} is in generated OpenStory catalog`).toBeDefined();

    if (story === undefined) {
      continue;
    }

    const storyResponse = await request.get(`/__story/${story.id}`);
    expect(storyResponse.ok(), `${story.id} story is reachable`).toBe(true);

    const sourceResponse = await request.get(`/sources/${exampleName}.txt`);
    expect(sourceResponse.ok()).toBe(true);
    expect((await sourceResponse.text()).trim().length).toBeGreaterThan(100);
  }
});

test("known OpenStory story iframe renders without legacy docs app wrappers", async ({
  page,
}) => {
  await page.goto("/__story/base-ui-button--basic");

  await expect(page.getByRole("button").first()).toBeVisible();
  const legacyTestIdPrefix = "docs-example-" + "block-";
  await expect(page.locator(`[data-testid^="${legacyTestIdPrefix}"]`)).toHaveCount(0);
});
