import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { test, expect, type APIRequestContext } from "@playwright/test";

const openstoryPort = 6173;
const openstoryBaseUrl = `http://127.0.0.1:${openstoryPort}`;

let openstoryProcess: ChildProcessWithoutNullStreams | undefined;

const waitForOpenStory = async (request: APIRequestContext): Promise<void> => {
  const deadline = Date.now() + 30_000;
  let lastError: unknown;
  while (Date.now() < deadline) {
    try {
      const response = await request.get(`${openstoryBaseUrl}/__openstory/manifest.json`);
      if (response.ok()) {
        return;
      }
      lastError = `${response.status()} ${response.statusText()}`;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`OpenStory dev server did not become ready: ${String(lastError)}`);
};

test.beforeAll(async ({ request }) => {
  openstoryProcess = spawn(
    "bun",
    ["run", "openstory", "--", "--host", "127.0.0.1", "--port", String(openstoryPort)],
    {
      cwd: process.cwd(),
      env: process.env,
    },
  );
  await waitForOpenStory(request);
});

test.afterAll(() => {
  openstoryProcess?.kill();
});

const storyIdForTitle = async (
  request: APIRequestContext,
  title: string,
  name: string,
): Promise<string> => {
  const response = await request.get(`${openstoryBaseUrl}/__openstory/manifest.json`);
  expect(response.ok()).toBe(true);
  const manifest = (await response.json()) as {
    stories: Array<{ id: string; title: string; name: string }>;
  };
  const story = manifest.stories.find(
    (entry) => entry.title === title && entry.name === name,
  );
  expect(story).toBeDefined();
  return story?.id ?? "";
};

test("top-bar shadcn theme selection changes iframe theme tokens", async ({
  page,
  request,
}) => {
  const storyId = await storyIdForTitle(request, "shadcn/Button", "Default");

  await page.goto(`${openstoryBaseUrl}/?id=${encodeURIComponent(storyId)}`);

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  const wrapper = frame.getByTestId("shadcn-theme-wrapper");
  await expect(wrapper).toHaveAttribute("data-shadcn-theme", "rhea-neutral-light");
  const initialPrimary = await wrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim(),
  );

  await page.getByLabel("shadcn").click();
  await page.getByRole("option", { name: "Rhea Neutral Dark" }).click();

  await expect(wrapper).toHaveAttribute("data-shadcn-theme", "rhea-neutral-dark");
  const nextPrimary = await wrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim(),
  );
  expect(nextPrimary).not.toBe(initialPrimary);
});

test("Base UI stories do not receive the shadcn wrapper by default", async ({
  page,
  request,
}) => {
  const storyId = await storyIdForTitle(request, "base-ui/Button", "Basic");

  await page.goto(`${openstoryBaseUrl}/?id=${encodeURIComponent(storyId)}`);

  const frame = page.frameLocator(`iframe[title="${storyId}"]`);
  await expect(frame.getByTestId("shadcn-theme-wrapper")).toHaveCount(0);
});
