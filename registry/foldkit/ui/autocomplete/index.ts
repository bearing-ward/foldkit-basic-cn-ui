import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  autocompleteEmptyClassName,
  autocompleteInputClassName,
  autocompleteItemClassName,
  autocompleteLabelClassName,
  autocompleteListClassName,
  autocompleteRootClassName,
} from "./view";

export {
  autocompleteEmptyClassName,
  autocompleteInputClassName,
  autocompleteItemClassName,
  autocompleteLabelClassName,
  autocompleteListClassName,
  autocompleteRootClassName,
} from "./view";

export type AutocompleteStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: AutocompleteStyle | undefined;
}>;

export type LabelViewConfig = Readonly<{
  forId: string;
  children: readonly Html[];
  className?: string | undefined;
  style?: AutocompleteStyle | undefined;
}>;

export type InputViewConfig<ParentMessage> = Readonly<{
  id: string;
  value: string;
  onInput: (value: string) => ParentMessage;
  ariaLabel: string;
  listId?: string | undefined;
  placeholder?: string | undefined;
  className?: string | undefined;
  style?: AutocompleteStyle | undefined;
}>;

export type ListViewConfig = Readonly<{
  id: string;
  children: readonly Html[];
  className?: string | undefined;
  style?: AutocompleteStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  id?: string | undefined;
  selected?: boolean | undefined;
  onClick: ParentMessage;
  children: readonly Html[];
  className?: string | undefined;
  style?: AutocompleteStyle | undefined;
}>;

export type EmptyViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: AutocompleteStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(autocompleteRootClassName, className)),
    ],
    children
  );
};

export const labelView = <ParentMessage>({
  forId,
  children,
  className,
  style,
}: LabelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.label(
    [
      h.Attribute("for", forId),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(autocompleteLabelClassName, className)),
    ],
    children
  );
};

export const inputView = <ParentMessage>({
  id,
  value,
  onInput,
  ariaLabel,
  listId,
  placeholder,
  className,
  style,
}: InputViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.input([
    h.Id(id),
    h.Type("text"),
    h.Value(value),
    h.OnInput(onInput),
    h.AriaLabel(ariaLabel),
    h.Attribute("role", "combobox"),
    ...(listId === undefined
      ? []
      : [
          h.Attribute("aria-controls", listId),
          h.Attribute("aria-expanded", "true"),
        ]),
    ...(placeholder === undefined ? [] : [h.Placeholder(placeholder)]),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(classNames(autocompleteInputClassName, className)),
  ]);
};

export const listView = <ParentMessage>({
  id,
  children,
  className,
  style,
}: ListViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Id(id),
      h.Attribute("role", "listbox"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(autocompleteListClassName, className)),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
  id,
  selected,
  onClick,
  children,
  className,
  style,
}: ItemViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      ...(id === undefined ? [] : [h.Id(id)]),
      h.Attribute("role", "option"),
      h.Attribute("aria-selected", selected === true ? "true" : "false"),
      ...(selected === true ? [h.DataAttribute("selected", "")] : []),
      h.OnClick(onClick),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(autocompleteItemClassName, className)),
    ],
    children
  );
};

export const emptyView = <ParentMessage>({
  children,
  className,
  style,
}: EmptyViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(autocompleteEmptyClassName, className)),
    ],
    children
  );
};
