import type { Command } from "foldkit";
import * as Ui from "@foldkit/ui";

export const { Model } = Ui.Listbox;
export type Model = Ui.Listbox.Model;

export type ActivationTrigger = Ui.Listbox.ActivationTrigger;

export const { Orientation } = Ui.Listbox;
export type Orientation = Ui.Listbox.Orientation;

export const { CompletedLockScroll } = Ui.Listbox;
export const { CompletedUnlockScroll } = Ui.Listbox;
export const { CompletedInertOthers } = Ui.Listbox;
export const { CompletedRestoreInert } = Ui.Listbox;
export const { CompletedFocusItems } = Ui.Listbox;
export const { CompletedFocusButton } = Ui.Listbox;
export const { CompletedScrollIntoView } = Ui.Listbox;
export const { CompletedClickItem } = Ui.Listbox;
export const { CompletedAnchorListbox } = Ui.Listbox;
export const { CompletedPortalListboxBackdrop } = Ui.Listbox;
export const { ClearedSearch } = Ui.Listbox;
export const { GotAnimationMessage } = Ui.Listbox;
export const { Message } = Ui.Listbox;
export type Opened = Ui.Listbox.Opened;
export type Closed = Ui.Listbox.Closed;
export type BlurredItems = Ui.Listbox.BlurredItems;
export type ActivatedItem = Ui.Listbox.ActivatedItem;
export type DeactivatedItem = Ui.Listbox.DeactivatedItem;
export type SelectedItem = Ui.Listbox.SelectedItem;
export type MovedPointerOverItem = Ui.Listbox.MovedPointerOverItem;
export type RequestedItemClick = Ui.Listbox.RequestedItemClick;
export type Searched = Ui.Listbox.Searched;
export type ClearedSearch = Ui.Listbox.ClearedSearch;
export type IgnoredMouseClick = Ui.Listbox.IgnoredMouseClick;
export type SuppressedSpaceScroll = Ui.Listbox.SuppressedSpaceScroll;
export type PressedPointerOnButton = Ui.Listbox.PressedPointerOnButton;
export type Message = Ui.Listbox.Message;

export const { Selected } = Ui.Listbox;
export const { OutMessage } = Ui.Listbox;
export type Selected<Value extends string = string> =
  Ui.Listbox.Selected<Value>;
export type OutMessage<Value extends string = string> =
  Ui.Listbox.OutMessage<Value>;

export type InitConfig = Ui.Listbox.InitConfig;
export type Commands = readonly Command.Command<Message>[];
export type InitReturn = readonly [Model, Commands];
export type UpdateReturn<
  Item = string,
  Value extends string = Item extends string ? Item : string,
> = ReturnType<ReturnType<typeof Ui.Listbox.create<Item, Value>>["update"]>;

export const { LockScroll } = Ui.Listbox;
export const { UnlockScroll } = Ui.Listbox;
export const { InertOthers } = Ui.Listbox;
export const { RestoreInert } = Ui.Listbox;
export const { FocusItems } = Ui.Listbox;
export const { FocusButton } = Ui.Listbox;
export const { ScrollIntoView } = Ui.Listbox;
export const { ClickItem } = Ui.Listbox;
export const { DelayClearSearch } = Ui.Listbox;
export const { DetectMovementOrAnimationEnd } = Ui.Listbox;
export const { AnchorListbox } = Ui.Listbox;
export const { PortalListboxBackdrop } = Ui.Listbox;

export type ItemConfig = Ui.Listbox.ItemConfig;
export type GroupHeading = Ui.Listbox.GroupHeading;
export type ViewInputs<
  Item = string,
  Value extends string = Item extends string ? Item : string,
> = Ui.Listbox.ViewInputs<Item, Value>;
export type AnchorConfig = Ui.Listbox.AnchorConfig;

export const init = (config: InitConfig): InitReturn => [
  Ui.Listbox.init(config),
  [],
];

export const { create } = Ui.Listbox;
export const { Multi } = Ui.Listbox;

export {
  animatedItemsClasses,
  backdropClasses,
  defaultAnchor,
  defaultItemsClasses,
  itemClasses,
  rootClasses,
  selectedIconClasses,
  triggerClasses,
} from "./view";
