import type { Preview } from "openstory/foldkit"

import {
    initialShadcnThemeGlobals,
    shadcnThemeGlobalTypes,
    withShadcnTheme,
} from "./openstory/shadcnTheme"
import "./styles.css"

const preview: Preview = {
    parameters: { layout: "centered" },
    globalTypes: shadcnThemeGlobalTypes,
    initialGlobals: initialShadcnThemeGlobals,
    decorators: [withShadcnTheme],
}

export default preview
