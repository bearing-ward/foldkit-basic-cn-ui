import type { Option } from "effect";
import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model } = Ui.Tabs;
export type Model = Ui.Tabs.Model;

export const {
  CompletedFocusTab,
  FocusTab,
  FocusedTab,
  Message,
  OutMessage,
  Selected,
  SelectedTab,
  create,
  init,
} = Ui.Tabs;
export type ActivationMode = Ui.Tabs.ActivationMode;
export type FocusedTab = Ui.Tabs.FocusedTab;
export type InitConfig = Ui.Tabs.InitConfig;
export type Message = Ui.Tabs.Message;
export type Orientation = Ui.Tabs.Orientation;
export type OutMessage<Value extends string = string> =
  Ui.Tabs.OutMessage<Value>;
export type RenderInfo<Value extends string = string> =
  Ui.Tabs.RenderInfo<Value>;
export type Selected<Value extends string = string> = Ui.Tabs.Selected<Value>;
export type SelectedTab = Ui.Tabs.SelectedTab;
export type TabInfo<Value extends string = string> = Ui.Tabs.TabInfo<Value>;
export type ViewInputs<Value extends string = string> =
  Ui.Tabs.ViewInputs<Value>;
export type InitReturn = readonly [Model, readonly Command.Command<Message>[]];
export type UpdateReturn<Value extends string = string> = readonly [
  Model,
  readonly Command.Command<Message>[],
  Option.Option<OutMessage<Value>>,
];

export const initialize = (config: InitConfig): InitReturn => [
  init(config),
  [],
];

export {
  panelClassName,
  tabClassName,
  tabListClassName,
  tabsRootClassName,
  tabsView,
} from "./view";
export type { TabsViewInput } from "./view";
