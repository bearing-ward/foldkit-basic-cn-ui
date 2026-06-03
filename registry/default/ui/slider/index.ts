import type { Option } from "effect";
import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model } = Ui.Slider;
export type Model = Ui.Slider.Model;

export const { Message, OutMessage } = Ui.Slider;
export type Message = Ui.Slider.Message;
export type OutMessage = Ui.Slider.OutMessage;
export type CancelledDrag = Ui.Slider.CancelledDrag;
export type MovedDragPointer = Ui.Slider.MovedDragPointer;
export type PressedKeyboardNavigation = Ui.Slider.PressedKeyboardNavigation;
export type PressedPointer = Ui.Slider.PressedPointer;
export type PressedThumb = Ui.Slider.PressedThumb;
export type ReleasedDragPointer = Ui.Slider.ReleasedDragPointer;

export type InitConfig = Ui.Slider.InitConfig;
export type SliderAttributes = Ui.Slider.SliderAttributes;
export type ViewInputs = Ui.Slider.ViewInputs;
export type InitReturn = readonly [Model, readonly Command.Command<Message>[]];
export type UpdateReturn = readonly [
  Model,
  readonly Command.Command<Message>[],
  Option.Option<OutMessage>,
];

export const init = (config: InitConfig): InitReturn => [
  Ui.Slider.init(config),
  [],
];

export const {
  fractionOfValue,
  reflectRange,
  reflectValue,
  subscriptions,
  subscriptionsForRoot,
  update,
  view,
} = Ui.Slider;

export {
  filledTrackClassName,
  headerClassName,
  labelClassName,
  rootClassName,
  sliderFieldView,
  thumbClassName,
  trackClassName,
  valueClassName,
} from "./view";
export type { SliderFieldViewInput } from "./view";
