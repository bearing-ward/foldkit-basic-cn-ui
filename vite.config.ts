import { foldkit } from "@foldkit/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/foldkit-basic-cn-ui/" : "/",
  plugins: [tailwindcss(), foldkit({ devToolsMcpPort: 9988 })],
  publicDir: "apps/docs/public",
  optimizeDeps: {
    entries: ["src/entry.ts"],
  },
});
