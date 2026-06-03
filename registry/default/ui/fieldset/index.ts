import { Ui } from "foldkit";

export const { view, legendId, descriptionId } = Ui.Fieldset;

export type FieldsetAttributes<ParentMessage> =
  Ui.Fieldset.FieldsetAttributes<ParentMessage>;
export type ViewConfig<ParentMessage> = Ui.Fieldset.ViewConfig<ParentMessage>;

export {
  descriptionClassName,
  fieldClassName,
  fieldsClassName,
  fieldsetClassName,
  inputClassName,
  labelClassName,
  legendClassName,
  textareaClassName,
} from "./view";
