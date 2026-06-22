import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  sheetCloseClasses,
  sheetContentClasses,
  sheetDescriptionClasses,
  sheetFooterClasses,
  sheetHeaderClasses,
  sheetOverlayClasses,
  sheetPortalClasses,
  sheetRootClasses,
  sheetTitleClasses,
  sheetTriggerClasses,
} from "./view";

export {
  sheetCloseClasses,
  sheetContentClasses,
  sheetDescriptionClasses,
  sheetFooterClasses,
  sheetHeaderClasses,
  sheetOverlayClasses,
  sheetPortalClasses,
  sheetRootClasses,
  sheetTitleClasses,
  sheetTriggerClasses,
} from "./view";

export type ViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = ViewConfig &
  Readonly<{ onOpen: ParentMessage }>;

export type PortalViewConfig = ViewConfig & Readonly<{ open: boolean }>;

export type ContentViewConfig = ViewConfig &
  Readonly<{
    ariaDescribedBy?: string | undefined;
    ariaLabelledBy?: string | undefined;
  }>;

export type LabelViewConfig = Readonly<{
  id?: string | undefined;
  label: string;
}>;

export type CloseViewConfig<ParentMessage> = ViewConfig &
  Readonly<{ onClose: ParentMessage; ariaLabel?: string | undefined }>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  classes,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sheet"),
      h.Class(cn(sheetRootClasses, classes)),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  children,
  onOpen,
  classes,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.OnClick(onOpen),
      h.DataAttribute("slot", "sheet-trigger"),
      h.Class(cn(sheetTriggerClasses, classes)),
    ],
    children
  );
};

export const portalView = <ParentMessage>({
  open,
  children,
  classes,
}: PortalViewConfig): Html => {
  const h = html<ParentMessage>();

  if (!open) {
    return h.empty;
  }

  return h.div(
    [
      h.DataAttribute("slot", "sheet-portal"),
      h.Class(cn(sheetPortalClasses, classes)),
    ],
    children
  );
};

export const overlayView = <ParentMessage>({
  children = [],
  classes,
}: Partial<ViewConfig>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sheet-overlay"),
      h.Class(cn(sheetOverlayClasses, classes)),
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  classes,
  ariaDescribedBy,
  ariaLabelledBy,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "dialog"),
      h.AriaModal(true),
      ...(ariaLabelledBy === undefined
        ? []
        : [h.AriaLabelledBy(ariaLabelledBy)]),
      ...(ariaDescribedBy === undefined
        ? []
        : [h.AriaDescribedBy(ariaDescribedBy)]),
      h.DataAttribute("slot", "sheet-content"),
      h.Class(cn(sheetContentClasses, classes)),
    ],
    children
  );
};

export const headerView = <ParentMessage>({
  children,
  classes,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sheet-header"),
      h.Class(cn(sheetHeaderClasses, classes)),
    ],
    children
  );
};

export const titleView = <ParentMessage>({
  id,
  label,
}: LabelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.h2(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      h.DataAttribute("slot", "sheet-title"),
      h.Class(sheetTitleClasses),
    ],
    [label]
  );
};

export const descriptionView = <ParentMessage>({
  id,
  label,
}: LabelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      h.DataAttribute("slot", "sheet-description"),
      h.Class(sheetDescriptionClasses),
    ],
    [label]
  );
};

export const closeView = <ParentMessage>({
  children,
  onClose,
  ariaLabel = "Close sheet",
  classes,
}: CloseViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(ariaLabel),
      h.OnClick(onClose),
      h.DataAttribute("slot", "sheet-close"),
      h.Class(cn(sheetCloseClasses, classes)),
    ],
    children
  );
};

export const footerView = <ParentMessage>({
  children,
  classes,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sheet-footer"),
      h.Class(cn(sheetFooterClasses, classes)),
    ],
    children
  );
};
