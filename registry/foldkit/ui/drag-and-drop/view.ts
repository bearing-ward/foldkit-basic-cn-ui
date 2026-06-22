import { Array, Option, pipe } from "effect";
import { Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export const dragRootClasses = "max-w-md space-y-3";

export const dragListClasses =
  "space-y-2 rounded-lg border border-gray-200 bg-white p-3";

export const dragItemClasses =
  "flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 data-[keyboard-dragging]:border-indigo-400 data-[keyboard-dragging]:bg-indigo-50 data-[keyboard-dragging]:ring-2 data-[keyboard-dragging]:ring-indigo-500";

export const dragHandleClasses =
  "rounded border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-500";

export const dragStatusClasses = "text-sm text-gray-700";

export const dragPlaceholderClasses =
  "min-h-10 rounded-md border-2 border-dashed border-indigo-300 bg-indigo-50/50";

export const dragGhostClasses =
  "pointer-events-none rounded-md border border-indigo-400 bg-white px-3 py-2 text-sm text-gray-900 shadow-lg";

export type SortableItem = Readonly<{
  id: string;
  label: string;
}>;

export type SortableListViewInput<ParentMessage> = Readonly<{
  model: Ui.DragAndDrop.Model;
  containerId: string;
  items: readonly SortableItem[];
  label: string;
  status: string;
  toParentMessage: (message: Ui.DragAndDrop.DraggableMessage) => ParentMessage;
}>;

export const sortableListView = <ParentMessage>({
  model,
  containerId,
  items,
  label,
  status,
  toParentMessage,
}: SortableListViewInput<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const maybeDraggedItemId = Ui.DragAndDrop.maybeDraggedItemId(model);
  const maybeDropTarget = Ui.DragAndDrop.maybeDropTarget(model);
  const isDragging = Ui.DragAndDrop.isDragging(model);
  const isPointerDragging = model.dragState._tag === "Dragging";

  const itemView = (item: SortableItem, index: number): Html => {
    const isKeyboardDragged =
      model.dragState._tag === "KeyboardDragging" &&
      Option.contains(item.id)(maybeDraggedItemId);

    return h.keyed("div")(
      item.id,
      [
        ...Ui.DragAndDrop.sortable<ParentMessage>(item.id),
        ...Ui.DragAndDrop.draggable<ParentMessage>({
          model,
          toParentMessage,
          itemId: item.id,
          containerId,
          index,
        }),
        h.Class(dragItemClasses),
        ...(isKeyboardDragged
          ? [h.DataAttribute("keyboard-dragging", "")]
          : []),
      ],
      [
        h.span([], [item.label]),
        h.span([h.AriaHidden(true), h.Class(dragHandleClasses)], ["::"]),
      ]
    );
  };

  const visibleItems = Option.match(maybeDraggedItemId, {
    onNone: () => items,
    onSome: (draggedId) =>
      isDragging ? Array.filter(items, ({ id }) => id !== draggedId) : items,
  });

  const itemElements = Array.map(visibleItems, itemView);
  const isTargetList =
    isDragging &&
    Option.exists(
      maybeDropTarget,
      ({ containerId: targetContainerId }) => targetContainerId === containerId
    );

  const draggedItem = Option.flatMap(maybeDraggedItemId, (draggedId) =>
    Array.findFirst(items, ({ id }) => id === draggedId)
  );

  const dropPlaceholder = h.keyed("div")(
    "drop-placeholder",
    [
      h.AriaHidden(true),
      h.DataAttribute("drop-placeholder", ""),
      h.Class(dragPlaceholderClasses),
    ],
    []
  );

  const targetIndex = Option.match(maybeDropTarget, {
    onNone: () => visibleItems.length,
    onSome: ({ index }) => Math.min(index, visibleItems.length),
  });

  const insertedElement = isPointerDragging
    ? dropPlaceholder
    : Option.match(draggedItem, {
        onNone: () => dropPlaceholder,
        onSome: (item) => itemView(item, targetIndex),
      });

  const renderedItems = isTargetList
    ? pipe(
        itemElements,
        Array.insertAt(targetIndex, insertedElement),
        Option.getOrElse(() => [...itemElements, insertedElement])
      )
    : itemElements;

  const ghost = pipe(
    Ui.DragAndDrop.ghostStyle(model),
    Option.flatMap((style) =>
      Option.map(draggedItem, (item) => ({ item, style }))
    ),
    Option.match({
      onNone: () => h.empty,
      onSome: ({ item, style }) =>
        h.div([h.Style(style), h.Class(dragGhostClasses)], [item.label]),
    })
  );

  return h.div(
    [h.Class(dragRootClasses)],
    [
      h.div(
        [
          ...Ui.DragAndDrop.droppable<ParentMessage>(containerId, label),
          h.Class(dragListClasses),
        ],
        renderedItems
      ),
      ghost,
      h.p([h.Class(dragStatusClasses)], [status]),
    ]
  );
};
