import type { Html } from "foldkit/html";

import * as FoldkitMenubar from "../../../foldkit/ui/menubar";

export {
  shadcnMenubarItemClasses,
  shadcnMenubarMenuClasses,
  shadcnMenubarPopupClasses,
  shadcnMenubarRootClasses,
  shadcnMenubarSeparatorClasses,
  shadcnMenubarTriggerClasses,
} from "./view";

type WithClassName<Config> = Omit<Config, "classes"> &
  Readonly<{ className?: string | undefined }>;

export type MenubarStyle = FoldkitMenubar.MenubarStyle;
export type RootViewConfig = WithClassName<FoldkitMenubar.RootViewConfig>;
export type MenuViewConfig = WithClassName<FoldkitMenubar.MenuViewConfig>;
export type TriggerViewConfig<ParentMessage> = WithClassName<
  FoldkitMenubar.TriggerViewConfig<ParentMessage>
>;
export type PopupViewConfig = WithClassName<FoldkitMenubar.PopupViewConfig>;
export type ItemViewConfig<ParentMessage> = WithClassName<
  FoldkitMenubar.ItemViewConfig<ParentMessage>
>;

export const rootView = <ParentMessage>({
  className,
  ...config
}: RootViewConfig): Html =>
  FoldkitMenubar.rootView<ParentMessage>({ ...config, classes: className });

export const menuView = <ParentMessage>({
  className,
  ...config
}: MenuViewConfig): Html =>
  FoldkitMenubar.menuView<ParentMessage>({ ...config, classes: className });

export const triggerView = <ParentMessage>({
  className,
  ...config
}: TriggerViewConfig<ParentMessage>): Html =>
  FoldkitMenubar.triggerView<ParentMessage>({ ...config, classes: className });

export const popupView = <ParentMessage>({
  className,
  ...config
}: PopupViewConfig): Html =>
  FoldkitMenubar.popupView<ParentMessage>({ ...config, classes: className });

export const itemView = <ParentMessage>({
  className,
  ...config
}: ItemViewConfig<ParentMessage>): Html =>
  FoldkitMenubar.itemView<ParentMessage>({ ...config, classes: className });

export const separatorView = <ParentMessage>({
  className,
  ...config
}: WithClassName<Omit<FoldkitMenubar.MenuViewConfig, "children">>): Html =>
  FoldkitMenubar.separatorView<ParentMessage>({
    ...config,
    classes: className,
  });
