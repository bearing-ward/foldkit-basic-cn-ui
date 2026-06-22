import { expect, test, type APIRequestContext } from "@playwright/test";

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

  await expect(frame.locator("#theme-studio-style option")).toHaveCount(
    catalog.styleOptions.length
  );
  await expect(frame.locator("#theme-studio-mode option")).toHaveCount(
    catalog.modeOptions.length
  );
  await expect(frame.locator("#theme-studio-preview-block option")).toHaveCount(
    catalog.previewBlocks.length
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

test("updates preview data attributes and CSS tokens", async ({ page }) => {
  await page.goto(`/?id=${storyId}`);

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const preview = frame.getByTestId("theme-studio-preview");
  const initialPrimary = await preview.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim()
  );

  await frame.getByLabel("Base color").selectOption("amber");

  await expect(preview).toHaveAttribute("data-selected-style", "rhea");
  await expect(preview).toHaveAttribute("data-selected-base-color", "amber");
  const amberPrimary = await preview.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim()
  );
  expect(amberPrimary).not.toBe(initialPrimary);
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
