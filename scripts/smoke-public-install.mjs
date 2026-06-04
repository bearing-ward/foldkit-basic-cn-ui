import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const registryBaseUrl =
  process.env.PUBLIC_REGISTRY_BASE_URL ??
  "https://bearing-ward.github.io/foldkit-basic-cn-ui/r";
const tempDir = await mkdtemp(path.join(tmpdir(), "foldkit-cn-install-"));

const run = (command, args) => {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.status === 0) {
    return;
  }

  throw new Error(
    `${command} ${args.join(" ")} failed with ${result.status}\n${result.stdout}\n${result.stderr}`
  );
};

try {
  await writeFile(
    path.join(tempDir, "components.json"),
    await readFile(path.join(rootDir, "apps/docs/public/components.json"))
  );
  await mkdir(path.join(tempDir, "src"));
  await writeFile(path.join(tempDir, "package.json"), "{}\n");
  await writeFile(
    path.join(tempDir, "tsconfig.json"),
    `${JSON.stringify({
      compilerOptions: {
        baseUrl: ".",
        paths: {
          "@/*": ["*"],
          "src/*": ["src/*"],
        },
      },
    })}\n`
  );

  for (const component of [
    `${registryBaseUrl}/button.json`,
    "@foldkit-cn/slider",
  ]) {
    run("bunx", [
      "shadcn@latest",
      "add",
      component,
      "--cwd",
      tempDir,
      "--yes",
      "--overwrite",
      "--silent",
    ]);
  }

  for (const filePath of [
    "src/ui/button/index.ts",
    "src/ui/button/view.ts",
    "src/ui/button/button.scene.test.ts",
    "src/ui/slider/index.ts",
    "src/ui/slider/view.ts",
    "src/ui/slider/slider.scene.test.ts",
  ]) {
    await readFile(path.join(tempDir, filePath), "utf-8");
  }
} finally {
  await rm(tempDir, { force: true, recursive: true });
}

console.log("Public registry install smoke passed");
