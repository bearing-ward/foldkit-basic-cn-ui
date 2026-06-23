import type { Command } from "foldkit";
import * as Ui from "@foldkit/ui";

export const { Model } = Ui.Popover;
export type Model = Ui.Popover.Model;

export const { RequestedOpen } = Ui.Popover;
export const { RequestedClose } = Ui.Popover;
export const { CompletedFocusPanel } = Ui.Popover;
export const { CompletedFocusButton } = Ui.Popover;
export const { CompletedLockScroll } = Ui.Popover;
export const { CompletedUnlockScroll } = Ui.Popover;
export const { CompletedInertOthers } = Ui.Popover;
export const { CompletedRestoreInert } = Ui.Popover;
export const { CompletedAnchorPopover } = Ui.Popover;
export const { CompletedPortalPopoverBackdrop } = Ui.Popover;
export const { GotAnimationMessage } = Ui.Popover;
export const { Message } = Ui.Popover;
export type RequestedOpen = Ui.Popover.RequestedOpen;
export type RequestedClose = Ui.Popover.RequestedClose;
export type BlurredPanel = Ui.Popover.BlurredPanel;
export type PressedPointerOnButton = Ui.Popover.PressedPointerOnButton;
export type IgnoredMouseClick = Ui.Popover.IgnoredMouseClick;
export type SuppressedSpaceScroll = Ui.Popover.SuppressedSpaceScroll;
export type Message = Ui.Popover.Message;

export const { Opened } = Ui.Popover;
export const { Closed } = Ui.Popover;
export const { OutMessage } = Ui.Popover;
export type Opened = Ui.Popover.Opened;
export type Closed = Ui.Popover.Closed;
export type OutMessage = Ui.Popover.OutMessage;

export type InitConfig = Ui.Popover.InitConfig;
export type Commands = readonly Command.Command<Message>[];
export type InitReturn = readonly [Model, Commands];
export type UpdateReturn = ReturnType<typeof Ui.Popover.update>;

export const { LockScroll } = Ui.Popover;
export const { UnlockScroll } = Ui.Popover;
export const { InertOthers } = Ui.Popover;
export const { RestoreInert } = Ui.Popover;
export const { FocusPanel } = Ui.Popover;
export const { FocusButton } = Ui.Popover;
export const { DetectMovementOrAnimationEnd } = Ui.Popover;
export const { AnchorPopover } = Ui.Popover;
export const { PortalPopoverBackdrop } = Ui.Popover;

export const init = (config: InitConfig): InitReturn => [
  Ui.Popover.init(config),
  [],
];

export const { update } = Ui.Popover;
export const { open } = Ui.Popover;
export const { close } = Ui.Popover;

export { backdrop, panel, root, trigger, view } from "./view";
export type {
  BackdropInputs,
  PanelInputs,
  PopoverChild,
  RenderInfo,
  RootInputs,
  TriggerInputs,
  ViewInputs,
} from "./view";
