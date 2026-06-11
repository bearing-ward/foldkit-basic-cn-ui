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
  await expect(
    page
      .getByTestId("docs-example-block-tooltip-basic-preview")
      .getByText("Tooltip shown.")
  ).toBeVisible();

  await basicTrigger.blur();
  await expect(basicPanel).toBeHidden();
  await expect(
    page
      .getByTestId("docs-example-block-tooltip-basic-preview")
      .getByText("Tooltip hidden.")
  ).toBeVisible();

  const noDelay = page.getByTestId("docs-example-block-tooltip-no-delay");
  const noDelayPanel = page.locator("#tooltip-no-delay-panel");

  await noDelay.getByRole("button", { name: "No delay" }).focus();

  await expect(noDelayPanel).toHaveRole("tooltip");
  await expect(noDelayPanel.getByText("Shows immediately")).toBeVisible();
  await expect(
    page
      .getByTestId("docs-example-block-tooltip-no-delay-preview")
      .getByText("Tooltip shown immediately.")
  ).toBeVisible();
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

  await expect(
    page
      .getByTestId("docs-example-block-combobox-multi-preview")
      .getByText("No cities selected")
  ).toBeVisible();

  await citiesInput.fill("Ky");
  await page.getByRole("option", { name: "Kyiv" }).click();

  const multiPreview = page.getByTestId(
    "docs-example-block-combobox-multi-preview"
  );

  await expect(multiPreview.getByText("Kyiv")).toBeVisible();

  await citiesInput.fill("Qu");
  await page.getByRole("option", { name: "Quito" }).click();

  await expect(multiPreview.getByText("Quito")).toBeVisible();
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
  await expect(
    page
      .getByTestId("docs-example-block-select-disabled-preview")
      .getByText("Current plan: Team")
  ).toBeVisible();

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

  const track = sliderBasic.locator('[data-slider-track-id="slider-basic"]');
  const trackBox = await track.boundingBox();

  expect(trackBox).not.toBeNull();

  if (trackBox !== null) {
    await page.mouse.click(
      trackBox.x + trackBox.width * 0.8,
      trackBox.y + trackBox.height / 2
    );
  }

  await expect(rating).toHaveAttribute("aria-valuenow", "8");
  await expect(sliderBasic.getByText("Rating: 8 of 10")).toBeVisible();

  await page.goto("/docs/components/shadcn-slider");

  const shadcnSliderBasic = page.getByTestId(
    "docs-example-block-shadcn-slider-basic"
  );
  const volume = shadcnSliderBasic.getByRole("slider", { name: "Volume" });

  await expect(volume).toHaveAttribute("aria-valuenow", "40");
  await volume.focus();
  await page.keyboard.press("ArrowRight");
  await expect(volume).toHaveAttribute("aria-valuenow", "45");
  await expect(shadcnSliderBasic.getByText("Volume: 45%")).toBeVisible();

  const shadcnTrack = shadcnSliderBasic.locator(
    '[data-slider-track-id="shadcn-slider-basic"]'
  );
  const shadcnTrackBox = await shadcnTrack.boundingBox();

  expect(shadcnTrackBox).not.toBeNull();

  if (shadcnTrackBox !== null) {
    await page.mouse.click(
      shadcnTrackBox.x + shadcnTrackBox.width * 0.8,
      shadcnTrackBox.y + shadcnTrackBox.height / 2
    );
  }

  await expect(volume).toHaveAttribute("aria-valuenow", "80");
  await expect(shadcnSliderBasic.getByText("Volume: 80%")).toBeVisible();

  await page.goto("/docs/components/tabs");

  const tabsBasic = page.getByTestId("docs-example-block-tabs-basic");
  const usageTab = tabsBasic.getByRole("tab", { name: "Usage" });

  await usageTab.click();
  await expect(usageTab).toHaveAttribute("aria-selected", "true");
  await expect(
    page
      .getByRole("tabpanel", {
        name: "Usage",
      })
      .getByText("Use keyboard navigation or click a tab to change panels.")
  ).toBeVisible();
  await expect(tabsBasic.getByText("Selected tab: Usage")).toBeVisible();

  const tabsManual = page.getByTestId("docs-example-block-tabs-manual");

  await expect(
    tabsManual.getByRole("tablist", { name: "Account sections" })
  ).toHaveAttribute("aria-orientation", "vertical");
  await tabsManual.getByRole("tab", { name: "Details" }).click();
  await expect(tabsManual.getByText("Selected tab: Details")).toBeVisible();

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
    page
      .getByTestId("docs-example-block-disclosure-basic-preview")
      .getByText("Foldkit is an Elm-inspired UI framework powered by Effect.")
  ).toBeVisible();
  await expect(
    page
      .getByTestId("docs-example-block-disclosure-basic-preview")
      .getByText("Disclosure is open.")
  ).toBeVisible();

  const disclosureDisabled = page.getByTestId(
    "docs-example-block-disclosure-disabled"
  );
  const disabledButton = disclosureDisabled.getByRole("button", {
    name: "Locked disclosure",
  });

  await expect(disabledButton).toHaveAttribute("aria-disabled", "true");
  await expect(disabledButton).toHaveAttribute("aria-expanded", "false");
  await expect(
    page
      .getByTestId("docs-example-block-disclosure-disabled-preview")
      .getByText("Disclosure is locked.")
  ).toBeVisible();
});

