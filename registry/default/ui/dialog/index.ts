import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model } = Ui.Dialog;
export type Model = Ui.Dialog.Model;

export const { RequestedOpen } = Ui.Dialog;
export const { RequestedClose } = Ui.Dialog;
export const { CompletedShowDialog } = Ui.Dialog;
export const { CompletedCloseDialog } = Ui.Dialog;
export const { GotAnimationMessage } = Ui.Dialog;
export const { Message } = Ui.Dialog;
export type RequestedOpen = Ui.Dialog.RequestedOpen;
export type RequestedClose = Ui.Dialog.RequestedClose;
export type CompletedShowDialog = Ui.Dialog.CompletedShowDialog;
export type CompletedCloseDialog = Ui.Dialog.CompletedCloseDialog;
export type Message = Ui.Dialog.Message;

export const { Opened } = Ui.Dialog;
export const { Closed } = Ui.Dialog;
export const { OutMessage } = Ui.Dialog;
export type Opened = Ui.Dialog.Opened;
export type Closed = Ui.Dialog.Closed;
export type OutMessage = Ui.Dialog.OutMessage;

export type InitConfig = Ui.Dialog.InitConfig;
export type Commands = readonly Command.Command<Message>[];
export type InitReturn = readonly [Model, Commands];
export type UpdateReturn = ReturnType<typeof Ui.Dialog.update>;

export const { ShowDialog } = Ui.Dialog;
export const { CloseDialog } = Ui.Dialog;

export const init = (config: InitConfig): InitReturn => [
  Ui.Dialog.init(config),
  [],
];

export const { update } = Ui.Dialog;
export const { open } = Ui.Dialog;
export const { close } = Ui.Dialog;
export const { titleId } = Ui.Dialog;
export const { descriptionId } = Ui.Dialog;

export {
  backdrop,
  cancelButton,
  closeButton,
  confirmButton,
  description,
  footer,
  panel,
  root,
  title,
  trigger,
  view,
} from "./view";
export type {
  ActionInputs,
  ContainerInputs,
  DialogAttribute,
  DialogChild,
  DialogVariant,
  PanelInputs,
  RenderInfo,
  RootInputs,
  TextInputs,
  TriggerInputs,
  ViewInputs,
} from "./view";
