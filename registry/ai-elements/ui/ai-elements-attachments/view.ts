export type AttachmentMediaCategory =
  | "Image"
  | "Video"
  | "Audio"
  | "Document"
  | "Source"
  | "Unknown";

export type AttachmentVariant = "Grid" | "Inline" | "List";

export const gridAttachmentsClasses = "grid grid-cols-2 gap-2";
export const inlineAttachmentsClasses = "flex flex-wrap gap-2";
export const listAttachmentsClasses = "flex flex-col gap-2";

export const gridAttachmentClasses =
  "group relative overflow-hidden rounded-lg border border-gray-200 bg-white";
export const inlineAttachmentClasses =
  "group inline-flex max-w-xs items-center gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-sm";
export const listAttachmentClasses =
  "group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3";

export const gridAttachmentRemoveClasses =
  "absolute top-2 right-2 size-6 rounded-full p-0";
export const inlineAttachmentRemoveClasses = "size-5 rounded p-0";
export const listAttachmentRemoveClasses = "size-8 shrink-0 rounded p-0";

export const attachmentPreviewClassesByVariant = (
  variant: AttachmentVariant
): string => {
  if (variant === "Grid") {
    return "flex aspect-video w-full items-center justify-center overflow-hidden bg-gray-100 text-gray-500";
  }

  if (variant === "Inline") {
    return "flex size-6 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-500";
  }

  return "flex size-10 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500";
};

export const attachmentImageClassesByVariant = (
  variant: AttachmentVariant
): string => {
  if (variant === "Grid") {
    return "h-full w-full object-cover";
  }

  return "h-full w-full rounded object-cover";
};

export const attachmentInfoClassesByVariant = (
  variant: AttachmentVariant
): string => {
  if (variant === "Inline") {
    return "min-w-0 truncate text-sm text-gray-900";
  }

  return "min-w-0 flex-1 text-sm text-gray-900";
};

export const attachmentLabelClassesByVariant = (
  variant: AttachmentVariant
): string => {
  if (variant === "Inline") {
    return "truncate";
  }

  return "truncate font-medium";
};

export const attachmentMediaTypeClasses =
  "mt-0.5 truncate text-xs text-gray-500";

export const attachmentHoverCardClasses = "relative inline-flex";
export const attachmentHoverCardTriggerClasses =
  "inline-flex min-w-0 items-center";
export const attachmentHoverCardContentClasses =
  "absolute left-0 top-full z-30 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-3 text-left shadow-lg";
export const attachmentEmptyClasses =
  "rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500";

export const attachmentIconLabelByCategory = (
  category: AttachmentMediaCategory
): string => {
  if (category === "Image") {
    return "Image attachment";
  }

  if (category === "Video") {
    return "Video attachment";
  }

  if (category === "Audio") {
    return "Audio attachment";
  }

  if (category === "Document") {
    return "Document attachment";
  }

  if (category === "Source") {
    return "Source document";
  }

  return "Attachment";
};

export const attachmentIconGlyphByCategory = (
  category: AttachmentMediaCategory
): string => {
  if (category === "Image") {
    return "IMG";
  }

  if (category === "Video") {
    return "VID";
  }

  if (category === "Audio") {
    return "AUD";
  }

  if (category === "Document") {
    return "DOC";
  }

  if (category === "Source") {
    return "SRC";
  }

  return "ATT";
};

export const attachmentsClassesByVariant = (
  variant: AttachmentVariant
): string => {
  if (variant === "Grid") {
    return gridAttachmentsClasses;
  }

  if (variant === "Inline") {
    return inlineAttachmentsClasses;
  }

  return listAttachmentsClasses;
};

export const attachmentClassesByVariant = (
  variant: AttachmentVariant
): string => {
  if (variant === "Grid") {
    return gridAttachmentClasses;
  }

  if (variant === "Inline") {
    return inlineAttachmentClasses;
  }

  return listAttachmentClasses;
};

export const attachmentRemoveClassesByVariant = (
  variant: AttachmentVariant
): string => {
  if (variant === "Grid") {
    return gridAttachmentRemoveClasses;
  }

  if (variant === "Inline") {
    return inlineAttachmentRemoveClasses;
  }

  return listAttachmentRemoveClasses;
};
