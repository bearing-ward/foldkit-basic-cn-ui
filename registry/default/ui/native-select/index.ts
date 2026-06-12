import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  nativeSelectDescriptionClassName,
  nativeSelectLabelClassName,
  nativeSelectRootClassName,
  nativeSelectTriggerClassName,
} from "./view";

export {
  nativeSelectDescriptionClassName,
  nativeSelectLabelClassName,
  nativeSelectRootClassName,
  nativeSelectTriggerClassName,
} from "./view";

export type OptionConfig = Readonly<{
  value: string;
  label: string;
  disabled?: boolean | undefined;
}>;

export type OptionGroupConfig = Readonly<{
  label: string;
  options: readonly OptionConfig[];
  disabled?: boolean | undefined;
}>;

export type OptionItemConfig = OptionConfig | OptionGroupConfig;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
}>;

export type LabelViewConfig = Readonly<{
  forId: string;
  children: readonly Html[];
  className?: string | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  id: string;
  value: string;
  onChange: (value: string) => ParentMessage;
  options: readonly OptionItemConfig[];
  ariaLabel?: string | undefined;
  describedById?: string | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}>;

export type DescriptionViewConfig = Readonly<{
  id: string;
  children: readonly Html[];
  className?: string | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const isOptionGroupConfig = (
  option: OptionItemConfig
): option is OptionGroupConfig => "options" in option;

export const rootView = <ParentMessage>({
  children,
  className,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "native-select"),
      h.Class(classNames(nativeSelectRootClassName, className)),
    ],
    children
  );
};

export const labelView = <ParentMessage>({
  forId,
  children,
  className,
}: LabelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.label(
    [
      h.For(forId),
      h.DataAttribute("slot", "native-select-label"),
      h.Class(classNames(nativeSelectLabelClassName, className)),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  id,
  value,
  onChange,
  options,
  ariaLabel,
  describedById,
  disabled = false,
  className,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.select(
    [
      h.Id(id),
      h.Value(value),
      h.Disabled(disabled),
      h.OnChange(onChange),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...(describedById === undefined
        ? []
        : [h.AriaDescribedBy(describedById)]),
      h.DataAttribute("slot", "native-select-trigger"),
      h.Class(classNames(nativeSelectTriggerClassName, className)),
    ],
    options.map((option) =>
      isOptionGroupConfig(option)
        ? h.optgroup(
            [
              h.Attribute("label", option.label),
              ...(option.disabled === true ? [h.Disabled(true)] : []),
            ],
            option.options.map((groupOption) =>
              h.option(
                [
                  h.Value(groupOption.value),
                  ...(groupOption.disabled === true ? [h.Disabled(true)] : []),
                ],
                [groupOption.label]
              )
            )
          )
        : h.option(
            [
              h.Value(option.value),
              ...(option.disabled === true ? [h.Disabled(true)] : []),
            ],
            [option.label]
          )
    )
  );
};

export const descriptionView = <ParentMessage>({
  id,
  children,
  className,
}: DescriptionViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [
      h.Id(id),
      h.DataAttribute("slot", "native-select-description"),
      h.Class(classNames(nativeSelectDescriptionClassName, className)),
    ],
    children
  );
};
