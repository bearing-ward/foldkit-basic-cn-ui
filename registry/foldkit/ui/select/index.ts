import { Ui } from "foldkit";

export const { descriptionId } = Ui.Select;
export const { view } = Ui.Select;

export type SelectAttributes<ParentMessage> =
  Ui.Select.SelectAttributes<ParentMessage>;
export type ViewConfig<ParentMessage> = Ui.Select.ViewConfig<ParentMessage>;

export {
  chevronClassName,
  descriptionClassName,
  labelClassName,
  selectClassName,
  selectWrapperClassName,
} from "./view";
