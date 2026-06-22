export const themeStudioManifestName = "theme-studio.json";

export const themeDownloadNameFor = ({ style, baseColor }) =>
  `foldkit-theme-${style}-${baseColor}`;

const itemSchemaUrl = "https://ui.shadcn.com/schema/registry-item.json";

const toTitle = (value) =>
  value
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");

const uniqueValues = (values) => [...new Set(values)];

const themeKey = ({ style, baseColor }) => `${style}-${baseColor}`;

const modeThemeFor = (themes, style, baseColor, mode) =>
  themes.find(
    (theme) =>
      theme.style === style && theme.baseColor === baseColor && theme.mode === mode
  );

const cssVarsForTheme = (theme) => ({ ...theme.tokens });

const hasRegistryPayload = (registryItems, name) =>
  registryItems.some(
    (item) => item.name === name && item.meta?.foldkit?.public !== false
  );

const registryItemByName = (registryItems, name) =>
  registryItems.find((item) => item.name === name);

const createThemeItem = ({ style, baseColor, lightTheme, darkTheme }) => {
  const name = themeDownloadNameFor({ style, baseColor });
  const title = `${toTitle(style)} ${toTitle(baseColor)} Theme`;

  return {
    $schema: itemSchemaUrl,
    name,
    type: "registry:theme",
    title,
    description: `Foldkit CN shadcn theme tokens for ${toTitle(style)} ${toTitle(
      baseColor
    )}.`,
    cssVars: {
      light: cssVarsForTheme(lightTheme),
      dark: cssVarsForTheme(darkTheme),
    },
    files: [],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
    meta: {
      foldkit: {
        origin: "https://ui.shadcn.com/docs/theming",
        artifact: "theme",
        themeStudio: true,
        style,
        baseColor,
      },
    },
  };
};

const createThemeDownload = ({ style, baseColor }) => {
  const name = themeDownloadNameFor({ style, baseColor });

  return {
    kind: "theme",
    name,
    style,
    baseColor,
    title: `${toTitle(style)} ${toTitle(baseColor)} Theme`,
    href: `/${name}.json`,
    registryType: "registry:theme",
    tailwind: {
      baseColor,
      cssVariables: true,
    },
  };
};

const createStyleDeferredDownload = (style) => ({
  kind: "style",
  name: `foldkit-style-${style}`,
  style,
  title: `${toTitle(style)} Style`,
  status: "deferred",
  reason:
    "Style-level registry payloads are deferred until Foldkit CN can honestly encode utility-class component recipes for this style.",
  tailwind: {
    cssVariables: false,
  },
});

const createBaseColorOptionsByStyle = ({ styleOptions, themes }) =>
  Object.fromEntries(
    styleOptions.map((styleOption) => [
      styleOption.value,
      uniqueValues(
        themes
          .filter((theme) => theme.style === styleOption.value)
          .map((theme) => theme.baseColor)
      ).map((baseColor) => ({
        value: baseColor,
        title: toTitle(baseColor),
        tailwind: {
          baseColor,
          cssVariables: true,
        },
        downloadName: themeDownloadNameFor({
          style: styleOption.value,
          baseColor,
        }),
        downloadHref: `/${themeDownloadNameFor({
          style: styleOption.value,
          baseColor,
        })}.json`,
      })),
    ])
  );

const createThemeDownloadsAndItems = ({ themeContract, styleOptions }) => {
  const seen = new Set();

  return themeContract.themes.flatMap((theme) => {
    const key = themeKey(theme);
    if (seen.has(key)) {
      return [];
    }
    seen.add(key);

    if (!styleOptions.some((styleOption) => styleOption.value === theme.style)) {
      return [];
    }

    const lightTheme = modeThemeFor(
      themeContract.themes,
      theme.style,
      theme.baseColor,
      "light"
    );
    const darkTheme = modeThemeFor(
      themeContract.themes,
      theme.style,
      theme.baseColor,
      "dark"
    );

    if (lightTheme === undefined || darkTheme === undefined) {
      return [];
    }

    return [
      {
        download: createThemeDownload(theme),
        item: createThemeItem({
          style: theme.style,
          baseColor: theme.baseColor,
          lightTheme,
          darkTheme,
        }),
      },
    ];
  });
};

const createPreviewBlocks = ({ previewInventory, registryItems }) =>
  previewInventory.rows.flatMap((row) => {
    if (row.status !== "rendered") {
      return [];
    }

    if (
      typeof row.registryItemName !== "string" ||
      !hasRegistryPayload(registryItems, row.registryItemName)
    ) {
      throw new Error(
        `Theme Studio preview row ${row.id} is rendered without a valid registry payload`
      );
    }

    const registryItem = registryItemByName(registryItems, row.registryItemName);

    return [
      {
        id: row.id,
        title: row.title,
        registryItemName: row.registryItemName,
        downloadName: row.registryItemName,
        downloadHref: `/${row.registryItemName}.json`,
        storyId: row.storyId,
        registryType: registryItem?.type,
      },
    ];
  });

