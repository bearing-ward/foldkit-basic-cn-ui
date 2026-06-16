import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        name: "foldkit-basic-cn-ui",
        test: {
          environment: "happy-dom",
          include: [
            "src/**/*.{test,spec}.{ts,tsx,js,mjs}",
            "scripts/**/*.{test,spec}.{ts,tsx,js,mjs}",
            "registry/default/**/*.{test,spec}.{ts,tsx,js,mjs}",
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
