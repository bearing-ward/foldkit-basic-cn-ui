import type { Option } from "effect";
import type { Command } from "foldkit";
import { Ui } from "foldkit";

export const { Model } = Ui.DragAndDrop;
export type Model = Ui.DragAndDrop.Model;

export const {
  ActivatedKeyboardDrag,
  AdvancedAutoScrollFrame,
  Cancelled,
  CancelledDrag,
  CompletedFocusItem,
  ConfirmedKeyboardDrop,
  Message,
  MovedPointer,
  OutMessage,
  PressedArrowKey,
  PressedDraggable,
  ReleasedPointer,
  Reordered,
  ResolvedKeyboardMove,
} = Ui.DragAndDrop;
export type Message = Ui.DragAndDrop.Message;
export type OutMessage = Ui.DragAndDrop.OutMessage;

export type InitConfig = Ui.DragAndDrop.InitConfig;
export type DraggableConfig<ParentMessage> =
  Ui.DragAndDrop.DraggableConfig<ParentMessage>;
export type DraggableMessage = Ui.DragAndDrop.DraggableMessage;
export type InitReturn = readonly [Model, readonly Command.Command<Message>[]];
export type UpdateReturn = readonly [
  Model,
  readonly Command.Command<Message>[],
  Option.Option<OutMessage>,
];

export const { FocusItem, ResolveKeyboardMove } = Ui.DragAndDrop;

export const init = (config: InitConfig): InitReturn => [
  Ui.DragAndDrop.init(config),
  [],
];

export const {
  draggable,
  droppable,
  ghostStyle,
  isDragging,
  maybeDraggedItemId,
  maybeDropTarget,
  sortable,
  subscriptions,
  update,
} = Ui.DragAndDrop;

export {
  dragHandleClassName,
  dragItemClassName,
  dragListClassName,
  dragGhostClassName,
  dragPlaceholderClassName,
  dragRootClassName,
  dragStatusClassName,
  sortableListView,
} from "./view";
export type { SortableItem, SortableListViewInput } from "./view";
