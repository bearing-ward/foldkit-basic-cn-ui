import type { Html } from "foldkit/html";

import * as FoldkitContextMenu from "../../../foldkit/ui/context-menu";

export {
  shadcnContextMenuBackdropClasses,
  shadcnContextMenuItemClasses,
  shadcnContextMenuPopupClasses,
  shadcnContextMenuPortalClasses,
  shadcnContextMenuPositionerClasses,
  shadcnContextMenuRootClasses,
  shadcnContextMenuSeparatorClasses,
  shadcnContextMenuTriggerClasses,
} from "./view";

type WithClassName<Config> = Omit<Config, "classes"> &
  Readonly<{ className?: string | undefined }>;

export type ContextMenuStyle = FoldkitContextMenu.ContextMenuStyle;
export type RootViewConfig = WithClassName<FoldkitContextMenu.RootViewConfig>;
export type TriggerViewConfig<ParentMessage> = WithClassName<
  FoldkitContextMenu.TriggerViewConfig<ParentMessage>
>;
export type PortalViewConfig = WithClassName<FoldkitContextMenu.PortalViewConfig>;
export type PartViewConfig = WithClassName<FoldkitContextMenu.PartViewConfig>;
export type BackdropViewConfig<ParentMessage> = WithClassName<
  FoldkitContextMenu.BackdropViewConfig<ParentMessage>
>;
export type ItemViewConfig<ParentMessage> = WithClassName<
  FoldkitContextMenu.ItemViewConfig<ParentMessage>
>;

export const rootView = <ParentMessage>({
  className,
  ...config
}: RootViewConfig): Html =>
  FoldkitContextMenu.rootView<ParentMessage>({ ...config, classes: className });

export const triggerView = <ParentMessage>({
  className,
  ...config
}: TriggerViewConfig<ParentMessage>): Html =>
  FoldkitContextMenu.triggerView<ParentMessage>({
    ...config,
    classes: className,
  });

export const portalView = <ParentMessage>({
  className,
  ...config
}: PortalViewConfig): Html =>
  FoldkitContextMenu.portalView<ParentMessage>({
    ...config,
    classes: className,
  });

export const positionerView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitContextMenu.positionerView<ParentMessage>({
    ...config,
    classes: className,
  });

export const backdropView = <ParentMessage>({
  className,
  ...config
}: BackdropViewConfig<ParentMessage>): Html =>
  FoldkitContextMenu.backdropView<ParentMessage>({
    ...config,
    classes: className,
  });

export const popupView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitContextMenu.popupView<ParentMessage>({ ...config, classes: className });

export const itemView = <ParentMessage>({
  className,
  ...config
}: ItemViewConfig<ParentMessage>): Html =>
  FoldkitContextMenu.itemView<ParentMessage>({ ...config, classes: className });

export const separatorView = <ParentMessage>({
  className,
  ...config
}: Omit<PartViewConfig, "children">): Html =>
  FoldkitContextMenu.separatorView<ParentMessage>({
    ...config,
    classes: className,
  });
