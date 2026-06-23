import * as Ui from "@foldkit/ui";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export type RenderInfo = Ui.Popover.RenderInfo;
export type ViewInputs = Ui.Popover.ViewInputs;
export type PopoverChild = Html | string;

export type TriggerInputs<_Message> = Readonly<{
  render: RenderInfo;
  label: string;
}>;

export type RootInputs = Readonly<{
  children: readonly PopoverChild[];
}>;

export type PanelInputs = Readonly<{
  render: RenderInfo;
  children: readonly PopoverChild[];
}>;

export type BackdropInputs = Readonly<{
  render: RenderInfo;
  testId?: string;
}>;

const triggerClasses =
  "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-normal text-gray-900 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 disabled:cursor-not-allowed disabled:opacity-50";

const rootClasses = "relative inline-block";

const panelClasses =
  "z-10 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg outline-none transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0";

const backdropClasses = "fixed inset-0 z-0";

export const { view } = Ui.Popover;

export const trigger = <Message>({
  render,
  label,
}: TriggerInputs<Message>): Html => {
  const h = html<Message>();

  return h.button(
    [...render.button, h.Type("button"), h.Class(triggerClasses)],
    [label]
  );
};

export const root = <Message>({ children }: RootInputs): Html => {
  const h = html<Message>();

  return h.div([h.Class(rootClasses)], children);
};

export const panel = <Message>({ render, children }: PanelInputs): Html => {
  const h = html<Message>();

  return h.div([...render.panel, h.Class(panelClasses)], children);
};

export const backdrop = <Message>({
  render,
  testId = "popover-backdrop",
}: BackdropInputs): Html => {
  const h = html<Message>();

  return h.div(
    [
      ...render.backdrop,
      h.DataAttribute("testid", testId),
      h.Class(backdropClasses),
    ],
    []
  );
};
