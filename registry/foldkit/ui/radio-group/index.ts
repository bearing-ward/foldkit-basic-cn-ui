import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model } = Ui.RadioGroup;
export type Model = Ui.RadioGroup.Model;

export type Orientation = Ui.RadioGroup.Orientation;

export const { SelectedOption } = Ui.RadioGroup;
export const { CompletedFocusOption } = Ui.RadioGroup;
export const { Message } = Ui.RadioGroup;
export type SelectedOption = Ui.RadioGroup.SelectedOption;
export type CompletedFocusOption = Ui.RadioGroup.CompletedFocusOption;
export type Message = Ui.RadioGroup.Message;

export const { Selected } = Ui.RadioGroup;
export const { OutMessage } = Ui.RadioGroup;
export type Selected<Value extends string = string> =
  Ui.RadioGroup.Selected<Value>;
export type OutMessage<Value extends string = string> =
  Ui.RadioGroup.OutMessage<Value>;

export type InitConfig = Ui.RadioGroup.InitConfig;
export type Commands = readonly Command.Command<Message>[];
export type InitReturn = readonly [Model, Commands];

export type OptionInfo<Value extends string = string> =
  Ui.RadioGroup.OptionInfo<Value>;
export type RenderInfo<Value extends string = string> =
  Ui.RadioGroup.RenderInfo<Value>;
export type ViewInputs<Value extends string = string> =
  Ui.RadioGroup.ViewInputs<Value>;

export const init = (config: InitConfig): InitReturn => [
  Ui.RadioGroup.init(config),
  [],
];

export const { FocusOption } = Ui.RadioGroup;
export const { create } = Ui.RadioGroup;

export {
  checkIcon,
  checkPlaceholder,
  descriptionClasses,
  horizontalGroupClasses,
  horizontalOptionClasses,
  labelClasses,
  metaClasses,
  verticalGroupClasses,
  verticalOptionClasses,
} from "./view";
