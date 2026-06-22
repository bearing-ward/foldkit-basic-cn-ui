import { expect, test } from "@playwright/test";

test("DragAndDrop OpenStory basic example reorders with pointer drag", async ({
  page,
}) => {
  await page.goto("/__story/registry-drag-and-drop--basic");

  const plan = page.getByRole("option", { name: /Plan/u });
  const build = page.getByRole("option", { name: /Build/u });

  await expect(plan).toBeVisible();
  await expect(page.getByText("Task order: Plan, Build, Verify")).toBeVisible();

  const planBox = await plan.boundingBox();
  const buildBox = await build.boundingBox();

  expect(planBox).not.toBeNull();
  expect(buildBox).not.toBeNull();

  if (planBox === null || buildBox === null) {
    return;
  }

  await page.mouse.move(
    planBox.x + planBox.width / 2,
    planBox.y + planBox.height / 2
  );
  await page.mouse.down();
  await page.waitForTimeout(50);
  await page.mouse.move(
    planBox.x + planBox.width / 2,
    planBox.y + planBox.height / 2 + 16,
    { steps: 4 }
  );
  await page.mouse.move(buildBox.x + buildBox.width / 2, buildBox.y + 5, {
    steps: 10,
  });
  await page.mouse.up();

  await expect(page.getByText("Task order: Build, Plan, Verify")).toBeVisible();
});

test("DragAndDrop OpenStory disabled example is inert", async ({ page }) => {
  await page.goto("/__story/registry-drag-and-drop--disabled");

  const plan = page.locator('[role="listitem"]').filter({ hasText: "Plan" });

  await expect(page.getByRole("list", { name: "Locked task order" })).toBeVisible();
  await expect(plan).toHaveAttribute("aria-disabled", "true");
  await expect(plan).not.toHaveAttribute("data-draggable-id");
});
