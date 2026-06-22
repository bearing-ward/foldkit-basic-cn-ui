import type { Option } from "effect";
import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model, TransitionState } = Ui.Animation;
export type Model = Ui.Animation.Model;
export type TransitionState = typeof TransitionState.Type;

export const {
  AdvancedAnimationFrame,
  EndedAnimation,
  Hid,
  Message,
  OutMessage,
  RequestFrame,
  Showed,
  StartedLeaveAnimating,
  TransitionedOut,
  WaitForAnimationSettled,
  defaultLeaveCommand,
  update,
  view,
} = Ui.Animation;

export type Hid = Ui.Animation.Hid;
export type InitConfig = Ui.Animation.InitConfig;
export type Message = Ui.Animation.Message;
export type OutMessage = typeof OutMessage.Type;
export type Showed = Ui.Animation.Showed;
export type ViewInputs = Ui.Animation.ViewInputs;
export type InitReturn = readonly [Model, readonly Command.Command<Message>[]];
export type UpdateReturn = readonly [
  Model,
  readonly Command.Command<Message>[],
  Option.Option<OutMessage>,
];

export const init = (config: InitConfig): InitReturn => [
  Ui.Animation.init(config),
  [],
];

export {
  animationContentClasses,
  animationPanel,
  animationTriggerClasses,
} from "./view";
export type { AnimationPanelInput } from "./view";
