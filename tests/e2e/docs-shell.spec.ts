import { expect, test } from "@playwright/test";

test("docs shell keeps sidebar and detail pane as independent SPA regions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/docs/components/badge");
  const sidebar = page.locator("body > div > nav").first();

  await expect(
    sidebar.getByRole("heading", { name: "Foldkit-basic-cn-ui" })
  ).toBeVisible();
  await expect(sidebar.getByText("Foldkit component registry")).toBeVisible();
  await expect(sidebar.getByText("Foldkit").first()).toBeVisible();
  await expect(sidebar.getByText("Base UI").first()).toBeVisible();
  await expect(sidebar.getByText("shadcn").first()).toBeVisible();

  const badgeLink = sidebar.getByRole("link", { name: "Badge" });
  await expect(badgeLink).toHaveAttribute("aria-current", "page");

  const shellMetrics = await page.evaluate(() => {
    const sidebar = document.querySelector("body > div > nav");
    const main = document.querySelector("main");
    const sidebarList = sidebar?.querySelector("div:last-child");

    return {
      bodyOverflow:
        document.body.firstElementChild === null
          ? undefined
          : getComputedStyle(document.body.firstElementChild).overflow,
      sidebarOverflowY:
        sidebarList === null || sidebarList === undefined
          ? undefined
          : getComputedStyle(sidebarList).overflowY,
      mainOverflowY:
        main === null || main === undefined
          ? undefined
          : getComputedStyle(main).overflowY,
      sidebarHeight: sidebar?.getBoundingClientRect().height,
      mainHeight: main?.getBoundingClientRect().height,
      viewportHeight: window.innerHeight,
    };
  });

  expect(shellMetrics.bodyOverflow).toBe("hidden");
  expect(shellMetrics.sidebarOverflowY).toBe("auto");
  expect(shellMetrics.mainOverflowY).toBe("auto");
  expect(shellMetrics.sidebarHeight).toBe(shellMetrics.viewportHeight);
  expect(shellMetrics.mainHeight).toBe(shellMetrics.viewportHeight);

  await sidebar.getByRole("link", { name: "Button" }).click();
  await expect(page).toHaveURL(/\/docs\/components\/button$/u);
  await expect(page.getByRole("heading", { name: "Button" })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "Button" })).toHaveAttribute(
    "aria-current",
    "page"
  );
});
