import { Option } from "effect";
import { Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export const dragRootClassName = "max-w-md space-y-3";

export const dragListClassName =
  "space-y-2 rounded-lg border border-gray-200 bg-white p-3";

export const dragItemClassName =
  "flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 data-[dragging]:border-indigo-400 data-[dragging]:bg-indigo-50";

export const dragHandleClassName =
  "rounded border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-500";

export const dragStatusClassName = "text-sm text-gray-700";

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

  return h.div(
    [h.Class(dragRootClassName)],
    [
      h.div(
        [
          ...Ui.DragAndDrop.droppable<ParentMessage>(containerId, label),
          h.Class(dragListClassName),
        ],
        items.map((item, index) => {
          const isDragged = Option.contains(item.id)(maybeDraggedItemId);

          return h.div(
            [
              ...Ui.DragAndDrop.sortable<ParentMessage>(item.id),
              ...Ui.DragAndDrop.draggable<ParentMessage>({
                model,
                toParentMessage,
                itemId: item.id,
                containerId,
                index,
              }),
              h.Class(dragItemClassName),
              h.DataAttribute("dragging", isDragged ? "true" : "false"),
            ],
            [
              h.span([], [item.label]),
              h.span(
                [h.AriaHidden(true), h.Class(dragHandleClassName)],
                ["::"]
              ),
            ]
          );
        })
      ),
      h.p([h.Class(dragStatusClassName)], [status]),
    ]
  );
};
