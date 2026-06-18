import { foldkit } from "@foldkit/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import { openstory } from "openstory/plugin"

import { defineConfig } from "vite"

import { optimizedSourceAliases } from "./vite.aliases"

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

const exactChunkGroup = (modulePath: string, name: string) => ({
  name,
  test: (id: string) => id.endsWith(modulePath),
  priority: 50,
})

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
            exactChunkGroup("/src/docsView.ts", "docs-view"),
            exactChunkGroup("/src/docsExampleRoutes.ts", "docs-example-routes"),
            exactChunkGroup(
              "/src/docsExamplePreviewsAccordion.ts",
              "docs-example-previews-accordion"
            ),
            exactChunkGroup(
              "/src/docsExamplePreviewsAlert.ts",
              "docs-example-previews-alert"
            ),
            exactChunkGroup(
              "/src/docsExamplePreviewsAspect.ts",
              "docs-example-previews-aspect"
            ),
            exactChunkGroup(
              "/src/docsExamplePreviewsAnimation.ts",
              "docs-example-previews-animation"
            ),
            exactChunkGroup(
              "/src/docsExamplePreviewsAutocomplete.ts",
              "docs-example-previews-autocomplete"
            ),
            exactChunkGroup(
              "/src/docsExamplePreviewsAvatar.ts",
              "docs-example-previews-avatar"
            ),
            exactChunkGroup(
              "/src/docsExamplePreviewsB.ts",
              "docs-example-previews-b"
            ),
            exactChunkGroup(
              "/src/docsExamplePreviewsCD.ts",
              "docs-example-previews-cd"
            ),
            exactChunkGroup(
              "/src/docsExamplePreviewsEI.ts",
              "docs-example-previews-ei"
            ),
            exactChunkGroup(
              "/src/docsExamplePreviewsJM.ts",
              "docs-example-previews-jm"
            ),
            exactChunkGroup(
              "/src/docsExamplePreviewsNZ.ts",
              "docs-example-previews-nz"
            ),
            {
              name: (id) => registryExampleChunkName(id) ?? null,
              test: (id) => registryExampleChunkName(id) !== undefined,
              priority: 20,
            },
            {
              name: "registry-ui",
              test: /registry\/(?:foldkit|base-ui|shadcn|ai-elements)\/ui\//u,
              priority: 10,
            },
          ],
        },
      },
    },
  },
  optimizeDeps: {
    entries: ["src/entry.ts"],
    include: Object.keys(optimizedSourceAliases),
  },
})
