import type { Html } from "foldkit/html";

import * as FoldkitAccordion from "../../../foldkit/ui/accordion";

export {
  shadcnAccordionHeaderClasses,
  shadcnAccordionIconClasses,
  shadcnAccordionItemClasses,
  shadcnAccordionPanelClasses,
  shadcnAccordionRootClasses,
  shadcnAccordionTriggerClasses,
} from "./view";

export const includesValue = FoldkitAccordion.includesValue;
export const toggleValue = FoldkitAccordion.toggleValue;

export type AccordionStyle = FoldkitAccordion.AccordionStyle;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  openValues: readonly string[];
  className?: string | undefined;
  style?: AccordionStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  value: string;
  openValues: readonly string[];
  onValueChange: ParentMessage;
  title: string;
  children: readonly Html[];
  disabled?: boolean | undefined;
  className?: string | undefined;
  style?: AccordionStyle | undefined;
  triggerClasses?: string | undefined;
  panelClasses?: string | undefined;
}>;

export const rootView = <ParentMessage>({
  children,
  openValues,
  className,
  style,
}: RootViewConfig): Html =>
  FoldkitAccordion.rootView<ParentMessage>({
    children,
    openValues,
    classes: className,
    style,
  });

export const itemView = <ParentMessage>({
  value,
  openValues,
  onValueChange,
  title,
  children,
  disabled,
  className,
  style,
  triggerClasses,
  panelClasses,
}: ItemViewConfig<ParentMessage>): Html =>
  FoldkitAccordion.itemView<ParentMessage>({
    value,
    openValues,
    onValueChange,
    title,
    children,
    disabled,
    classes: className,
    style,
    triggerClasses,
    panelClasses,
  });
