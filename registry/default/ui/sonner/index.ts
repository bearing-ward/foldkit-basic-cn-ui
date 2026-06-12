import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  sonnerCloseClassName,
  sonnerDescriptionClassName,
  sonnerIconClassName,
  sonnerTitleClassName,
  sonnerToastClassName,
  sonnerViewportClassName,
} from "./view";

export {
  sonnerActionClassName,
  sonnerCloseClassName,
  sonnerDescriptionClassName,
  sonnerIconClassName,
  sonnerTitleClassName,
  sonnerToastClassName,
  sonnerViewportClassName,
} from "./view";

export type ToastConfig<ParentMessage> = Readonly<{
  title: string;
  description?: string | undefined;
  action?: Html | undefined;
  onClose?: ParentMessage | undefined;
  className?: string | undefined;
  variant?: "default" | "success" | "info" | "warning" | "error" | undefined;
}>;

export type ViewportConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
    | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const viewportPositionClassName = (
  position: NonNullable<ViewportConfig["position"]>
): string =>
  ({
    "top-left": "left-4 right-auto top-4 bottom-auto",
    "top-center": "left-1/2 right-auto top-4 bottom-auto -translate-x-1/2",
    "top-right": "bottom-auto top-4",
    "bottom-left": "left-4 right-auto",
    "bottom-center": "left-1/2 right-auto -translate-x-1/2",
    "bottom-right": "",
  })[position];

const toastVariantClassName = (
  variant: NonNullable<ToastConfig<unknown>["variant"]>
): string =>
  ({
    default: "",
    success: "border-green-200 bg-green-50 text-green-950",
    info: "border-blue-200 bg-blue-50 text-blue-950",
    warning: "border-amber-200 bg-amber-50 text-amber-950",
    error: "border-red-200 bg-red-50 text-red-950",
  })[variant];

const toastIconVariantClassName = (
  variant: NonNullable<ToastConfig<unknown>["variant"]>
): string =>
  ({
    default: "",
    success: "text-green-600",
    info: "text-blue-600",
    warning: "text-amber-600",
    error: "text-red-600",
  })[variant];

const toastIconLabel = (
  variant: NonNullable<ToastConfig<unknown>["variant"]>
): string =>
  ({
    default: "Toast icon",
    success: "Success icon",
    info: "Info icon",
    warning: "Warning icon",
    error: "Error icon",
  })[variant];

const toastIconPath = (
  variant: NonNullable<ToastConfig<unknown>["variant"]>
): string | undefined =>
  ({
    default: undefined,
    success: "M20 6 9 17l-5-5",
    info: "M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
    warning:
      "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0ZM12 9v4M12 17h.01",
    error: "M18 6 6 18M6 6l12 12",
  })[variant];

const toastIconView = <ParentMessage>(
  variant: NonNullable<ToastConfig<unknown>["variant"]>,
  path: string
): Html => {
  const h = html<ParentMessage>();

  return h.svg(
    [
      h.Role("img"),
      h.AriaLabel(toastIconLabel(variant)),
      h.DataAttribute("slot", "sonner-icon"),
      h.DataAttribute("variant", variant),
      h.Class(
        classNames(sonnerIconClassName, toastIconVariantClassName(variant))
      ),
      h.Xmlns("http://www.w3.org/2000/svg"),
      h.ViewBox("0 0 24 24"),
      h.Fill("none"),
      h.Stroke("currentColor"),
      h.StrokeWidth("2"),
      h.StrokeLinecap("round"),
      h.StrokeLinejoin("round"),
    ],
    [h.path([h.D(path)], [])]
  );
};

export const viewportView = <ParentMessage>({
  children,
  className,
  position = "bottom-right",
}: ViewportConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("aria-live", "polite"),
      h.Attribute("aria-atomic", "true"),
      h.DataAttribute("slot", "sonner-viewport"),
      h.Class(
        classNames(
          `${sonnerViewportClassName} ${viewportPositionClassName(position)}`,
          className
        )
      ),
    ],
    children
  );
};

export const toastView = <ParentMessage>({
  title,
  description,
  action,
  onClose,
  className,
  variant = "default",
}: ToastConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const maybeIconPath = toastIconPath(variant);

  return h.div(
    [
      h.Attribute("role", "status"),
      h.DataAttribute("slot", "sonner-toast"),
      h.DataAttribute("variant", variant),
      h.Class(
        classNames(
          `${sonnerToastClassName} ${toastVariantClassName(variant)} relative ${
            maybeIconPath === undefined ? "" : "pl-10"
          }`,
          className
        )
      ),
    ],
    [
      maybeIconPath === undefined
        ? h.empty
        : toastIconView<ParentMessage>(variant, maybeIconPath),
      h.div(
        [
          h.DataAttribute("slot", "sonner-title"),
          h.Class(sonnerTitleClassName),
        ],
        [title]
      ),
      description === undefined
        ? h.empty
        : h.div(
            [
              h.DataAttribute("slot", "sonner-description"),
              h.Class(sonnerDescriptionClassName),
            ],
            [description]
          ),
      action === undefined ? h.empty : action,
      onClose === undefined
        ? h.empty
        : h.button(
            [
              h.Type("button"),
              h.AriaLabel("Dismiss toast"),
              h.OnClick(onClose),
              h.DataAttribute("slot", "sonner-close"),
              h.Class(sonnerCloseClassName),
            ],
            ["x"]
          ),
    ]
  );
};
