import { expect, test } from "@playwright/test";

test("Base UI Alert Dialog documentation story renders shared template affordances", async ({
  page,
}) => {
  await page.goto("/__story/base-ui-alert-dialog--documentation");

  await expect(
    page.getByRole("heading", { exact: true, name: "Alert Dialog" })
  ).toBeVisible();
  await expect(
    page.locator("[data-openstory-documentation-template]")
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Preview and source" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "/__story/base-ui-alert-dialog--basic-2",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "/sources/base-ui-alert-dialog-basic.txt",
    })
  ).toBeHidden();

  await page.getByRole("button", { name: "Source" }).click();

  await expect(
    page.getByRole("link", {
      name: "/sources/base-ui-alert-dialog-basic.txt",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Inspect Popup div" })
  ).toBeVisible();
  await expect(
    page.locator('[data-testid^="docs-example-block-"]')
  ).toHaveCount(0);
});
