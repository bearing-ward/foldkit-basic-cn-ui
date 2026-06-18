import { Array, Schema as S } from "effect";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import type { AttachmentMediaCategory, AttachmentVariant } from "./view";
import {
  attachmentClassNameByVariant,
  attachmentEmptyClassName,
  attachmentHoverCardClassName,
  attachmentHoverCardContentClassName,
  attachmentHoverCardTriggerClassName,
  attachmentIconGlyphByCategory,
  attachmentIconLabelByCategory,
  attachmentImageClassNameByVariant,
  attachmentInfoClassNameByVariant,
  attachmentLabelClassNameByVariant,
  attachmentMediaTypeClassName,
  attachmentPreviewClassNameByVariant,
  attachmentRemoveClassNameByVariant,
  attachmentsClassNameByVariant,
} from "./view";

export {
  attachmentClassNameByVariant,
  attachmentEmptyClassName,
  attachmentHoverCardClassName,
  attachmentHoverCardContentClassName,
  attachmentHoverCardTriggerClassName,
  attachmentIconGlyphByCategory,
  attachmentIconLabelByCategory,
  attachmentImageClassNameByVariant,
  attachmentInfoClassNameByVariant,
  attachmentLabelClassNameByVariant,
  attachmentMediaTypeClassName,
  attachmentPreviewClassNameByVariant,
  attachmentRemoveClassNameByVariant,
  attachmentsClassNameByVariant,
  gridAttachmentClassName,
  gridAttachmentRemoveClassName,
  gridAttachmentsClassName,
  inlineAttachmentClassName,
  inlineAttachmentRemoveClassName,
  inlineAttachmentsClassName,
  listAttachmentClassName,
  listAttachmentRemoveClassName,
  listAttachmentsClassName,
} from "./view";
export type { AttachmentMediaCategory, AttachmentVariant } from "./view";

export const FileAttachmentData = S.Struct({
  id: S.String,
  type: S.Literal("file"),
  filename: S.optional(S.String),
  mediaType: S.optional(S.String),
  url: S.optional(S.String),
  sizeLabel: S.optional(S.String),
});
export type FileAttachmentData = typeof FileAttachmentData.Type;

export const SourceAttachmentData = S.Struct({
  id: S.String,
  type: S.Literal("source"),
  title: S.optional(S.String),
  filename: S.optional(S.String),
  url: S.optional(S.String),
  description: S.optional(S.String),
});
export type SourceAttachmentData = typeof SourceAttachmentData.Type;

export const AttachmentData = S.Union([
  FileAttachmentData,
  SourceAttachmentData,
]);
export type AttachmentData = typeof AttachmentData.Type;

export type AttachmentsViewConfig = Readonly<{
  variant?: AttachmentVariant;
  children: readonly Html[];
  className?: string;
}>;

export type AttachmentViewConfig<ParentMessage> = Readonly<{
  data: AttachmentData;
  variant?: AttachmentVariant;
  children?: readonly Html[];
  onRemove?: ParentMessage;
  className?: string;
}>;

export type AttachmentPreviewViewConfig = Readonly<{
  data: AttachmentData;
  variant?: AttachmentVariant;
  fallback?: Html;
  className?: string;
}>;

export type AttachmentInfoViewConfig = Readonly<{
  data: AttachmentData;
  variant?: AttachmentVariant;
  showMediaType?: boolean;
  className?: string;
}>;

export type AttachmentRemoveViewConfig<ParentMessage> = Readonly<{
  label?: string;
  onRemove: ParentMessage;
  variant?: AttachmentVariant;
  className?: string;
}>;

export type AttachmentHoverCardViewConfig = Readonly<{
  children: readonly Html[];
  className?: string;
}>;

export type AttachmentEmptyViewConfig = Readonly<{
  label?: string;
  className?: string;
}>;

export type ViewConfig<ParentMessage> = Readonly<{
  attachments: readonly AttachmentData[];
  variant?: AttachmentVariant;
  onRemove?: (attachment: AttachmentData) => ParentMessage;
  showMediaType?: boolean;
  className?: string;
}>;

