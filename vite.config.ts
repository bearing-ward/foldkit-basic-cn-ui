import { foldkit } from "@foldkit/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/foldkit-basic-cn-ui/" : "/",
  plugins: [tailwindcss(), foldkit({ devToolsMcpPort: 9988 })],
  publicDir: "apps/docs/public",
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }

          return undefined;
        },
      },
    },
  },
  optimizeDeps: {
    entries: ["src/entry.ts"],
  },
});
