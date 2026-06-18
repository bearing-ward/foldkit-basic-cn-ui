import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AlertDialog from "../../../foldkit/ui/alert-dialog";
import {
  shadcnAlertDialogContentSmClassName,
  shadcnAlertDialogFooterClassName,
  shadcnAlertDialogHeaderClassName,
  shadcnAlertDialogMediaClassName,
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
  shadcnAlertDialogActionsClassName,
  shadcnAlertDialogBackdropClassName,
  shadcnAlertDialogCancelClassName,
  shadcnAlertDialogConfirmClassName,
  shadcnAlertDialogContentSmClassName,
  shadcnAlertDialogDescriptionClassName,
  shadcnAlertDialogFooterClassName,
  shadcnAlertDialogHeaderClassName,
  shadcnAlertDialogMediaClassName,
  shadcnAlertDialogPopupClassName,
  shadcnAlertDialogPortalClassName,
  shadcnAlertDialogRootClassName,
  shadcnAlertDialogTitleClassName,
  shadcnAlertDialogTriggerClassName,
  shadcnAlertDialogViewportClassName,
} from "./view";

export type AlertDialogContentSize = "default" | "sm";

export type ContentViewConfig = Readonly<{
  titleId: string;
  descriptionId: string;
  children: readonly Html[];
  size?: AlertDialogContentSize | undefined;
  className?: string | undefined;
  style?: AlertDialog.AlertDialogStyle | undefined;
}>;

const classNames = (...values: readonly (string | undefined)[]): string =>
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
    className: classNames(
      size === "sm" ? shadcnAlertDialogContentSmClassName : undefined,
      className
    ),
    style,
  });

const divPartView = <ParentMessage>(
  baseClassName: string,
  { id, children, className, style }: AlertDialog.PartViewConfig
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(baseClassName, className)),
    ],
    children
  );
};

export const headerView = <ParentMessage>(
  config: AlertDialog.PartViewConfig
): Html => divPartView<ParentMessage>(shadcnAlertDialogHeaderClassName, config);

export const footerView = <ParentMessage>(
  config: AlertDialog.PartViewConfig
): Html => divPartView<ParentMessage>(shadcnAlertDialogFooterClassName, config);

export const mediaView = <ParentMessage>(
  config: AlertDialog.PartViewConfig
): Html => divPartView<ParentMessage>(shadcnAlertDialogMediaClassName, config);
