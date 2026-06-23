import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const shadcnDir = path.join(rootDir, "registry", "shadcn");

const walk = (dir) =>
  readdirSync(dir)
    .flatMap((entry) => {
      const entryPath = path.join(dir, entry);
      const stats = statSync(entryPath);
      return stats.isDirectory() ? walk(entryPath) : [entryPath];
    });

const isExampleMain = (filePath) =>
  filePath.endsWith(`${path.sep}main.ts`) &&
  filePath.split(path.sep).includes("examples");

const relativePath = (filePath) => path.relative(rootDir, filePath);

const themeStatusFor = (filePath) => {
  const source = readFileSync(filePath, "utf-8");
  return source.includes("ShadcnOpenStoryThemeInput") ||
    source.includes("viewInputs?.shadcnTheme") ||
    source.includes("viewInputs.shadcnTheme")
    ? "themed"
    : "pending";
};

const rows = walk(shadcnDir)
  .filter(isExampleMain)
  .map((filePath) => ({
    path: relativePath(filePath),
    status: themeStatusFor(filePath),
  }))
  .toSorted((left, right) => left.path.localeCompare(right.path));

const themed = rows.filter((row) => row.status === "themed");
const pending = rows.filter((row) => row.status === "pending");

console.log(
  `OpenStory shadcn theme worklist: ${themed.length} themed, ${pending.length} pending, ${rows.length} total`
);
console.log("");
console.log("THEMED");
console.log(themed.map((row) => `- ${row.path}`).join("\n"));
console.log("");
console.log("PENDING");
console.log(pending.map((row) => `- ${row.path}`).join("\n"));
