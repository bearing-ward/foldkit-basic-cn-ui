import type { Preview } from "openstory/foldkit"

import { withShadcnTheme } from "./openstory/shadcnTheme"
import "./styles.css"

const preview: Preview = {
    parameters: { layout: "centered" },
    globalTypes: {
        shadcnTheme: {
            name: "shadcn theme",
            description: "Source-derived shadcn style, base color, and mode.",
            defaultValue: "rhea-neutral-light",
            toolbar: {
                title: "shadcn",
                icon: "circlehollow",
                dynamicTitle: true,
                items: [
                    { value: "rhea-neutral-light", title: "Rhea Neutral Light" },
                    { value: "rhea-neutral-dark", title: "Rhea Neutral Dark" },
                    { value: "nova-zinc-light", title: "Nova Zinc Light" },
                ],
            },
        },
    },
    initialGlobals: { shadcnTheme: "rhea-neutral-light" },
    decorators: [withShadcnTheme],
}

export default preview
