import { readFileSync } from "node:fs";

const baseUrl =
  process.env.PUBLIC_BASE_URL ??
  "https://bearing-ward.github.io/foldkit-basic-cn-ui";
const registryItems = JSON.parse(
  readFileSync("registry/default/items.json", "utf-8")
);
const components = registryItems
  .filter((item) => item.type === "registry:ui")
  .map((item) => item.name);
const requiredSections = [
  "Overview",
  "Examples",
  "Installation",
  "Usage",
  "Foldkit integration",
  "Styling",
  "Keyboard interaction",
  "API reference",
  "Accessibility",
  "Coverage",
];

const assertResponse = async (path, expectedContentType) => {
  const response = await fetch(`${baseUrl}/${path}`);
  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }

  if (!contentType.includes(expectedContentType)) {
    throw new Error(`${path} returned ${contentType}`);
  }

  return response;
};

await assertResponse("", "text/html");
await assertResponse("components.json", "application/json");
await assertResponse("r/index.json", "application/json");

for (const item of registryItems) {
  await assertResponse(`r/${item.name}.json`, "application/json");
}

for (const source of [
  "animation-basic.txt",
  "radio-group-basic.txt",
  "slider-basic.txt",
  "tabs-manual.txt",
]) {
  const response = await assertResponse(`sources/${source}`, "text/plain");
  const text = await response.text();

  if (text.trim().length < 100) {
    throw new Error(`sources/${source} did not contain enough source text`);
  }
}

const { chromium } = await import("playwright");
const browser = await chromium.launch();
const failures = [];

for (const viewport of [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport });

  for (const component of components) {
    await page.goto(`${baseUrl}/docs/components/${component}`, {
      waitUntil: "networkidle",
    });

    for (const heading of requiredSections) {
      const isVisible = await page
        .getByRole("heading", { name: heading })
        .isVisible()
        .catch(() => false);

      if (!isVisible) {
        failures.push(`${viewport.name}/${component}: missing ${heading}`);
      }
    }

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    );

    if (overflow > 1) {
      failures.push(`${viewport.name}/${component}: horizontal overflow`);
    }

    const codeToggle = page.getByText("View code").first();

    if (!(await codeToggle.isVisible().catch(() => false))) {
      failures.push(`${viewport.name}/${component}: missing View code`);
      continue;
    }

    await codeToggle.click();

    const sourceViewer = await page
      .locator(
        '[data-testid^="docs-example-block-"][data-testid$="-actions"] iframe'
      )
      .first()
      .evaluate((iframe) => {
        const frame = iframe;
        const body = frame.contentDocument?.body;

        return {
          frameBackground: getComputedStyle(frame).backgroundColor,
          sourcePath: frame.getAttribute("src") ?? "",
          textColor: body === undefined ? "" : getComputedStyle(body).color,
          textLength: body?.textContent?.trim().length ?? 0,
        };
      })
      .catch((error) => ({
        error: String(error),
        frameBackground: "",
        sourcePath: "",
        textColor: "",
        textLength: 0,
      }));

    if ("error" in sourceViewer) {
      failures.push(`${viewport.name}/${component}: ${sourceViewer.error}`);
    }

    if (!sourceViewer.sourcePath.endsWith(".txt")) {
      failures.push(`${viewport.name}/${component}: source is not .txt`);
    }

    if (sourceViewer.textLength < 100) {
      failures.push(`${viewport.name}/${component}: source text too short`);
    }

    if (
      sourceViewer.frameBackground !== "rgb(255, 255, 255)" ||
      sourceViewer.textColor !== "rgb(0, 0, 0)"
    ) {
      failures.push(`${viewport.name}/${component}: source is unreadable`);
    }
  }

  await page.close();
}

await browser.close();

if (failures.length > 0) {
  throw new Error(failures.join("\n"));
}

console.log(
  `Public site smoke passed for ${components.length} components at ${baseUrl}`
);
