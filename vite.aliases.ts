import { fileURLToPath } from "node:url";

const sourceEntry = (path: string): string =>
  fileURLToPath(new URL(path, import.meta.url));

const legacyUiViewsEntry = sourceEntry("./src/ui/view/index.ts");

export const optimizedSourceAliases = {
  "@/src/lib/utils": sourceEntry("./src/lib/utils.ts"),
  "app-main": sourceEntry("./src/main.ts"),
  "docs-example-routes": sourceEntry("./src/docsExampleRoutes.ts"),
  "docs-example-previews-accordion": sourceEntry(
    "./src/docsExamplePreviewsAccordion.ts"
  ),
  "docs-example-previews-alert": sourceEntry(
    "./src/docsExamplePreviewsAlert.ts"
  ),
  "docs-example-previews-animation": sourceEntry(
    "./src/docsExamplePreviewsAnimation.ts"
  ),
  "docs-example-previews-aspect": sourceEntry(
    "./src/docsExamplePreviewsAspect.ts"
  ),
  "docs-example-previews-autocomplete": sourceEntry(
    "./src/docsExamplePreviewsAutocomplete.ts"
  ),
  "docs-example-previews-avatar": sourceEntry(
    "./src/docsExamplePreviewsAvatar.ts"
  ),
  "docs-example-previews-b": sourceEntry("./src/docsExamplePreviewsB.ts"),
  "docs-example-previews-cd": sourceEntry("./src/docsExamplePreviewsCD.ts"),
  "docs-example-previews-ei": sourceEntry("./src/docsExamplePreviewsEI.ts"),
  "docs-example-previews-jm": sourceEntry("./src/docsExamplePreviewsJM.ts"),
  "docs-example-previews-nz": sourceEntry("./src/docsExamplePreviewsNZ.ts"),
  "docs-example-previews-shadcn-missing": sourceEntry(
    "./src/docsExamplePreviewsShadcnMissing.ts"
  ),
  "legacy-ui-views": legacyUiViewsEntry,
} as const;
