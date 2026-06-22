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
  actionsView,
  backdropView,
  closeView,
  descriptionView,
  popupView,
  portalView,
  rootView,
  titleView,
  triggerView,
  viewportView,
} from "../../../foldkit/ui/alert-dialog";
export type {
  AlertDialogStyle,
  CloseViewConfig,
  PartViewConfig,
  PortalViewConfig,
  RootViewConfig,
  TriggerViewConfig,
} from "../../../foldkit/ui/alert-dialog";

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

export type AlertDialogContentSize = "default" | "sm";

export type ContentViewConfig = Readonly<{
  titleId: string;
  descriptionId: string;
  children: readonly Html[];
  size?: AlertDialogContentSize | undefined;
  classes?: string | undefined;
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
  classes,
  style,
}: ContentViewConfig): Html =>
  AlertDialog.popupView<ParentMessage>({
    titleId,
    descriptionId,
    children,
    classes: cn(
      size === "sm" ? shadcnAlertDialogContentSmClasses : undefined,
      classes
    ),
    style,
  });

const divPartView = <ParentMessage>(
  baseClasses: string,
  { id, children, classes, style }: AlertDialog.PartViewConfig
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(baseClasses, classes)),
    ],
    children
  );
};

export const headerView = <ParentMessage>(
  config: AlertDialog.PartViewConfig
): Html => divPartView<ParentMessage>(shadcnAlertDialogHeaderClasses, config);

export const footerView = <ParentMessage>(
  config: AlertDialog.PartViewConfig
): Html => divPartView<ParentMessage>(shadcnAlertDialogFooterClasses, config);

export const mediaView = <ParentMessage>(
  config: AlertDialog.PartViewConfig
): Html => divPartView<ParentMessage>(shadcnAlertDialogMediaClasses, config);
