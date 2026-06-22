import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model } = Ui.Menu;
export type Model = Ui.Menu.Model;

export type ActivationTrigger = Ui.Menu.ActivationTrigger;

export const { CompletedLockScroll } = Ui.Menu;
export const { CompletedUnlockScroll } = Ui.Menu;
export const { CompletedInertOthers } = Ui.Menu;
export const { CompletedRestoreInert } = Ui.Menu;
export const { CompletedFocusItems } = Ui.Menu;
export const { CompletedFocusButton } = Ui.Menu;
export const { CompletedScrollIntoView } = Ui.Menu;
export const { CompletedClickItem } = Ui.Menu;
export const { CompletedAnchorMenu } = Ui.Menu;
export const { CompletedPortalMenuBackdrop } = Ui.Menu;
export const { ClearedSearch } = Ui.Menu;
export const { GotAnimationMessage } = Ui.Menu;
export const { Message } = Ui.Menu;
export type Opened = Ui.Menu.Opened;
export type Closed = Ui.Menu.Closed;
export type BlurredItems = Ui.Menu.BlurredItems;
export type ActivatedItem = Ui.Menu.ActivatedItem;
export type DeactivatedItem = Ui.Menu.DeactivatedItem;
export type SelectedItem = Ui.Menu.SelectedItem;
export type MovedPointerOverItem = Ui.Menu.MovedPointerOverItem;
export type RequestedItemClick = Ui.Menu.RequestedItemClick;
export type Searched = Ui.Menu.Searched;
export type ClearedSearch = Ui.Menu.ClearedSearch;
export type IgnoredMouseClick = Ui.Menu.IgnoredMouseClick;
export type SuppressedSpaceScroll = Ui.Menu.SuppressedSpaceScroll;
export type PressedPointerOnButton = Ui.Menu.PressedPointerOnButton;
export type ReleasedPointerOnItems = Ui.Menu.ReleasedPointerOnItems;
export type Message = Ui.Menu.Message;

export const { Selected } = Ui.Menu;
export const { OutMessage } = Ui.Menu;
export type Selected<Value extends string = string> = Ui.Menu.Selected<Value>;
export type OutMessage<Value extends string = string> =
  Ui.Menu.OutMessage<Value>;

export type InitConfig = Ui.Menu.InitConfig;
export type Commands = readonly Command.Command<Message>[];
export type InitReturn = readonly [Model, Commands];
export type UpdateReturn<Item extends string = string> = ReturnType<
  ReturnType<typeof Ui.Menu.create<Item>>["update"]
>;

export const { LockScroll } = Ui.Menu;
export const { UnlockScroll } = Ui.Menu;
export const { InertOthers } = Ui.Menu;
export const { RestoreInert } = Ui.Menu;
export const { FocusItems } = Ui.Menu;
export const { FocusButton } = Ui.Menu;
export const { ScrollIntoView } = Ui.Menu;
export const { ClickItem } = Ui.Menu;
export const { DelayClearSearch } = Ui.Menu;
export const { DetectMovementOrAnimationEnd } = Ui.Menu;
export const { AnchorMenu } = Ui.Menu;
export const { PortalMenuBackdrop } = Ui.Menu;

export type ItemConfig = Ui.Menu.ItemConfig;
export type GroupHeading = Ui.Menu.GroupHeading;
export type ViewInputs<Item extends string> = Ui.Menu.ViewInputs<Item>;
export type AnchorConfig = Ui.Menu.AnchorConfig;

export const init = (config: InitConfig): InitReturn => [
  Ui.Menu.init(config),
  [],
];

export const { create } = Ui.Menu;

export {
  animatedItemsClasses,
  backdropClasses,
  defaultAnchor,
  defaultItemsClasses,
  itemClasses,
  rootClasses,
  triggerClasses,
} from "./view";
