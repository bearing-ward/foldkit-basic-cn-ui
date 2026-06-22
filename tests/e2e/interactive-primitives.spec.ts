import { expect, type Page, test } from "@playwright/test";

const gotoStory = async (page: Page, id: string) => {
  await page.goto(`/__story/${id}`);
};

test("VirtualList OpenStory examples scroll through command-backed controls", async ({
  page,
}) => {
  await gotoStory(page, "registry-virtual-list--basic");

  const basicScroller = page.locator("#virtual-list-basic");

  await expect(page.getByRole("list")).toBeVisible();
  await expect(basicScroller).toHaveJSProperty("scrollTop", 0);

  await page.getByRole("button", { name: "Jump to middle" }).click();

  await expect(page.getByText("Jumping to row 500.")).toBeVisible();
  await expect(basicScroller).toHaveJSProperty("scrollTop", 28_000);

  await gotoStory(page, "registry-virtual-list--variable");

  const variableScroller = page.locator("#virtual-list-variable");

  await expect(page.getByRole("list")).toBeVisible();
  await expect(variableScroller).toHaveJSProperty("scrollTop", 0);

  await page.getByRole("button", { name: "Jump to middle" }).click();

  await expect(page.getByText("Jumping to row 500.")).toBeVisible();
  await expect(variableScroller).toHaveJSProperty("scrollTop", 35_000);
});

test("Tooltip OpenStory examples show and hide from focus", async ({ page }) => {
  await gotoStory(page, "registry-tooltip--basic");

  const trigger = page.getByRole("button", { name: "Hover or focus me" });
  const panel = page.locator("#tooltip-basic-panel");

  await expect(trigger).toBeVisible();

  await trigger.focus();
  await expect(panel).toHaveRole("tooltip");
  await expect(panel.getByText("This is a tooltip")).toBeVisible();
  await expect(page.getByText("Tooltip shown.")).toBeVisible();

  await trigger.blur();
  await expect(panel).toBeHidden();
  await expect(page.getByText("Tooltip hidden.")).toBeVisible();

  await gotoStory(page, "registry-tooltip--no-delay");

  const noDelayPanel = page.locator("#tooltip-no-delay-panel");

  await page.getByRole("button", { name: "No delay" }).focus();

  await expect(noDelayPanel).toHaveRole("tooltip");
  await expect(noDelayPanel.getByText("Shows immediately")).toBeVisible();
  await expect(page.getByText("Tooltip shown immediately.")).toBeVisible();
});

test("Combobox OpenStory examples filter and select single and multiple values", async ({
  page,
}) => {
  await gotoStory(page, "registry-combobox--basic");

  const cityInput = page.getByRole("combobox", { name: "City" });

  await cityInput.fill("Ox");
  await expect(page.getByRole("option", { name: "Oxford" })).toBeVisible();
  await page.getByRole("option", { name: "Oxford" }).click();

  await expect(page.getByText("Selected city: Oxford")).toBeVisible();

  await gotoStory(page, "registry-combobox--multi");

  const citiesInput = page.getByRole("combobox", { name: "Cities" });

  await expect(page.getByText("No cities selected")).toBeVisible();

  await citiesInput.fill("Ky");
  await page.getByRole("option", { name: "Kyiv" }).click();

  await expect(page.getByText("Kyiv")).toBeVisible();

  await citiesInput.fill("Qu");
  await page.getByRole("option", { name: "Quito" }).click();

  await expect(page.getByText("Quito")).toBeVisible();
});

test("Menu OpenStory examples open, expose items, and dismiss", async ({
  page,
}) => {
  await gotoStory(page, "registry-menu--basic");

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("menu")).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Edit" })).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Duplicate" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("menu")).toBeHidden();

  await gotoStory(page, "registry-menu--animated");

  await page.getByRole("button", { name: "Open animated menu" }).click();
  await expect(page.getByRole("menu")).toBeVisible();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await expect(page.getByRole("menu")).toBeHidden();
});

test("Select and Listbox OpenStory examples update selected values", async ({
  page,
}) => {
  await gotoStory(page, "registry-select--basic");

  const region = page.locator("#region-select");

  await expect(region).toHaveValue("na");
  await region.selectOption("apac");
  await expect(region).toHaveValue("apac");
  await expect(page.getByText("Selected region: apac")).toBeVisible();

  await gotoStory(page, "registry-select--disabled");

  await expect(page.locator("#plan-select")).toBeDisabled();
  await expect(page.getByText("Current plan: Team")).toBeVisible();

  await gotoStory(page, "registry-listbox--basic");

  await page.getByRole("button", { name: "Choose person" }).click();
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.getByRole("option", { name: "Lindsay Funke" }).click();
  await expect(
    page.getByRole("button", { name: "Lindsay Funke" })
  ).toBeVisible();

  await gotoStory(page, "registry-listbox--animated");

  await page.getByRole("button", { name: "Choose animated person" }).click();
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.getByRole("option", { name: "Gob Bluth" }).click();
  await expect(page.getByRole("button", { name: "Gob Bluth" })).toBeVisible();
});

