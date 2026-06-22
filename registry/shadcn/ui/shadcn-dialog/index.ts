import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  shadcnDialogFooterClasses,
  shadcnDialogHeaderClasses,
} from "./view";

export {
  backdrop,
  cancelButton,
  close,
  closeButton,
  CloseDialog,
  Closed,
  CompletedCloseDialog,
  CompletedShowDialog,
  confirmButton,
  description,
  descriptionId,
  footer,
  GotAnimationMessage,
  init,
  Message,
  Model,
  open,
  Opened,
  OutMessage,
  panel,
  RequestedClose,
  RequestedOpen,
  root,
  ShowDialog,
  title,
  titleId,
  trigger,
  update,
  view,
} from "../../../foldkit/ui/dialog";
export type {
  ActionInputs,
  Commands,
  ContainerInputs,
  DialogAttribute,
  DialogChild,
  DialogVariant,
  InitConfig,
  InitReturn,
  PanelInputs,
  RenderInfo,
  RootInputs,
  TextInputs,
  TriggerInputs,
  UpdateReturn,
  ViewInputs,
} from "../../../foldkit/ui/dialog";

export {
  shadcnDialogBackdropClasses,
  shadcnDialogDescriptionClasses,
  shadcnDialogFooterClasses,
  shadcnDialogHeaderClasses,
  shadcnDialogPanelClasses,
  shadcnDialogTitleClasses,
} from "./view";

export type PartViewConfig = Readonly<{
  id?: string | undefined;
  children: readonly Html[];
  className?: string | undefined;
  style?: Readonly<Record<string, string>> | undefined;
}>;

const cn = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

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

export const headerView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(shadcnDialogHeaderClasses, config);

export const footerView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(shadcnDialogFooterClasses, config);
