import { existsSync, readFileSync, readdirSync } from "node:fs";

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
const registryItems = JSON.parse(
  readFileSync("registry/default/items.json", "utf-8")
);
const registryItemNames = new Set(registryItems.map((item) => item.name));
const generatedRegistryNames = new Set(
  readdirSync("apps/docs/public/r")
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => fileName.replace(/\.json$/u, ""))
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
    existsSync(`registry/default/ui/${slug}`)
      ? undefined
      : `${primitiveName}: missing registry/default/ui/${slug}`,
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
