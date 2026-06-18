import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { Effect } from "effect";
import { afterEach, describe, expect, test } from "vitest";

import {
  resolveRegistryRequestPath,
  runServeRegistryCliMain,
  startRegistryServer,
} from "./serve-registry";

const tempRoot = () => mkdtemp(path.join(os.tmpdir(), "foldkit-cn-serve-"));

const writeJson = (filePath: string, value: unknown): Promise<void> =>
  writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);

const createPublicRegistry = async (): Promise<string> => {
  const rootDir = await tempRoot();
  const publicDir = path.join(rootDir, "public");

  await mkdir(publicDir, { recursive: true });
  await writeJson(path.join(publicDir, "components.json"), {
    registries: {
      "@foldkit-cn": "http://127.0.0.1:4174/{name}.json",
    },
  });
  await writeJson(path.join(publicDir, "registry.json"), {
    name: "foldkit-cn",
    items: [{ name: "button" }],
  });
  await writeJson(path.join(publicDir, "button.json"), {
    name: "button",
    type: "registry:ui",
  });

  return rootDir;
};

const parseJsonResponse = async <A>(url: string): Promise<A> =>
  (await (await fetch(url)).json()) as A;

describe("serve registry CLI", () => {
  const cleanupRoots: Array<string> = [];

  afterEach(async () => {
    await Promise.all(
      cleanupRoots.splice(0).map((rootDir) =>
        rm(rootDir, { recursive: true, force: true })
      )
    );
  });

  test("prints generated Effect CLI help", async () => {
    await Effect.runPromise(runServeRegistryCliMain(["--help"]));
  });

  test("normalizes safe registry paths and rejects traversal", () => {
    const publicDir = "/tmp/public";
    const components = resolveRegistryRequestPath(publicDir, "/components.json");
    const item = resolveRegistryRequestPath(publicDir, "/button.json");
    const traversal = resolveRegistryRequestPath(publicDir, "/../package.json");

    expect(components).toMatchObject({
      _tag: "File",
      relativePath: "components.json",
    });
    expect(item).toMatchObject({
      _tag: "File",
      relativePath: "button.json",
    });
    expect(traversal).toEqual({ _tag: "NotFound" });
  });

  test("serves generated JSON artifacts and returns 404 for unknown paths", async () => {
    const rootDir = await createPublicRegistry();
    cleanupRoots.push(rootDir);

    const server = await startRegistryServer({
      publicDir: path.join(rootDir, "public"),
      host: "127.0.0.1",
      port: 0,
    });

    try {
      const components = await parseJsonResponse<{
        registries: Record<string, string>;
      }>(server.componentsJsonUrl);
      const button = await parseJsonResponse<{ name: string }>(
        `${server.localBaseUrl}/button.json`
      );
      const missing = await fetch(`${server.localBaseUrl}/missing.json`);

      expect(components.registries["@foldkit-cn"]).toBe(
        "http://127.0.0.1:4174/{name}.json"
      );
      expect(button.name).toBe("button");
      expect(missing.status).toBe(404);
    } finally {
      await server.close();
    }

    await expect(readFile(path.join(rootDir, "public/components.json"), "utf-8"))
      .resolves.toContain("@foldkit-cn");
  });
});
