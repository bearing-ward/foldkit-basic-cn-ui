import {
  avatarBadgeClasses,
  avatarBaseClasses,
  avatarFallbackClasses,
  avatarGroupClasses,
  avatarGroupCountClasses,
  avatarImageClasses,
  avatarSizeClassesBySize,
} from "../../../../registry/base-ui/ui/base-ui-avatar";
import { html } from "foldkit/html";
import { defineProgram } from "../../documentation/anatomyXray";
import type {
  Message as XrayMessage,
  XrayConfig,
} from "../../documentation/anatomyXray";

const classes = (classes: string): readonly string[] => classes.split(" ");
const avatarImageSrc =
  "data:image/svg+xml,%3Csvg viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='80' fill='%230f766e'/%3E%3C/svg%3E";

export const avatarXrayConfig: XrayConfig = {
  title: "Base UI Avatar Anatomy",
  summary:
    "Inspect the explicit parts, classes, attributes, and style hooks used to construct the Avatar, Avatar group, status badge, and overflow count.",
  preview: ({ partAttributes }) => {
    const h = html<XrayMessage>();

    return h.div(
      [
        h.Class(
          "flex min-h-40 w-full items-center justify-center rounded-[8px] border border-slate-200 bg-white p-8"
        ),
      ],
      [
        h.div(
          [...partAttributes("avatar-group", avatarGroupClasses)],
          [
            h.span(
              [
                ...partAttributes(
                  "avatar-root",
                  `${avatarBaseClasses} ${avatarSizeClassesBySize("Default")}`
                ),
              ],
              [
                h.img([
                  ...partAttributes("avatar-image", avatarImageClasses),
                  h.Src(avatarImageSrc),
                  h.Alt("Lena Taylor"),
                ]),
                h.span(
                  [
                    ...partAttributes("avatar-badge", avatarBadgeClasses),
                    h.AriaLabel("Online"),
                  ],
                  []
                ),
              ]
            ),
            h.span(
              [
                h.Class(
                  `${avatarBaseClasses} ${avatarSizeClassesBySize("Default")}`
                ),
              ],
              [
                h.span(
                  [
                    ...partAttributes(
                      "avatar-fallback",
                      avatarFallbackClasses
                    ),
                  ],
                  ["LT"]
                ),
              ]
            ),
            h.span(
              [
                ...partAttributes("avatar-count", avatarGroupCountClasses),
                h.Attribute("role", "img"),
                h.AriaLabel("3 more people"),
              ],
              ["+3"]
            ),
          ]
        ),
      ]
    );
  },
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
                  value: avatarImageSrc,
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
};

export const { Model, Message, init, update, view } =
  defineProgram(avatarXrayConfig);
