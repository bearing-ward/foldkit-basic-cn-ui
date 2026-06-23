import * as Ui from "@foldkit/ui";

export const {
  ChangedViewMonth,
  ClickedDay,
  ClickedHeading,
  ClickedNextMonthButton,
  ClickedPreviousMonthButton,
  CompletedFocusGrid,
  FocusGrid,
  FocusedGrid,
  BlurredGrid,
  Message,
  Model,
  OutMessage,
  PagedYears,
  PressedKeyOnGrid,
  RefreshedToday,
  SelectedDate,
  SelectedMonth,
  SelectedYear,
  ViewMode,
  dropToDays,
  init,
  reflectDisabledDates,
  reflectDisabledDaysOfWeek,
  reflectMaxDate,
  reflectMinDate,
  reflectSelectedDate,
  selectDate,
  update,
  view,
} = Ui.Calendar;

export type Model = Ui.Calendar.Model;
export type Message = Ui.Calendar.Message;
export type OutMessage = Ui.Calendar.OutMessage;
export type InitConfig = Ui.Calendar.InitConfig;
export type ViewInputs = Ui.Calendar.ViewInputs;
export type CalendarAttributes = Ui.Calendar.CalendarAttributes;
export type DaysModeAttributes = Ui.Calendar.DaysModeAttributes;
export type MonthsModeAttributes = Ui.Calendar.MonthsModeAttributes;
export type YearsModeAttributes = Ui.Calendar.YearsModeAttributes;
export type DayCell = Ui.Calendar.DayCell;
export type ColumnHeader = Ui.Calendar.ColumnHeader;
export type Week = Ui.Calendar.Week;
export type MonthCell = Ui.Calendar.MonthCell;
export type YearCell = Ui.Calendar.YearCell;

export {
  calendarView,
  cellClasses,
  columnHeaderClasses,
  containerClasses,
  dayButtonClasses,
  gridClasses,
  headerClasses,
  headerRowClasses,
  headingButtonClasses,
  headingTextClasses,
  monthYearButtonClasses,
  monthYearCellClasses,
  monthYearGridClasses,
  navButtonClasses,
  weekRowClasses,
} from "./view";
