import * as Ui from "@foldkit/ui";

export const {
  ChangedViewMonth,
  Cleared,
  Closed,
  GotCalendarMessage,
  GotPopoverMessage,
  Message,
  Model,
  Opened,
  OutMessage,
  RequestedSelectDate,
  SelectedDate,
  clear,
  close,
  init,
  open,
  reflectDisabledDates,
  reflectDisabledDaysOfWeek,
  reflectMaxDate,
  reflectMinDate,
  reflectSelectedDate,
  selectDate,
  update,
  view,
} = Ui.DatePicker;

export type Model = Ui.DatePicker.Model;
export type Message = Ui.DatePicker.Message;
export type OutMessage = Ui.DatePicker.OutMessage;
export type InitConfig = Ui.DatePicker.InitConfig;
export type ViewInputs = Ui.DatePicker.ViewInputs;

export {
  anchorConfig,
  backdropClasses,
  datePickerViewInputs,
  formatDate,
  panelClasses,
  placeholderClasses,
  triggerClasses,
  triggerContent,
  triggerContentClasses,
  wrapperClasses,
} from "./view";
