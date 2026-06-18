import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model } = Ui.Switch;
export type Model = Ui.Switch.Model;

export const { SetChecked } = Ui.Switch;
export const { Message } = Ui.Switch;
export type Toggled = Ui.Switch.Toggled;
export type SetChecked = Ui.Switch.SetChecked;
export type Message = Ui.Switch.Message;

export const { ToggledChecked } = Ui.Switch;
export const { OutMessage } = Ui.Switch;
export type ToggledChecked = Ui.Switch.ToggledChecked;
export type OutMessage = Ui.Switch.OutMessage;

export type InitConfig = Ui.Switch.InitConfig;
export type Commands = readonly Command.Command<Message>[];
export type InitReturn = readonly [Model, Commands];
export type UpdateReturn = ReturnType<typeof Ui.Switch.update>;

export type SwitchAttributes = Ui.Switch.SwitchAttributes;
export type ViewInputs = Ui.Switch.ViewInputs;

export const init = (config: InitConfig): InitReturn => [
  Ui.Switch.init(config),
  [],
];

export const { update } = Ui.Switch;
export const { setChecked } = Ui.Switch;
export const { reflectChecked } = Ui.Switch;
export const { view } = Ui.Switch;

export {
  switchButtonClassName,
  switchDescriptionClassName,
  switchKnob,
  switchLabelClassName,
  switchRowClassName,
  switchTextClassName,
} from "./view";
