import { defineConfig } from "vitest/config";

import { optimizedSourceAliases } from "./vite.aliases";

export default defineConfig({
  resolve: {
    alias: optimizedSourceAliases,
  },
  test: {
    projects: [
      {
        name: "foldkit-basic-cn-ui",
        resolve: {
          alias: optimizedSourceAliases,
        },
        test: {
          environment: "happy-dom",
          include: [
            "src/**/*.{test,spec}.{ts,tsx,js,mjs}",
            "scripts/**/*.{test,spec}.{ts,tsx,js,mjs}",
            "registry/default/**/*.{test,spec}.{ts,tsx,js,mjs}",
            "registry/shadcn/**/*.{test,spec}.{ts,tsx,js,mjs}",
          ],
          setupFiles: ["./src/vitest-setup.ts"],
          server: {
            deps: {
              inline: ["foldkit"],
            },
          },
        },
      },
    ],
    environment: "happy-dom",
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/repos/**",
      "**/tests/e2e/**",
    ],
    setupFiles: ["./src/vitest-setup.ts"],
    server: {
      deps: {
        inline: ["foldkit"],
      },
    },
  },
});
