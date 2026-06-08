import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as NativeSelectBasicExample from "../registry/default/examples/native-select-basic/main";
import * as NavigationMenuBasicExample from "../registry/default/examples/navigation-menu-basic/main";
import * as NumberFieldBasicExample from "../registry/default/examples/number-field-basic/main";
import * as OtpFieldBasicExample from "../registry/default/examples/otp-field-basic/main";
import * as PaginationBasicExample from "../registry/default/examples/pagination-basic/main";
import * as PopoverAnimatedExample from "../registry/default/examples/popover-animated/main";
import * as PopoverBasicExample from "../registry/default/examples/popover-basic/main";
import * as PreviewCardBasicExample from "../registry/default/examples/preview-card-basic/main";
import * as ProgressBasicExample from "../registry/default/examples/progress-basic/main";
import * as RadioBasicExample from "../registry/default/examples/radio-basic/main";
import * as RadioGroupBasicExample from "../registry/default/examples/radio-group-basic/main";
import * as RadioGroupHorizontalExample from "../registry/default/examples/radio-group-horizontal/main";
import * as ResizableBasicExample from "../registry/default/examples/resizable-basic/main";
import * as ScrollAreaBasicExample from "../registry/default/examples/scroll-area-basic/main";
import * as SelectBasicExample from "../registry/default/examples/select-basic/main";
import * as SelectDisabledExample from "../registry/default/examples/select-disabled/main";
import * as SeparatorBasicExample from "../registry/default/examples/separator-basic/main";
import * as ShadcnRadioGroupBasicExample from "../registry/default/examples/shadcn-radio-group-basic/main";
import * as ShadcnSelectBasicExample from "../registry/default/examples/shadcn-select-basic/main";
import * as ShadcnSliderBasicExample from "../registry/default/examples/shadcn-slider-basic/main";
import * as ShadcnSwitchBasicExample from "../registry/default/examples/shadcn-switch-basic/main";
import * as ShadcnTabsBasicExample from "../registry/default/examples/shadcn-tabs-basic/main";
import * as SheetBasicExample from "../registry/default/examples/sheet-basic/main";
import * as SidebarBasicExample from "../registry/default/examples/sidebar-basic/main";
import * as SkeletonBasicExample from "../registry/default/examples/skeleton-basic/main";
import * as SliderBasicExample from "../registry/default/examples/slider-basic/main";
import * as SliderDisabledExample from "../registry/default/examples/slider-disabled/main";
import * as SonnerBasicExample from "../registry/default/examples/sonner-basic/main";
import * as SwitchBasicExample from "../registry/default/examples/switch-basic/main";
import * as SwitchDisabledExample from "../registry/default/examples/switch-disabled/main";
import * as TableBasicExample from "../registry/default/examples/table-basic/main";
import * as TabsBasicExample from "../registry/default/examples/tabs-basic/main";
import * as TabsManualExample from "../registry/default/examples/tabs-manual/main";
import * as TextareaBasicExample from "../registry/default/examples/textarea-basic/main";
import * as TextareaDisabledExample from "../registry/default/examples/textarea-disabled/main";
import * as ToastBasicExample from "../registry/default/examples/toast-basic/main";
import * as ToastVariantsExample from "../registry/default/examples/toast-variants/main";
import * as ToggleBasicExample from "../registry/default/examples/toggle-basic/main";
import * as ToggleGroupBasicExample from "../registry/default/examples/toggle-group-basic/main";
import * as ToolbarBasicExample from "../registry/default/examples/toolbar-basic/main";
import * as TooltipBasicExample from "../registry/default/examples/tooltip-basic/main";
import * as TooltipNoDelayExample from "../registry/default/examples/tooltip-no-delay/main";
import * as TypographyBasicExample from "../registry/default/examples/typography-basic/main";
import * as VirtualListBasicExample from "../registry/default/examples/virtual-list-basic/main";
import * as VirtualListVariableExample from "../registry/default/examples/virtual-list-variable/main";
import * as Main from "./main";

type Message = Main.Message;

export const nativeSelectBasicExamplePreview = (
  model: NativeSelectBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: NativeSelectBasicExample.view,
    toParentMessage: (message) =>
      Main.GotNativeSelectBasicExampleMessage({ message }),
  });
};

export const sheetBasicExamplePreview = (
  model: SheetBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SheetBasicExample.view,
    toParentMessage: (message) => Main.GotSheetBasicExampleMessage({ message }),
  });
};

