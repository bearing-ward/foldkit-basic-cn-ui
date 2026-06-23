import * as Ui from "@foldkit/ui";

export const { descriptionId } = Ui.Select;
export const { view } = Ui.Select;

export type SelectAttributes<ParentMessage> =
  Ui.Select.SelectAttributes<ParentMessage>;
export type ViewConfig<ParentMessage> = Ui.Select.ViewConfig<ParentMessage>;

export {
  chevronClasses,
  descriptionClasses,
  labelClasses,
  selectClasses,
  selectWrapperClasses,
} from "./view";
