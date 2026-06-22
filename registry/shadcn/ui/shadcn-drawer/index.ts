import type { Html } from "foldkit/html";

import * as FoldkitDrawer from "../../../foldkit/ui/drawer";

export {
  shadcnDrawerBackdropClasses,
  shadcnDrawerCloseClasses,
  shadcnDrawerContentClasses,
  shadcnDrawerDescriptionClasses,
  shadcnDrawerPopupClasses,
  shadcnDrawerPortalClasses,
  shadcnDrawerRootClasses,
  shadcnDrawerTitleClasses,
  shadcnDrawerTriggerClasses,
  shadcnDrawerViewportClasses,
} from "./view";

type WithClassName<Config> = Omit<Config, "classes"> &
  Readonly<{ className?: string | undefined }>;

export type DrawerStyle = FoldkitDrawer.DrawerStyle;
export type RootViewConfig = WithClassName<FoldkitDrawer.RootViewConfig>;
export type TriggerViewConfig<ParentMessage> = WithClassName<
  FoldkitDrawer.TriggerViewConfig<ParentMessage>
>;
export type PortalViewConfig = WithClassName<FoldkitDrawer.PortalViewConfig>;
export type PartViewConfig = WithClassName<FoldkitDrawer.PartViewConfig>;
export type PopupViewConfig = WithClassName<FoldkitDrawer.PopupViewConfig>;
export type CloseViewConfig<ParentMessage> = WithClassName<
  FoldkitDrawer.CloseViewConfig<ParentMessage>
>;

export const rootView = <ParentMessage>({
  className,
  ...config
}: RootViewConfig): Html =>
  FoldkitDrawer.rootView<ParentMessage>({ ...config, classes: className });

export const triggerView = <ParentMessage>({
  className,
  ...config
}: TriggerViewConfig<ParentMessage>): Html =>
  FoldkitDrawer.triggerView<ParentMessage>({ ...config, classes: className });

export const portalView = <ParentMessage>({
  className,
  ...config
}: PortalViewConfig): Html =>
  FoldkitDrawer.portalView<ParentMessage>({ ...config, classes: className });

export const backdropView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitDrawer.backdropView<ParentMessage>({ ...config, classes: className });

export const viewportView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitDrawer.viewportView<ParentMessage>({ ...config, classes: className });

export const popupView = <ParentMessage>({
  className,
  ...config
}: PopupViewConfig): Html =>
  FoldkitDrawer.popupView<ParentMessage>({ ...config, classes: className });

export const contentView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitDrawer.contentView<ParentMessage>({ ...config, classes: className });

export const titleView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitDrawer.titleView<ParentMessage>({ ...config, classes: className });

export const descriptionView = <ParentMessage>({
  className,
  ...config
}: PartViewConfig): Html =>
  FoldkitDrawer.descriptionView<ParentMessage>({
    ...config,
    classes: className,
  });

export const closeView = <ParentMessage>({
  className,
  ...config
}: CloseViewConfig<ParentMessage>): Html =>
  FoldkitDrawer.closeView<ParentMessage>({ ...config, classes: className });
