import { expect, test } from "@playwright/test";

test("VirtualList docs examples scroll through command-backed controls", async ({
  page,
}) => {
  await page.goto("/docs/components/virtual-list");

  const basic = page.getByTestId("docs-example-block-virtual-list-basic");
  const basicScroller = basic.locator("#virtual-list-basic");

  await expect(basic.getByText("Sarah Chen")).toBeVisible();
  await expect(basicScroller).toHaveJSProperty("scrollTop", 0);

  await basic.getByRole("button", { name: "Jump to middle" }).click();

  await expect(basic.getByText("Jumping to row 500.")).toBeVisible();
  await expect(basicScroller).toHaveJSProperty("scrollTop", 28_000);

  const variable = page.getByTestId("docs-example-block-virtual-list-variable");
  const variableScroller = variable.locator("#virtual-list-variable");

  await expect(
    variable.getByText("CI passing across all browsers").first()
  ).toBeVisible();
  await expect(variableScroller).toHaveJSProperty("scrollTop", 0);

  await variable.getByRole("button", { name: "Jump to middle" }).click();

  await expect(variable.getByText("Jumping to row 500.")).toBeVisible();
  await expect(variableScroller).toHaveJSProperty("scrollTop", 35_000);
});

test("Tooltip docs examples show and hide from focus", async ({ page }) => {
  await page.goto("/docs/components/tooltip");

  const basic = page.getByTestId("docs-example-block-tooltip-basic");
  const basicTrigger = basic.getByRole("button", { name: "Hover or focus me" });
  const basicPanel = page.locator("#tooltip-basic-panel");

  await basicTrigger.focus();
  await expect(basicPanel).toHaveRole("tooltip");
  await expect(basicPanel.getByText("This is a tooltip")).toBeVisible();
  await expect(basic.getByText("Tooltip shown.")).toBeVisible();

  await basicTrigger.blur();
  await expect(basicPanel).toBeHidden();
  await expect(basic.getByText("Tooltip hidden.")).toBeVisible();

  const noDelay = page.getByTestId("docs-example-block-tooltip-no-delay");
  const noDelayPanel = page.locator("#tooltip-no-delay-panel");

  await noDelay.getByRole("button", { name: "No delay" }).focus();

  await expect(noDelayPanel).toHaveRole("tooltip");
  await expect(noDelayPanel.getByText("Shows immediately")).toBeVisible();
  await expect(noDelay.getByText("Tooltip shown immediately.")).toBeVisible();
});

test("Combobox docs examples filter and select single and multiple values", async ({
  page,
}) => {
  await page.goto("/docs/components/combobox");

  const basic = page.getByTestId("docs-example-block-combobox-basic");
  const cityInput = basic.getByRole("combobox", { name: "City" });

  await cityInput.fill("Ox");
  await expect(page.getByRole("option", { name: "Oxford" })).toBeVisible();
  await page.getByRole("option", { name: "Oxford" }).click();

  await expect(basic.getByText("Selected city: Oxford")).toBeVisible();

  const multi = page.getByTestId("docs-example-block-combobox-multi");
  const citiesInput = multi.getByRole("combobox", { name: "Cities" });

  await expect(multi.getByText("No cities selected")).toBeVisible();

  await citiesInput.fill("Ky");
  await page.getByRole("option", { name: "Kyiv" }).click();

  await expect(multi.getByText("Kyiv")).toBeVisible();

  await citiesInput.fill("Qu");
  await page.getByRole("option", { name: "Quito" }).click();

  await expect(multi.getByText("Quito")).toBeVisible();
});

test("Menu docs examples open, expose items, and dismiss", async ({ page }) => {
  await page.goto("/docs/components/menu");

  const basic = page.getByTestId("docs-example-block-menu-basic");

  await basic.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("menu")).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Edit" })).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Duplicate" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("menu")).toBeHidden();

  const animated = page.getByTestId("docs-example-block-menu-animated");

  await animated.getByRole("button", { name: "Open animated menu" }).click();
  await expect(page.getByRole("menu")).toBeVisible();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await expect(page.getByRole("menu")).toBeHidden();
});
