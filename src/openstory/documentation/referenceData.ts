import {
  avatarBadgeClasses,
  avatarBaseClasses,
  avatarFallbackClasses,
  avatarGroupClasses,
  avatarGroupCountClasses,
  avatarImageClasses,
  avatarSizeClassesBySize,
} from "../../../registry/base-ui/ui/base-ui-avatar/view";
import type { ApiReferenceConfig } from "./apiReference";
import type { XrayConfig } from "./anatomyXray";

export type DocumentationSection =
  | "Description/Overview"
  | "Installation"
  | "Usage"
  | "Foldkit integration"
  | "Anatomy"
  | "Styling"
  | "Keyboard interaction"
  | "API"
  | "Accessibility"
  | "Existing coverage";

export type DocumentationCoverageRow = Readonly<{
  path: string;
  purpose: string;
}>;

export type DocumentationReference = Readonly<{
  title: string;
  laneLabel: string;
  sourcePath: string;
  registryItemName: string;
  originUrl: string;
  artifact: string;
  primitive: string;
  overview: readonly string[];
  installCommands: readonly string[];
  usageSnippet: string;
  foldkitIntegrationSnippet: string;
  foldkitIntegrationNotes: readonly string[];
  anatomyXray: XrayConfig;
  stylingNotes: readonly string[];
  keyboardInteractionNotes: readonly string[];
  apiReference: ApiReferenceConfig;
  accessibilityNotes: readonly string[];
  coverageRows: readonly DocumentationCoverageRow[];
}>;

const classes = (classes: string): readonly string[] => classes.split(" ");

