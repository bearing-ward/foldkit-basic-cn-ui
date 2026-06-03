import { Ui } from "foldkit";

export const { descriptionId } = Ui.Input;
export const { view } = Ui.Input;

export type InputAttributes<ParentMessage> =
  Ui.Input.InputAttributes<ParentMessage>;
export type ViewConfig<ParentMessage> = Ui.Input.ViewConfig<ParentMessage>;

export {
  descriptionClassName,
  fieldClassName,
  inputClassName,
  labelClassName,
} from "./view";
