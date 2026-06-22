import { expect, test } from "@playwright/test";

test("OpenStory shell exposes registry stories and public registry assets", async ({
  page,
  request,
}) => {
  await page.goto("/");

  await expect(page.getByText("foldkit-basic-cn-ui").first()).toBeVisible();

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

  expect(storyIds.has("base-ui-accordion--basic")).toBe(true);
  expect(storyIds.has("base-ui-avatar--documentation")).toBe(true);

  const registryResponse = await request.get("/registry.json");
  expect(registryResponse.ok()).toBe(true);
});
