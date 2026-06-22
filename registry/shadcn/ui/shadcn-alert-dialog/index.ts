import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AlertDialog from "../../../foldkit/ui/alert-dialog";
import {
  shadcnAlertDialogContentSmClasses,
  shadcnAlertDialogFooterClasses,
  shadcnAlertDialogHeaderClasses,
  shadcnAlertDialogMediaClasses,
} from "./view";

export {
  shadcnAlertDialogActionsClasses,
  shadcnAlertDialogBackdropClasses,
  shadcnAlertDialogCancelClasses,
  shadcnAlertDialogConfirmClasses,
  shadcnAlertDialogContentSmClasses,
  shadcnAlertDialogDescriptionClasses,
  shadcnAlertDialogFooterClasses,
  shadcnAlertDialogHeaderClasses,
  shadcnAlertDialogMediaClasses,
  shadcnAlertDialogPopupClasses,
  shadcnAlertDialogPortalClasses,
  shadcnAlertDialogRootClasses,
  shadcnAlertDialogTitleClasses,
  shadcnAlertDialogTriggerClasses,
  shadcnAlertDialogViewportClasses,
} from "./view";

type WithClassName<Config> = Omit<Config, "classes"> &
  Readonly<{ className?: string | undefined }>;

export type AlertDialogStyle = AlertDialog.AlertDialogStyle;
export type RootViewConfig = WithClassName<AlertDialog.RootViewConfig>;
export type TriggerViewConfig<ParentMessage> = WithClassName<
  AlertDialog.TriggerViewConfig<ParentMessage>
>;
export type PortalViewConfig = WithClassName<AlertDialog.PortalViewConfig>;
export type PartViewConfig = WithClassName<AlertDialog.PartViewConfig>;
export type CloseViewConfig<ParentMessage> = WithClassName<
  AlertDialog.CloseViewConfig<ParentMessage>
>;
export type AlertDialogContentSize = "default" | "sm";

export type ContentViewConfig = Readonly<{
  titleId: string;
  descriptionId: string;
  children: readonly Html[];
  size?: AlertDialogContentSize | undefined;
  className?: string | undefined;
  style?: AlertDialog.AlertDialogStyle | undefined;
}>;

const cn = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const contentView = <ParentMessage>({
  titleId,
  descriptionId,
  children,
  size = "default",
  className,
  style,
}: ContentViewConfig): Html =>
  AlertDialog.popupView<ParentMessage>({
    titleId,
    descriptionId,
    children,
    // NOTE: The public wrapper API is className; Foldkit AlertDialog still accepts classes.
    classes: cn(
      size === "sm" ? shadcnAlertDialogContentSmClasses : undefined,
      className
    ),
    style,
  });

const divPartView = <ParentMessage>(
  baseClasses: string,
  { id, children, className, style }: PartViewConfig
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(baseClasses, className)),
    ],
    children
  );
};

export const rootView = <ParentMessage>({
  className,
  ...config
}: RootViewConfig): Html =>
  AlertDialog.rootView<ParentMessage>({ ...config, classes: className });

export const triggerView = <ParentMessage>({
  className,
  ...config
}: TriggerViewConfig<ParentMessage>): Html =>
  AlertDialog.triggerView<ParentMessage>({ ...config, classes: className });

export const portalView = <ParentMessage>({
  className,
  ...config
}: PortalViewConfig): Html =>
  AlertDialog.portalView<ParentMessage>({ ...config, classes: className });

export const backdropView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  AlertDialog.backdropView<ParentMessage>({ ...config, classes: className });

export const viewportView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  AlertDialog.viewportView<ParentMessage>({ ...config, classes: className });

export const popupView = <ParentMessage>({
  className,
  ...config
}: WithClassName<AlertDialog.PopupViewConfig>): Html =>
  AlertDialog.popupView<ParentMessage>({ ...config, classes: className });

export const titleView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  AlertDialog.titleView<ParentMessage>({ ...config, classes: className });

export const descriptionView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  AlertDialog.descriptionView<ParentMessage>({
    ...config,
    classes: className,
  });

export const actionsView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  AlertDialog.actionsView<ParentMessage>({ ...config, classes: className });

export const closeView = <ParentMessage>({
  className,
  ...config
}: CloseViewConfig<ParentMessage>): Html =>
  AlertDialog.closeView<ParentMessage>({ ...config, classes: className });

export const headerView = <ParentMessage>(
  config: PartViewConfig
): Html => divPartView<ParentMessage>(shadcnAlertDialogHeaderClasses, config);

export const footerView = <ParentMessage>(
  config: PartViewConfig
): Html => divPartView<ParentMessage>(shadcnAlertDialogFooterClasses, config);

export const mediaView = <ParentMessage>(
  config: PartViewConfig
): Html => divPartView<ParentMessage>(shadcnAlertDialogMediaClasses, config);
