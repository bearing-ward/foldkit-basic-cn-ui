import { fileURLToPath } from "node:url";

const sourceEntry = (path: string): string =>
  fileURLToPath(new URL(path, import.meta.url));

export const optimizedSourceAliases = {
  "@/src/lib/utils": sourceEntry("./src/lib/utils.ts"),
} as const;
