import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  inputOtpGroupClassName,
  inputOtpRootClassName,
  inputOtpSeparatorClassName,
  inputOtpSlotClassName,
} from "./view";

export {
  inputOtpGroupClassName,
  inputOtpRootClassName,
  inputOtpSeparatorClassName,
  inputOtpSlotClassName,
} from "./view";

export type ViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
}>;

export type SlotViewConfig<ParentMessage> = Readonly<{
  id?: string | undefined;
  value: string;
  ariaLabel: string;
  onInput: (value: string) => ParentMessage;
  active?: boolean | undefined;
  className?: string | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  className,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "input-otp"),
      h.Class(classNames(inputOtpRootClassName, className)),
    ],
    children
  );
};

export const groupView = <ParentMessage>({
  children,
  className,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "input-otp-group"),
      h.Class(classNames(inputOtpGroupClassName, className)),
    ],
    children
  );
};

export const slotView = <ParentMessage>({
  id,
  value,
  ariaLabel,
  onInput,
  active = false,
  className,
}: SlotViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.input([
    ...(id === undefined ? [] : [h.Id(id)]),
    h.Type("text"),
    h.Value(value),
    h.AriaLabel(ariaLabel),
    h.Autocomplete("one-time-code"),
    h.Attribute("inputmode", "numeric"),
    h.Attribute("maxlength", "1"),
    h.OnInput(onInput),
    h.Attribute("pattern", "[0-9]*"),
    h.DataAttribute("slot", "input-otp-slot"),
    h.DataAttribute("active", active ? "true" : "false"),
    h.DataAttribute("filled", value === "" ? "false" : "true"),
    h.Class(classNames(inputOtpSlotClassName, className)),
  ]);
};

export const separatorView = <ParentMessage>(): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      h.DataAttribute("slot", "input-otp-separator"),
      h.Class(inputOtpSeparatorClassName),
    ],
    ["•"]
  );
};
