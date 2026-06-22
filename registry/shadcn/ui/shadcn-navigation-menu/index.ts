import type { Html } from "foldkit/html";

import * as FoldkitNavigationMenu from "../../../foldkit/ui/navigation-menu";

export {
  shadcnNavigationMenuArrowClasses,
  shadcnNavigationMenuContentClasses,
  shadcnNavigationMenuItemClasses,
  shadcnNavigationMenuLinkClasses,
  shadcnNavigationMenuListClasses,
  shadcnNavigationMenuPopupClasses,
  shadcnNavigationMenuPortalClasses,
  shadcnNavigationMenuPositionerClasses,
  shadcnNavigationMenuRootClasses,
  shadcnNavigationMenuTriggerClasses,
  shadcnNavigationMenuViewportClasses,
} from "./view";

type WithClassName<Config> = Omit<Config, "classes"> &
  Readonly<{ className?: string | undefined }>;

export type NavigationMenuStyle = FoldkitNavigationMenu.NavigationMenuStyle;
export type PartViewConfig = WithClassName<FoldkitNavigationMenu.PartViewConfig>;
export type TriggerViewConfig<ParentMessage> = WithClassName<
  FoldkitNavigationMenu.TriggerViewConfig<ParentMessage>
>;
export type LinkViewConfig = WithClassName<FoldkitNavigationMenu.LinkViewConfig>;
export type PortalViewConfig = WithClassName<
  FoldkitNavigationMenu.PortalViewConfig
>;

export const rootView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitNavigationMenu.rootView<ParentMessage>({
    ...config,
    classes: className,
  });

export const listView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitNavigationMenu.listView<ParentMessage>({
    ...config,
    classes: className,
  });

export const itemView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitNavigationMenu.itemView<ParentMessage>({
    ...config,
    classes: className,
  });

export const triggerView = <ParentMessage>({
  className,
  ...config
}: TriggerViewConfig<ParentMessage>): Html =>
  FoldkitNavigationMenu.triggerView<ParentMessage>({
    ...config,
    classes: className,
  });

export const linkView = <ParentMessage>({
  className,
  ...config
}: LinkViewConfig): Html =>
  FoldkitNavigationMenu.linkView<ParentMessage>({
    ...config,
    classes: className,
  });

export const portalView = <ParentMessage>({
  className,
  ...config
}: PortalViewConfig): Html =>
  FoldkitNavigationMenu.portalView<ParentMessage>({
    ...config,
    classes: className,
  });

export const positionerView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitNavigationMenu.positionerView<ParentMessage>({
    ...config,
    classes: className,
  });

export const popupView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitNavigationMenu.popupView<ParentMessage>({
    ...config,
    classes: className,
  });

export const viewportView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitNavigationMenu.viewportView<ParentMessage>({
    ...config,
    classes: className,
  });

export const contentView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitNavigationMenu.contentView<ParentMessage>({
    ...config,
    classes: className,
  });

export const arrowView = <ParentMessage>({
  className,
  ...config
}: Omit<PartViewConfig, "children">): Html =>
  FoldkitNavigationMenu.arrowView<ParentMessage>({
    ...config,
    classes: className,
  });