test("Toast docs variants show and dismiss notifications", async ({ page }) => {
  await page.goto("/docs/components/toast");

  const variants = page.getByTestId("docs-example-block-toast-variants");

  await variants.getByRole("button", { name: "Show variants" }).click();
  await expect(variants.getByText("Shown notifications: 4")).toBeVisible();
  const variantsPreview = page.getByTestId(
    "docs-example-block-toast-variants-preview"
  );

  await expect(variantsPreview.getByText("Queued")).toBeVisible();
  await expect(variantsPreview.getByText("Published")).toBeVisible();
  await expect(variantsPreview.getByText("Review needed")).toBeVisible();
  await expect(variantsPreview.getByText("Failed")).toBeVisible();

  await variants.getByRole("button", { name: "Dismiss all" }).click();
  await expect(variantsPreview.getByText("Queued")).toBeHidden();
  await expect(variantsPreview.getByText("Published")).toBeHidden();
  await expect(variantsPreview.getByText("Review needed")).toBeHidden();
  await expect(variantsPreview.getByText("Failed")).toBeHidden();
});

test("Checkbox, Switch, and RadioGroup docs examples update state", async ({
  page,
}) => {
  await page.goto("/docs/components/checkbox");

  const checkboxBasic = page.getByTestId("docs-example-block-checkbox-basic");
  const termsCheckbox = checkboxBasic.getByRole("checkbox");

  await expect(termsCheckbox).toHaveAttribute("aria-checked", "false");
  await termsCheckbox.click();
  await expect(termsCheckbox).toHaveAttribute("aria-checked", "true");
  await expect(checkboxBasic.getByText("Accepted: yes")).toBeVisible();

  const indeterminate = page.getByTestId(
    "docs-example-block-checkbox-indeterminate"
  );
  const allChannels = indeterminate.getByRole("checkbox").first();

  await expect(allChannels).toHaveAttribute("aria-checked", "mixed");
  await allChannels.click();
  await expect(allChannels).toHaveAttribute("aria-checked", "true");
  await expect(indeterminate.getByText("Selected channels: 2")).toBeVisible();

  await page.goto("/docs/components/switch");

  const switchBasic = page.getByTestId("docs-example-block-switch-basic");
  const notificationsSwitch = switchBasic.getByRole("switch");

  await expect(notificationsSwitch).toHaveAttribute("aria-checked", "false");
  await notificationsSwitch.click();
  await expect(notificationsSwitch).toHaveAttribute("aria-checked", "true");
  await expect(switchBasic.getByText("Notifications: on")).toBeVisible();

  const switchDisabled = page.getByTestId("docs-example-block-switch-disabled");
  const lockedSwitch = switchDisabled.getByRole("switch");

  await expect(lockedSwitch).toHaveAttribute("aria-disabled", "true");
  await expect(lockedSwitch).toHaveAttribute("aria-checked", "true");

  await page.goto("/docs/components/radio-group");

  const radioBasic = page.getByTestId("docs-example-block-radio-group-basic");
  const businessPlan = radioBasic.getByRole("radio", { name: /Business/u });

  await businessPlan.click();
  await expect(businessPlan).toHaveAttribute("aria-checked", "true");
  await expect(radioBasic.getByText("Selected plan: Business")).toBeVisible();

  const radioHorizontal = page.getByTestId(
    "docs-example-block-radio-group-horizontal"
  );
  const compactDensity = radioHorizontal.getByRole("radio", {
    name: /Compact/u,
  });
  const spaciousDensity = radioHorizontal.getByRole("radio", {
    name: /Spacious/u,
  });

  await compactDensity.click();
  await expect(compactDensity).toHaveAttribute("aria-checked", "true");
  await expect(
    radioHorizontal.getByText("Selected density: Compact")
  ).toBeVisible();
  await expect(spaciousDensity).toHaveAttribute("aria-disabled", "true");
  await expect(spaciousDensity).toHaveAttribute("aria-checked", "false");
});