const classNames = (
  ...values: readonly (string | false | undefined)[]
): string => values.filter(Boolean).join(" ");

const mediaTypeLabel = (data: AttachmentData): string | undefined => {
  if (data.type === "source") {
    return data.url;
  }

  return data.mediaType;
};

export const getMediaCategory = (
  data: AttachmentData
): AttachmentMediaCategory => {
  if (data.type === "source") {
    return "Source";
  }

  const mediaType = data.mediaType ?? "";

  if (mediaType.startsWith("image/")) {
    return "Image";
  }

  if (mediaType.startsWith("video/")) {
    return "Video";
  }

  if (mediaType.startsWith("audio/")) {
    return "Audio";
  }

  if (mediaType.startsWith("application/") || mediaType.startsWith("text/")) {
    return "Document";
  }

  return "Unknown";
};

export const getAttachmentLabel = (data: AttachmentData): string => {
  if (data.type === "source") {
    return data.title ?? data.filename ?? "Source";
  }

  const category = getMediaCategory(data);

  return data.filename ?? (category === "Image" ? "Image" : "Attachment");
};

export const attachmentsView = <ParentMessage>({
  variant = "Grid",
  children,
  className,
}: AttachmentsViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "attachments"),
      h.DataAttribute("variant", variant.toLowerCase()),
      h.Class(classNames(attachmentsClassNameByVariant(variant), className)),
    ],
    children
  );
};

export const attachmentPreviewView = <ParentMessage>({
  data,
  variant = "Grid",
  fallback,
  className,
}: AttachmentPreviewViewConfig): Html => {
  const h = html<ParentMessage>();
  const category = getMediaCategory(data);
  const label = getAttachmentLabel(data);

  if (category === "Image" && data.type === "file" && data.url !== undefined) {
    return h.div(
      [
        h.DataAttribute("slot", "attachment-preview"),
        h.Class(
          classNames(attachmentPreviewClassNameByVariant(variant), className)
        ),
      ],
      [
        h.img([
          h.Src(data.url),
          h.Alt(label),
          h.Class(attachmentImageClassNameByVariant(variant)),
        ]),
      ]
    );
  }

  return h.div(
    [
      h.DataAttribute("slot", "attachment-preview"),
      h.Attribute("aria-label", attachmentIconLabelByCategory(category)),
      h.Class(
        classNames(attachmentPreviewClassNameByVariant(variant), className)
      ),
    ],
    [
      fallback ??
        h.span(
          [
            h.Attribute("aria-hidden", "true"),
            h.Class("text-[10px] font-semibold"),
          ],
          [attachmentIconGlyphByCategory(category)]
        ),
    ]
  );
};

export const attachmentInfoView = <ParentMessage>({
  data,
  variant = "Grid",
  showMediaType = false,
  className,
}: AttachmentInfoViewConfig): Html => {
  const h = html<ParentMessage>();
  const maybeMediaTypeLabel = mediaTypeLabel(data);

  if (variant === "Grid") {
    return h.empty;
  }

  return h.div(
    [
      h.DataAttribute("slot", "attachment-info"),
      h.Class(classNames(attachmentInfoClassNameByVariant(variant), className)),
    ],
    [
      h.div(
        [h.Class(attachmentLabelClassNameByVariant(variant))],
        [getAttachmentLabel(data)]
      ),
      showMediaType && maybeMediaTypeLabel !== undefined
        ? h.div([h.Class(attachmentMediaTypeClassName)], [maybeMediaTypeLabel])
        : h.empty,
    ]
  );
};

export const attachmentRemoveView = <ParentMessage>({
  label = "Remove",
  onRemove,
  variant = "Grid",
  className,
}: AttachmentRemoveViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(label),
      h.DataAttribute("slot", "attachment-remove"),
      h.OnClick(onRemove),
      h.Class(
        classNames(
          "inline-flex items-center justify-center bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600",
          attachmentRemoveClassNameByVariant(variant),
          className
        )
      ),
    ],
    [h.span([h.Attribute("aria-hidden", "true")], ["x"])]
  );
};

