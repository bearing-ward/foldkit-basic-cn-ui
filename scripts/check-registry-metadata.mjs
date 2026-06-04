import { readFileSync } from "node:fs";

const registryItems = JSON.parse(
  readFileSync("registry/default/items.json", "utf-8")
);

const originPrefixes = {
  "base-ui": "base-ui",
  foldkit: "foldkit",
  shadcn: "shadcn",
};

const uiItems = registryItems.filter((item) => item.type === "registry:ui");
const failures = [];

for (const item of uiItems) {
  const foldkitMeta = item.meta?.foldkit;
  const origin = foldkitMeta?.origin;
  const artifact = foldkitMeta?.artifact;

  if (origin === undefined) {
    failures.push(`${item.name}: missing meta.foldkit.origin`);
  }

  if (artifact === undefined) {
    failures.push(`${item.name}: missing meta.foldkit.artifact`);
  }

  if (
    artifact === "primitive-backed-component" &&
    foldkitMeta?.primitive === undefined
  ) {
    failures.push(
      `${item.name}: primitive-backed-component requires meta.foldkit.primitive`
    );
  }

  if (origin !== undefined && !(origin in originPrefixes)) {
    failures.push(`${item.name}: unknown origin ${origin}`);
  }

  if (
    artifact !== undefined &&
    artifact !== "component" &&
    artifact !== "primitive-backed-component"
  ) {
    failures.push(`${item.name}: unknown artifact ${artifact}`);
  }
}

const componentKeys = new Map();

for (const item of uiItems) {
  const componentKey = item.meta?.foldkit?.component;
  const origin = item.meta?.foldkit?.origin;

  if (componentKey === undefined || origin === undefined) {
    continue;
  }

  const previous = componentKeys.get(componentKey);

  if (previous === undefined) {
    componentKeys.set(componentKey, [{ name: item.name, origin }]);
  } else {
    previous.push({ name: item.name, origin });
  }
}

for (const [componentKey, entries] of componentKeys.entries()) {
  const origins = new Set(entries.map((entry) => entry.origin));

  if (origins.size < 2) {
    continue;
  }

  for (const entry of entries) {
    const prefix = originPrefixes[entry.origin];

    if (!entry.name.startsWith(`${prefix}-`)) {
      failures.push(
        `${entry.name}: ${componentKey} collides across origins; use ${prefix}-${entry.name}`
      );
    }
  }
}

if (failures.length > 0) {
  console.error("Registry metadata guardrail failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Checked metadata for ${uiItems.length} registry UI items`);
