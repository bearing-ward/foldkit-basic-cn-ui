import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { Effect } from "effect";
import { afterEach, describe, expect, test, vi } from "vitest";

import { runRegistryCliMain } from "./component-registry-cli";

const runCli = (args: ReadonlyArray<string>) =>
  Effect.runPromise(runRegistryCliMain(args));

const consoleLogSpy = () =>
  vi.spyOn(console, "log").mockImplementation(() => {});

const tempRoot = () => mkdtemp(path.join(os.tmpdir(), "foldkit-cn-registry-"));

describe("component registry CLI", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("lists registry items with metadata", async () => {
    const log = consoleLogSpy();

    await runCli(["list"]);

    const output = log.mock.calls.map((call) => call.join(" ")).join("\n");

    expect(output).toContain("Foldkit CN registry items");
    expect(output).toContain("button | type=registry:ui");
    expect(output).toContain("dialog | type=registry:ui");
    expect(output).toContain("tabs | type=registry:ui");
    expect(output).toContain("artifact=primitive-backed-component");
    expect(output).toContain("public=yes");
  });

  test("fails when installing a missing item", async () => {
    await expect(runCli(["install", "missing-item"])).rejects.toThrow(
      "Unknown registry item: missing-item"
    );
  });

  test("dry-runs install without writing files", async () => {
    const appRoot = await tempRoot();
    const log = consoleLogSpy();

    try {
      await runCli(["install", "button", "--app-root", appRoot, "--dry-run"]);

      const output = log.mock.calls.map((call) => call.join(" ")).join("\n");

      expect(output).toContain("Foldkit CN install dry run");
      expect(output).toContain(
        "Registry URL: https://bearing-ward.github.io/foldkit-basic-cn-ui/r/button.json"
      );
      expect(output).toContain("- button: src/ui/button/index.ts");
      expect(output).toContain("Dry run only. Re-run with --execute");
      await expect(
        readFile(path.join(appRoot, "src/ui/button/index.ts"), "utf-8")
      ).rejects.toThrow();
    } finally {
      await rm(appRoot, { recursive: true, force: true });
    }
  });

  test("executes install into a consuming app fixture", async () => {
    const appRoot = await tempRoot();
    const log = consoleLogSpy();

    try {
      await runCli(["install", "button", "--app-root", appRoot, "--execute"]);

      const buttonIndex = await readFile(
        path.join(appRoot, "src/ui/button/index.ts"),
        "utf-8"
      );
      const metadata = await readFile(
        path.join(appRoot, ".foldkit-cn/registry.json"),
        "utf-8"
      );
      const output = log.mock.calls.map((call) => call.join(" ")).join("\n");

      expect(buttonIndex).toContain("export const { view } = Ui.Button;");
      expect(metadata).toContain('"name": "button"');
      expect(metadata).toContain('"registryAlias": "@foldkit-cn/button"');
      expect(output).toContain("Foldkit CN install execution");
      expect(output).toContain("Install complete.");
    } finally {
      await rm(appRoot, { recursive: true, force: true });
    }
  });

  test("inspects update state without writing files", async () => {
    const appRoot = await tempRoot();
    const log = consoleLogSpy();

    try {
      await runCli(["install", "button", "--app-root", appRoot, "--execute"]);

      const metadataPath = path.join(appRoot, ".foldkit-cn/registry.json");
      const before = await readFile(metadataPath, "utf-8");

      log.mockClear();

      await runCli(["update", "button", "--app-root", appRoot, "--inspect"]);

      const after = await readFile(metadataPath, "utf-8");
      const output = log.mock.calls.map((call) => call.join(" ")).join("\n");

      expect(after).toBe(before);
      expect(output).toContain("Foldkit CN update inspect");
      expect(output).toContain("Upstream: matches recorded digest");
      expect(output).toContain("- src/ui/button/index.ts: clean");
      expect(output).toContain("No files were written");
    } finally {
      await rm(appRoot, { recursive: true, force: true });
    }
  });

  test("requires explicit inspect mode for update", async () => {
    const appRoot = await tempRoot();

    try {
      await runCli(["install", "button", "--app-root", appRoot, "--execute"]);

      await expect(
        runCli(["update", "button", "--app-root", appRoot])
      ).rejects.toThrow("Update requires explicit --inspect mode.");
    } finally {
      await rm(appRoot, { recursive: true, force: true });
    }
  });
});
