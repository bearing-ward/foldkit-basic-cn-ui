import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, test } from "vitest";

import {
  createRegistryDependencyQualifier,
  readSourceRegistryItems,
} from "./registry-manifest.mjs";

const tempRoot = () => mkdtemp(path.join(os.tmpdir(), "foldkit-cn-manifest-"));

const cleanupRoots: Array<string> = [];

const writeJson = async (filePath: string, value: unknown): Promise<void> =>
  writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);

const registryItem = (
  name: string,
  registryDependencies: ReadonlyArray<string> = []
) => ({
  name,
  type: "registry:ui",
  title: name,
  description: name,
  dependencies: [],
  devDependencies: [],
  registryDependencies,
  files: [],
});

const createIncludedRegistry = async (): Promise<string> => {
  const rootDir = await tempRoot();
  cleanupRoots.push(rootDir);

  await mkdir(path.join(rootDir, "registry/foldkit"), { recursive: true });
  await mkdir(path.join(rootDir, "registry/base-ui"), { recursive: true });
  await writeJson(path.join(rootDir, "registry/registry.json"), {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "foldkit-cn",
    homepage: "https://example.com",
    include: ["registry/foldkit/registry.json", "registry/base-ui/registry.json"],
  });
  await writeJson(path.join(rootDir, "registry/foldkit/registry.json"), {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    items: [registryItem("button")],
  });
  await writeJson(path.join(rootDir, "registry/base-ui/registry.json"), {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    items: [registryItem("base-ui-button")],
  });

  return rootDir;
};

describe("registry manifest", () => {
  afterEach(async () => {
    await Promise.all(
      cleanupRoots.splice(0).map((rootDir) =>
        rm(rootDir, { recursive: true, force: true })
      )
    );
  });

  test("flattens included registries in include order", async () => {
    const rootDir = await createIncludedRegistry();

    const items = await readSourceRegistryItems({
      rootDir,
      registryPath: "registry/registry.json",
    });

    expect(items.map((item) => item.name)).toEqual(["button", "base-ui-button"]);
  });

  test("rejects duplicate item names across includes", async () => {
    const rootDir = await createIncludedRegistry();
    await writeJson(path.join(rootDir, "registry/base-ui/registry.json"), {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      items: [registryItem("button")],
    });

    await expect(
      readSourceRegistryItems({ rootDir, registryPath: "registry/registry.json" })
    ).rejects.toThrow("Duplicate registry item name: button");
  });

  test("qualifies same-registry dependencies", () => {
    const qualify = createRegistryDependencyQualifier([
      registryItem("button"),
      registryItem("card"),
    ]);

    expect(qualify("button")).toBe("@foldkit-cn/button");
  });

  test("leaves unknown, URL, HTTP(S), and namespaced dependencies unchanged", () => {
    const qualify = createRegistryDependencyQualifier([registryItem("button")]);

    expect([
      "input",
      "@foldkit-cn/card",
      "@acme/card",
      "http://example.com/card.json",
      "https://example.com/card.json",
    ].map(qualify)).toEqual([
      "input",
      "@foldkit-cn/card",
      "@acme/card",
      "http://example.com/card.json",
      "https://example.com/card.json",
    ]);
  });
});
