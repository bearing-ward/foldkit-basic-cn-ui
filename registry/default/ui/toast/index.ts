import { Schema as S } from "effect";
import { Ui } from "foldkit";

export const ToastPayload = S.Struct({
  title: S.String,
  maybeDescription: S.Option(S.String),
});
export type ToastPayload = typeof ToastPayload.Type;

export const Toast = Ui.Toast.make(ToastPayload);

export const {
  Added,
  DismissedToast,
  Entry,
  Message,
  Model,
  dismiss,
  dismissAll,
  init,
  show,
  update,
  view,
} = Toast;
export type Entry = typeof Entry.Type;
export type Message = typeof Message.Type;
export type Model = typeof Model.Type;
export type OutMessage = typeof Toast.OutMessage.Type;
export type InitConfig = Ui.Toast.InitConfig;
export type ShowInput = Ui.Toast.ShowInput<ToastPayload>;
export type UpdateReturn = ReturnType<typeof update>;

export const {
  DismissAfter,
  Dismissed,
  DismissedAll,
  ElapsedDuration,
  GotAnimationMessage,
  HoveredEntry,
  LeftEntry,
  Position,
  Variant,
} = Ui.Toast;
export type EntryHandlers = Ui.Toast.EntryHandlers;
export type Position = Ui.Toast.Position;
export type Variant = Ui.Toast.Variant;

export {
  closeButtonClassName,
  containerClassName,
  descriptionClassName,
  entryClassName,
  titleClassName,
  toastClassName,
  toastEntryView,
} from "./view";
