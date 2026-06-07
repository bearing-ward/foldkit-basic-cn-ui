import { readFileSync } from "node:fs";

const registryItems = JSON.parse(
  readFileSync("registry/default/items.json", "utf-8")
);
const docsViewSource = readFileSync("src/docsView.ts", "utf-8");

const originPrefixes = {
  "base-ui": "base-ui",
  foldkit: "foldkit",
  shadcn: "shadcn",
};

const uiItems = registryItems.filter((item) => item.type === "registry:ui");
const failures = [];

const routeTagFromComponentName = (name) =>
  `${name
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join("")}Docs`;

const extractDocsNavRouteTags = (library) => {
  const libraryPattern =
    library === "shadcn"
      ? /\]\.includes\(navItem\.routeTag\)\s*\?\s*"shadcn"/u
      : /\]\.includes\(navItem\.routeTag\)\s*\?\s*"Base UI"/u;
  const libraryMatch = libraryPattern.exec(docsViewSource);

  if (libraryMatch === null) {
    failures.push(`docsNavItemLibrary: missing ${library} route list`);
    return new Set();
  }

  const listEnd = libraryMatch.index;
  const listStart = docsViewSource.lastIndexOf("[", listEnd);

  if (listStart === -1) {
    failures.push(`docsNavItemLibrary: cannot parse ${library} route list`);
    return new Set();
  }

  const listSource = docsViewSource.slice(listStart, listEnd + 1);
  return new Set(
    [...listSource.matchAll(/"([^"]+Docs)"/gu)].map((match) => match[1])
  );
};

const shadcnDocsRouteTags = extractDocsNavRouteTags("shadcn");
const baseUiDocsRouteTags = extractDocsNavRouteTags("Base UI");

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

for (const item of uiItems) {
  const origin = item.meta?.foldkit?.origin;
  const routeTag = routeTagFromComponentName(item.name);

  if (origin === "base-ui" && !baseUiDocsRouteTags.has(routeTag)) {
    failures.push(
      `${item.name}: ${routeTag} must be listed in docsNavItemLibrary Base UI routes`
    );
  }

  if (origin === "shadcn" && !shadcnDocsRouteTags.has(routeTag)) {
    failures.push(
      `${item.name}: ${routeTag} must be listed in docsNavItemLibrary shadcn routes`
    );
  }

  if (
    origin === "foldkit" &&
    (baseUiDocsRouteTags.has(routeTag) || shadcnDocsRouteTags.has(routeTag))
  ) {
    failures.push(
      `${item.name}: ${routeTag} is foldkit origin but is listed in a non-Foldkit docs group`
    );
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
