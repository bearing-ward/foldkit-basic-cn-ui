import { spawn } from "node:child_process";
import { copyFile, cp, mkdir } from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(rootDir, "apps/docs/public");
const distDir = path.join(rootDir, "dist");

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      stdio: "inherit",
    });

    child.once("error", reject);
    child.once("close", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          signal === null
            ? `${command} ${args.join(" ")} failed with ${code}`
            : `${command} ${args.join(" ")} failed with ${signal}`
        )
      );
    });
  });

const base = process.env.GITHUB_PAGES === "true" ? "/foldkit-basic-cn-ui/" : "/";

await run("bun", ["run", "openstory:generate"]);
await run("bun", ["run", "build:registry"]);
await run("openstory", [
  "build",
  "--framework",
  "foldkit",
  "--out",
  "dist",
  "--base",
  base,
]);

await mkdir(distDir, { recursive: true });
await cp(publicDir, distDir, { recursive: true });
await copyFile(path.join(distDir, "index.html"), path.join(distDir, "404.html"));