test("Slider, Tabs, and Disclosure OpenStory examples respond to input", async ({
  page,
}) => {
  await gotoStory(page, "registry-slider--basic");

  const rating = page.getByRole("slider");

  await expect(rating).toHaveAttribute("aria-valuenow", "4");
  await rating.focus();
  await page.keyboard.press("ArrowRight");
  await expect(rating).toHaveAttribute("aria-valuenow", "5");
  await expect(page.getByText("Rating: 5 of 10")).toBeVisible();

  const track = page.locator('[data-slider-track-id="slider-basic"]');
  const trackBox = await track.boundingBox();

  expect(trackBox).not.toBeNull();

  if (trackBox !== null) {
    await page.mouse.click(
      trackBox.x + trackBox.width * 0.8,
      trackBox.y + trackBox.height / 2
    );
  }

  await expect(rating).toHaveAttribute("aria-valuenow", "8");
  await expect(page.getByText("Rating: 8 of 10")).toBeVisible();

  await gotoStory(page, "shadcn-slider--basic");

  const volume = page.getByRole("slider", { name: "slider-demo" });

  await expect(volume).toHaveAttribute("aria-valuenow", "33");
  await volume.focus();
  await page.keyboard.press("ArrowRight");
  await expect(volume).toHaveAttribute("aria-valuenow", "34");

  const shadcnTrack = page.locator('[data-slider-track-id="shadcn-slider-basic"]');
  const shadcnTrackBox = await shadcnTrack.boundingBox();

  expect(shadcnTrackBox).not.toBeNull();

  if (shadcnTrackBox !== null) {
    await page.mouse.click(
      shadcnTrackBox.x + shadcnTrackBox.width * 0.8,
      shadcnTrackBox.y + shadcnTrackBox.height / 2
    );
  }

  await expect(volume).toHaveAttribute("aria-valuenow", "80");

  await gotoStory(page, "registry-tabs--basic");

  const usageTab = page.getByRole("tab", { name: "Usage" });

  await usageTab.click();
  await expect(usageTab).toHaveAttribute("aria-selected", "true");
  await expect(
    page
      .getByRole("tabpanel", {
        name: "Usage",
      })
      .getByText("Use keyboard navigation or click a tab to change panels.")
  ).toBeVisible();
  await expect(page.getByText("Selected tab: Usage")).toBeVisible();

  await gotoStory(page, "registry-tabs--manual");

  await expect(
    page.getByRole("tablist", { name: "Account sections" })
  ).toHaveAttribute("aria-orientation", "vertical");
  await page.getByRole("tab", { name: "Details" }).click();
  await expect(page.getByText("Selected tab: Details")).toBeVisible();

  await gotoStory(page, "registry-disclosure--basic");

  const disclosureButton = page.getByRole("button", {
    name: "What is Foldkit?",
  });

  await expect(disclosureButton).toHaveAttribute("aria-expanded", "false");
  await disclosureButton.click();
  await expect(disclosureButton).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText("Foldkit is an Elm-inspired UI framework powered by Effect.")
  ).toBeVisible();
  await expect(page.getByText("Disclosure is open.")).toBeVisible();

  await gotoStory(page, "registry-disclosure--disabled");

  const disabledButton = page.getByRole("button", {
    name: "Locked disclosure",
  });

  await expect(disabledButton).toHaveAttribute("aria-disabled", "true");
  await expect(disabledButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByText("Disclosure is locked.")).toBeVisible();
});

test("Toast OpenStory variants show and dismiss notifications", async ({
  page,
}) => {
  await gotoStory(page, "registry-toast--variants");

  await page.getByRole("button", { name: "Show variants" }).click();
  await expect(page.getByText("Shown notifications: 4")).toBeVisible();
  await expect(page.getByText("Queued")).toBeVisible();
  await expect(page.getByText("Published")).toBeVisible();
  await expect(page.getByText("Review needed")).toBeVisible();
  await expect(page.getByText("Failed")).toBeVisible();

  await page.getByRole("button", { name: "Dismiss all" }).click();
  await expect(page.getByText("Queued")).toBeHidden();
  await expect(page.getByText("Published")).toBeHidden();
  await expect(page.getByText("Review needed")).toBeHidden();
  await expect(page.getByText("Failed")).toBeHidden();
});

