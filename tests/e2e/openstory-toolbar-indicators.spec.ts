import { expect, test } from "@playwright/test";
import type { APIRequestContext } from "@playwright/test";

type ToolbarItem = Readonly<{
  value: string;
  title: string;
  icon?: string;
  color?: string;
}>;

type ToolbarGlobal = Readonly<{
  toolbar: Readonly<{
    title?: string;
    action?: string;
    toggleValues?: readonly string[];
    items: readonly ToolbarItem[];
  }>;
}>;

type OpenStoryManifest = Readonly<{
  globalTypes: Record<string, unknown>;
  stories: readonly Readonly<{ id: string; name: string; title: string }>[];
}>;

const getManifest = async (
  request: APIRequestContext
): Promise<OpenStoryManifest> => {
  const response = await request.get("/__openstory/manifest.json");
  expect(response.ok()).toBe(true);
  return (await response.json()) as OpenStoryManifest;
};

const storyIdForTitle = async (
  request: APIRequestContext,
  title: string,
  name: string
): Promise<string> => {
  const manifest = await getManifest(request);
  const story = manifest.stories.find(
    (entry) => entry.title === title && entry.name === name
  );
  expect(story).toBeDefined();
  return story?.id ?? "";
};

const toolbarGlobal = (
  manifest: OpenStoryManifest,
  key: string
): ToolbarGlobal => manifest.globalTypes[key] as ToolbarGlobal;

test("manifest exposes toolbar indicator metadata", async ({ request }) => {
  const manifest = await getManifest(request);
  const themeItems = toolbarGlobal(manifest, "shadcnTheme").toolbar.items;
  const modeItems = toolbarGlobal(manifest, "shadcnMode").toolbar.items;
  const amberTheme = themeItems.find((item) => item.value === "rhea-amber");

  expect(amberTheme).toMatchObject({
    value: "rhea-amber",
    title: "Rhea Amber",
    icon: "circlehollow",
  });
  expect(amberTheme?.color).toEqual(expect.stringMatching(/^oklch\(/u));
  expect(modeItems).toEqual([
    { value: "light", title: "Light", icon: "sun", color: "oklch(0.985 0 0)" },
    { value: "dark", title: "Dark", icon: "moon", color: "oklch(0.145 0 0)" },
  ]);
  expect(toolbarGlobal(manifest, "shadcnMode").toolbar).toMatchObject({
    title: "Toggle theme",
    action: "toggle",
    toggleValues: ["light", "dark"],
  });
});

test("top-bar triggers render selected theme and mode indicators", async ({
  page,
  request,
}) => {
  const storyId = await storyIdForTitle(request, "shadcn/Button", "Default");

  await page.goto(`/?id=${encodeURIComponent(storyId)}`);

  await expect(page.getByLabel("shadcn")).toBeVisible();
  await expect(page.getByLabel("Toggle theme")).toBeVisible();
  await expect(
    page.getByLabel("shadcn").locator("[data-openstory-toolbar-indicator]")
  ).toHaveCount(2);
  await expect(
    page
      .getByLabel("Toggle theme")
      .locator("[data-openstory-toolbar-indicator]")
  ).toHaveCount(2);
});

test("dropdown items render indicators without changing option names", async ({
  page,
  request,
}) => {
  const storyId = await storyIdForTitle(request, "shadcn/Button", "Default");

  await page.goto(`/?id=${encodeURIComponent(storyId)}`);

  await page.getByLabel("shadcn").click();
  const amberOption = page.getByRole("option", { name: "Rhea Amber" });
  await expect(amberOption).toBeVisible();
  await expect(
    amberOption.locator("[data-openstory-toolbar-indicator]")
  ).toHaveCount(2);
  await amberOption.click();
  await expect(
    page.getByLabel("shadcn").locator("[data-openstory-toolbar-indicator]")
  ).toHaveCount(2);
});
