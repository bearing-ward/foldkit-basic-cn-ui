import { expect, test, type APIRequestContext, type Locator } from "@playwright/test";

type ThemeStudioCatalog = Readonly<{
  styleOptions: ReadonlyArray<Readonly<{ value: string; title: string }>>;
  baseColorOptionsByStyle: Record<
    string,
    ReadonlyArray<Readonly<{ value: string; title: string }>>
  >;
  modeOptions: ReadonlyArray<Readonly<{ value: string; title: string }>>;
  cssVariablesOptions: ReadonlyArray<
    Readonly<{
      value: boolean;
      title: string;
      status: "active" | "deferred";
      download: boolean;
    }>
  >;
  previewBlocks: ReadonlyArray<
    Readonly<{
      id: string;
      title: string;
      downloadHref: string;
    }>
  >;
  previewCoverage: ReadonlyArray<
    Readonly<{
      id: string;
      title: string;
      status: "rendered" | "covered-by-existing-example" | "deferred";
      dependency?: string;
      reason?: string;
    }>
  >;
}>;

type OpenStoryManifest = Readonly<{
  stories: ReadonlyArray<Readonly<{ id: string; name: string; title: string }>>;
}>;

const storyId = "shadcn-theme-studio--studio";

const getManifest = async (request: APIRequestContext): Promise<OpenStoryManifest> => {
  const response = await request.get("/__openstory/manifest.json");
  await expect(response).toBeOK();
  return (await response.json()) as OpenStoryManifest;
};

const getCatalog = async (
  request: APIRequestContext
): Promise<ThemeStudioCatalog> => {
  const response = await request.get("/theme-studio.json");
  await expect(response).toBeOK();
  return (await response.json()) as ThemeStudioCatalog;
};

type VisibleStyles = Readonly<{
  backgroundColor: string;
  borderColor: string;
  color: string;
}>;

const visibleStyles = async (locator: Locator): Promise<VisibleStyles> =>
  locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      color: style.color,
    };
  });

test("manifest exposes Theme Studio and generated catalog downloads", async ({
  request,
}) => {
  const manifest = await getManifest(request);
  const catalog = await getCatalog(request);

  expect(manifest.stories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: storyId,
        name: "Studio",
        title: "shadcn/Theme Studio",
      }),
    ])
  );
  expect(catalog.styleOptions.map((option) => option.value)).toContain("rhea");
  expect(catalog.previewBlocks.length).toBeGreaterThanOrEqual(12);
  for (const block of catalog.previewBlocks) {
    expect(block.downloadHref).toMatch(/^\/.+\.json$/u);
  }
});

test("renders dynamic catalog controls in the story iframe", async ({
  page,
  request,
}) => {
  const catalog = await getCatalog(request);

  await page.goto(`/?id=${storyId}`);

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  await expect(frame.getByLabel("Style")).toBeVisible();
  await expect(frame.getByLabel("Base color")).toBeVisible();
  await expect(frame.getByLabel("Mode")).toBeVisible();
  await expect(frame.getByLabel("Preview block")).toBeVisible();
  await expect(frame.getByText("CSS variable mode")).toBeVisible();
  await expect(frame.getByTestId("theme-studio-block-options")).toBeVisible();

  await expect(frame.locator("#theme-studio-style option")).toHaveCount(
    catalog.styleOptions.length
  );
  await expect(frame.locator("#theme-studio-mode option")).toHaveCount(
    catalog.modeOptions.length
  );
  await expect(frame.locator("#theme-studio-preview-block option")).toHaveCount(
    catalog.previewBlocks.length
  );
  await expect(frame.locator("[data-theme-studio-block-option]")).toHaveCount(
    catalog.previewCoverage.length
  );
  await expect(
    frame.locator("[data-theme-studio-css-variable-option]")
  ).toHaveCount(catalog.cssVariablesOptions.length);
  for (const option of catalog.cssVariablesOptions) {
    const optionRow = frame.locator(
      `[data-theme-studio-css-variable-option="${option.value}"]`
    );
    await expect(optionRow).toHaveAttribute("data-status", option.status);
    await expect(optionRow).toHaveAttribute(
      "data-downloadable",
      String(option.download)
    );
  }

  const currentStyle = catalog.styleOptions[0]?.value ?? "rhea";
  await expect(frame.locator("#theme-studio-base-color option")).toHaveCount(
    catalog.baseColorOptionsByStyle[currentStyle]?.length ?? 0
  );

  const nonDefaultStyle = catalog.styleOptions.find(
    (option) => option.value !== currentStyle
  );
  if (nonDefaultStyle !== undefined) {
    await frame.getByLabel("Style").selectOption(nonDefaultStyle.value);
    await expect(frame.locator("#theme-studio-base-color option")).toHaveCount(
      catalog.baseColorOptionsByStyle[nonDefaultStyle.value]?.length ?? 0
    );
  }
});

