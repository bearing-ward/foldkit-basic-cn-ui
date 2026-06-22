import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { NodeServices } from "@effect/platform-node";
import { Effect } from "effect";
import { afterEach, describe, expect, test, vi } from "vitest";

import { runScaffoldCli } from "./scaffold-component-slice";

const runCli = (args: ReadonlyArray<string>) =>
  Effect.runPromise(
    runScaffoldCli(args).pipe(Effect.provide(NodeServices.layer))
  );

const consoleLogSpy = () =>
  vi.spyOn(console, "log").mockImplementation(() => {});

describe("scaffold component slice CLI", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("dry-runs by default and prints validation commands", async () => {
    const log = consoleLogSpy();

    await runCli(["--origin", "shadcn", "--name", "Command Menu"]);

    const output = log.mock.calls.map((call) => call.join(" ")).join("\n");

    expect(output).toContain("Component slice scaffold dry run");
    expect(output).toContain("Origin: shadcn");
    expect(output).toContain("Name: command-menu");
    expect(output).toContain("Validation commands:");
    expect(output).toContain("- bun run build:registry");
    expect(output).toContain(
      "Dry run only. Re-run with --write to create TODO skeleton files."
    );
  });

  test("write mode creates TODO skeleton files under an explicit root", async () => {
    const rootDir = await mkdtemp(
      path.join(os.tmpdir(), "foldkit-cn-scaffold-")
    );
    const log = consoleLogSpy();

    try {
      await runCli([
        "--origin",
        "base-ui",
        "--name",
        "Review Fixture",
        "--primitive",
        "ReviewFixture",
        "--root",
        rootDir,
        "--write",
      ]);

      const view = await readFile(
        path.join(rootDir, "registry/base-ui/review-fixture/ui/view.ts"),
        "utf-8"
      );
      const output = log.mock.calls.map((call) => call.join(" ")).join("\n");

      expect(view).toContain("TODO: Replace ReviewFixture scaffold content.");
      expect(output).toContain("Component slice scaffold write plan");
      expect(output).toContain("Primitive: ReviewFixture");
    } finally {
      await rm(rootDir, { recursive: true, force: true });
    }
  });
});
