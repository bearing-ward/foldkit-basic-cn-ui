import type { Option } from "effect";
import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model } = Ui.Tooltip;
export type Model = Ui.Tooltip.Model;

export const {
  AnchorTooltip,
  BlurredTrigger,
  CompletedAnchorTooltip,
  ElapsedShowDelay,
  EnteredTrigger,
  FocusedTrigger,
  Hidden,
  LeftTrigger,
  Message,
  OutMessage,
  PressedEscape,
  PressedPointerOnTrigger,
  ShowAfterDelay,
  Shown,
  reflectShowDelay,
  update,
  view,
} = Ui.Tooltip;

export type BlurredTrigger = Ui.Tooltip.BlurredTrigger;
export type EnteredTrigger = Ui.Tooltip.EnteredTrigger;
export type FocusedTrigger = Ui.Tooltip.FocusedTrigger;
export type Hidden = Ui.Tooltip.Hidden;
export type InitConfig = Ui.Tooltip.InitConfig;
export type LeftTrigger = Ui.Tooltip.LeftTrigger;
export type Message = Ui.Tooltip.Message;
export type OutMessage = Ui.Tooltip.OutMessage;
export type PressedEscape = Ui.Tooltip.PressedEscape;
export type PressedPointerOnTrigger = Ui.Tooltip.PressedPointerOnTrigger;
export type RenderInfo = Ui.Tooltip.RenderInfo;
export type Shown = Ui.Tooltip.Shown;
export type ViewInputs = Ui.Tooltip.ViewInputs;
export type InitReturn = readonly [Model, readonly Command.Command<Message>[]];
export type UpdateReturn = readonly [
  Model,
  readonly Command.Command<Message>[],
  Option.Option<OutMessage>,
];

export const init = (config: InitConfig): InitReturn => [
  Ui.Tooltip.init(config),
  [],
];

export {
  panelClasses,
  tooltipAnchor,
  tooltipRootClasses,
  tooltipTriggerClasses,
  tooltipView,
} from "./view";
export type { TooltipViewInput } from "./view";