export const attachmentHoverCardView = <ParentMessage>({
  children,
  className,
}: AttachmentHoverCardViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "attachment-hover-card"),
      h.Class(classNames(attachmentHoverCardClassName, className)),
    ],
    children
  );
};

export const attachmentHoverCardTriggerView = <ParentMessage>({
  children,
  className,
}: AttachmentHoverCardViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "attachment-hover-card-trigger"),
      h.Class(classNames(attachmentHoverCardTriggerClassName, className)),
    ],
    children
  );
};

export const attachmentHoverCardContentView = <ParentMessage>({
  children,
  className,
}: AttachmentHoverCardViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "dialog"),
      h.DataAttribute("slot", "attachment-hover-card-content"),
      h.Class(classNames(attachmentHoverCardContentClassName, className)),
    ],
    children
  );
};

export const attachmentEmptyView = <ParentMessage>({
  label = "No attachments",
  className,
}: AttachmentEmptyViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "attachment-empty"),
      h.Class(classNames(attachmentEmptyClassName, className)),
    ],
    [label]
  );
};

export const attachmentView = <ParentMessage>({
  data,
  variant = "Grid",
  children,
  onRemove,
  className,
}: AttachmentViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const content = children ?? [
    attachmentPreviewView<ParentMessage>({ data, variant }),
    attachmentInfoView<ParentMessage>({
      data,
      variant,
      showMediaType: variant === "List",
    }),
    onRemove === undefined
      ? h.empty
      : attachmentRemoveView<ParentMessage>({
          label: `Remove ${getAttachmentLabel(data)}`,
          onRemove,
          variant,
        }),
  ];

  return h.div(
    [
      h.DataAttribute("slot", "attachment"),
      h.DataAttribute("media-category", getMediaCategory(data).toLowerCase()),
      h.Class(classNames(attachmentClassNameByVariant(variant), className)),
    ],
    content
  );
};

export const view = <ParentMessage>({
  attachments,
  variant = "Grid",
  onRemove,
  showMediaType = variant === "List",
  className,
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return Array.match(attachments, {
    onEmpty: () => attachmentEmptyView<ParentMessage>(),
    onNonEmpty: (nonEmptyAttachments) =>
      attachmentsView<ParentMessage>({
        variant,
        ...(className === undefined ? {} : { className }),
        children: Array.map(nonEmptyAttachments, (attachment) =>
          attachmentView<ParentMessage>({
            data: attachment,
            variant,
            ...(onRemove === undefined
              ? {}
              : { onRemove: onRemove(attachment) }),
            children: [
              variant === "Inline"
                ? attachmentHoverCardView<ParentMessage>({
                    children: [
                      attachmentHoverCardTriggerView<ParentMessage>({
                        children: [
                          attachmentPreviewView<ParentMessage>({
                            data: attachment,
                            variant,
                          }),
                          attachmentInfoView<ParentMessage>({
                            data: attachment,
                            variant,
                            showMediaType,
                          }),
                        ],
                      }),
                      attachmentHoverCardContentView<ParentMessage>({
                        children: [
                          h.div(
                            [h.Class("text-sm font-medium text-gray-950")],
                            [getAttachmentLabel(attachment)]
                          ),
                          h.div(
                            [h.Class("mt-1 text-xs text-gray-500")],
                            [getMediaCategory(attachment)]
                          ),
                        ],
                      }),
                    ],
                  })
                : attachmentPreviewView<ParentMessage>({
                    data: attachment,
                    variant,
                  }),
              variant === "Inline"
                ? h.empty
                : attachmentInfoView<ParentMessage>({
                    data: attachment,
                    variant,
                    showMediaType,
                  }),
              onRemove === undefined
                ? h.empty
                : attachmentRemoveView<ParentMessage>({
                    label: `Remove ${getAttachmentLabel(attachment)}`,
                    onRemove: onRemove(attachment),
                    variant,
                  }),
            ],
          })
        ),
      }),
  });
};