test("Checkbox, Switch, and RadioGroup OpenStory examples update state", async ({
  page,
}) => {
  await gotoStory(page, "registry-checkbox--basic");

  const termsCheckbox = page.getByRole("checkbox");

  await expect(termsCheckbox).toHaveAttribute("aria-checked", "false");
  await termsCheckbox.click();
  await expect(termsCheckbox).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText("Accepted: yes")).toBeVisible();

  await gotoStory(page, "registry-checkbox--indeterminate");

  const allChannels = page.getByRole("checkbox").first();

  await expect(allChannels).toHaveAttribute("aria-checked", "mixed");
  await allChannels.click();
  await expect(allChannels).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText("Selected channels: 2")).toBeVisible();

  await gotoStory(page, "registry-switch--basic");

  const notificationsSwitch = page.getByRole("switch");

  await expect(notificationsSwitch).toHaveAttribute("aria-checked", "false");
  await notificationsSwitch.click();
  await expect(notificationsSwitch).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText("Notifications: on")).toBeVisible();

  await gotoStory(page, "registry-switch--disabled");

  const lockedSwitch = page.getByRole("switch");

  await expect(lockedSwitch).toHaveAttribute("aria-disabled", "true");
  await expect(lockedSwitch).toHaveAttribute("aria-checked", "true");

  await gotoStory(page, "registry-radio-group--basic");

  const businessPlan = page.getByRole("radio", { name: /Business/u });

  await businessPlan.focus();
  await page.keyboard.press("Space");
  await expect(businessPlan).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText("Selected plan: Business")).toBeVisible();

  await gotoStory(page, "registry-radio-group--horizontal");

  const compactDensity = page.getByRole("radio", {
    name: /Compact/u,
  });
  const spaciousDensity = page.getByRole("radio", {
    name: /Spacious/u,
  });

  await compactDensity.focus();
  await page.keyboard.press("Space");
  await expect(compactDensity).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText("Selected density: Compact")).toBeVisible();
  await expect(spaciousDensity).toHaveAttribute("aria-disabled", "true");
  await expect(spaciousDensity).toHaveAttribute("aria-checked", "false");
});

test("Calendar and DatePicker OpenStory examples select allowed dates", async ({
  page,
}) => {
  await gotoStory(page, "registry-calendar--basic");

  await page.getByRole("button", { name: "Friday, April 17, 2026" }).click();
  await expect(page.getByText("Selected date: 2026-04-17")).toBeVisible();

  await gotoStory(page, "registry-calendar--bounds");

  const disabledToday = page.getByRole("button", {
    name: "Thursday, April 16, 2026",
  });

  await expect(disabledToday).toHaveAttribute("aria-disabled", "true");
  await page.getByRole("button", { name: "Friday, April 17, 2026" }).click();
  await expect(page.getByText("Selected bounded date: 2026-04-17")).toBeVisible();

  await gotoStory(page, "registry-date-picker--basic");

  await page.getByRole("button", { name: /Pick a date/u }).click();
  await page.getByRole("button", { name: "Friday, April 17, 2026" }).click();
  await expect(page.getByText("Selected date: 2026-04-17")).toBeVisible();
  await expect(
    page.getByRole("button", { name: /2026-04-17/u })
  ).toBeVisible();

  await gotoStory(page, "registry-date-picker--bounds");

  await page.getByRole("button", { name: /Pick a date/u }).click();
  await expect(
    page.getByRole("button", { name: "Thursday, April 16, 2026" })
  ).toHaveAttribute("aria-disabled", "true");
  await page.getByRole("button", { name: "Friday, April 17, 2026" }).click();
  await expect(
    page.getByText("Selected bounded date: 2026-04-17")
  ).toBeVisible();
});

test("FileDrop OpenStory examples accept selected files and preserve disabled state", async ({
  page,
}) => {
  await gotoStory(page, "registry-file-drop--basic");

  const input = page.locator("#file-drop-basic");

  await input.setInputFiles({
    name: "registry-proof.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("registry proof"),
  });

  await expect(page.getByText("Selected files: 1")).toBeVisible();
  await expect(page.getByText("registry-proof.txt")).toBeVisible();

  await page.getByRole("button", { name: "Remove" }).click();
  await expect(page.getByText("Selected files: 0")).toBeVisible();

  await gotoStory(page, "registry-file-drop--disabled");

  await expect(page.locator("#file-drop-disabled")).toBeDisabled();
  await expect(page.getByText("File uploads disabled")).toBeVisible();
});

test("Popover and Dialog OpenStory examples open and dismiss portal surfaces", async ({
  page,
}) => {
  await gotoStory(page, "registry-popover--basic");

  const popoverTrigger = page.getByRole("button", {
    name: "Open popover",
  });

  await popoverTrigger.click();
  await expect(popoverTrigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#popover-basic-panel")).toContainText("Analytics");
  await page.keyboard.press("Escape");
  await expect(popoverTrigger).toHaveAttribute("aria-expanded", "false");

  await gotoStory(page, "registry-popover--animated");

  const animatedTrigger = page.getByRole("button", {
    name: "Open animated popover",
  });

  await animatedTrigger.click();
  await expect(animatedTrigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#popover-animated-panel")).toContainText(
    "Animated popover"
  );
  await page.keyboard.press("Escape");
  await expect(animatedTrigger).toHaveAttribute("aria-expanded", "false");

  await gotoStory(page, "registry-dialog--basic");

  await page.getByRole("button", { name: "Open dialog" }).click();
  await expect(
    page.getByRole("heading", { name: "Edit profile" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("heading", { name: "Edit profile" })).toBeHidden();

  await gotoStory(page, "registry-dialog--animated");

  await page.getByRole("button", { name: "Open animated dialog" }).click();
  await expect(
    page.getByRole("heading", { name: "Animated dialog" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Done" }).click();
  await expect(
    page.getByRole("heading", { name: "Animated dialog" })
  ).toBeHidden();
});
