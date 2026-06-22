import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

type OpenStoryManifest = Readonly<{
  globalTypes: Record<string, unknown>;
  initialGlobals: Record<string, unknown>;
  stories: ReadonlyArray<Readonly<{ id: string; name: string; title: string }>>;
}>;

const hudKeys = [
  "uiDevHud",
  "uiDevHudBounds",
  "uiDevHudPadding",
  "uiDevHudMargins",
  "uiDevHudIds",
  "uiDevHudData",
  "uiDevHudEvents",
] as const;

const getManifest = async (request: APIRequestContext): Promise<OpenStoryManifest> => {
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

const setToolbarToggle = async (page: Page, label: string): Promise<void> => {
  await page.getByLabel(label).click();
  await page.getByRole("option", { name: "On" }).click();
};

test("OpenStory manifest exposes UI dev HUD globals all off", async ({ request }) => {
  const manifest = await getManifest(request);

  expect(Object.keys(manifest.globalTypes).sort()).toEqual(
    expect.arrayContaining([...hudKeys])
  );
  expect(manifest.initialGlobals).toMatchObject(
    Object.fromEntries(hudKeys.map((key) => [key, "off"]))
  );
  hudKeys.map((key) => {
    const globalType = manifest.globalTypes[key] as {
      toolbar: {
        items: ReadonlyArray<{ value: string; title: string; icon: string; color: string }>;
      };
    };
    expect(globalType.toolbar.items.map(({ value, title }) => ({ value, title }))).toEqual([
      { value: "off", title: "Off" },
      { value: "on", title: "On" },
    ]);
    expect(globalType.toolbar.items).toEqual([
      expect.objectContaining({ value: "off", icon: "circlehollow", color: "oklch(0.556 0 0)" }),
      expect.objectContaining({ value: "on", icon: "circle", color: "oklch(0.723 0.219 149.579)" }),
    ]);
  });
});

test("OpenStory UI dev HUD toggles overlay layers and records DOM events", async ({
  page,
  request,
}) => {
  const storyId = await storyIdForTitle(request, "shadcn/Button", "Default");

  await page.goto(`/?id=${encodeURIComponent(storyId)}`);

  for (const label of ["HUD", "Bounds", "Padding", "Margins", "IDs", "Data", "Events"]) {
    await expect(page.getByLabel(label)).toBeVisible();
  }

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const root = frame.getByTestId("ui-dev-hud-root");
  const host = frame.getByTestId("ui-dev-hud-host");
  const button = frame.getByRole("button", { name: "Button" });

  await expect(root).toHaveAttribute("data-ui-dev-hud", "off");
  await expect(host).toHaveCSS("position", "absolute");
  await expect(host).toHaveCSS("pointer-events", "none");
  await expect(frame.locator('[data-ui-dev-hud-layer="bounds"]')).toHaveCount(0);
  await expect(button).toBeVisible();
  const workspace = await root.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      backgroundColor: getComputedStyle(element).backgroundColor,
      height: rect.height,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      width: rect.width,
    };
  });
  expect(workspace.backgroundColor).toBe("oklch(0.985 0 0)");
  expect(workspace.width).toBeGreaterThanOrEqual(workspace.viewportWidth);
  expect(workspace.height).toBeGreaterThanOrEqual(workspace.viewportHeight);

  for (const label of ["HUD", "Bounds", "Padding", "Margins", "IDs", "Data", "Events"]) {
    await setToolbarToggle(page, label);
  }

  await expect(root).toHaveAttribute("data-ui-dev-hud", "on");
  await expect(root).toHaveAttribute("data-ui-dev-hud-bounds", "true");
  await expect(root).toHaveAttribute("data-ui-dev-hud-padding", "true");
  await expect(root).toHaveAttribute("data-ui-dev-hud-margins", "true");
  await expect(root).toHaveAttribute("data-ui-dev-hud-ids", "true");
  await expect(root).toHaveAttribute("data-ui-dev-hud-data", "true");
  await expect(root).toHaveAttribute("data-ui-dev-hud-events", "true");
  await expect(frame.locator('[data-ui-dev-hud-layer="bounds"]').first()).toBeVisible();
  await expect(frame.locator('[data-ui-dev-hud-layer="padding"]').first()).toBeVisible();
  await expect(frame.locator('[data-ui-dev-hud-layer="margins"]').first()).toBeVisible();
  await expect(frame.locator('[data-ui-dev-hud-label="ids"]').first()).toBeVisible();
  await expect(frame.locator('[data-ui-dev-hud-label="data"]').first()).toBeVisible();

  await button.click();

  await expect(frame.locator("[data-ui-dev-hud-event]").first()).toContainText("click");

  await page.getByLabel("HUD").click();
  await page.getByRole("option", { name: "Off" }).click();

  await expect(root).toHaveAttribute("data-ui-dev-hud", "off");
  await expect(frame.locator("[data-ui-dev-hud-layer]")).toHaveCount(0);
  await expect(button).toBeVisible();
  await button.click();
});
