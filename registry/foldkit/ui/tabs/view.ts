import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import type { RenderInfo } from "./index";

export const tabsRootClasses = "max-w-md space-y-3";

export const tabListClasses =
  "inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1";

export const verticalTabsRootClasses =
  "grid max-w-lg gap-3 sm:grid-cols-[11rem_1fr]";

export const verticalTabListClasses =
  "flex flex-col rounded-lg border border-gray-200 bg-gray-100 p-1";

export const tabClasses =
  "rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 data-[selected]:bg-white data-[selected]:text-gray-950 data-[selected]:shadow-sm disabled:cursor-not-allowed disabled:opacity-50";

export const panelClasses =
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
    [h.Class(isVertical ? verticalTabsRootClasses : tabsRootClasses)],
    [
      h.div(
        [
          ...render.tablist,
          h.Class(isVertical ? verticalTabListClasses : tabListClasses),
        ],
        render.tabs.map((tab) =>
          h.button([...tab.tab, h.Class(tabClasses)], [tab.value])
        )
      ),
      activeTab === undefined
        ? h.empty
        : h.div(
            [...activeTab.panel, h.Class(panelClasses)],
            [panelContent[activeTab.value]]
          ),
    ]
  );
};
