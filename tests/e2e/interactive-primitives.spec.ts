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

test("Select and Listbox docs examples update selected values", async ({
  page,
}) => {
  await page.goto("/docs/components/select");

  const selectBasic = page.getByTestId("docs-example-block-select-basic");
  const region = selectBasic.locator("#region-select");

  await expect(region).toHaveValue("na");
  await region.selectOption("apac");
  await expect(region).toHaveValue("apac");
  await expect(selectBasic.getByText("Selected region: apac")).toBeVisible();

  const selectDisabled = page.getByTestId("docs-example-block-select-disabled");

  await expect(selectDisabled.locator("#plan-select")).toBeDisabled();
  await expect(selectDisabled.getByText("Current plan: Team")).toBeVisible();

  await page.goto("/docs/components/listbox");

  const listboxBasic = page.getByTestId("docs-example-block-listbox-basic");

  await listboxBasic.getByRole("button", { name: "Choose person" }).click();
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.getByRole("option", { name: "Lindsay Funke" }).click();
  await expect(
    listboxBasic.getByRole("button", { name: "Lindsay Funke" })
  ).toBeVisible();

  const listboxAnimated = page.getByTestId(
    "docs-example-block-listbox-animated"
  );

  await listboxAnimated
    .getByRole("button", { name: "Choose animated person" })
    .click();
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.getByRole("option", { name: "Gob Bluth" }).click();
  await expect(
    listboxAnimated.getByRole("button", { name: "Gob Bluth" })
  ).toBeVisible();
});

test("Slider, Tabs, and Disclosure docs examples respond to input", async ({
  page,
}) => {
  await page.goto("/docs/components/slider");

  const sliderBasic = page.getByTestId("docs-example-block-slider-basic");
  const rating = sliderBasic.getByRole("slider");

  await expect(rating).toHaveAttribute("aria-valuenow", "4");
  await rating.focus();
  await page.keyboard.press("ArrowRight");
  await expect(rating).toHaveAttribute("aria-valuenow", "5");
  await expect(sliderBasic.getByText("Rating: 5 of 10")).toBeVisible();

  await page.goto("/docs/components/tabs");

  const tabsBasic = page.getByTestId("docs-example-block-tabs-basic");
  const usageTab = tabsBasic.getByRole("tab", { name: "Usage" });

  await usageTab.click();
  await expect(usageTab).toHaveAttribute("aria-selected", "true");
  await expect(
    tabsBasic.getByText(
      "Use keyboard navigation or click a tab to change panels."
    )
  ).toBeVisible();
  await expect(tabsBasic.getByText("Selected tab: Usage")).toBeVisible();

  await page.goto("/docs/components/disclosure");

  const disclosureBasic = page.getByTestId(
    "docs-example-block-disclosure-basic"
  );
  const disclosureButton = disclosureBasic.getByRole("button", {
    name: "What is Foldkit?",
  });

  await expect(disclosureButton).toHaveAttribute("aria-expanded", "false");
  await disclosureButton.click();
  await expect(disclosureButton).toHaveAttribute("aria-expanded", "true");
  await expect(
    disclosureBasic.getByText(
      "Foldkit is an Elm-inspired UI framework powered by Effect."
    )
  ).toBeVisible();
  await expect(disclosureBasic.getByText("Disclosure is open.")).toBeVisible();

  const disclosureDisabled = page.getByTestId(
    "docs-example-block-disclosure-disabled"
  );
  const disabledButton = disclosureDisabled.getByRole("button", {
    name: "Locked disclosure",
  });

  await expect(disabledButton).toHaveAttribute("aria-disabled", "true");
  await expect(disabledButton).toHaveAttribute("aria-expanded", "false");
  await expect(
    disclosureDisabled.getByText("Disclosure is locked.")
  ).toBeVisible();
});

test("Toast docs variants show and dismiss notifications", async ({ page }) => {
  await page.goto("/docs/components/toast");

  const variants = page.getByTestId("docs-example-block-toast-variants");

  await variants.getByRole("button", { name: "Show variants" }).click();
  await expect(variants.getByText("Shown notifications: 4")).toBeVisible();
  await expect(variants.getByText("Queued")).toBeVisible();
  await expect(variants.getByText("Published")).toBeVisible();
  await expect(variants.getByText("Review needed")).toBeVisible();
  await expect(variants.getByText("Failed")).toBeVisible();

  await variants.getByRole("button", { name: "Dismiss all" }).click();
  await expect(variants.getByText("Queued")).toBeHidden();
  await expect(variants.getByText("Published")).toBeHidden();
  await expect(variants.getByText("Review needed")).toBeHidden();
  await expect(variants.getByText("Failed")).toBeHidden();
});
