import type { Preview } from "openstory/foldkit"

import { withShadcnTheme } from "./openstory/shadcnTheme"
import "./styles.css"

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
                    { value: "rhea-neutral", title: "Rhea Neutral" },
                    { value: "rhea-stone", title: "Rhea Stone" },
                    { value: "rhea-zinc", title: "Rhea Zinc" },
                    { value: "rhea-mauve", title: "Rhea Mauve" },
                    { value: "rhea-olive", title: "Rhea Olive" },
                    { value: "rhea-mist", title: "Rhea Mist" },
                    { value: "rhea-taupe", title: "Rhea Taupe" },
                    { value: "rhea-amber", title: "Rhea Amber" },
                    { value: "rhea-blue", title: "Rhea Blue" },
                    { value: "rhea-cyan", title: "Rhea Cyan" },
                    { value: "rhea-emerald", title: "Rhea Emerald" },
                    { value: "rhea-fuchsia", title: "Rhea Fuchsia" },
                    { value: "rhea-green", title: "Rhea Green" },
                    { value: "rhea-indigo", title: "Rhea Indigo" },
                    { value: "rhea-lime", title: "Rhea Lime" },
                    { value: "rhea-orange", title: "Rhea Orange" },
                    { value: "rhea-pink", title: "Rhea Pink" },
                    { value: "rhea-purple", title: "Rhea Purple" },
                    { value: "rhea-red", title: "Rhea Red" },
                    { value: "rhea-rose", title: "Rhea Rose" },
                    { value: "rhea-sky", title: "Rhea Sky" },
                    { value: "rhea-teal", title: "Rhea Teal" },
                    { value: "rhea-violet", title: "Rhea Violet" },
                    { value: "rhea-yellow", title: "Rhea Yellow" },
                ],
            },
        },
        shadcnMode: {
            name: "shadcn mode",
            description: "Source-derived shadcn color mode.",
            defaultValue: "light",
            toolbar: {
                title: "mode",
                icon: "circle",
                dynamicTitle: true,
                items: [
                    { value: "light", title: "Light" },
                    { value: "dark", title: "Dark" },
                    { value: "system", title: "System" },
                ],
            },
        },
    },
    initialGlobals: { shadcnTheme: "rhea-neutral", shadcnMode: "light" },
    decorators: [withShadcnTheme],
}

export default preview
