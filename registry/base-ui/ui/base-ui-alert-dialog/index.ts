import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  alertDialogActionsClasses,
  alertDialogBackdropClasses,
  alertDialogCancelClasses,
  alertDialogConfirmClasses,
  alertDialogDescriptionClasses,
  alertDialogPopupClasses,
  alertDialogPortalClasses,
  alertDialogRootClasses,
  alertDialogTitleClasses,
  alertDialogTriggerClasses,
  alertDialogViewportClasses,
} from "./view";

export {
  alertDialogActionsClasses,
  alertDialogBackdropClasses,
  alertDialogCancelClasses,
  alertDialogConfirmClasses,
  alertDialogDescriptionClasses,
  alertDialogPopupClasses,
  alertDialogPortalClasses,
  alertDialogRootClasses,
  alertDialogTitleClasses,
  alertDialogTriggerClasses,
  alertDialogViewportClasses,
} from "./view";

export type AlertDialogStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: AlertDialogStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  onClick: ParentMessage;
  children: readonly Html[];
  classes?: string | undefined;
  style?: AlertDialogStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  classes?: string | undefined;
  style?: AlertDialogStyle | undefined;
}>;

export type PartViewConfig = Readonly<{
  id?: string | undefined;
  children: readonly Html[];
  classes?: string | undefined;
  style?: AlertDialogStyle | undefined;
}>;

export type PopupViewConfig = Readonly<{
  titleId: string;
  descriptionId: string;
  children: readonly Html[];
  classes?: string | undefined;
  style?: AlertDialogStyle | undefined;
}>;

export type CloseViewConfig<ParentMessage> = Readonly<{
  onClick: ParentMessage;
  children: readonly Html[];
  variant?: "Cancel" | "Confirm" | undefined;
  classes?: string | undefined;
  style?: AlertDialogStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const partView = <ParentMessage>(
  tagName: "div" | "h2" | "p",
  baseClasses: string,
  { id, children, classes, style }: PartViewConfig
): Html => {
  const h = html<ParentMessage>();
  const attributes = [
    ...(id === undefined ? [] : [h.Id(id)]),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(cn(baseClasses, classes)),
  ];

  if (tagName === "h2") {
    return h.h2(attributes, children);
  }

  if (tagName === "p") {
    return h.p(attributes, children);
  }

  return h.div(attributes, children);
};

export const rootView = <ParentMessage>({
  children,
  classes,
  style,
}: RootViewConfig): Html =>
  partView<ParentMessage>("div", alertDialogRootClasses, {
    children,
    classes,
    style,
  });

export const triggerView = <ParentMessage>({
  onClick,
  children,
  classes,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.OnClick(onClick),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(alertDialogTriggerClasses, classes)),
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
    return h.div([h.Hidden(true)], []);
  }

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(alertDialogPortalClasses, classes)),
    ],
    children
  );
};

export const backdropView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("div", alertDialogBackdropClasses, config);

export const viewportView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("div", alertDialogViewportClasses, config);

export const popupView = <ParentMessage>({
  titleId,
  descriptionId,
  children,
  classes,
  style,
}: PopupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "alertdialog"),
      h.Attribute("aria-modal", "true"),
      h.Attribute("aria-labelledby", titleId),
      h.Attribute("aria-describedby", descriptionId),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(alertDialogPopupClasses, classes)),
    ],
    children
  );
};

export const titleView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("h2", alertDialogTitleClasses, config);

export const descriptionView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("p", alertDialogDescriptionClasses, config);

export const actionsView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("div", alertDialogActionsClasses, config);

export const closeView = <ParentMessage>({
  onClick,
  children,
  variant = "Cancel",
  classes,
  style,
}: CloseViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const baseClasses =
    variant === "Confirm"
      ? alertDialogConfirmClasses
      : alertDialogCancelClasses;

  return h.button(
    [
      h.Type("button"),
      h.OnClick(onClick),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(baseClasses, classes)),
    ],
    children
  );
};
