import * as Ui from "@foldkit/ui";

export const { descriptionId } = Ui.Textarea;
export const { view } = Ui.Textarea;

export type TextareaAttributes<ParentMessage> =
  Ui.Textarea.TextareaAttributes<ParentMessage>;
export type ViewConfig<ParentMessage> = Ui.Textarea.ViewConfig<ParentMessage>;

export {
  descriptionClasses,
  fieldClasses,
  labelClasses,
  textareaClasses,
} from "./view";
