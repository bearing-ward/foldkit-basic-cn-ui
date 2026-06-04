import { expect, test } from "@playwright/test";

test("public registry config resolves installable component items", async ({
  request,
}) => {
  const componentsResponse = await request.get("/components.json");

  await expect(componentsResponse).toBeOK();

  const components = await componentsResponse.json();

  expect(components.registries["@foldkit-cn"]).toBe(
    "https://bearing-ward.github.io/foldkit-basic-cn-ui/r/{name}.json"
  );

  const registryResponse = await request.get("/r/dialog.json");

  await expect(registryResponse).toBeOK();

  const registryItem = await registryResponse.json();

  expect(registryItem.name).toBe("dialog");
  expect(registryItem.type).toBe("registry:ui");
  expect(registryItem.files.length).toBeGreaterThan(0);
});
