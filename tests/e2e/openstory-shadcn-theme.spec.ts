import { expect, test, type APIRequestContext } from "@playwright/test";

type OpenStoryManifest = Readonly<{
  globalTypes: Record<string, unknown>;
  initialGlobals: Record<string, unknown>;
  stories: ReadonlyArray<Readonly<{ id: string; name: string; title: string }>>;
}>;

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

test("OpenStory manifest exposes shadcn theme and mode globals", async ({
  request,
}) => {
  const manifest = await getManifest(request);

  expect(Object.keys(manifest.globalTypes).sort()).toContain("shadcnMode");
  expect(Object.keys(manifest.globalTypes).sort()).toContain("shadcnTheme");
  expect(manifest.initialGlobals).toMatchObject({
    shadcnMode: "light",
    shadcnTheme: "rhea-neutral",
  });
});

test("top-bar shadcn theme and mode selection changes iframe theme tokens", async ({
  page,
  request,
}) => {
  const storyId = await storyIdForTitle(request, "shadcn/Button", "Default");

  await page.goto(`/?id=${encodeURIComponent(storyId)}`);

  await expect(page.getByLabel("shadcn")).toBeVisible();
  await expect(page.getByLabel("mode")).toBeVisible();

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const wrapper = frame.getByTestId("shadcn-theme-wrapper");
  await expect(wrapper).toHaveAttribute("data-shadcn-theme", "rhea-neutral-light");
  await expect(wrapper).toHaveAttribute("data-shadcn-resolved-mode", "light");
  const initialPrimary = await wrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim()
  );
  const initialButtonBackground = await frame
    .getByRole("button", { name: "Button" })
    .evaluate((element) => getComputedStyle(element).backgroundColor);

  await page.getByLabel("mode").click();
  await page.getByRole("option", { name: "Dark" }).click();

  await expect(wrapper).toHaveAttribute("data-shadcn-theme", "rhea-neutral-dark");
  await expect(wrapper).toHaveAttribute("data-shadcn-mode", "dark");
  await expect(wrapper).toHaveAttribute("data-shadcn-resolved-mode", "dark");
  const darkPrimary = await wrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim()
  );
  expect(darkPrimary).not.toBe(initialPrimary);
  const darkButtonBackground = await frame
    .getByRole("button", { name: "Button" })
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(darkButtonBackground).not.toBe(initialButtonBackground);

  await page.getByLabel("shadcn").click();
  await page.getByRole("option", { name: "Nova Zinc" }).click();

  await expect(wrapper).toHaveAttribute("data-shadcn-theme", "nova-zinc-light");
  await expect(wrapper).toHaveAttribute("data-shadcn-theme-key", "nova-zinc");
  await expect(wrapper).toHaveAttribute("data-shadcn-mode", "dark");
  await expect(wrapper).toHaveAttribute("data-shadcn-resolved-mode", "light");
  await expect(frame.getByRole("button", { name: "Button" })).toHaveAttribute(
    "data-style",
    "base-nova"
  );
});

test("Base UI stories do not receive the shadcn wrapper by default", async ({
  page,
  request,
}) => {
  const storyId = await storyIdForTitle(request, "base-ui/Button", "Basic");

  await page.goto(`/?id=${encodeURIComponent(storyId)}`);

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  await expect(frame.getByTestId("shadcn-theme-wrapper")).toHaveCount(0);
});
