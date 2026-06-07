import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  sonnerCloseClassName,
  sonnerDescriptionClassName,
  sonnerTitleClassName,
  sonnerToastClassName,
  sonnerViewportClassName,
} from "./view";

export {
  sonnerActionClassName,
  sonnerCloseClassName,
  sonnerDescriptionClassName,
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
}>;

export type ViewportConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const viewportView = <ParentMessage>({
  children,
  className,
}: ViewportConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("aria-live", "polite"),
      h.Attribute("aria-atomic", "true"),
      h.DataAttribute("slot", "sonner-viewport"),
      h.Class(classNames(sonnerViewportClassName, className)),
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
}: ToastConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "status"),
      h.DataAttribute("slot", "sonner-toast"),
      h.Class(classNames(`${sonnerToastClassName} relative`, className)),
    ],
    [
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
