import { spawnSync } from "node:child_process";
import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const registryBaseUrl =
  process.env.PUBLIC_REGISTRY_BASE_URL ??
  "https://bearing-ward.github.io/foldkit-basic-cn-ui";
const tempDir = await mkdtemp(path.join(tmpdir(), "foldkit-cn-install-"));
const binDir = path.join(tempDir, "bin");
const npmShimPath = path.join(binDir, "npm");

const run = (command, args) => {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    env: {
      ...process.env,
      PATH: `${binDir}${path.delimiter}${process.env.PATH ?? ""}`,
    },
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

const readInstalledFile = (filePath) =>
  readFile(path.join(tempDir, filePath), "utf-8");

const expectIncludes = (content, expected, filePath) => {
  if (content.includes(expected)) {
    return;
  }

  throw new Error(`${filePath} did not include ${expected}`);
};

try {
  await mkdir(binDir);
  await writeFile(
    npmShimPath,
    `#!/bin/sh
if [ "$1" = "install" ]; then
  shift
  exec "${process.execPath}" add "$@"
fi

echo "Unsupported npm shim command: $*" >&2
exit 1
`
  );
  await chmod(npmShimPath, 0o755);

  const componentsConfig = JSON.parse(
    await readFile(path.join(rootDir, "apps/docs/public/components.json"))
  );

  await writeFile(
    path.join(tempDir, "components.json"),
    `${JSON.stringify(
      {
        ...componentsConfig,
        registries: {
          ...componentsConfig.registries,
          "@foldkit-cn": `${registryBaseUrl}/{name}.json`,
        },
      },
      null,
      2
    )}\n`
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
    "@foldkit-cn/shadcn-button",
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
    "src/ui/shadcn-button/index.ts",
    "src/ui/shadcn-button/view.ts",
    "src/lib/utils.ts",
  ]) {
    await readInstalledFile(filePath);
  }

  const shadcnButtonView = await readInstalledFile(
    "src/ui/shadcn-button/view.ts"
  );
  expectIncludes(
    shadcnButtonView,
    'import { cn } from "@/src/lib/utils";',
    "src/ui/shadcn-button/view.ts"
  );

  const utils = await readInstalledFile("src/lib/utils.ts");
  expectIncludes(utils, 'from "clsx";', "src/lib/utils.ts");
  expectIncludes(utils, 'from "tailwind-merge";', "src/lib/utils.ts");

  const packageJson = JSON.parse(
    await readFile(path.join(tempDir, "package.json"), "utf-8")
  );
  const installedDependencies = new Set(
    Object.keys(packageJson.dependencies ?? {})
  );

  for (const dependency of ["clsx", "tailwind-merge"]) {
    if (!installedDependencies.has(dependency)) {
      throw new Error(`${dependency} was not installed as a dependency`);
    }
  }
} finally {
  await rm(tempDir, { force: true, recursive: true });
}

console.log("Public registry install smoke passed");
