import { expect, test } from "@playwright/test";

test("OpenStory renders interactive primitive stories directly", async ({
  page,
}) => {
  await page.goto("/__story/registry-tooltip--basic");

  const trigger = page.getByRole("button", { name: "Hover or focus me" });
  await expect(trigger).toBeVisible();

  await trigger.focus();
  await expect(page.getByRole("tooltip")).toBeVisible();
});
