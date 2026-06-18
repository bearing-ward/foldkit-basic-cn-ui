import { existsSync, readFileSync, readdirSync } from "node:fs";

import { readSourceRegistryItems } from "./registry-manifest.mjs";

const primitiveSlugs = new Map([
  ["Animation", "animation"],
  ["Button", "button"],
  ["Calendar", "calendar"],
  ["Checkbox", "checkbox"],
  ["Combobox", "combobox"],
  ["DatePicker", "date-picker"],
  ["Dialog", "dialog"],
  ["Disclosure", "disclosure"],
  ["DragAndDrop", "drag-and-drop"],
  ["Fieldset", "fieldset"],
  ["FileDrop", "file-drop"],
  ["Input", "input"],
  ["Listbox", "listbox"],
  ["Menu", "menu"],
  ["Popover", "popover"],
  ["RadioGroup", "radio-group"],
  ["Select", "select"],
  ["Slider", "slider"],
  ["Switch", "switch"],
  ["Tabs", "tabs"],
  ["Textarea", "textarea"],
  ["Toast", "toast"],
  ["Tooltip", "tooltip"],
  ["VirtualList", "virtual-list"],
]);

const primitiveExportPattern = /export \* as (\w+) from/gu;
const foldkitUiExports = [
  ...readFileSync("node_modules/foldkit/dist/ui/index.d.ts", "utf-8").matchAll(
    primitiveExportPattern
  ),
].map((match) => match[1]);
const registryItems = await readSourceRegistryItems();
const registryItemNames = new Set(registryItems.map((item) => item.name));
const generatedRegistryNames = new Set(
  readdirSync("apps/docs/public")
    .filter((fileName) => fileName.endsWith(".json"))
    .filter((fileName) => fileName !== "components.json")
    .filter((fileName) => fileName !== "registry.json")
    .map((fileName) => fileName.replace(/\.json$/u, ""))
);
const registryItemsByName = new Map(
  registryItems.map((item) => [item.name, item])
);
const mainSource = readFileSync("src/main.ts", "utf-8");

const gaps = foldkitUiExports.flatMap((primitiveName) => {
  const slug = primitiveSlugs.get(primitiveName);

  if (slug === undefined) {
    return [`${primitiveName}: missing primitive slug mapping`];
  }

  return [
    registryItemNames.has(slug)
      ? undefined
      : `${primitiveName}: missing registry item ${slug}`,
    generatedRegistryNames.has(slug)
      ? undefined
      : `${primitiveName}: missing generated registry JSON ${slug}.json`,
    mainSource.includes(`${primitiveName}DocsRoute`)
      ? undefined
      : `${primitiveName}: missing docs route`,
    (registryItemsByName.get(slug)?.files ?? []).some((file) =>
      existsSync(file.path)
    )
      ? undefined
      : `${primitiveName}: missing registry source for ${slug}`,
    existsSync(`docs/product/${slug}-v1-coverage-matrix.md`)
      ? undefined
      : `${primitiveName}: missing coverage matrix`,
  ].filter(Boolean);
});

if (gaps.length > 0) {
  console.error("Primitive coverage gaps:");
  for (const gap of gaps) {
    console.error(`- ${gap}`);
  }
  process.exit(1);
}

console.log(
  `Checked ${foldkitUiExports.length} Foldkit UI primitives for registry, docs, generated JSON, and coverage matrices`
);