export const sonnerBasicExamplePreview = (
  model: SonnerBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SonnerBasicExample.view,
    toParentMessage: (message) =>
      Main.GotSonnerBasicExampleMessage({ message }),
  });
};

export const paginationBasicExamplePreview = (
  model: PaginationBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: PaginationBasicExample.view,
    toParentMessage: (message) =>
      Main.GotPaginationBasicExampleMessage({ message }),
  });
};

export const resizableBasicExamplePreview = (
  model: ResizableBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ResizableBasicExample.view,
    toParentMessage: (message) =>
      Main.GotResizableBasicExampleMessage({ message }),
  });
};

export const sidebarBasicExamplePreview = (
  model: SidebarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SidebarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotSidebarBasicExampleMessage({ message }),
  });
};

export const tableBasicExamplePreview = (
  model: TableBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TableBasicExample.view,
    toParentMessage: (message) => Main.GotTableBasicExampleMessage({ message }),
  });
};

export const separatorBasicExamplePreview = (
  model: SeparatorBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SeparatorBasicExample.view,
    toParentMessage: (message) =>
      Main.GotSeparatorBasicExampleMessage({ message }),
  });
};

export const skeletonBasicExamplePreview = (
  model: SkeletonBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SkeletonBasicExample.view,
    toParentMessage: (message) =>
      Main.GotSkeletonBasicExampleMessage({ message }),
  });
};

export const typographyBasicExamplePreview = (
  model: TypographyBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TypographyBasicExample.view,
    toParentMessage: (message) =>
      Main.GotTypographyBasicExampleMessage({ message }),
  });
};

export const navigationMenuBasicExamplePreview = (
  model: NavigationMenuBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: NavigationMenuBasicExample.view,
    toParentMessage: (message) =>
      Main.GotNavigationMenuBasicExampleMessage({ message }),
  });
};

export const otpFieldBasicExamplePreview = (
  model: OtpFieldBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: OtpFieldBasicExample.view,
    toParentMessage: (message) =>
      Main.GotOtpFieldBasicExampleMessage({ message }),
  });
};

export const previewCardBasicExamplePreview = (
  model: PreviewCardBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: PreviewCardBasicExample.view,
    toParentMessage: (message) =>
      Main.GotPreviewCardBasicExampleMessage({ message }),
  });
};

export const numberFieldBasicExamplePreview = (
  model: NumberFieldBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: NumberFieldBasicExample.view,
    toParentMessage: (message) =>
      Main.GotNumberFieldBasicExampleMessage({ message }),
  });
};

export const switchBasicExamplePreview = (
  model: SwitchBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SwitchBasicExample.view,
    toParentMessage: (message) =>
      Main.GotSwitchBasicExampleMessage({ message }),
  });
};

export const shadcnSwitchBasicExamplePreview = (
  model: ShadcnSwitchBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnSwitchBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnSwitchBasicExampleMessage({ message }),
  });
};

export const switchDisabledExamplePreview = (
  model: SwitchDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SwitchDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotSwitchDisabledExampleMessage({ message }),
  });
};

export const sliderBasicExamplePreview = (
  model: SliderBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SliderBasicExample.view,
    toParentMessage: (message) =>
      Main.GotSliderBasicExampleMessage({ message }),
  });
};

export const shadcnSliderBasicExamplePreview = (
  model: ShadcnSliderBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnSliderBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnSliderBasicExampleMessage({ message }),
  });
};

export const sliderDisabledExamplePreview = (
  model: SliderDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SliderDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotSliderDisabledExampleMessage({ message }),
  });
};

export const tabsBasicExamplePreview = (
  model: TabsBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TabsBasicExample.view,
    toParentMessage: (message) => Main.GotTabsBasicExampleMessage({ message }),
  });
};

export const shadcnTabsBasicExamplePreview = (
  model: ShadcnTabsBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnTabsBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnTabsBasicExampleMessage({ message }),
  });
};

export const tabsManualExamplePreview = (
  model: TabsManualExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TabsManualExample.view,
    toParentMessage: (message) => Main.GotTabsManualExampleMessage({ message }),
  });
};

export const tooltipBasicExamplePreview = (
  model: TooltipBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TooltipBasicExample.view,
    toParentMessage: (message) =>
      Main.GotTooltipBasicExampleMessage({ message }),
  });
};

