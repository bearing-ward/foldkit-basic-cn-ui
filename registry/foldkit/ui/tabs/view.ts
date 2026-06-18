import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import type { RenderInfo } from "./index";

export const tabsRootClassName = "max-w-md space-y-3";

export const tabListClassName =
  "inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1";

export const verticalTabsRootClassName =
  "grid max-w-lg gap-3 sm:grid-cols-[11rem_1fr]";

export const verticalTabListClassName =
  "flex flex-col rounded-lg border border-gray-200 bg-gray-100 p-1";

export const tabClassName =
  "rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 data-[selected]:bg-white data-[selected]:text-gray-950 data-[selected]:shadow-sm disabled:cursor-not-allowed disabled:opacity-50";

export const panelClassName =
  "rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700";

export type TabsViewInput<Value extends string = string> = Readonly<{
  render: RenderInfo<Value>;
  panelContent: Record<Value, string>;
  orientation?: "Horizontal" | "Vertical";
}>;

export const tabsView = <Value extends string>({
  render,
  panelContent,
  orientation = "Horizontal",
}: TabsViewInput<Value>): Html => {
  const h = html();
  const activeTab = render.tabs[render.activeIndex];
  const isVertical = orientation === "Vertical";

  return h.div(
    [h.Class(isVertical ? verticalTabsRootClassName : tabsRootClassName)],
    [
      h.div(
        [
          ...render.tablist,
          h.Class(isVertical ? verticalTabListClassName : tabListClassName),
        ],
        render.tabs.map((tab) =>
          h.button([...tab.tab, h.Class(tabClassName)], [tab.value])
        )
      ),
      activeTab === undefined
        ? h.empty
        : h.div(
            [...activeTab.panel, h.Class(panelClassName)],
            [panelContent[activeTab.value]]
          ),
    ]
  );
};
