import type { Option } from "effect";
import type { Command } from "foldkit";
import * as Ui from "@foldkit/ui";

export const {
  CompletedApplyScroll,
  MeasuredContainer,
  Message,
  Model,
  ScrolledContainer,
  init,
  scrollToIndex,
  scrollToIndexVariable,
  subscriptions,
  update,
  view,
  visibleWindow,
  visibleWindowVariable,
} = Ui.VirtualList;

export type CompletedApplyScroll = typeof CompletedApplyScroll.Type;
export type InitConfig = Ui.VirtualList.InitConfig;
export type MeasuredContainer = Ui.VirtualList.MeasuredContainer;
export type Message = Ui.VirtualList.Message;
export type Model = Ui.VirtualList.Model;
export type ScrolledContainer = Ui.VirtualList.ScrolledContainer;
export type ViewInputs<Item> = Ui.VirtualList.ViewInputs<Item>;
export type VisibleWindow = Ui.VirtualList.VisibleWindow;

export type InitReturn = readonly [Model, readonly Command.Command<Message>[]];
export type UpdateReturn = readonly [
  Model,
  readonly Command.Command<Message>[],
];
export type VisibleWindowReturn = Option.Option<VisibleWindow>;

export {
  activityListContainerClasses,
  activityListHeaderClasses,
  activityRow,
  activityRows,
  activitySummaryFor,
  activityVariableRow,
  activityVariableRowHeightPx,
  virtualListActionClasses,
} from "./view";
export type { Activity, ActivitySummary } from "./view";
