import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { Effect } from "effect";
import { afterEach, describe, expect, test, vi } from "vitest";

import { runGenerateRegistryProjectCliMain } from "./generate-registry-project";

const runCli = (args: ReadonlyArray<string>) =>
  Effect.runPromise(runGenerateRegistryProjectCliMain(args));

const consoleLogSpy = () =>
  vi.spyOn(console, "log").mockImplementation(() => {});

const tempRoot = () =>
  mkdtemp(path.join(os.tmpdir(), "foldkit-cn-project-"));

const parseJsonFile = async <A>(filePath: string): Promise<A> =>
  JSON.parse(await readFile(filePath, "utf-8")) as A;

describe("generate registry project CLI", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("prints generated Effect CLI help", async () => {
    await runCli(["--help"]);
  });

  test("requires a non-empty project name", async () => {
    const rootDir = await tempRoot();

    try {
      await expect(
        runCli([
          rootDir,
          "--name",
          "",
          "--homepage",
          "https://example.com/acme",
          "--registry-base-url",
          "https://example.com/acme",
        ])
      ).rejects.toThrow("Project name is required.");
    } finally {
      await rm(rootDir, { recursive: true, force: true });
    }
  });

  test("generates the documented project layout and parseable JSON", async () => {
    const rootDir = await tempRoot();
    const log = consoleLogSpy();

    try {
      await runCli([
        rootDir,
        "--name",
        "acme-foldkit-cn",
        "--homepage",
        "https://example.com/acme",
        "--registry-base-url",
        "https://example.com/acme",
      ]);

      const packageJson = await parseJsonFile<{
        scripts: Record<string, string>;
      }>(path.join(rootDir, "package.json"));
      const registryConfig = await parseJsonFile<{
        name: string;
        homepage: string;
        registryBaseUrl: string;
      }>(path.join(rootDir, "registry/config.json"));
      const registry = await parseJsonFile<{
        include: ReadonlyArray<string>;
      }>(path.join(rootDir, "registry/registry.json"));
      const laneRegistry = await parseJsonFile<{
        items: ReadonlyArray<{ name: string }>;
      }>(path.join(rootDir, "registry/foldkit/registry.json"));
      const components = await parseJsonFile<{
        registries: Record<string, string>;
      }>(path.join(rootDir, "registry/templates/components.json"));
      const publicComponents = await parseJsonFile<{
        registries: Record<string, string>;
      }>(path.join(rootDir, "apps/docs/public/components.json"));
      const publicItem = await parseJsonFile<{ name: string }>(
        path.join(rootDir, "apps/docs/public/example-card.json")
      );
      const view = await readFile(
        path.join(rootDir, "registry/foldkit/ui/example-card/view.ts"),
        "utf-8"
      );
      const readme = await readFile(path.join(rootDir, "README.md"), "utf-8");
      const dockerfile = await readFile(
        path.join(rootDir, "Dockerfile"),
        "utf-8"
      );
      const compose = await readFile(
        path.join(rootDir, "compose.yaml"),
        "utf-8"
      );
      const serveRegistry = await readFile(
        path.join(rootDir, "scripts/serve-registry.ts"),
        "utf-8"
      );
      const output = log.mock.calls.map((call) => call.join(" ")).join("\n");

      expect(packageJson.scripts["build:registry"]).toBe(
        "bun scripts/build-registry.mjs"
      );
      expect(packageJson.scripts["check:registry"]).toContain(
        "scripts/check-registry.mjs"
      );
      expect(packageJson.scripts["serve:registry"]).toBe(
        "bun scripts/serve-registry.ts"
      );
      expect(registryConfig).toEqual({
        name: "acme-foldkit-cn",
        homepage: "https://example.com/acme",
        registryBaseUrl: "https://example.com/acme",
      });
      expect(registry.include).toEqual(["registry/foldkit/registry.json"]);
      expect(laneRegistry.items.map((item) => item.name)).toEqual([
        "example-card",
      ]);
      expect(components.registries["@custom"]).toBe(
        "{{registryBaseUrl}}/{name}.json"
      );
      expect(publicComponents.registries["@custom"]).toBe(
        "https://example.com/acme/{name}.json"
      );
      expect(publicItem.name).toBe("example-card");
      expect(view).toContain("exampleCardRootClassName");
      expect(readme).toContain("Self-Hosted Registry");
      expect(readme).toContain("bun run serve:registry");
      expect(dockerfile).toContain("bun run serve:registry");
      expect(compose).toContain("registry:");
      expect(serveRegistry).toContain("serve-registry");
      expect(output).toContain("Generated Foldkit CN custom registry project");
      expect(output).toContain("bun run check:registry");
    } finally {
      await rm(rootDir, { recursive: true, force: true });
    }
  });

  test("refuses to overwrite a non-empty target directory without force", async () => {
    const rootDir = await tempRoot();

    try {
      await mkdir(path.join(rootDir, "existing"), { recursive: true });
      await writeFile(path.join(rootDir, "existing/file.txt"), "keep me");

      await expect(
        runCli([
          rootDir,
          "--name",
          "acme-foldkit-cn",
          "--homepage",
          "https://example.com/acme",
          "--registry-base-url",
          "https://example.com/acme",
        ])
      ).rejects.toThrow("Target directory is not empty");
    } finally {
      await rm(rootDir, { recursive: true, force: true });
    }
  });
});