export const tooltipNoDelayExamplePreview = (
  model: TooltipNoDelayExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TooltipNoDelayExample.view,
    toParentMessage: (message) =>
      Main.GotTooltipNoDelayExampleMessage({ message }),
  });
};

export const virtualListBasicExamplePreview = (
  model: VirtualListBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: VirtualListBasicExample.view,
    toParentMessage: (message) =>
      Main.GotVirtualListBasicExampleMessage({ message }),
  });
};

export const virtualListVariableExamplePreview = (
  model: VirtualListVariableExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: VirtualListVariableExample.view,
    toParentMessage: (message) =>
      Main.GotVirtualListVariableExampleMessage({ message }),
  });
};

export const popoverBasicExamplePreview = (
  model: PopoverBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: PopoverBasicExample.view,
    toParentMessage: (message) =>
      Main.GotPopoverBasicExampleMessage({ message }),
  });
};

export const popoverAnimatedExamplePreview = (
  model: PopoverAnimatedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: PopoverAnimatedExample.view,
    toParentMessage: (message) =>
      Main.GotPopoverAnimatedExampleMessage({ message }),
  });
};

export const radioGroupBasicExamplePreview = (
  model: RadioGroupBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: RadioGroupBasicExample.view,
    toParentMessage: (message) =>
      Main.GotRadioGroupBasicExampleMessage({ message }),
  });
};

export const shadcnRadioGroupBasicExamplePreview = (
  model: ShadcnRadioGroupBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnRadioGroupBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnRadioGroupBasicExampleMessage({ message }),
  });
};

export const radioGroupHorizontalExamplePreview = (
  model: RadioGroupHorizontalExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: RadioGroupHorizontalExample.view,
    toParentMessage: (message) =>
      Main.GotRadioGroupHorizontalExampleMessage({ message }),
  });
};

export const selectBasicExamplePreview = (
  model: SelectBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SelectBasicExample.view,
    toParentMessage: (message) =>
      Main.GotSelectBasicExampleMessage({ message }),
  });
};

export const shadcnSelectBasicExamplePreview = (
  model: ShadcnSelectBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnSelectBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnSelectBasicExampleMessage({ message }),
  });
};

export const selectDisabledExamplePreview = (
  model: SelectDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SelectDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotSelectDisabledExampleMessage({ message }),
  });
};

export const scrollAreaBasicExamplePreview = (
  model: ScrollAreaBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ScrollAreaBasicExample.view,
    toParentMessage: (message) =>
      Main.GotScrollAreaBasicExampleMessage({ message }),
  });
};

export const toggleBasicExamplePreview = (
  model: ToggleBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ToggleBasicExample.view,
    toParentMessage: (message) =>
      Main.GotToggleBasicExampleMessage({ message }),
  });
};

export const toggleGroupBasicExamplePreview = (
  model: ToggleGroupBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ToggleGroupBasicExample.view,
    toParentMessage: (message) =>
      Main.GotToggleGroupBasicExampleMessage({ message }),
  });
};

export const radioBasicExamplePreview = (
  model: RadioBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: RadioBasicExample.view,
    toParentMessage: (message) => Main.GotRadioBasicExampleMessage({ message }),
  });
};

export const toolbarBasicExamplePreview = (
  model: ToolbarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ToolbarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotToolbarBasicExampleMessage({ message }),
  });
};

export const progressBasicExamplePreview = (
  model: ProgressBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ProgressBasicExample.view,
    toParentMessage: (message) =>
      Main.GotProgressBasicExampleMessage({ message }),
  });
};

export const textareaBasicExamplePreview = (
  model: TextareaBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TextareaBasicExample.view,
    toParentMessage: (message) =>
      Main.GotTextareaBasicExampleMessage({ message }),
  });
};

export const textareaDisabledExamplePreview = (
  model: TextareaDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TextareaDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotTextareaDisabledExampleMessage({ message }),
  });
};

export const toastBasicExamplePreview = (
  model: ToastBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ToastBasicExample.view,
    toParentMessage: (message) => Main.GotToastBasicExampleMessage({ message }),
  });
};

export const toastVariantsExamplePreview = (
  model: ToastVariantsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ToastVariantsExample.view,
    toParentMessage: (message) =>
      Main.GotToastVariantsExampleMessage({ message }),
  });
};
