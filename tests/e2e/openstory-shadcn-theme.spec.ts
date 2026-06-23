import { expect, test } from "@playwright/test";
import type { APIRequestContext } from "@playwright/test";

type OpenStoryManifest = Readonly<{
  globalTypes: Record<string, unknown>;
  initialGlobals: Record<string, unknown>;
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

test("OpenStory manifest exposes shadcn theme and mode globals", async ({
  request,
}) => {
  const manifest = await getManifest(request);
  const shadcnThemeGlobal = manifest.globalTypes.shadcnTheme as {
    toolbar: { items: readonly { value: string }[] };
  };
  const shadcnModeGlobal = manifest.globalTypes.shadcnMode as {
    toolbar: {
      title: string;
      action: string;
      toggleValues: readonly string[];
      items: readonly { value: string }[];
    };
  };
  const shadcnThemeValues = shadcnThemeGlobal.toolbar.items.map(
    (item) => item.value
  );
  const shadcnModeValues = shadcnModeGlobal.toolbar.items.map(
    (item) => item.value
  );

  expect(Object.keys(manifest.globalTypes).toSorted()).toContain("shadcnMode");
  expect(Object.keys(manifest.globalTypes).toSorted()).toContain("shadcnTheme");
  expect(manifest.initialGlobals).toMatchObject({
    shadcnMode: "light",
    shadcnTheme: "rhea-neutral",
  });
  for (const value of [
    "rhea-neutral",
    "rhea-stone",
    "rhea-amber",
    "rhea-violet",
    "rhea-yellow",
  ]) {
    expect(shadcnThemeValues).toContain(value);
  }
  expect(shadcnModeGlobal.toolbar).toMatchObject({
    title: "Toggle theme",
    action: "toggle",
    toggleValues: ["light", "dark"],
  });
  expect(shadcnModeValues).toEqual(["light", "dark"]);
});

test("top-bar shadcn theme and mode selection changes iframe theme tokens", async ({
  page,
  request,
}) => {
  const storyId = await storyIdForTitle(request, "shadcn/Button", "Default");

  await page.goto(`/?id=${encodeURIComponent(storyId)}`);

  await expect(page.getByLabel("shadcn")).toBeVisible();
  await expect(page.getByLabel("Toggle theme")).toBeVisible();

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const wrapper = frame.getByTestId("shadcn-theme-wrapper");
  await expect(wrapper).toHaveAttribute(
    "data-shadcn-theme",
    "rhea-neutral-light"
  );
  await expect(wrapper).toHaveAttribute("data-shadcn-resolved-mode", "light");
  await expect(wrapper).toHaveClass(/bg-background/u);
  await expect(wrapper).toHaveClass(/text-foreground/u);
  const initialWrapperBackground = await wrapper.evaluate(
    (element) => getComputedStyle(element).backgroundColor
  );
  const initialPrimary = await wrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim()
  );
  const initialButtonBackground = await frame
    .getByRole("button", { name: "Button" })
    .evaluate((element) => getComputedStyle(element).backgroundColor);

  await page.getByLabel("shadcn").click();
  await page.getByRole("option", { name: "Rhea Amber" }).click();

  await expect(wrapper).toHaveAttribute(
    "data-shadcn-theme",
    "rhea-amber-light"
  );
  await expect(wrapper).toHaveAttribute("data-shadcn-theme-key", "rhea-amber");
  const amberPrimary = await wrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim()
  );
  expect(amberPrimary).not.toBe(initialPrimary);
  const amberButtonBackground = await frame
    .getByRole("button", { name: "Button" })
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(amberButtonBackground).not.toBe(initialButtonBackground);

  await page.getByLabel("Toggle theme").click();

  await expect(wrapper).toHaveAttribute("data-shadcn-theme", "rhea-amber-dark");
  await expect(wrapper).toHaveAttribute("data-shadcn-mode", "dark");
  await expect(wrapper).toHaveAttribute("data-shadcn-resolved-mode", "dark");
  const darkPrimary = await wrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim()
  );
  expect(darkPrimary).not.toBe(amberPrimary);
  const darkWrapperBackground = await wrapper.evaluate(
    (element) => getComputedStyle(element).backgroundColor
  );
  expect(darkWrapperBackground).not.toBe(initialWrapperBackground);
  const darkButtonBackground = await frame
    .getByRole("button", { name: "Button" })
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(darkButtonBackground).not.toBe(initialButtonBackground);

  await page.getByLabel("Toggle theme").click();

  await expect(wrapper).toHaveAttribute(
    "data-shadcn-theme",
    "rhea-amber-light"
  );
  await expect(wrapper).toHaveAttribute("data-shadcn-mode", "light");
  await expect(wrapper).toHaveAttribute("data-shadcn-resolved-mode", "light");
});

test("top-bar Toggle theme resolves system light before toggling to dark", async ({
  page,
  request,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  const storyId = await storyIdForTitle(request, "shadcn/Button", "Default");

  await page.goto(
    `/?id=${encodeURIComponent(storyId)}&globals=shadcnTheme%3Arhea-neutral%3BshadcnMode%3Asystem`
  );

  await expect(page.getByLabel("Toggle theme")).toBeVisible();

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const wrapper = frame.getByTestId("shadcn-theme-wrapper");
  await expect(wrapper).toHaveAttribute("data-shadcn-mode", "system");
  await expect(wrapper).toHaveAttribute("data-shadcn-resolved-mode", "light");

  await page.getByLabel("Toggle theme").click();

  await expect(wrapper).toHaveAttribute("data-shadcn-mode", "dark");
  await expect(wrapper).toHaveAttribute("data-shadcn-resolved-mode", "dark");
});

test("legacy nova-zinc globals still select the Nova Button recipe", async ({
  page,
  request,
}) => {
  const storyId = await storyIdForTitle(request, "shadcn/Button", "Default");

  await page.goto(
    `/?id=${encodeURIComponent(storyId)}&globals=shadcnTheme%3Anova-zinc%3BshadcnMode%3Alight`
  );

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const wrapper = frame.getByTestId("shadcn-theme-wrapper");
  await expect(wrapper).toHaveAttribute("data-shadcn-theme", "nova-zinc-light");
  await expect(wrapper).toHaveAttribute("data-shadcn-theme-key", "nova-zinc");
  await expect(wrapper).toHaveAttribute("data-shadcn-mode", "light");
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
