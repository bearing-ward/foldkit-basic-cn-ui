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
                    { value: "nova-zinc", title: "Nova Zinc" },
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