test("updates preview data attributes, CSS tokens, and visible surfaces", async ({
  page,
}) => {
  await page.goto(`/?id=${storyId}`);

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const preview = frame.getByTestId("theme-studio-preview");
  const primarySurface = frame.getByTestId("theme-studio-primary-surface");
  const accentSurface = frame.getByTestId("theme-studio-accent-surface");
  const borderSurface = frame.getByTestId("theme-studio-border-surface");

  await frame.getByLabel("Base color").selectOption("neutral");
  const initialPrimary = await preview.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim()
  );
  const initialPrimaryStyles = await visibleStyles(primarySurface);
  const initialAccentStyles = await visibleStyles(accentSurface);
  const initialBorderStyles = await visibleStyles(borderSurface);

  await frame.getByLabel("Base color").selectOption("amber");

  await expect(preview).toHaveAttribute("data-selected-style", "rhea");
  await expect(preview).toHaveAttribute("data-selected-base-color", "amber");
  const amberPrimary = await preview.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim()
  );
  const amberPrimaryStyles = await visibleStyles(primarySurface);
  const amberAccentStyles = await visibleStyles(accentSurface);
  const amberBorderStyles = await visibleStyles(borderSurface);

  expect(amberPrimary).not.toBe(initialPrimary);
  expect([
    amberPrimaryStyles.backgroundColor !== initialPrimaryStyles.backgroundColor,
    amberPrimaryStyles.color !== initialPrimaryStyles.color,
  ]).toContain(true);
  expect(amberAccentStyles.backgroundColor).toBeTruthy();
  expect(amberBorderStyles.borderColor).toBeTruthy();
  expect(initialAccentStyles.backgroundColor).toBeTruthy();
  expect(initialBorderStyles.borderColor).toBeTruthy();
});

test("updates visible preview colors when dark mode is selected", async ({ page }) => {
  await page.goto(`/?id=${storyId}`);

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const preview = frame.getByTestId("theme-studio-preview");

  await frame.getByLabel("Mode").selectOption("light");
  const lightStyles = await visibleStyles(preview);

  await frame.getByLabel("Mode").selectOption("dark");
  await expect(preview).toHaveAttribute("data-selected-mode", "dark");
  await expect(preview).toHaveAttribute("data-resolved-mode", "dark");
  const darkStyles = await visibleStyles(preview);

  expect([
    darkStyles.backgroundColor !== lightStyles.backgroundColor,
    darkStyles.color !== lightStyles.color,
  ]).toContain(true);
});

test("clicking a block option syncs the selector and preview content", async ({
  page,
  request,
}) => {
  const catalog = await getCatalog(request);
  const target =
    catalog.previewBlocks.find((block) => block.id === "sidebar-navigation") ??
    catalog.previewBlocks[1];

  await page.goto(`/?id=${storyId}`);

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const preview = frame.getByTestId("theme-studio-preview");
  const nativeSelect = frame.getByLabel("Preview block");
  const option = frame.locator(
    `[data-theme-studio-block-option="${target?.id ?? ""}"]`
  );

  await expect(option).toBeVisible();
  await option.click();

  await expect(preview).toHaveAttribute(
    "data-selected-preview-block",
    target?.id ?? ""
  );
  await expect(nativeSelect).toHaveValue(target?.id ?? "");
  await expect(frame.getByTestId("theme-studio-preview-title")).toContainText(
    target?.title ?? ""
  );
  await expect(frame.getByText("Dashboard shell")).toBeVisible();
});

test("theme and block download links resolve to registry JSON", async ({
  page,
  request,
}) => {
  await page.goto(`/?id=${storyId}`);

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const themeHref = await frame
    .getByTestId("theme-studio-theme-download")
    .getAttribute("href");
  const blockHref = await frame
    .getByTestId("theme-studio-block-download")
    .getAttribute("href");

  expect(themeHref).toMatch(/^\/foldkit-theme-.+\.json$/u);
  expect(blockHref).toMatch(/^\/.+\.json$/u);

  const themeResponse = await request.get(themeHref ?? "");
  await expect(themeResponse).toBeOK();
  const themeItem = await themeResponse.json();
  expect(themeItem.type).toBe("registry:theme");
  expect(themeItem.cssVars.light).toBeDefined();
  expect(themeItem.cssVars.dark).toBeDefined();

  const blockResponse = await request.get(blockHref ?? "");
  await expect(blockResponse).toBeOK();
  const blockItem = await blockResponse.json();
  expect(String(blockItem.type)).toMatch(/^registry:/u);
  expect(
    Array.isArray(blockItem.files) && blockItem.files.length > 0
  ).toBe(true);
});
