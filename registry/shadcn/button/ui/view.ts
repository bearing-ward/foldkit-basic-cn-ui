import { Ui } from "foldkit";
import type { Attribute, Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  buttonVariants,
  type ButtonStyleInput,
  type ButtonVariantProps,
  resolveButtonStyle,
} from "./config";

type ButtonChild = Parameters<ReturnType<typeof html<never>>["button"]>[1][number];

export type ButtonViewConfig<ParentMessage> = Omit<
  Ui.Button.ViewConfig<ParentMessage>,
  "toView"
> &
  ButtonVariantProps &
  Readonly<{
    attributes?: ReadonlyArray<Attribute<ParentMessage>> | undefined;
    children: ReadonlyArray<ButtonChild>;
    className?: string | undefined;
    style?: ButtonStyleInput;
  }>;

export const view = <ParentMessage>({
  attributes = [],
  children,
  className,
  size = "default",
  style,
  variant = "default",
  ...config
}: ButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const resolvedSize = size ?? "default";
  const resolvedStyle = resolveButtonStyle(style);
  const resolvedVariant = variant ?? "default";

  return Ui.Button.view<ParentMessage>({
    ...config,
    toView: (buttonAttributes) =>
      h.button(
        [
          ...buttonAttributes.button,
          h.DataAttribute("slot", "button"),
          h.DataAttribute("variant", resolvedVariant),
          h.DataAttribute("size", resolvedSize),
          h.DataAttribute("style", resolvedStyle),
          h.Class(buttonVariants({ className, size, style, variant })),
          ...attributes,
        ],
        children
      ),
  });
};
