import { readFileSync } from "node:fs";

const registryItems = JSON.parse(
  readFileSync("registry/default/items.json", "utf-8")
);
const docsViewSource = readFileSync("src/docsView.ts", "utf-8");

const originPrefixes = {
  "ai-elements": "ai-elements",
  "base-ui": "base-ui",
  foldkit: "foldkit",
  shadcn: "shadcn",
};
const originLaneFromUrl = (origin) => {
  if (typeof origin !== "string") {
    return undefined;
  }

  try {
    const url = new URL(origin);

    if (url.protocol !== "https:") {
      return undefined;
    }

    if (url.hostname === "base-ui.com") {
      return "base-ui";
    }

    if (url.hostname === "ui.shadcn.com") {
      return "shadcn";
    }

    if (url.hostname === "foldkit.dev") {
      return "foldkit";
    }

    if (url.hostname === "elements.ai-sdk.dev") {
      return "ai-elements";
    }

    return undefined;
  } catch {
    return undefined;
  }
};
const legacyUnprefixedStyleLaneItems = new Set([
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "autocomplete",
  "avatar",
  "badge",
  "breadcrumb",
  "button-group",
  "card",
  "carousel",
  "chart",
  "checkbox-group",
  "collapsible",
  "command",
  "context-menu",
  "data-table",
  "direction",
  "drawer",
  "dropdown-menu",
  "empty",
  "field",
  "form",
  "hover-card",
  "input-group",
  "input-otp",
  "item",
  "kbd",
  "label",
  "menubar",
  "meter",
  "native-select",
  "navigation-menu",
  "number-field",
  "otp-field",
  "pagination",
  "preview-card",
  "progress",
  "radio",
  "resizable",
  "scroll-area",
  "separator",
  "sheet",
  "sidebar",
  "skeleton",
  "sonner",
  "spinner",
  "table",
  "toggle",
  "toggle-group",
  "toolbar",
  "typography",
]);

const uiItems = registryItems.filter((item) => item.type === "registry:ui");
const failures = [];
const itemNames = new Set(registryItems.map((item) => item.name));
const publicUiItems = uiItems.filter(
  (item) => item.meta?.foldkit?.public !== false
);

const routeTagFromComponentName = (name) =>
  `${name
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join("")}Docs`;

const extractDocsNavRouteTags = (library) => {
  const libraryPattern =
    library === "shadcn"
      ? /\]\.includes\(navItem\.routeTag\)\s*\?\s*"shadcn"/u
      : library === "AI Elements"
        ? /\]\.includes\(navItem\.routeTag\)\s*\?\s*"AI Elements"/u
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
const aiElementsDocsRouteTags = extractDocsNavRouteTags("AI Elements");

for (const item of uiItems) {
  const foldkitMeta = item.meta?.foldkit;
  const origin = foldkitMeta?.origin;
  const originLane = originLaneFromUrl(origin);
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

  if (origin !== undefined && originLane === undefined) {
    failures.push(
      `${item.name}: meta.foldkit.origin must be an https URL under foldkit.dev, base-ui.com, ui.shadcn.com, or elements.ai-sdk.dev`
    );
  }

  if (
    originLane === "base-ui" &&
    !item.name.startsWith("base-ui-") &&
    !legacyUnprefixedStyleLaneItems.has(item.name)
  ) {
    failures.push(`${item.name}: Base UI lane items must use base-ui-* names`);
  }

  if (
    originLane === "shadcn" &&
    !item.name.startsWith("shadcn-") &&
    !legacyUnprefixedStyleLaneItems.has(item.name)
  ) {
    failures.push(`${item.name}: shadcn lane items must use shadcn-* names`);
  }

  if (
    artifact !== undefined &&
    artifact !== "component" &&
    artifact !== "primitive-backed-component"
  ) {
    failures.push(`${item.name}: unknown artifact ${artifact}`);
  }

  if (foldkitMeta?.public === false) {
    const { publicAliasOf } = foldkitMeta;

    if (typeof publicAliasOf !== "string") {
      failures.push(
        `${item.name}: non-public registry items require meta.foldkit.publicAliasOf`
      );
    } else if (!itemNames.has(publicAliasOf)) {
      failures.push(
        `${item.name}: meta.foldkit.publicAliasOf points to missing item ${publicAliasOf}`
      );
    }
  }
}

for (const item of publicUiItems) {
  const origin = item.meta?.foldkit?.origin;
  const originLane = originLaneFromUrl(origin);
  const routeTag = routeTagFromComponentName(item.name);

  if (originLane === "base-ui" && !baseUiDocsRouteTags.has(routeTag)) {
    failures.push(
      `${item.name}: ${routeTag} must be listed in docsNavItemLibrary Base UI routes`
    );
  }

  if (originLane === "shadcn" && !shadcnDocsRouteTags.has(routeTag)) {
    failures.push(
      `${item.name}: ${routeTag} must be listed in docsNavItemLibrary shadcn routes`
    );
  }

  if (originLane === "ai-elements" && !aiElementsDocsRouteTags.has(routeTag)) {
    failures.push(
      `${item.name}: ${routeTag} must be listed in docsNavItemLibrary AI Elements routes`
    );
  }

  if (
    originLane === "foldkit" &&
    (baseUiDocsRouteTags.has(routeTag) ||
      shadcnDocsRouteTags.has(routeTag) ||
      aiElementsDocsRouteTags.has(routeTag))
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
  const originLane = originLaneFromUrl(origin);

  if (componentKey === undefined || originLane === undefined) {
    continue;
  }

  const previous = componentKeys.get(componentKey);

  if (previous === undefined) {
    componentKeys.set(componentKey, [{ name: item.name, origin: originLane }]);
  } else {
    previous.push({ name: item.name, origin: originLane });
  }
}

for (const [componentKey, entries] of componentKeys.entries()) {
  const origins = new Set(entries.map((entry) => entry.origin));

  if (origins.size < 2) {
    continue;
  }

  for (const entry of entries) {
    if (entry.origin === "foldkit") {
      continue;
    }

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