export const baseUiAvatarDocumentation: DocumentationReference = {
  title: "Avatar",
  laneLabel: "Base UI",
  sourcePath: "registry/base-ui/ui/base-ui-avatar",
  registryItemName: "base-ui-avatar",
  originUrl: "https://base-ui.com/react/components/avatar",
  artifact: "component",
  primitive: "Avatar view helpers",
  overview: [
    "Avatar renders a compact identity marker for people and accounts. The helper set covers profile images, fallback initials, grouped avatars, status badges, and overflow counts.",
    "The Base UI lane wrapper is intentionally parent-owned: callers decide which image, fallback, badge, and count data to render while the helpers provide stable anatomy and class hooks.",
  ],
  installCommands: [
    "bunx shadcn@latest add @foldkit-cn/base-ui-avatar",
    "bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/base-ui-avatar-basic.json",
  ],
  usageSnippet: `import * as Avatar from "@/ui/base-ui-avatar"

const profile = Avatar.view<Message>({
  alt: "Lena Taylor",
  fallback: "LT",
  src: avatarImageSrc,
})

const fallback = Avatar.view<Message>({ fallback: "LT" })

const group = Avatar.groupView<Message>([
  profile,
  fallback,
  Avatar.countView<Message>({ count: 3 }),
])`,
  foldkitIntegrationSnippet: `export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    Avatar.groupView<Message>(
      [
        Avatar.view<Message>({
          alt: "Lena Taylor",
          fallback: "LT",
          src: avatarImageSrc,
        }),
        Avatar.view<Message>({ fallback: "LT" }),
      ],
      "gap-4"
    )
)`,
  foldkitIntegrationNotes: [
    "The basic usage renders static helpers from a parent Foldkit view; there is no child update loop and no child commands are expected.",
    "When Avatar is used inside a larger component, keep identity data in the parent model and render Avatar helpers from that single source of truth.",
  ],
  anatomyXray: {
    title: "Base UI Avatar Anatomy",
    summary:
      "Inspect the explicit parts, classes, attributes, and style hooks used to construct the Avatar, Avatar group, status badge, and overflow count.",
    parts: [
      {
        id: "avatar-group",
        label: "Avatar group",
        tag: "div",
        description:
          "The group container arranges avatar roots and the overflow count in a compact horizontal row.",
        classes: classes(avatarGroupClasses),
        attributes: [],
        styles: [],
        children: [
          {
            id: "avatar-root",
            label: "Avatar root",
            tag: "span",
            description:
              "The root span establishes the circular frame, size, background, text scale, and white ring used by each avatar.",
            classes: classes(
              `${avatarBaseClasses} ${avatarSizeClassesBySize("Default")}`
            ),
            attributes: [],
            styles: [{ name: "--avatar-size", value: "h-10 w-10" }],
            children: [
              {
                id: "avatar-image",
                label: "Avatar image",
                tag: "img",
                description:
                  "The image fills the root circle and receives the source and alternate text supplied by the caller.",
                classes: classes(avatarImageClasses),
                attributes: [
                  {
                    name: "src",
                    value:
                      "data:image/svg+xml,%3Csvg viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='80' fill='%230f766e'/%3E%3C/svg%3E",
                  },
                  { name: "alt", value: "Lena Taylor" },
                ],
                styles: [],
                children: [],
              },
              {
                id: "avatar-fallback",
                label: "Avatar fallback",
                tag: "span",
                description:
                  "The fallback span centers initials inside the same circular frame when no image source is available.",
                classes: classes(avatarFallbackClasses),
                attributes: [],
                styles: [],
                children: [],
              },
              {
                id: "avatar-badge",
                label: "Avatar badge",
                tag: "span",
                description:
                  "The badge is absolutely positioned against the root and can expose a status label to assistive technology.",
                classes: classes(avatarBadgeClasses),
                attributes: [{ name: "aria-label", value: "Online" }],
                styles: [{ name: "anchor", value: "right-0 bottom-0" }],
                children: [],
              },
            ],
          },
          {
            id: "avatar-count",
            label: "Avatar count",
            tag: "span",
            description:
              "The count part represents hidden group members with an image role and a descriptive accessible label.",
            classes: classes(avatarGroupCountClasses),
            attributes: [
              { name: "role", value: "img" },
              { name: "aria-label", value: "3 more people" },
            ],
            styles: [],
            children: [],
          },
        ],
      },
    ],
  },
  stylingNotes: [
    "`avatarBaseClasses` defines the circular root frame, alignment, background, text color, and white ring.",
    "`avatarImageClasses` makes the image fill the root and stay clipped to the circle.",
    "`avatarFallbackClasses` centers fallback text inside the same circular geometry.",
    "`avatarBadgeClasses` positions a small status indicator at the bottom-right edge.",
    "`avatarGroupClasses` arranges multiple avatars in an overlapping row.",
    "`avatarGroupCountClasses` styles the overflow count as an avatar-shaped image affordance.",
    "`avatarSizeClassesBySize` maps Small, Default, and Large sizes to height, width, and text-scale classes.",
  ],
  keyboardInteractionNotes: [],
  apiReference: {
    title: "Avatar API reference",
    summary:
      "Search the Base UI Avatar helpers, config types, class hooks, accessibility contracts, and coverage paths without leaving the documentation story.",
    groups: [
      {
        id: "view-helpers",
        label: "View helpers",
        summary:
          "Foldkit-native render helpers that return Html and keep parent messages in the caller's program.",
        rows: [
          {
            id: "root-view",
            name: "rootView",
            category: "Rendering",
            typeLabel: "helper",
            signature: "rootView<ParentMessage>(config: RootViewConfig): Html",
            description:
              "Renders the root span with size, classes, style, and caller-provided children.",
            badges: [
              { label: "Html", tone: "neutral" },
              { label: "source-owned", tone: "source" },
            ],
            defaultValue: "size: Default",
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Composes avatarClassesBySize(size) with any caller classes.",
              "Children are parent-owned Html nodes, so the helper has no child update loop.",
            ],
          },
          {
            id: "image-view",
            name: "imageView",
            category: "Rendering",
            typeLabel: "helper",
            signature: "imageView<ParentMessage>(config: ImageViewConfig): Html",
            description:
              "Renders the image slot with required src and alt text plus optional classes and style.",
            badges: [
              { label: "required alt", tone: "required" },
              { label: "source-owned", tone: "source" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Writes src and alt directly to the img element.",
              "Uses avatarImageClasses so the image fills the circular frame.",
            ],
          },
          {
            id: "fallback-view",
            name: "fallbackView",
            category: "ARIA",
            typeLabel: "helper",
            signature:
              "fallbackView<ParentMessage>(config: FallbackViewConfig): Html",
            description:
              "Renders fallback children and optionally applies an aria-label for assistive technology.",
            badges: [
              { label: "optional aria-label", tone: "a11y" },
              { label: "source-owned", tone: "source" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Fallback children should identify the same person as the image would.",
              "ariaLabel is omitted unless the caller supplies one.",
            ],
          },
          {
            id: "view",
            name: "view",
            category: "Composition",
            typeLabel: "helper",
            signature: "view<ParentMessage>(config: ViewConfig): Html",
            description:
              "Convenience helper that chooses image or fallback content inside the root.",
            badges: [
              { label: "composition", tone: "neutral" },
              { label: "source-owned", tone: "source" },
            ],
            defaultValue: "size: Default; alt: fallback",
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "When src is present, the helper renders imageView with alt ?? fallback.",
              "When src is absent, the helper renders fallbackView with the fallback text.",
            ],
          },
          {
            id: "badge-view",
            name: "badgeView",
            category: "ARIA",
            typeLabel: "helper",
            signature: "badgeView<ParentMessage>(config: BadgeViewConfig): Html",
            description:
              "Renders a status badge; without a label it is aria-hidden, with a label it is announced.",
            badges: [
              { label: "aria-label", tone: "a11y" },
              { label: "aria-hidden", tone: "a11y" },
              { label: "source-owned", tone: "source" },
            ],
            defaultValue: "children: []",
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Use label for meaningful status such as Online.",
              "Decorative badges intentionally set aria-hidden=true.",
            ],
          },
          {
            id: "group-view",
            name: "groupView",
            category: "Composition",
            typeLabel: "helper",
            signature:
              "groupView<ParentMessage>(children: readonly Html[], classes?: string): Html",
            description:
              "Renders a grouped avatar row from caller-owned child nodes.",
            badges: [
              { label: "composition", tone: "neutral" },
              { label: "source-owned", tone: "source" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Accepts avatar, fallback, badge, or count Html children from the parent view.",
              "Adds avatarGroupClasses and optional caller classes to the wrapper.",
            ],
          },
          {
            id: "count-view",
            name: "countView",
            category: "ARIA",
            typeLabel: "helper",
            signature: "countView<ParentMessage>(config: CountConfig): Html",
            description:
              "Renders a +N overflow marker with role=\"img\" and a descriptive aria-label.",
            badges: [
              { label: "role=\"img\"", tone: "a11y" },
              { label: "aria-label", tone: "a11y" },
              { label: "source-owned", tone: "source" },
            ],
            defaultValue: "label: `${count} more people`",
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "The rendered text is +count.",
              "A caller label can override the default overflow description.",
            ],
          },
        ],
      },
      {
        id: "config-types",
        label: "Config types",
        summary:
          "Typed inputs accepted by the Avatar helpers, including sizes and style hooks.",
        rows: [
          {
            id: "root-view-config",
            name: "RootViewConfig",
            category: "Rendering",
            typeLabel: "type",
            signature:
              "Readonly<{ children: readonly Html[]; size?: AvatarSize; classes?: string; style?: AvatarStyle }>",
            description:
              "Configures the avatar root wrapper and the Html children rendered inside it.",
            badges: [
              { label: "children required", tone: "required" },
              { label: "size optional", tone: "optional" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "children is required because the root helper is composition-only.",
              "style accepts CSS custom properties or inline style overrides.",
            ],
          },
          {
            id: "image-view-config",
            name: "ImageViewConfig",
            category: "Rendering",
            typeLabel: "type",
            signature:
              "Readonly<{ src: string; alt: string; classes?: string; style?: AvatarStyle }>",
            description:
              "Configures the image slot with required source and alternate text.",
            badges: [
              { label: "src required", tone: "required" },
              { label: "alt required", tone: "required" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "src is passed to h.Src.",
              "alt is passed to h.Alt and should identify the represented person.",
            ],
          },
          {
            id: "fallback-view-config",
            name: "FallbackViewConfig",
            category: "ARIA",
            typeLabel: "type",
            signature:
              "Readonly<{ children: readonly Html[]; ariaLabel?: string; classes?: string; style?: AvatarStyle }>",
            description:
              "Configures the fallback slot and its optional accessible label.",
            badges: [
              { label: "children required", tone: "required" },
              { label: "ariaLabel optional", tone: "a11y" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Use children for initials or another parent-owned fallback view.",
              "ariaLabel is only emitted when provided.",
            ],
          },
          {
            id: "view-config",
            name: "ViewConfig",
            category: "Composition",
            typeLabel: "type",
            signature:
              "Readonly<{ fallback: string; src?: string; alt?: string; size?: AvatarSize; classes?: string; style?: AvatarStyle }>",
            description:
              "Configures the convenience helper that chooses image or fallback rendering.",
            badges: [
              { label: "fallback required", tone: "required" },
              { label: "src optional", tone: "optional" },
            ],
            defaultValue: "size: Default; alt: fallback",
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "fallback is always required because it is used as content or as the default alt text.",
              "src decides whether imageView or fallbackView is rendered.",
            ],
          },
          {
            id: "badge-view-config",
            name: "BadgeViewConfig",
            category: "ARIA",
            typeLabel: "type",
            signature:
              "Readonly<{ children?: readonly Html[]; label?: string; classes?: string; style?: AvatarStyle }>",
            description:
              "Configures the status badge content, label, class hook, and inline style.",
            badges: [
              { label: "all optional", tone: "optional" },
              { label: "a11y", tone: "a11y" },
            ],
            defaultValue: "children: []; aria-hidden when label is absent",
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "label switches the badge from decorative to announced.",
              "children can render status glyphs while the label carries the accessible name.",
            ],
          },
          {
            id: "count-config",
            name: "CountConfig",
            category: "ARIA",
            typeLabel: "type",
            signature:
              "Readonly<{ count: number; label?: string; classes?: string; style?: AvatarStyle }>",
            description:
              "Configures the overflow count marker and its accessible name.",
            badges: [
              { label: "count required", tone: "required" },
              { label: "label optional", tone: "a11y" },
            ],
            defaultValue: "label: `${count} more people`",
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "count is rendered as +N text.",
              "label should describe the hidden members when the default is not specific enough.",
            ],
          },
          {
            id: "avatar-size",
            name: "AvatarSize",
            category: "Styling",
            typeLabel: "type",
            signature: "\"Small\" | \"Default\" | \"Large\"",
            description:
              "Named size scale used by the root helper and size class mapper.",
            badges: [
              { label: "style token", tone: "neutral" },
              { label: "source-owned", tone: "source" },
            ],
            defaultValue: "Default",
            source: "registry/base-ui/ui/base-ui-avatar/view.ts",
            details: [
              "Small maps to h-8 w-8 text-xs.",
              "Large maps to h-12 w-12 text-base.",
            ],
          },
          {
            id: "avatar-style",
            name: "AvatarStyle",
            category: "Styling",
            typeLabel: "type",
            signature: "Readonly<Record<string, string>>",
            description:
              "Inline style record accepted by root, image, fallback, badge, and count helpers.",
            badges: [
              { label: "optional", tone: "optional" },
              { label: "style", tone: "neutral" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Use for CSS variables or tightly scoped inline values.",
              "Class hooks should remain the default styling extension point.",
            ],
          },
        ],
      },
      {
        id: "class-hooks",
        label: "Class hooks",
        summary:
          "Exported class constants and mappers that let examples and consumers style the same Avatar anatomy.",
        rows: [
          {
            id: "avatar-base-class-name",
            name: "avatarBaseClasses",
            category: "Styling",
            typeLabel: "class",
            signature: "const avatarBaseClasses: string",
            description:
              "Base classes for the circular avatar root frame, alignment, background, text color, and white ring.",
            badges: [{ label: "source-owned", tone: "source" }],
            source: "registry/base-ui/ui/base-ui-avatar/view.ts",
            details: classes(avatarBaseClasses),
          },
          {
            id: "avatar-image-class-name",
            name: "avatarImageClasses",
            category: "Styling",
            typeLabel: "class",
            signature: "const avatarImageClasses: string",
            description:
              "Classes that make the image fill the avatar root and stay clipped to the circle.",
            badges: [{ label: "source-owned", tone: "source" }],
            source: "registry/base-ui/ui/base-ui-avatar/view.ts",
            details: classes(avatarImageClasses),
          },
          {
            id: "avatar-fallback-class-name",
            name: "avatarFallbackClasses",
            category: "Styling",
            typeLabel: "class",
            signature: "const avatarFallbackClasses: string",
            description:
              "Classes that center fallback content inside the same circular geometry.",
            badges: [{ label: "source-owned", tone: "source" }],
            source: "registry/base-ui/ui/base-ui-avatar/view.ts",
            details: classes(avatarFallbackClasses),
          },
          {
            id: "avatar-badge-class-name",
            name: "avatarBadgeClasses",
            category: "Styling",
            typeLabel: "class",
            signature: "const avatarBadgeClasses: string",
            description:
              "Classes that position and style the small status indicator on the avatar edge.",
            badges: [{ label: "source-owned", tone: "source" }],
            source: "registry/base-ui/ui/base-ui-avatar/view.ts",
            details: classes(avatarBadgeClasses),
          },
          {
            id: "avatar-group-class-name",
            name: "avatarGroupClasses",
            category: "Composition",
            typeLabel: "class",
            signature: "const avatarGroupClasses: string",
            description:
              "Classes that arrange multiple avatars in a compact overlapping row.",
            badges: [{ label: "source-owned", tone: "source" }],
            source: "registry/base-ui/ui/base-ui-avatar/view.ts",
            details: classes(avatarGroupClasses),
          },
          {
            id: "avatar-group-count-class-name",
            name: "avatarGroupCountClasses",
            category: "Styling",
            typeLabel: "class",
            signature: "const avatarGroupCountClasses: string",
            description:
              "Classes that make the overflow count marker match the avatar silhouette.",
            badges: [{ label: "source-owned", tone: "source" }],
            source: "registry/base-ui/ui/base-ui-avatar/view.ts",
            details: classes(avatarGroupCountClasses),
          },
          {
            id: "avatar-size-class-name-by-size",
            name: "avatarSizeClassesBySize",
            category: "Styling",
            typeLabel: "mapper",
            signature: "avatarSizeClassesBySize(size?: AvatarSize): string",
            description:
              "Maps the named size scale to height, width, and text-size classes.",
            badges: [
              { label: "Default fallback", tone: "optional" },
              { label: "source-owned", tone: "source" },
            ],
            defaultValue: "Default",
            source: "registry/base-ui/ui/base-ui-avatar/view.ts",
            details: [
              "Small: h-8 w-8 text-xs",
              "Default: h-10 w-10 text-sm",
              "Large: h-12 w-12 text-base",
            ],
          },
        ],
      },
      {
        id: "accessibility",
        label: "Accessibility",
        summary:
          "Avatar-specific accessible names and roles that are emitted by the helpers or required from callers.",
        rows: [
          {
            id: "image-alt",
            name: "image alt",
            category: "ARIA",
            typeLabel: "contract",
            signature: "imageView({ alt })",
            description:
              "Profile images require alternate text that communicates the represented person or account.",
            badges: [
              { label: "required", tone: "required" },
              { label: "a11y", tone: "a11y" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "ViewConfig falls back to the fallback string when alt is omitted.",
              "Use meaningful names rather than visual descriptions.",
            ],
          },
          {
            id: "fallback-text",
            name: "fallback text",
            category: "Rendering",
            typeLabel: "contract",
            signature: "view({ fallback })",
            description:
              "Fallback text identifies the same person or account when an image source is not available.",
            badges: [
              { label: "required", tone: "required" },
              { label: "a11y", tone: "a11y" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Initials are acceptable when the surrounding context provides the full identity.",
              "The fallback string is also used as default image alt in view().",
            ],
          },
          {
            id: "badge-aria-label",
            name: "badge aria-label",
            category: "ARIA",
            typeLabel: "attribute",
            signature: "badgeView({ label: \"Online\" })",
            description:
              "Meaningful status badges expose their state through aria-label.",
            badges: [
              { label: "aria-label", tone: "a11y" },
              { label: "optional", tone: "optional" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Use labels such as Online or Away when the badge changes meaning.",
              "The label is emitted only when provided.",
            ],
          },
          {
            id: "badge-decorative-aria-hidden",
            name: "badge decorative aria-hidden",
            category: "ARIA",
            typeLabel: "attribute",
            signature: "badgeView({ children })",
            description:
              "Decorative badges are hidden from assistive technology when no label is supplied.",
            badges: [
              { label: "aria-hidden", tone: "a11y" },
              { label: "default", tone: "neutral" },
            ],
            defaultValue: "aria-hidden: true",
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Avoid announcing purely visual decoration.",
              "Add label when the badge conveys status.",
            ],
          },
          {
            id: "count-role-img",
            name: "count role=\"img\"",
            category: "ARIA",
            typeLabel: "attribute",
            signature: "countView({ count })",
            description:
              "The overflow marker uses role=\"img\" so +N is announced as one image-like affordance.",
            badges: [
              { label: "role=\"img\"", tone: "a11y" },
              { label: "emitted", tone: "source" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "The role is always applied by countView.",
              "The aria-label supplies the human-readable meaning.",
            ],
          },
          {
            id: "count-aria-label",
            name: "count aria-label",
            category: "ARIA",
            typeLabel: "attribute",
            signature: "countView({ count, label })",
            description:
              "The overflow count receives a descriptive accessible label, defaulting to the count of hidden people.",
            badges: [
              { label: "aria-label", tone: "a11y" },
              { label: "defaulted", tone: "optional" },
            ],
            defaultValue: "`${count} more people`",
            source: "registry/base-ui/ui/base-ui-avatar/index.ts",
            details: [
              "Override label for domain-specific wording.",
              "The visible text remains +N.",
            ],
          },
        ],
      },
      {
        id: "coverage",
        label: "Coverage",
        summary:
          "Existing tests and scripts that guard Avatar behavior, OpenStory story generation, and the public site smoke path.",
        rows: [
          {
            id: "registry-avatar-scene",
            name: "registry/base-ui/ui/base-ui-avatar/base-ui-avatar.scene.test.ts",
            category: "Tests",
            typeLabel: "scene",
            signature: "bunx vitest run registry/base-ui/ui/base-ui-avatar/base-ui-avatar.scene.test.ts",
            description:
              "Verifies the registry helper renders image, fallback, badge, group, and count affordances.",
            badges: [
              { label: "scene", tone: "neutral" },
              { label: "source", tone: "source" },
            ],
            source: "registry/base-ui/ui/base-ui-avatar/base-ui-avatar.scene.test.ts",
            details: [
              "Covers the source-owned helper output.",
              "Includes image, fallback, badge, group, and count assertions.",
            ],
          },
          {
            id: "example-avatar-scene",
            name: "registry/base-ui/examples/base-ui-avatar-basic/base-ui-avatar-basic.scene.test.ts",
            category: "Tests",
            typeLabel: "scene",
            signature:
              "bunx vitest run registry/base-ui/examples/base-ui-avatar-basic/base-ui-avatar-basic.scene.test.ts",
            description:
              "Verifies the installable basic example renders the image and fallback without click handlers.",
            badges: [
              { label: "example", tone: "neutral" },
              { label: "source", tone: "source" },
            ],
            source:
              "registry/base-ui/examples/base-ui-avatar-basic/base-ui-avatar-basic.scene.test.ts",
            details: [
              "Guards the published usage story.",
              "Checks that static Avatar helpers do not expose accidental click behavior.",
            ],
          },
          {
            id: "openstory-check-script",
            name: "scripts/check-openstory-stories.mjs",
            category: "Tests",
            typeLabel: "script",
            signature: "bun run check:openstory-stories",
            description:
              "Guards generated OpenStory inventory and example import coverage.",
            badges: [{ label: "script", tone: "source" }],
            source: "scripts/check-openstory-stories.mjs",
            details: [
              "Keeps generated OpenStory story metadata aligned with registry inventory.",
              "Runs outside the widget as part of the broader verification surface.",
            ],
          },
          {
            id: "public-site-smoke-script",
            name: "scripts/smoke-public-site.mjs",
            category: "Tests",
            typeLabel: "script",
            signature: "PUBLIC_BASE_URL=http://127.0.0.1:4173 bun run smoke:public-site",
            description:
              "Guards public OpenStory manifest and story iframe route availability.",
            badges: [{ label: "script", tone: "source" }],
            source: "scripts/smoke-public-site.mjs",
            details: [
              "Runs against a local preview server.",
              "Confirms the public documentation site can serve story routes.",
            ],
          },
        ],
      },
    ],
  },
  accessibilityNotes: [
    "Pass meaningful `alt` text for profile images so the rendered img communicates the represented person.",
    "Fallback text should identify the same person or account when no image source is available.",
    "Set a badge `aria-label` such as Online when the badge conveys status; decorative badges remain aria-hidden.",
    "The count helper renders `role=\"img\"` so the overflow marker is exposed as one concise image-like affordance.",
    "Use the count `aria-label` to describe the hidden people, for example `3 more people`.",
  ],
  coverageRows: [
    {
      path: "registry/base-ui/ui/base-ui-avatar/base-ui-avatar.scene.test.ts",
      purpose:
        "Verifies the registry helper renders image, fallback, badge, group, and count affordances.",
    },
    {
      path: "registry/base-ui/examples/base-ui-avatar-basic/base-ui-avatar-basic.scene.test.ts",
      purpose:
        "Verifies the installable basic example renders the image and fallback without click handlers.",
    },
    {
      path: "scripts/check-openstory-stories.mjs",
      purpose:
        "Guards generated OpenStory inventory and example import coverage.",
    },
    {
      path: "scripts/smoke-public-site.mjs",
      purpose:
        "Guards public OpenStory manifest and story iframe route availability.",
    },
  ],
};

export const documentationByItemName = {
  "base-ui-avatar": baseUiAvatarDocumentation,
} as const satisfies Readonly<Record<string, DocumentationReference>>;

export const documentationItemNames = new Set(
  Object.keys(documentationByItemName)
);
