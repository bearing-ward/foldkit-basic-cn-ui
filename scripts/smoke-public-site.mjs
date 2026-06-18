const baseUrl =
  process.env.PUBLIC_BASE_URL ??
  "https://bearing-ward.github.io/foldkit-basic-cn-ui";
const knownStoryId = "base-ui-accordion--basic";

const assertResponse = async (path, expectedContentTypes) => {
  const response = await fetch(`${baseUrl}/${path}`);
  const contentType = response.headers.get("content-type") ?? "";
  const expectedTypes = Array.isArray(expectedContentTypes)
    ? expectedContentTypes
    : [expectedContentTypes];

  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }

  if (!expectedTypes.some((expectedType) => contentType.includes(expectedType))) {
    throw new Error(`${path} returned ${contentType}`);
  }

  return response;
};

await assertResponse("", "text/html");
const manifest = await (
  await assertResponse("__openstory/manifest.json", "application/json")
).json();
const storyIds = new Set(
  Array.isArray(manifest.stories)
    ? manifest.stories.map((story) => story.id)
    : Object.keys(manifest.stories ?? {})
);

if (storyIds.size === 0) {
  throw new Error("__openstory/manifest.json did not contain stories");
}

if (!storyIds.has(knownStoryId)) {
  throw new Error(`__openstory/manifest.json is missing ${knownStoryId}`);
}

await assertResponse(`__story/${knownStoryId}/index.html`, "text/html");
await assertResponse("components.json", "application/json");
await assertResponse("registry.json", "application/json");
await assertResponse("button.json", "application/json");

const sourceResponse = await assertResponse("sources/slider-basic.txt", [
  "text/plain",
  "application/octet-stream",
]);
const sourceText = await sourceResponse.text();

if (sourceText.trim().length < 100) {
  throw new Error("sources/slider-basic.txt did not contain enough source text");
}

const { chromium } = await import("playwright");
const browser = await chromium.launch();
const failures = [];

for (const viewport of [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport });

  await page.goto(baseUrl, {
    waitUntil: "networkidle",
  });

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth
  );

  if (overflow > 1) {
    failures.push(`${viewport.name}: horizontal overflow`);
  }

  const hasShellTitle = await page
    .getByText("foldkit-basic-cn-ui")
    .first()
    .isVisible()
    .catch(() => false);

  if (!hasShellTitle) {
    failures.push(`${viewport.name}: missing OpenStory shell title`);
  }

  await page.close();
}

await browser.close();

if (failures.length > 0) {
  throw new Error(failures.join("\n"));
}

console.log(`Public OpenStory site smoke passed at ${baseUrl}`);
