import type { Attribute, Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  commandEmptyClassName,
  commandGroupClassName,
  commandInputClassName,
  commandInputWrapperClassName,
  commandItemClassName,
  commandListClassName,
  commandRootClassName,
  commandSeparatorClassName,
  commandShortcutClassName,
} from "./view";

export {
  commandEmptyClassName,
  commandGroupClassName,
  commandInputClassName,
  commandInputWrapperClassName,
  commandItemClassName,
  commandListClassName,
  commandRootClassName,
  commandSeparatorClassName,
  commandShortcutClassName,
} from "./view";

export type CommandItem = Readonly<{
  label: string;
  group: string;
  shortcut?: string;
  disabled?: boolean;
}>;

type ViewConfig<ParentMessage> = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

export type InputViewConfig<ParentMessage> = Readonly<{
  value: string;
  onInput: (value: string) => ParentMessage;
  placeholder?: string;
  ariaLabel?: string;
  listId?: string;
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  item: CommandItem;
  onSelect?: ParentMessage;
  selected?: boolean;
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

export const defaultItems: readonly CommandItem[] = [
  { group: "Suggestions", label: "Calendar" },
  { group: "Suggestions", label: "Search Emoji" },
  { group: "Suggestions", label: "Calculator" },
  { group: "Settings", label: "Profile", shortcut: "⌘P" },
  { group: "Settings", label: "Billing", shortcut: "⌘B" },
  { group: "Settings", label: "Settings", shortcut: "⌘S" },
];

const classNames = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const filterItems = (
  items: readonly CommandItem[],
  query: string
): readonly CommandItem[] => {
  const needle = query.trim().toLowerCase();

  if (needle === "") {
    return items;
  }

  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(needle) ||
      item.group.toLowerCase().includes(needle)
  );
};

export const rootView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "command"),
      h.Class(classNames(commandRootClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const inputView = <ParentMessage>({
  value,
  onInput,
  placeholder = "Type a command or search...",
  ariaLabel = "Command search",
  listId,
  className,
  attributes = [],
}: InputViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "command-input-wrapper"),
      h.Class(commandInputWrapperClassName),
    ],
    [
      h.input([
        h.DataAttribute("slot", "command-input"),
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
        h.Placeholder(placeholder),
        h.Class(classNames(commandInputClassName, className)),
        ...attributes,
      ]),
    ]
  );
};

export const listView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "command-list"),
      h.Attribute("role", "listbox"),
      h.Class(classNames(commandListClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const emptyView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "command-empty"),
      h.Class(classNames(commandEmptyClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const groupView = <ParentMessage>({
  heading,
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage> & Readonly<{ heading: string }>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "command-group"),
      h.Class(classNames(commandGroupClassName, className)),
      ...attributes,
    ],
    [
      h.div([h.DataAttribute("slot", "command-group-heading")], [heading]),
      ...children,
    ]
  );
};

export const shortcutView = <ParentMessage>(shortcut: string): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.DataAttribute("slot", "command-shortcut"),
      h.Class(commandShortcutClassName),
    ],
    [shortcut]
  );
};

export const itemView = <ParentMessage>({
  item,
  onSelect,
  selected,
  className,
  attributes = [],
}: ItemViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.DataAttribute("slot", "command-item"),
      h.DataAttribute("selected", selected === true ? "true" : "false"),
      h.DataAttribute("disabled", item.disabled === true ? "true" : "false"),
      h.Attribute("role", "option"),
      h.Attribute("aria-selected", selected === true ? "true" : "false"),
      ...(item.disabled === true
        ? [h.Disabled(true), h.AriaDisabled(true)]
        : onSelect === undefined
          ? []
          : [h.OnClick(onSelect)]),
      h.Class(classNames(commandItemClassName, className)),
      ...attributes,
    ],
    [
      h.span([], [item.label]),
      ...(item.shortcut === undefined
        ? []
        : [shortcutView<ParentMessage>(item.shortcut)]),
    ]
  );
};

export const separatorView = <ParentMessage>(): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      h.DataAttribute("slot", "command-separator"),
      h.Class(commandSeparatorClassName),
    ],
    []
  );
};
