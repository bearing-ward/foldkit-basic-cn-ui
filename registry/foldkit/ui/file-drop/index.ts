import { Ui } from "foldkit";

export const { Model } = Ui.FileDrop;
export type Model = Ui.FileDrop.Model;

export const {
  DroppedFiles,
  DroppedNonFiles,
  EnteredDragZone,
  LeftDragZone,
  Message,
} = Ui.FileDrop;
export type Message = Ui.FileDrop.Message;

export const { OutMessage, ReceivedFiles, RejectedNonFiles } = Ui.FileDrop;
export type OutMessage = Ui.FileDrop.OutMessage;

export const { init, update, view } = Ui.FileDrop;

export type InitConfig = Ui.FileDrop.InitConfig;
export type ViewInputs = Ui.FileDrop.ViewInputs;
export type FileDropAttributes = Ui.FileDrop.FileDropAttributes;

export {
  dropZoneClassName,
  fileInputClassName,
  fileListClassName,
  fileNameClassName,
  fileRowClassName,
  fileSizeClassName,
  formatFileSize,
  primaryTextClassName,
  secondaryTextClassName,
} from "./view";
