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

const defaultThemeKey = (themeContract) =>
  `${themeContract.defaultStyle}-${themeContract.defaultBaseColor}`;

const defaultTheme = (themeContract) =>
  modeThemeFor(
    themeContract.themes,
    themeContract.defaultStyle,
    themeContract.defaultBaseColor,
    themeContract.defaultMode === "dark" ? "dark" : "light"
  ) ?? themeContract.themes[0];

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

const createOriginBaseColorOptions = ({ themeContract, baseColorOptionsByStyle }) =>
  themeContract.baseColorNames.map((baseColor) => {
    const supportedStyles = Object.entries(baseColorOptionsByStyle)
      .filter(([, options]) => options.some((option) => option.value === baseColor))
      .map(([style]) => style);

    return {
      value: baseColor,
      title: toTitle(baseColor),
      status: supportedStyles.length > 0 ? "active" : "absent-by-source",
      supportedStyles,
      source: "registry/upstream/derived/shadcn-theme.json baseColorNames",
    };
  });

const createAllThemeBaseColorOptions = ({ themeContract }) =>
  uniqueValues(themeContract.themes.map((theme) => theme.baseColor)).map(
    (baseColor) => ({
      value: baseColor,
      title: toTitle(baseColor),
      status: "active",
      source: "registry/upstream/derived/shadcn-theme.json themes",
    })
  );

const createThemeOptions = ({ themeContract, themeDownloads }) =>
  themeDownloads.map((download) => {
    const theme = modeThemeFor(
      themeContract.themes,
      download.style,
      download.baseColor,
      "light"
    );

    return {
      value: themeKey(download),
      title: `${toTitle(download.style)} ${toTitle(download.baseColor)}`,
      status: "active",
      indicator: theme?.tokens.primary ?? theme?.tokens.background ?? "currentColor",
      downloadHref: download.href,
      source: "registry/upstream/derived/shadcn-theme.json themes",
    };
  });

const themeCardTypographyOptions = [
  { value: "inter", title: "Inter", status: "active" },
  { value: "geist", title: "Geist", status: "active" },
  { value: "mono", title: "Mono", status: "active" },
];

const themeCardIconLibraryOptions = [
  { value: "lucide", title: "Lucide", status: "active" },
];

const themeCardMenuOptions = [
  { value: "default-solid", title: "Default / Solid", status: "active" },
  {
    value: "floating-translucent",
    title: "Floating / Translucent",
    status: "active",
  },
  { value: "compact-solid", title: "Compact / Solid", status: "active" },
];

const themeCardMenuAccentOptions = [
  { value: "subtle", title: "Subtle", status: "active" },
  { value: "contrast", title: "Contrast", status: "active" },
  { value: "primary", title: "Primary", status: "active" },
];

const createThemeCardOptions = ({
  themeContract,
  styleOptions,
  baseColorOptionsByStyle,
  themeDownloads,
}) => {
  const originBaseColorOptions = createOriginBaseColorOptions({
    themeContract,
    baseColorOptionsByStyle,
  });
  const allThemeBaseColorOptions = createAllThemeBaseColorOptions({
    themeContract,
  });
  const defaultThemeValue = defaultThemeKey(themeContract);
  const radiusOptions = themeContract.radiusScale.map((radius) => ({
    value: radius,
    title: radius === "md" ? "Default" : toTitle(radius),
    status: "active",
  }));

  return [
    {
      id: "style",
      title: "Style",
      status: "active",
      selectedValue: themeContract.defaultStyle,
      source: "registry/upstream/derived/shadcn-theme.json styleNames",
      options: styleOptions.map((option) => ({ ...option, status: "active" })),
    },
    {
      id: "base-color",
      title: "Base Color",
      status: "active",
      selectedValue: themeContract.defaultBaseColor,
      source: "registry/upstream/derived/shadcn-theme.json baseColorNames",
      options: originBaseColorOptions,
    },
    {
      id: "theme",
      title: "Theme",
      status: "active",
      selectedValue: defaultThemeValue,
      source: "registry/upstream/derived/shadcn-theme.json themes",
      options: createThemeOptions({ themeContract, themeDownloads }),
    },
    {
      id: "chart-color",
      title: "Chart Color",
      status: "active",
      selectedValue: themeContract.defaultBaseColor,
      source: "registry/upstream/derived/shadcn-theme.json chart tokens",
      options: allThemeBaseColorOptions,
    },
    {
      id: "heading",
      title: "Heading",
      status: "active",
      selectedValue: "inter",
      source: "https://ui.shadcn.com/create?preset=b27GcrRo",
      options: themeCardTypographyOptions,
    },
    {
      id: "font",
      title: "Font",
      status: "active",
      selectedValue: "inter",
      source: "https://ui.shadcn.com/create?preset=b27GcrRo",
      options: themeCardTypographyOptions,
    },
    {
      id: "icon-library",
      title: "Icon Library",
      status: "active",
      selectedValue: "lucide",
      source: "https://ui.shadcn.com/create?preset=b27GcrRo",
      options: themeCardIconLibraryOptions,
    },
    {
      id: "radius",
      title: "Radius",
      status: "active",
      selectedValue: "md",
      source: "registry/upstream/derived/shadcn-theme.json radiusScale",
      options: radiusOptions,
    },
    {
      id: "menu",
      title: "Menu",
      status: "active",
      selectedValue: "default-solid",
      source: "https://ui.shadcn.com/create?preset=b27GcrRo",
      options: themeCardMenuOptions,
    },
    {
      id: "menu-accent",
      title: "Menu Accent",
      status: "active",
      selectedValue: "subtle",
      source: "https://ui.shadcn.com/create?preset=b27GcrRo",
      options: themeCardMenuAccentOptions,
    },
  ];
};

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
        originSurface: row.originSurface,
        status: row.status,
        dependencies: row.dependencies,
        dependency: row.dependencies?.[0] ?? row.dependency,
        registryItemName: row.registryItemName,
        downloadName: row.registryItemName,
        downloadHref: row.downloadHref ?? `/${row.registryItemName}.json`,
        storyId: row.storyId,
        registryType: registryItem?.type,
      },
    ];
  });

