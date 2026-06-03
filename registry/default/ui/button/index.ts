import { Ui } from "foldkit";

export const { view } = Ui.Button;

export type ButtonAttributes<ParentMessage> =
  Ui.Button.ButtonAttributes<ParentMessage>;
export type ViewConfig<ParentMessage> = Ui.Button.ViewConfig<ParentMessage>;

export {
  buttonClassName,
  destructiveButtonClassName,
  secondaryButtonClassName,
} from "./view";
