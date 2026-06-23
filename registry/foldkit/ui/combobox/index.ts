import type { Command } from "foldkit";
import * as Ui from "@foldkit/ui";

export const { Model } = Ui.Combobox;
export type Model = Ui.Combobox.Model;

export type ActivationTrigger = Ui.Combobox.ActivationTrigger;

export const { CompletedLockScroll } = Ui.Combobox;
export const { CompletedUnlockScroll } = Ui.Combobox;
export const { CompletedInertOthers } = Ui.Combobox;
export const { CompletedRestoreInert } = Ui.Combobox;
export const { CompletedFocusInput } = Ui.Combobox;
export const { CompletedScrollIntoView } = Ui.Combobox;
export const { CompletedClickItem } = Ui.Combobox;
export const { CompletedAnchorCombobox } = Ui.Combobox;
export const { CompletedAttachComboboxPreventBlur } = Ui.Combobox;
export const { CompletedAttachComboboxSelectOnFocus } = Ui.Combobox;
export const { CompletedPortalComboboxBackdrop } = Ui.Combobox;
export const { GotAnimationMessage } = Ui.Combobox;
export const { Message } = Ui.Combobox;
export type Opened = Ui.Combobox.Opened;
export type Closed = Ui.Combobox.Closed;
export type BlurredInput = Ui.Combobox.BlurredInput;
export type ActivatedItem = Ui.Combobox.ActivatedItem;
export type DeactivatedItem = Ui.Combobox.DeactivatedItem;
export type SelectedItem = Ui.Combobox.SelectedItem;
export type MovedPointerOverItem = Ui.Combobox.MovedPointerOverItem;
export type RequestedItemClick = Ui.Combobox.RequestedItemClick;
export type UpdatedInputValue = Ui.Combobox.UpdatedInputValue;
export type PressedToggleButton = Ui.Combobox.PressedToggleButton;
export type Message = Ui.Combobox.Message;

export const { Selected } = Ui.Combobox;
export const { OutMessage } = Ui.Combobox;
export type Selected<Value extends string = string> =
  Ui.Combobox.Selected<Value>;
export type OutMessage<Value extends string = string> =
  Ui.Combobox.OutMessage<Value>;

export type InitConfig = Ui.Combobox.InitConfig;
export type Commands = readonly Command.Command<Message>[];
export type InitReturn = readonly [Model, Commands];
export type UpdateReturn<Item extends string = string> = ReturnType<
  ReturnType<typeof Ui.Combobox.create<Item>>["update"]
>;

export const { LockScroll } = Ui.Combobox;
export const { UnlockScroll } = Ui.Combobox;
export const { InertOthers } = Ui.Combobox;
export const { RestoreInert } = Ui.Combobox;
export const { FocusInput } = Ui.Combobox;
export const { ScrollIntoView } = Ui.Combobox;
export const { ClickItem } = Ui.Combobox;
export const { DetectMovementOrAnimationEnd } = Ui.Combobox;
export const { AnchorCombobox } = Ui.Combobox;
export const { AttachComboboxPreventBlur } = Ui.Combobox;
export const { AttachComboboxSelectOnFocus } = Ui.Combobox;
export const { PortalComboboxBackdrop } = Ui.Combobox;

export type ItemConfig = Ui.Combobox.ItemConfig;
export type GroupHeading = Ui.Combobox.GroupHeading;
export type ViewInputs<Item extends string = string> =
  Ui.Combobox.ViewInputs<Item>;
export type AnchorConfig = Ui.Combobox.AnchorConfig;

export const init = (config: InitConfig): InitReturn => [
  Ui.Combobox.init(config),
  [],
];

export const { create } = Ui.Combobox;
export const { Multi } = Ui.Combobox;

export {
  backdropClasses,
  buttonClasses,
  defaultAnchor,
  emptyTagClasses,
  inputClasses,
  inputWrapperClasses,
  itemClasses,
  itemsClasses,
  selectedIcon,
  selectedIconClasses,
  tagClasses,
  wrapperClasses,
} from "./view";
