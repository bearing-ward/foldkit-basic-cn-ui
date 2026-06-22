import { Ui } from "foldkit";

export const { descriptionId } = Ui.Input;
export const { view } = Ui.Input;

export type InputAttributes<ParentMessage> =
  Ui.Input.InputAttributes<ParentMessage>;
export type ViewConfig<ParentMessage> = Ui.Input.ViewConfig<ParentMessage>;

export {
  descriptionClasses,
  fieldClasses,
  inputClasses,
  labelClasses,
} from "./view";
