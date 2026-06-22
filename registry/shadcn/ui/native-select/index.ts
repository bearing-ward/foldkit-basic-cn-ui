import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  nativeSelectDescriptionClasses,
  nativeSelectLabelClasses,
  nativeSelectRootClasses,
  nativeSelectTriggerClasses,
} from "./view";

export {
  nativeSelectDescriptionClasses,
  nativeSelectLabelClasses,
  nativeSelectRootClasses,
  nativeSelectTriggerClasses,
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
  classes?: string | undefined;
}>;

export type LabelViewConfig = Readonly<{
  forId: string;
  children: readonly Html[];
  classes?: string | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  id: string;
  value: string;
  onChange: (value: string) => ParentMessage;
  options: readonly OptionItemConfig[];
  ariaLabel?: string | undefined;
  describedById?: string | undefined;
  disabled?: boolean | undefined;
  classes?: string | undefined;
}>;

export type DescriptionViewConfig = Readonly<{
  id: string;
  children: readonly Html[];
  classes?: string | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const isOptionGroupConfig = (
  option: OptionItemConfig
): option is OptionGroupConfig => "options" in option;

export const rootView = <ParentMessage>({
  children,
  classes,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "native-select"),
      h.Class(cn(nativeSelectRootClasses, classes)),
    ],
    children
  );
};

export const labelView = <ParentMessage>({
  forId,
  children,
  classes,
}: LabelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.label(
    [
      h.For(forId),
      h.DataAttribute("slot", "native-select-label"),
      h.Class(cn(nativeSelectLabelClasses, classes)),
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
  classes,
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
      h.Class(cn(nativeSelectTriggerClasses, classes)),
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
  classes,
}: DescriptionViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [
      h.Id(id),
      h.DataAttribute("slot", "native-select-description"),
      h.Class(cn(nativeSelectDescriptionClasses, classes)),
    ],
    children
  );
};
