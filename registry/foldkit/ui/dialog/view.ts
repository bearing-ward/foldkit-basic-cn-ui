import { Ui } from "foldkit";
import type { Attribute, ChildAttribute, Html } from "foldkit/html";
import { html } from "foldkit/html";

export type RenderInfo = Ui.Dialog.RenderInfo;
export type ViewInputs = Ui.Dialog.ViewInputs;
export type DialogChild = Html | string;
export type DialogAttribute<Message> = Attribute<Message> | ChildAttribute;
export type DialogVariant = "default" | "destructive";

export type TriggerInputs<Message> = Readonly<{
  label: string;
  onClick: Message;
  focusSelector?: string;
}>;

export type RootInputs = Readonly<{
  render: RenderInfo;
  children: readonly DialogChild[];
}>;

export type PanelInputs = Readonly<{
  render: RenderInfo;
  children: readonly DialogChild[];
}>;

export type TextInputs = Readonly<{
  model: Ui.Dialog.Model;
  children: readonly DialogChild[];
}>;

export type ContainerInputs = Readonly<{
  children: readonly DialogChild[];
}>;

export type ActionInputs<Message> = Readonly<{
  label: string;
  onClick: Message;
  variant?: DialogVariant;
}>;

const triggerClasses =
  "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-normal text-gray-900 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600";

const rootClasses =
  "backdrop:bg-transparent bg-transparent p-0 open:flex items-center justify-center";

const backdropClasses =
  "fixed inset-0 bg-black/50 transition duration-150 ease-out data-[closed]:opacity-0";

const panelClasses =
  "bg-white rounded-lg p-6 max-w-md mx-auto relative shadow-xl transition duration-150 ease-out data-[closed]:opacity-0 data-[closed]:scale-95";

const titleClasses = "text-lg font-semibold text-gray-900";

const descriptionClasses = "mt-2 text-base text-gray-600";

const footerClasses = "mt-6 flex justify-end gap-2";

const closeButtonClasses =
  "rounded-lg border border-gray-300 px-4 py-2 text-base font-normal text-gray-700 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500";

const defaultButtonClasses =
  "rounded-lg bg-accent-600 px-4 py-2 text-base font-normal text-white transition hover:bg-accent-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600";

const destructiveButtonClasses =
  "rounded-lg bg-red-600 px-4 py-2 text-base font-normal text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";

const actionClasses = (variant: DialogVariant): string =>
  variant === "destructive"
    ? destructiveButtonClasses
    : defaultButtonClasses;

export const { view } = Ui.Dialog;

export const trigger = <Message>({
  label,
  onClick,
  focusSelector,
}: TriggerInputs<Message>): Html => {
  const h = html<Message>();

  return h.button(
    [
      h.Type("button"),
      h.Class(triggerClasses),
      focusSelector === undefined
        ? h.OnClick(onClick)
        : h.OnClickFocus(focusSelector, onClick),
    ],
    [label]
  );
};

export const root = <Message>({ render, children }: RootInputs): Html => {
  const h = html<Message>();

  return h.dialog(
    [...render.dialog, h.Class(rootClasses)],
    render.isVisible ? children : []
  );
};

export const backdrop = <Message>(render: RenderInfo): Html => {
  const h = html<Message>();

  return h.div([...render.backdrop, h.Class(backdropClasses)], []);
};

export const panel = <Message>({ render, children }: PanelInputs): Html => {
  const h = html<Message>();

  return h.div([...render.panel, h.Class(panelClasses)], children);
};

export const title = <Message>({ model, children }: TextInputs): Html => {
  const h = html<Message>();

  return h.h2(
    [h.Id(Ui.Dialog.titleId(model)), h.Class(titleClasses)],
    children
  );
};

export const description = <Message>({ model, children }: TextInputs): Html => {
  const h = html<Message>();

  return h.p(
    [h.Id(Ui.Dialog.descriptionId(model)), h.Class(descriptionClasses)],
    children
  );
};

export const footer = <Message>({ children }: ContainerInputs): Html => {
  const h = html<Message>();

  return h.div([h.Class(footerClasses)], children);
};

export const closeButton = <Message>({
  label,
  onClick,
}: ActionInputs<Message>): Html => {
  const h = html<Message>();

  return h.button(
    [h.Type("button"), h.Class(closeButtonClasses), h.OnClick(onClick)],
    [label]
  );
};

export const cancelButton = closeButton;

export const confirmButton = <Message>({
  label,
  onClick,
  variant = "default",
}: ActionInputs<Message>): Html => {
  const h = html<Message>();

  return h.button(
    [h.Type("button"), h.Class(actionClasses(variant)), h.OnClick(onClick)],
    [label]
  );
};
