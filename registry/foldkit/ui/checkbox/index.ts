import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model } = Ui.Checkbox;
export type Model = Ui.Checkbox.Model;

export const { SetChecked } = Ui.Checkbox;
export const { Message } = Ui.Checkbox;
export type Toggled = Ui.Checkbox.Toggled;
export type SetChecked = Ui.Checkbox.SetChecked;
export type Message = Ui.Checkbox.Message;

export const { ToggledChecked } = Ui.Checkbox;
export const { OutMessage } = Ui.Checkbox;
export type ToggledChecked = Ui.Checkbox.ToggledChecked;
export type OutMessage = Ui.Checkbox.OutMessage;

export type InitConfig = Ui.Checkbox.InitConfig;
export type Commands = readonly Command.Command<Message>[];
export type InitReturn = readonly [Model, Commands];
export type UpdateReturn = ReturnType<typeof Ui.Checkbox.update>;

export type CheckboxAttributes = Ui.Checkbox.CheckboxAttributes;
export type ViewInputs = Ui.Checkbox.ViewInputs;

export const init = (config: InitConfig): InitReturn => [
  Ui.Checkbox.init(config),
  [],
];

export const { update } = Ui.Checkbox;
export const { setChecked } = Ui.Checkbox;
export const { reflectChecked } = Ui.Checkbox;
export const { view } = Ui.Checkbox;

export {
  checkboxControlClassName,
  checkboxDescriptionClassName,
  checkboxLabelClassName,
  checkboxRowClassName,
  checkboxTextClassName,
} from "./view";
