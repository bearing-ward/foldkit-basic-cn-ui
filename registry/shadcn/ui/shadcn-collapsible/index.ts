import type { Html } from "foldkit/html";

import * as FoldkitCollapsible from "../../../foldkit/ui/collapsible";

export {
  shadcnCollapsibleContentClasses,
  shadcnCollapsibleIconClasses,
  shadcnCollapsiblePanelClasses,
  shadcnCollapsibleRootClasses,
  shadcnCollapsibleTriggerClasses,
} from "./view";

type WithClassName<Config> = Omit<Config, "classes"> &
  Readonly<{ className?: string | undefined }>;

export type CollapsibleStyle = FoldkitCollapsible.CollapsibleStyle;
export type RootViewConfig = WithClassName<FoldkitCollapsible.RootViewConfig>;
export type TriggerViewConfig<ParentMessage> = WithClassName<
  FoldkitCollapsible.TriggerViewConfig<ParentMessage>
>;
export type PanelViewConfig = WithClassName<FoldkitCollapsible.PanelViewConfig>;

export const rootView = <ParentMessage>({
  className,
  ...config
}: RootViewConfig): Html =>
  FoldkitCollapsible.rootView<ParentMessage>({
    ...config,
    classes: className,
  });

export const triggerView = <ParentMessage>({
  className,
  ...config
}: TriggerViewConfig<ParentMessage>): Html =>
  FoldkitCollapsible.triggerView<ParentMessage>({
    ...config,
    classes: className,
  });

export const panelView = <ParentMessage>({
  className,
  ...config
}: PanelViewConfig): Html =>
  FoldkitCollapsible.panelView<ParentMessage>({
    ...config,
    classes: className,
  });

export const contentView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => FoldkitCollapsible.contentView<ParentMessage>(children, className);
