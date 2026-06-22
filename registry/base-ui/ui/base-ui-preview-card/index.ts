import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  previewCardArrowClasses,
  previewCardBackdropClasses,
  previewCardPopupClasses,
  previewCardPortalClasses,
  previewCardPositionerClasses,
  previewCardRootClasses,
  previewCardTriggerClasses,
  previewCardViewportClasses,
} from "./view";

export {
  previewCardArrowClasses,
  previewCardBackdropClasses,
  previewCardPopupClasses,
  previewCardPortalClasses,
  previewCardPositionerClasses,
  previewCardRootClasses,
  previewCardTriggerClasses,
  previewCardViewportClasses,
} from "./view";

export type PreviewCardStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  children: readonly (Html | string)[];
  onOpen: ParentMessage;
  open: boolean;
  classes?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  classes?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type BackdropViewConfig<ParentMessage> = Readonly<{
  onClose: ParentMessage;
  ariaLabel?: string | undefined;
  classes?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type PositionerViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type PopupViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type ViewportViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type ArrowViewConfig = Readonly<{
  classes?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  classes,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.Class(cn(previewCardRootClasses, classes)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  children,
  onOpen,
  open,
  classes,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.OnClick(onOpen),
      h.Attribute("aria-expanded", open ? "true" : "false"),
      h.Attribute("aria-haspopup", "dialog"),
      h.DataAttribute("open", open ? "true" : "false"),
      h.Class(cn(previewCardTriggerClasses, classes)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const portalView = <ParentMessage>({
  open,
  children,
  classes,
  style,
}: PortalViewConfig): Html => {
  const h = html<ParentMessage>();

  if (!open) {
    return h.div([h.Class("hidden")], []);
  }

  return h.div(
    [
      h.Class(cn(previewCardPortalClasses, classes)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const backdropView = <ParentMessage>({
  onClose,
  ariaLabel = "Close preview card",
  classes,
  style,
}: BackdropViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(ariaLabel),
      h.OnClick(onClose),
      h.Class(cn(previewCardBackdropClasses, classes)),
      h.Style(style ?? {}),
    ],
    []
  );
};

export const positionerView = <ParentMessage>({
  children,
  classes,
  style,
}: PositionerViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(cn(previewCardPositionerClasses, classes)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const popupView = <ParentMessage>({
  children,
  classes,
  style,
}: PopupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Role("dialog"),
      h.Class(cn(previewCardPopupClasses, classes)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const viewportView = <ParentMessage>({
  children,
  classes,
  style,
}: ViewportViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(cn(previewCardViewportClasses, classes)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const arrowView = <ParentMessage>({
  classes,
  style,
}: ArrowViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("aria-hidden", "true"),
      h.Class(cn(previewCardArrowClasses, classes)),
      h.Style(style ?? {}),
    ],
    []
  );
};
