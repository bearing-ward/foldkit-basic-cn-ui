import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model } = Ui.Disclosure;
export type Model = Ui.Disclosure.Model;

export const { Closed, CompletedFocusButton, Message } = Ui.Disclosure;
export type Closed = Ui.Disclosure.Closed;
export type CompletedFocusButton = Ui.Disclosure.CompletedFocusButton;
export type Toggled = Ui.Disclosure.Toggled;
export type Message = Ui.Disclosure.Message;

export const { OutMessage, ToggledOpenState } = Ui.Disclosure;
export type OutMessage = Ui.Disclosure.OutMessage;
export type ToggledOpenState = Ui.Disclosure.ToggledOpenState;

export type InitConfig = Ui.Disclosure.InitConfig;
export type ViewInputs = Ui.Disclosure.ViewInputs;
export type DisclosureAttributes = Ui.Disclosure.DisclosureAttributes;
export type InitReturn = readonly [Model, readonly Command.Command<Message>[]];
export type UpdateReturn = ReturnType<typeof Ui.Disclosure.update>;

export const { FocusButton } = Ui.Disclosure;

export const init = (config: InitConfig): InitReturn => [
  Ui.Disclosure.init(config),
  [],
];

export const { close, reflectOpenState, toggle, update, view } = Ui.Disclosure;

export {
  buttonClasses,
  buttonContentClasses,
  chevronClasses,
  disclosureView,
  panelClasses,
  rootClasses,
} from "./view";
export type { DisclosureViewInput } from "./view";
