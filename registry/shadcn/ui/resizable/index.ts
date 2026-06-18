import type { Attribute, Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  resizableHandleClassName,
  resizablePanelClassName,
  resizablePanelGroupClassName,
  resizablePanelGroupDirectionClassName,
} from "./view";

export {
  resizableHandleClassName,
  resizablePanelClassName,
  resizablePanelGroupClassName,
  resizablePanelGroupDirectionClassName,
} from "./view";

export type ResizableDirection = "horizontal" | "vertical";
export type ResizableStyle = Readonly<Record<string, string>>;

export type PanelGroupViewConfig = Readonly<{
  children: readonly Html[];
  direction?: ResizableDirection;
  className?: string;
  style?: ResizableStyle;
}>;

export type PanelViewConfig = Readonly<{
  children: readonly (Html | string)[];
  size?: number;
  className?: string;
  style?: ResizableStyle;
}>;

export type HandleViewConfig<ParentMessage> = Readonly<{
  direction?: ResizableDirection;
  label?: string;
  children?: readonly (Html | string)[];
  className?: string;
  style?: ResizableStyle;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

export type PanelItem = Readonly<{
  children: readonly (Html | string)[];
  size?: number;
}>;

const classNames = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const panelGroupView = <ParentMessage>({
  children,
  direction = "horizontal",
  className,
  style,
}: PanelGroupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "resizable-panel-group"),
      h.DataAttribute("direction", direction),
      h.Class(
        classNames(
          resizablePanelGroupClassName,
          resizablePanelGroupDirectionClassName(direction),
          className
        )
      ),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const panelView = <ParentMessage>({
  children,
  size,
  className,
  style,
}: PanelViewConfig): Html => {
  const h = html<ParentMessage>();
  const sizeStyle =
    size === undefined
      ? {}
      : {
          flex: `0 0 ${size}%`,
        };

  return h.div(
    [
      h.DataAttribute("slot", "resizable-panel"),
      ...(size === undefined ? [] : [h.DataAttribute("size", String(size))]),
      h.Class(classNames(resizablePanelClassName, className)),
      h.Style({ ...sizeStyle, ...style }),
    ],
    children
  );
};

export const handleView = <ParentMessage>({
  direction = "horizontal",
  label = "Resize panels",
  children = [],
  className,
  style,
  attributes = [],
}: HandleViewConfig<ParentMessage> = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Role("separator"),
      h.AriaLabel(label),
      h.AriaOrientation(direction),
      h.DataAttribute("slot", "resizable-handle"),
      h.DataAttribute("direction", direction),
      h.Class(classNames(resizableHandleClassName, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
      ...attributes,
    ],
    children
  );
};

export const view = <ParentMessage>({
  panels,
  direction = "horizontal",
  className,
}: Readonly<{
  panels: readonly PanelItem[];
  direction?: ResizableDirection;
  className?: string;
}>): Html =>
  panelGroupView<ParentMessage>({
    direction,
    ...(className === undefined ? {} : { className }),
    children: panels.flatMap((panel, index) => [
      ...(index === 0 ? [] : [handleView<ParentMessage>({ direction })]),
      panelView<ParentMessage>({
        children: panel.children,
        ...(panel.size === undefined ? {} : { size: panel.size }),
      }),
    ]),
  });
