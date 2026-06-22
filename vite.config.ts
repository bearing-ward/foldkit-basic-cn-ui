import { foldkit } from "@foldkit/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import { openstory } from "openstory/plugin"

import { defineConfig } from "vite"

import { optimizedSourceAliases } from "./vite.aliases"

const activeSourceScanEntries = [
  "src/**/*.ts",
  "!src/docsView.ts",
  "registry/{foldkit,base-ui,shadcn,ai-elements}/**/*.ts",
]

const registryExampleChunkName = (id: string): string | undefined => {
  const match = id.match(
    /registry\/(?:foldkit|base-ui|shadcn|ai-elements)\/examples\/([^/]+)\//u
  )

  if (match?.[1] === undefined) {
    return undefined
  }

  const [, slug] = match
  const prefix = slug.split("-").at(0) ?? slug

  if (
    [
      "accordion",
      "alert",
      "animation",
      "aspect",
      "avatar",
      "badge",
      "breadcrumb",
      "button",
      "calendar",
      "card",
      "carousel",
      "chart",
    ].includes(prefix)
  ) {
    return "registry-examples-a-c"
  }

  if (
    [
      "checkbox",
      "collapsible",
      "combobox",
      "command",
      "context",
      "data",
      "date",
      "dialog",
      "direction",
      "drawer",
      "drag",
      "dropdown",
      "empty",
      "field",
      "fieldset",
      "file",
      "form",
    ].includes(prefix)
  ) {
    return "registry-examples-d-f"
  }

  if (
    [
      "hover",
      "input",
      "item",
      "kbd",
      "label",
      "listbox",
      "menu",
      "menubar",
      "meter",
      "native",
      "navigation",
      "number",
      "otp",
      "pagination",
      "popover",
      "preview",
      "progress",
      "radio",
      "resizable",
      "scroll",
      "select",
      "separator",
      "sheet",
      "sidebar",
      "skeleton",
      "slider",
      "sonner",
      "spinner",
    ].includes(prefix)
  ) {
    return "registry-examples-g-s"
  }

  return "registry-examples-t-z"
}

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/foldkit-basic-cn-ui/" : "/",
  resolve: {
    alias: optimizedSourceAliases,
  },
  plugins: [tailwindcss(), foldkit({ devToolsMcpPort: 9988 }), openstory({ framework: "foldkit" })],
  publicDir: "apps/docs/public",
  build: {
    rolldownOptions: {
      output: {
        strictExecutionOrder: true,
        codeSplitting: {
          includeDependenciesRecursively: false,
          groups: [
            {
              name: "vendor",
              test: /node_modules/u,
              priority: 100,
            },
            {
              name: (id) => registryExampleChunkName(id) ?? null,
              test: (id) => registryExampleChunkName(id) !== undefined,
              priority: 20,
            },
            {
              name: "registry-ui",
              test: /registry\/(?:foldkit|base-ui|shadcn|ai-elements)\/(?:[^/]+\/)?ui\//u,
              priority: 10,
            },
          ],
        },
      },
    },
  },
  optimizeDeps: {
    entries: activeSourceScanEntries,
    include: Object.keys(optimizedSourceAliases),
  },
})
