import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { Effect } from "effect";
import { afterEach, describe, expect, test, vi } from "vitest";

import {
  runCustomCloneSpinoutCliMain,
  scoreLikeness,
  validateSourceForTrustedRegistry,
} from "./custom-clone-spinout";

const runCli = (args: ReadonlyArray<string>) =>
  Effect.runPromise(runCustomCloneSpinoutCliMain(args));

const consoleLogSpy = () =>
  vi.spyOn(console, "log").mockImplementation(() => {});

const tempRoot = () =>
  mkdtemp(path.join(os.tmpdir(), "foldkit-cn-custom-clone-"));

const writeFixtureRegistryItem = async (rootDir: string): Promise<string> => {
  const fixturePath = path.join(rootDir, "fixtures/review-card.json");

  await mkdir(path.dirname(fixturePath), { recursive: true });
  await writeFile(
    fixturePath,
    JSON.stringify(
      {
        name: "review-card",
        type: "registry:ui",
        title: "Review Card",
        description: "Fixture registry item.",
        dependencies: ["clsx"],
        devDependencies: [],
        registryDependencies: ["button"],
        files: [
          {
            path: "registry/default/ui/review-card/view.ts",
            target: "src/ui/review-card/view.ts",
            type: "registry:ui",
            content: "export const origin = 'reference only';\n",
          },
        ],
      },
      null,
      2
    )
  );

  return new URL(`file://${fixturePath}`).href;
};

describe("custom clone spin-out CLI", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("prints generated Effect CLI help", async () => {
    await runCli(["--help"]);
  });

  test("rejects URLs outside the selected trusted registry allowlist", () => {
    expect(() =>
      validateSourceForTrustedRegistry(
        {
          id: "shadcn",
          description: "test",
          urlPrefixes: ["https://ui.shadcn.com/r/"],
        },
        new URL("https://example.com/r/button.json")
      )
    ).toThrow("Source URL is not allowlisted");
  });

  test("dry-runs a local trusted registry item without writing candidates", async () => {
    const rootDir = await tempRoot();
    const source = await writeFixtureRegistryItem(rootDir);
    const log = consoleLogSpy();

    try {
      await runCli([
        "import",
        source,
        "--trusted-registry",
        "local-file",
        "--root",
        rootDir,
        "--name",
        "Review Card",
      ]);

      const output = log.mock.calls.map((call) => call.join(" ")).join("\n");

      expect(output).toContain("Custom-clone spin-out dry run");
      expect(output).toContain("Trusted registry: local-file");
      expect(output).toContain("Imported item: review-card");
      expect(output).toContain("Item metadata:");
      expect(output).toContain("- clsx");
      expect(output).toContain("- button");
      expect(output).toContain(
        "registry/default/ui/review-card/view.ts -> src/ui/review-card/view.ts"
      );
      expect(output).toContain("Likeness inputs:");
      expect(output).toContain("- target file names: view.ts");
      expect(output).toContain(
        "Dry run only. Re-run with --write to create isolated candidate files."
      );
      await expect(
        readFile(
          path.join(
            rootDir,
            "registry/candidates/custom-clone/review-card/reference/origin-item.json"
          ),
          "utf-8"
        )
      ).rejects.toThrow();
    } finally {
      await rm(rootDir, { recursive: true, force: true });
    }
  });

  test("write mode creates isolated reference and scaffold files", async () => {
    const rootDir = await tempRoot();
    const source = await writeFixtureRegistryItem(rootDir);
    const log = consoleLogSpy();

    try {
      await runCli([
        "import",
        source,
        "--trusted-registry",
        "local-file",
        "--root",
        rootDir,
        "--name",
        "Review Card",
        "--origin",
        "shadcn",
        "--primitive",
        "Card",
        "--write",
      ]);

      const candidateRoot = path.join(
        rootDir,
        "registry/candidates/custom-clone/review-card"
      );
      const readme = await readFile(
        path.join(candidateRoot, "README.md"),
        "utf-8"
      );
      const reference = await readFile(
        path.join(
          candidateRoot,
          "reference/files/registry/default/ui/review-card/view.ts"
        ),
        "utf-8"
      );
      const scaffold = await readFile(
        path.join(
          candidateRoot,
          "candidate-slice/registry/default/ui/review-card/view.ts"
        ),
        "utf-8"
      );
      const output = log.mock.calls.map((call) => call.join(" ")).join("\n");

      expect(readme).toContain("not reviewed Foldkit CN source");
      expect(readme).toContain("Never execute imported code during review.");
      expect(reference).toContain("reference only");
      expect(scaffold).toContain("TODO: Replace ReviewCard scaffold content.");
      expect(output).toContain("Custom-clone spin-out write plan");
      expect(output).toContain("Candidate files written.");
    } finally {
      await rm(rootDir, { recursive: true, force: true });
    }
  });

  test("scores deterministic likeness snapshots as advisory", () => {
    const score = scoreLikeness(
      {
        exampleNames: ["Basic", "Disabled"],
        accessibleText: ["Submit", "Cancel"],
        roles: ["button:Submit", "button:Cancel"],
        states: ["disabled"],
        targetFileNames: ["view.ts"],
      },
      {
        exampleNames: ["Basic"],
        accessibleText: ["Submit", "Reset"],
        roles: ["button:Submit", "button:Reset"],
        states: ["disabled"],
        targetFileNames: ["view.ts"],
      }
    );

    expect(score.advisory).toBe(true);
    expect(score.score).toBe(70);
    expect(score.checks[0]?.missing).toEqual(["Disabled"]);
    expect(score.checks[1]?.extra).toEqual(["Reset"]);
  });
});
