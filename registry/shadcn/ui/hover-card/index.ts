import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  hoverCardBackdropClasses,
  hoverCardPopupClasses,
  hoverCardPortalClasses,
  hoverCardPositionerClasses,
  hoverCardRootClasses,
  hoverCardTriggerClasses,
} from "./view";

export {
  hoverCardAvatarClasses,
  hoverCardBackdropClasses,
  hoverCardDescriptionClasses,
  hoverCardMetaClasses,
  hoverCardPopupClasses,
  hoverCardPortalClasses,
  hoverCardPositionerClasses,
  hoverCardRootClasses,
  hoverCardTitleClasses,
  hoverCardTriggerClasses,
} from "./view";

export type HoverCardStyle = Readonly<Record<string, string>>;

export type PartViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: HoverCardStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  children: readonly Html[];
  onOpen: ParentMessage;
  open?: boolean | undefined;
  className?: string | undefined;
  style?: HoverCardStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  className?: string | undefined;
  style?: HoverCardStyle | undefined;
}>;

export type BackdropViewConfig<ParentMessage> = Readonly<{
  onClose: ParentMessage;
  className?: string | undefined;
  style?: HoverCardStyle | undefined;
}>;

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  className,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "hover-card"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(hoverCardRootClasses, className)),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  children,
  onOpen,
  open = false,
  className,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("aria-haspopup", "dialog"),
      h.Attribute("aria-expanded", open ? "true" : "false"),
      h.DataAttribute("slot", "hover-card-trigger"),
      ...(open ? [h.DataAttribute("open", "true")] : []),
      h.OnClick(onOpen),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(hoverCardTriggerClasses, className)),
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
    return h.empty;
  }

  return h.div(
    [
      h.DataAttribute("slot", "hover-card-portal"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(hoverCardPortalClasses, className)),
    ],
    children
  );
};

export const backdropView = <ParentMessage>({
  onClose,
  className,
  style,
}: BackdropViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel("Close hover card"),
      h.DataAttribute("slot", "hover-card-backdrop"),
      h.OnClick(onClose),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(hoverCardBackdropClasses, className)),
    ],
    []
  );
};

export const positionerView = <ParentMessage>({
  children,
  className,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "hover-card-positioner"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(hoverCardPositionerClasses, className)),
    ],
    children
  );
};

export const popupView = <ParentMessage>({
  children,
  className,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "dialog"),
      h.DataAttribute("slot", "hover-card-popup"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(hoverCardPopupClasses, className)),
    ],
    children
  );
};
