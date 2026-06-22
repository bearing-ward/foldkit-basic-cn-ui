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
  className?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  children: readonly (Html | string)[];
  onOpen: ParentMessage;
  open: boolean;
  className?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  className?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type BackdropViewConfig<ParentMessage> = Readonly<{
  onClose: ParentMessage;
  ariaLabel?: string | undefined;
  className?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type PositionerViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type PopupViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type ViewportViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

export type ArrowViewConfig = Readonly<{
  className?: string | undefined;
  style?: PreviewCardStyle | undefined;
}>;

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.Class(cn(previewCardRootClasses, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  children,
  onOpen,
  open,
  className,
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
      h.Class(cn(previewCardTriggerClasses, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const portalView = <ParentMessage>({
  open,
  children,
  className,
  style,
}: PortalViewConfig): Html => {
  const h = html<ParentMessage>();

  if (!open) {
    return h.div([h.Class("hidden")], []);
  }

  return h.div(
    [
      h.Class(cn(previewCardPortalClasses, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const backdropView = <ParentMessage>({
  onClose,
  ariaLabel = "Close preview card",
  className,
  style,
}: BackdropViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(ariaLabel),
      h.OnClick(onClose),
      h.Class(cn(previewCardBackdropClasses, className)),
      h.Style(style ?? {}),
    ],
    []
  );
};

export const positionerView = <ParentMessage>({
  children,
  className,
  style,
}: PositionerViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(cn(previewCardPositionerClasses, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const popupView = <ParentMessage>({
  children,
  className,
  style,
}: PopupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Role("dialog"),
      h.Class(cn(previewCardPopupClasses, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const viewportView = <ParentMessage>({
  children,
  className,
  style,
}: ViewportViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(cn(previewCardViewportClasses, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const arrowView = <ParentMessage>({
  className,
  style,
}: ArrowViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("aria-hidden", "true"),
      h.Class(cn(previewCardArrowClasses, className)),
      h.Style(style ?? {}),
    ],
    []
  );
};
