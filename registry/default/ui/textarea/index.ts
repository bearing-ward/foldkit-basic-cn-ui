import { Ui } from "foldkit";

export const { descriptionId } = Ui.Textarea;
export const { view } = Ui.Textarea;

export type TextareaAttributes<ParentMessage> =
  Ui.Textarea.TextareaAttributes<ParentMessage>;
export type ViewConfig<ParentMessage> = Ui.Textarea.ViewConfig<ParentMessage>;

export {
  descriptionClassName,
  fieldClassName,
  labelClassName,
  textareaClassName,
} from "./view";
