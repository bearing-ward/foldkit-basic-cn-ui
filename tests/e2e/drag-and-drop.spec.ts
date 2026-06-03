import { expect, test } from "@playwright/test";

test("DragAndDrop docs basic example reorders with pointer drag", async ({
  page,
}) => {
  await page.goto("/docs/components/drag-and-drop");

  const preview = page.getByTestId(
    "docs-example-block-drag-and-drop-basic-preview"
  );
  const plan = preview.getByRole("option", { name: /Plan/u });
  const build = preview.getByRole("option", { name: /Build/u });

  await expect(plan).toBeVisible();
  await expect(
    preview.getByText("Task order: Plan, Build, Verify")
  ).toBeVisible();

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
  await page.mouse.move(buildBox.x + buildBox.width / 2, buildBox.y + 5, {
    steps: 10,
  });
  await page.mouse.up();

  await expect(
    preview.getByText("Task order: Build, Plan, Verify")
  ).toBeVisible();
});

test("DragAndDrop docs disabled example is inert", async ({ page }) => {
  await page.goto("/docs/components/drag-and-drop");

  const preview = page.getByTestId(
    "docs-example-block-drag-and-drop-disabled-preview"
  );
  const plan = preview.locator('[role="listitem"]').filter({ hasText: "Plan" });

  await expect(
    preview.getByRole("list", { name: "Locked task order" })
  ).toBeVisible();
  await expect(plan).toHaveAttribute("aria-disabled", "true");
  await expect(plan).not.toHaveAttribute("data-draggable-id");
});