test("Calendar and DatePicker docs examples select allowed dates", async ({
  page,
}) => {
  await page.goto("/docs/components/calendar");

  const calendarBasic = page.getByTestId("docs-example-block-calendar-basic");

  await calendarBasic
    .getByRole("button", { name: "Friday, April 17, 2026" })
    .click();
  await expect(
    calendarBasic.getByText("Selected date: 2026-04-17")
  ).toBeVisible();

  const calendarBounds = page.getByTestId("docs-example-block-calendar-bounds");
  const disabledToday = calendarBounds.getByRole("button", {
    name: "Thursday, April 16, 2026",
  });

  await expect(disabledToday).toHaveAttribute("aria-disabled", "true");
  await calendarBounds
    .getByRole("button", { name: "Friday, April 17, 2026" })
    .click();
  await expect(
    calendarBounds.getByText("Selected bounded date: 2026-04-17")
  ).toBeVisible();

  await page.goto("/docs/components/date-picker");

  const datePickerBasic = page.getByTestId(
    "docs-example-block-date-picker-basic"
  );

  await datePickerBasic.getByRole("button", { name: /Pick a date/u }).click();
  await page.getByRole("button", { name: "Friday, April 17, 2026" }).click();
  await expect(
    datePickerBasic.getByText("Selected date: 2026-04-17")
  ).toBeVisible();
  await expect(
    datePickerBasic.getByRole("button", { name: /2026-04-17/u })
  ).toBeVisible();

  const datePickerBounds = page.getByTestId(
    "docs-example-block-date-picker-bounds"
  );

  await datePickerBounds.getByRole("button", { name: /Pick a date/u }).click();
  await expect(
    page.getByRole("button", { name: "Thursday, April 16, 2026" })
  ).toHaveAttribute("aria-disabled", "true");
  await page.getByRole("button", { name: "Friday, April 17, 2026" }).click();
  await expect(
    datePickerBounds.getByText("Selected bounded date: 2026-04-17")
  ).toBeVisible();
});

test("FileDrop docs examples accept selected files and preserve disabled state", async ({
  page,
}) => {
  await page.goto("/docs/components/file-drop");

  const basic = page.getByTestId("docs-example-block-file-drop-basic");
  const input = basic.locator("#file-drop-basic");

  await input.setInputFiles({
    name: "registry-proof.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("registry proof"),
  });

  await expect(basic.getByText("Selected files: 1")).toBeVisible();
  await expect(basic.getByText("registry-proof.txt")).toBeVisible();

  await basic.getByRole("button", { name: "Remove" }).click();
  await expect(basic.getByText("Selected files: 0")).toBeVisible();

  const disabled = page.getByTestId("docs-example-block-file-drop-disabled");

  await expect(disabled.locator("#file-drop-disabled")).toBeDisabled();
  await expect(
    page
      .getByTestId("docs-example-block-file-drop-disabled-preview")
      .getByText("File uploads disabled")
  ).toBeVisible();
});

test("Popover and Dialog docs examples open and dismiss portal surfaces", async ({
  page,
}) => {
  await page.goto("/docs/components/popover");

  const popoverBasic = page.getByTestId("docs-example-block-popover-basic");
  const popoverTrigger = popoverBasic.getByRole("button", {
    name: "Open popover",
  });

  await popoverTrigger.click();
  await expect(popoverTrigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#popover-basic-panel")).toContainText("Analytics");
  await page.keyboard.press("Escape");
  await expect(popoverTrigger).toHaveAttribute("aria-expanded", "false");

  const popoverAnimated = page.getByTestId(
    "docs-example-block-popover-animated"
  );
  const animatedTrigger = popoverAnimated.getByRole("button", {
    name: "Open animated popover",
  });

  await animatedTrigger.click();
  await expect(animatedTrigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#popover-animated-panel")).toContainText(
    "Animated popover"
  );
  await page.keyboard.press("Escape");
  await expect(animatedTrigger).toHaveAttribute("aria-expanded", "false");

  await page.goto("/docs/components/dialog");

  const dialogBasic = page.getByTestId("docs-example-block-dialog-basic");

  await dialogBasic.getByRole("button", { name: "Open dialog" }).click();
  await expect(
    page.getByRole("heading", { name: "Edit profile" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(
    page.getByRole("heading", { name: "Edit profile" })
  ).toBeHidden();

  const dialogAnimated = page.getByTestId("docs-example-block-dialog-animated");

  await dialogAnimated
    .getByRole("button", { name: "Open animated dialog" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Animated dialog" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Done" }).click();
  await expect(
    page.getByRole("heading", { name: "Animated dialog" })
  ).toBeHidden();
});
