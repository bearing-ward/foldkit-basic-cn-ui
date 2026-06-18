import {
  avatarBadgeClassName,
  avatarBaseClassName,
  avatarFallbackClassName,
  avatarGroupClassName,
  avatarGroupCountClassName,
  avatarImageClassName,
  avatarSizeClassNameBySize,
} from "../../../registry/base-ui/ui/base-ui-avatar/view";
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

export type DocumentationApiRow = Readonly<{
  name: string;
  signature: string;
  description: string;
}>;

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
  apiRows: readonly DocumentationApiRow[];
  accessibilityNotes: readonly string[];
  coverageRows: readonly DocumentationCoverageRow[];
}>;

const classes = (className: string): readonly string[] => className.split(" ");

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
        classes: classes(avatarGroupClassName),
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
              `${avatarBaseClassName} ${avatarSizeClassNameBySize("Default")}`
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
                classes: classes(avatarImageClassName),
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
                classes: classes(avatarFallbackClassName),
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
                classes: classes(avatarBadgeClassName),
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
            classes: classes(avatarGroupCountClassName),
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
    "`avatarBaseClassName` defines the circular root frame, alignment, background, text color, and white ring.",
    "`avatarImageClassName` makes the image fill the root and stay clipped to the circle.",
    "`avatarFallbackClassName` centers fallback text inside the same circular geometry.",
    "`avatarBadgeClassName` positions a small status indicator at the bottom-right edge.",
    "`avatarGroupClassName` arranges multiple avatars in an overlapping row.",
    "`avatarGroupCountClassName` styles the overflow count as an avatar-shaped image affordance.",
    "`avatarSizeClassNameBySize` maps Small, Default, and Large sizes to height, width, and text-scale classes.",
  ],
  keyboardInteractionNotes: [],
  apiRows: [
    {
      name: "rootView",
      signature: "rootView<ParentMessage>(config)",
      description:
        "Renders the root span with size, className, style, and caller-provided children.",
    },
    {
      name: "imageView",
      signature: "imageView<ParentMessage>(config)",
      description:
        "Renders the image slot with required src and alt text plus optional className and style.",
    },
    {
      name: "fallbackView",
      signature: "fallbackView<ParentMessage>(config)",
      description:
        "Renders fallback children and optionally applies an aria-label for assistive technology.",
    },
    {
      name: "view",
      signature: "view<ParentMessage>(config)",
      description:
        "Convenience helper that chooses image or fallback content inside the root.",
    },
    {
      name: "badgeView",
      signature: "badgeView<ParentMessage>(config)",
      description:
        "Renders a status badge; without a label it is aria-hidden, with a label it is announced.",
    },
    {
      name: "groupView",
      signature: "groupView<ParentMessage>(children, className?)",
      description:
        "Renders a grouped avatar row from caller-owned child nodes.",
    },
    {
      name: "countView",
      signature: "countView<ParentMessage>(config)",
      description:
        "Renders a +N overflow marker with role=img and a descriptive aria-label.",
    },
  ],
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
