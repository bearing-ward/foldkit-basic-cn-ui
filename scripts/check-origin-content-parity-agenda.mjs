import fs from "node:fs";

const registryItems = JSON.parse(
  fs.readFileSync("registry/default/items.json", "utf-8")
);
const agenda = fs.readFileSync(
  "docs/product/origin-content-parity-review.md",
  "utf-8"
);

const originLane = (origin) => {
  if (origin.includes("base-ui.com")) {
    return "base-ui";
  }

  if (origin.includes("ui.shadcn.com")) {
    return "shadcn";
  }

  return undefined;
};

const originBackedUiItems = registryItems
  .filter((item) => item.type === "registry:ui")
  .filter((item) => item.meta?.foldkit?.public !== false)
  .filter((item) => originLane(item.meta?.foldkit?.origin ?? "") !== undefined)
  .map((item) => item.name)
  .toSorted();

const missingItems = originBackedUiItems.filter(
  (name) =>
    !agenda.includes(`| \` ${name}\``) && !agenda.includes(`| \`${name}\``)
);

if (missingItems.length > 0) {
  console.error("Origin content parity agenda is missing registry UI rows:");
  for (const name of missingItems) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log(
  `Checked origin content parity agenda for ${originBackedUiItems.length} registry UI items`
);