const validatePreviewInventory = (previewInventory) => {
  const allowedStatuses = new Set(["rendered", "covered-by-existing-example", "deferred"]);

  for (const row of previewInventory.rows) {
    if (typeof row.originSurface !== "string") {
      throw new Error(`${row.id} must declare originSurface`);
    }

    if (!Array.isArray(row.dependencies) || row.dependencies.length === 0) {
      throw new Error(`${row.id} must declare at least one component dependency`);
    }

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

    if (
      row.status !== "deferred" &&
      typeof row.downloadHref === "string" &&
      !row.downloadHref.endsWith(".json")
    ) {
      throw new Error(`${row.id} downloadHref must point at JSON`);
    }
  }
};

const expectedComponentDependencies = [
  "card",
  "button",
  "progress",
  "input",
  "textarea",
  "select/combobox",
  "switch",
  "tabs",
  "accordion",
  "dropdown/menu",
  "calendar/date-controls",
  "radio-group",
  "checkbox",
  "slider",
  "badge",
  "separator",
  "table/list-rows",
  "navigation/sidebar/menu",
  "dialog/drawer/sheet",
  "chart",
  "qr-code/image-placeholder",
  "upload/file-input",
  "typography",
  "icon/lucide",
  "theme-token/radius/font/menu-configuration",
];

const normalizeDependency = (dependency) => {
  if (dependency === "select" || dependency === "combobox") {
    return "select/combobox";
  }
  if (dependency === "dropdown-menu" || dependency === "menu") {
    return "dropdown/menu";
  }
  if (dependency === "calendar" || dependency === "date-picker") {
    return "calendar/date-controls";
  }
  if (dependency === "data-list" || dependency === "table") {
    return "table/list-rows";
  }
  if (dependency === "navigation-menu" || dependency === "sidebar") {
    return "navigation/sidebar/menu";
  }
  if (dependency === "dialog" || dependency === "drawer" || dependency === "sheet") {
    return "dialog/drawer/sheet";
  }
  if (dependency === "qr-code" || dependency === "image-placeholder") {
    return "qr-code/image-placeholder";
  }
  if (dependency === "input-file" || dependency === "upload") {
    return "upload/file-input";
  }
  if (dependency === "theme-card" || dependency === "theme-token") {
    return "theme-token/radius/font/menu-configuration";
  }
  return dependency;
};

const componentStatus = (rows) => {
  if (
    rows.some(
      (row) => row.status === "rendered" && row.componentParity === "matched"
    )
  ) {
    return "matched";
  }
  if (
    rows.some(
      (row) =>
        row.status === "rendered" || row.status === "covered-by-existing-example"
    )
  ) {
    return "in-progress";
  }
  if (rows.length > 0) {
    return "deferred";
  }
  return "needs-origin-spec";
};

const createComponentInventory = ({ previewInventory }) =>
  expectedComponentDependencies.map((component) => {
    const rows = previewInventory.rows.filter((row) =>
      row.dependencies.map(normalizeDependency).includes(component)
    );
    const registryItemNames = uniqueValues(
      rows.flatMap((row) =>
        typeof row.registryItemName === "string" ? [row.registryItemName] : []
      )
    );

    return {
      component,
      originBlocks: rows.map((row) => ({
        id: row.id,
        title: row.title,
        originSurface: row.originSurface,
        status: row.status,
      })),
      localRegistryItemNames: registryItemNames,
      status: componentStatus(rows),
      sourceReferenceUrl:
        rows[0]?.sourceReferenceUrl ??
        "https://ui.shadcn.com/create?preset=b27GcrRo",
      ...(rows.every(
        (row) => row.status === "rendered" && row.componentParity === "matched"
      )
        ? {}
        : { suggestedFollowUpPlan: "026" }),
    };
  });

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
  const themeCardOptions = createThemeCardOptions({
    themeContract,
    styleOptions,
    baseColorOptionsByStyle,
    themeDownloads,
  });
  const componentInventory = createComponentInventory({ previewInventory });

  return {
    name: "theme-studio",
    sourceReferences: previewInventory.sourceReferences,
    styleOptions,
    baseColorOptionsByStyle,
    themeCardOptions,
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
    componentInventory,
    downloads: {
      themes: themeDownloads,
      styles: deferredStyleDownloads,
    },
    generatedRegistryItems: themeItems,
  };
};
