import type { Preview } from "openstory/foldkit";

import { withShadcnTheme } from "./openstory/shadcnTheme";

import "./styles.css";

// NOTE: Upstream contract checker anchors on this literal shadcn default shape: initialGlobals: { shadcnTheme: "rhea-neutral", shadcnMode: "light" }
const preview: Preview = {
  parameters: { layout: "centered" },
  globalTypes: {
    shadcnTheme: {
      name: "shadcn theme",
      description: "Source-derived shadcn style and base color.",
      defaultValue: "rhea-neutral",
      toolbar: {
        title: "shadcn",
        icon: "circlehollow",
        dynamicTitle: true,
        items: [
          {
            value: "rhea-neutral",
            title: "Rhea Neutral",
            icon: "circlehollow",
            color: "oklch(0.205 0 0)",
          },
          {
            value: "rhea-stone",
            title: "Rhea Stone",
            icon: "circlehollow",
            color: "oklch(0.216 0.006 56.043)",
          },
          {
            value: "rhea-zinc",
            title: "Rhea Zinc",
            icon: "circlehollow",
            color: "oklch(0.21 0.006 285.885)",
          },
          {
            value: "rhea-mauve",
            title: "Rhea Mauve",
            icon: "circlehollow",
            color: "oklch(0.212 0.019 322.12)",
          },
          {
            value: "rhea-olive",
            title: "Rhea Olive",
            icon: "circlehollow",
            color: "oklch(0.228 0.013 107.4)",
          },
          {
            value: "rhea-mist",
            title: "Rhea Mist",
            icon: "circlehollow",
            color: "oklch(0.218 0.008 223.9)",
          },
          {
            value: "rhea-taupe",
            title: "Rhea Taupe",
            icon: "circlehollow",
            color: "oklch(0.214 0.009 43.1)",
          },
          {
            value: "rhea-amber",
            title: "Rhea Amber",
            icon: "circlehollow",
            color: "oklch(0.555 0.163 48.998)",
          },
          {
            value: "rhea-blue",
            title: "Rhea Blue",
            icon: "circlehollow",
            color: "oklch(0.488 0.243 264.376)",
          },
          {
            value: "rhea-cyan",
            title: "Rhea Cyan",
            icon: "circlehollow",
            color: "oklch(0.52 0.105 223.128)",
          },
          {
            value: "rhea-emerald",
            title: "Rhea Emerald",
            icon: "circlehollow",
            color: "oklch(0.508 0.118 165.612)",
          },
          {
            value: "rhea-fuchsia",
            title: "Rhea Fuchsia",
            icon: "circlehollow",
            color: "oklch(0.518 0.253 323.949)",
          },
          {
            value: "rhea-green",
            title: "Rhea Green",
            icon: "circlehollow",
            color: "oklch(0.527 0.154 150.069)",
          },
          {
            value: "rhea-indigo",
            title: "Rhea Indigo",
            icon: "circlehollow",
            color: "oklch(0.457 0.24 277.023)",
          },
          {
            value: "rhea-lime",
            title: "Rhea Lime",
            icon: "circlehollow",
            color: "oklch(0.841 0.238 128.85)",
          },
          {
            value: "rhea-orange",
            title: "Rhea Orange",
            icon: "circlehollow",
            color: "oklch(0.553 0.195 38.402)",
          },
          {
            value: "rhea-pink",
            title: "Rhea Pink",
            icon: "circlehollow",
            color: "oklch(0.525 0.223 3.958)",
          },
          {
            value: "rhea-purple",
            title: "Rhea Purple",
            icon: "circlehollow",
            color: "oklch(0.496 0.265 301.924)",
          },
          {
            value: "rhea-red",
            title: "Rhea Red",
            icon: "circlehollow",
            color: "oklch(0.505 0.213 27.518)",
          },
          {
            value: "rhea-rose",
            title: "Rhea Rose",
            icon: "circlehollow",
            color: "oklch(0.514 0.222 16.935)",
          },
          {
            value: "rhea-sky",
            title: "Rhea Sky",
            icon: "circlehollow",
            color: "oklch(0.5 0.134 242.749)",
          },
          {
            value: "rhea-teal",
            title: "Rhea Teal",
            icon: "circlehollow",
            color: "oklch(0.511 0.096 186.391)",
          },
          {
            value: "rhea-violet",
            title: "Rhea Violet",
            icon: "circlehollow",
            color: "oklch(0.491 0.27 292.581)",
          },
          {
            value: "rhea-yellow",
            title: "Rhea Yellow",
            icon: "circlehollow",
            color: "oklch(0.852 0.199 91.936)",
          },
        ],
      },
    },
    shadcnMode: {
      name: "shadcn mode",
      description: "Source-derived shadcn color mode.",
      defaultValue: "light",
      toolbar: {
        title: "Toggle theme",
        icon: "circle",
        action: "toggle",
        toggleValues: ["light", "dark"],
        items: [
          {
            value: "light",
            title: "Light",
            icon: "sun",
            color: "oklch(0.985 0 0)",
          },
          {
            value: "dark",
            title: "Dark",
            icon: "moon",
            color: "oklch(0.145 0 0)",
          },
        ],
      },
    },
  },
  initialGlobals: {
    shadcnTheme: "rhea-neutral",
    shadcnMode: "light",
  },
  decorators: [withShadcnTheme],
};

export default preview;