const validatePreviewInventory = (previewInventory) => {
  const allowedStatuses = new Set(["rendered", "covered-by-existing-example", "deferred"]);

  for (const row of previewInventory.rows) {
    if (!allowedStatuses.has(row.status)) {
      throw new Error(`Unsupported preview-02 coverage status for ${row.id}: ${row.status}`);
    }

    if (
      row.status !== "deferred" &&
      typeof row.registryItemName !== "string"
    ) {
      throw new Error(`${row.id} must name a registry item when it is ${row.status}`);
    }

    if (row.status === "deferred" && typeof row.reason !== "string") {
      throw new Error(`${row.id} must explain why it is deferred`);
    }
  }
};

export const createThemeStudioCatalog = ({
  themeContract,
  registryItems,
  previewInventory,
}) => {
  validatePreviewInventory(previewInventory);

  const stylesWithEntries = new Set(themeContract.themes.map((theme) => theme.style));
  const styleOptions = themeContract.styleNames
    .filter((style) => stylesWithEntries.has(style))
    .map((style) => ({
      value: style,
      title: toTitle(style),
      tailwind: {
        cssVariables: true,
      },
    }));

  const baseColorOptionsByStyle = createBaseColorOptionsByStyle({
    styleOptions,
    themes: themeContract.themes,
  });
  const themeDownloadsAndItems = createThemeDownloadsAndItems({
    themeContract,
    styleOptions,
  });
  const themeDownloads = themeDownloadsAndItems.map(({ download }) => download);
  const themeItems = themeDownloadsAndItems.map(({ item }) => item);
  const previewBlocks = createPreviewBlocks({ previewInventory, registryItems });
  const deferredStyleDownloads = styleOptions.map((styleOption) =>
    createStyleDeferredDownload(styleOption.value)
  );

  return {
    name: "theme-studio",
    sourceReferences: previewInventory.sourceReferences,
    styleOptions,
    baseColorOptionsByStyle,
    modeOptions: [
      { value: "light", title: "Light", downloadMode: true },
      { value: "dark", title: "Dark", downloadMode: true },
      { value: "system", title: "System", downloadMode: false },
    ],
    cssVariablesOptions: [
      {
        value: true,
        title: "CSS variables",
        status: "active",
        download: true,
        tailwind: {
          cssVariables: true,
        },
      },
      {
        value: false,
        title: "Utility classes",
        status: "deferred",
        download: false,
        reason:
          "The no-CSS-variables path is deferred until style-level component recipes can be generated without overstating parity.",
        tailwind: {
          cssVariables: false,
        },
      },
    ],
    themingOptions: [
      {
        id: "style",
        title: "Style",
        status: "active",
        source: "components.json style",
      },
      {
        id: "tailwind.baseColor",
        title: "Base color",
        status: "active",
        source: "components.json tailwind.baseColor",
      },
      {
        id: "tailwind.cssVariables.true",
        title: "CSS variables",
        status: "active",
        source: "components.json tailwind.cssVariables",
      },
      {
        id: "tailwind.cssVariables.false",
        title: "No CSS variables",
        status: "deferred",
        reason:
          "Utility-class recipes need component-level parity before a registry:style payload can be honest.",
        source: "components.json tailwind.cssVariables",
      },
      {
        id: "mode",
        title: "Light, dark, and system mode",
        status: "active",
        source: "https://ui.shadcn.com/docs/theming",
      },
      {
        id: "semanticTokens",
        title: "Semantic tokens",
        status: "active",
        source: "registry/upstream/derived/shadcn-theme.json tokenNames",
        tokens: themeContract.tokenNames,
      },
      {
        id: "radiusScale",
        title: "Radius scale",
        status: "active",
        source: "registry/upstream/derived/shadcn-theme.json radiusScale",
        values: themeContract.radiusScale,
      },
      {
        id: "defaultThemeCss",
        title: "Default theme CSS",
        status: "active",
        source: "registry/upstream/derived/shadcn-theme.json default theme tokens",
        defaultStyle: themeContract.defaultStyle,
        defaultBaseColor: themeContract.defaultBaseColor,
        defaultMode: themeContract.defaultMode,
      },
    ],
    previewCoverage: previewInventory.rows,
    previewBlocks,
    downloads: {
      themes: themeDownloads,
      styles: deferredStyleDownloads,
    },
    generatedRegistryItems: themeItems,
  };
};
