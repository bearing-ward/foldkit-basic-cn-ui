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
  classes?: string | undefined;
  style?: HoverCardStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  children: readonly Html[];
  onOpen: ParentMessage;
  open?: boolean | undefined;
  classes?: string | undefined;
  style?: HoverCardStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  classes?: string | undefined;
  style?: HoverCardStyle | undefined;
}>;

export type BackdropViewConfig<ParentMessage> = Readonly<{
  onClose: ParentMessage;
  classes?: string | undefined;
  style?: HoverCardStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  classes,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "hover-card"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(hoverCardRootClasses, classes)),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  children,
  onOpen,
  open = false,
  classes,
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
      h.Class(cn(hoverCardTriggerClasses, classes)),
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
    return h.empty;
  }

  return h.div(
    [
      h.DataAttribute("slot", "hover-card-portal"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(hoverCardPortalClasses, classes)),
    ],
    children
  );
};

export const backdropView = <ParentMessage>({
  onClose,
  classes,
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
      h.Class(cn(hoverCardBackdropClasses, classes)),
    ],
    []
  );
};

export const positionerView = <ParentMessage>({
  children,
  classes,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "hover-card-positioner"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(hoverCardPositionerClasses, classes)),
    ],
    children
  );
};

export const popupView = <ParentMessage>({
  children,
  classes,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "dialog"),
      h.DataAttribute("slot", "hover-card-popup"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(hoverCardPopupClasses, classes)),
    ],
    children
  );
};
