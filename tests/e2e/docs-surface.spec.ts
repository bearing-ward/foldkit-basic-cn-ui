import { readFileSync } from "node:fs";

import { expect, test } from "@playwright/test";

const publicRegistry = JSON.parse(
  readFileSync("apps/docs/public/registry.json", "utf-8")
) as {
  items: readonly {
    name: string;
    type: string;
  }[];
};

const exampleNames = publicRegistry.items
  .filter((item) => item.type === "registry:example")
  .map((item) => item.name);

test("OpenStory manifest covers generated examples and public source snapshots", async ({
  request,
}) => {
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

  for (const exampleName of [
    "button-basic",
    "base-ui-button-basic",
    "shadcn-button-basic",
  ]) {
    expect(exampleNames).toContain(exampleName);

    const sourceResponse = await request.get(`/sources/${exampleName}.txt`);
    expect(sourceResponse.ok()).toBe(true);
    expect((await sourceResponse.text()).trim().length).toBeGreaterThan(100);
  }

  expect(storyIds.has("registry-button--basic")).toBe(true);
  expect(storyIds.has("base-ui-button--basic")).toBe(true);
  expect(storyIds.has("shadcn-button--basic")).toBe(true);
});

test("known OpenStory story iframe renders without legacy docs app wrappers", async ({
  page,
}) => {
  await page.goto("/__story/base-ui-button--basic");

  await expect(page.getByRole("button").first()).toBeVisible();
  const legacyTestIdPrefix = "docs-example-" + "block-";
  await expect(page.locator(`[data-testid^="${legacyTestIdPrefix}"]`)).toHaveCount(0);
});
