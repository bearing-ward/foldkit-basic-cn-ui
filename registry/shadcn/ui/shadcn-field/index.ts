import type { Html } from "foldkit/html";

import * as FoldkitField from "../../../foldkit/ui/field";

export {
  shadcnFieldControlClasses,
  shadcnFieldDescriptionClasses,
  shadcnFieldErrorClasses,
  shadcnFieldItemClasses,
  shadcnFieldLabelClasses,
  shadcnFieldRootClasses,
  shadcnFieldValidityClasses,
} from "./view";

type WithClassName<Config> = Omit<Config, "classes"> &
  Readonly<{ className?: string | undefined }>;

export type FieldState = FoldkitField.FieldState;
export type FieldStyle = FoldkitField.FieldStyle;
export type RootViewConfig = WithClassName<FoldkitField.RootViewConfig>;
export type LabelViewConfig = WithClassName<FoldkitField.LabelViewConfig>;
export type ControlViewConfig<ParentMessage> = WithClassName<
  FoldkitField.ControlViewConfig<ParentMessage>
>;
export type DescriptionViewConfig = WithClassName<
  FoldkitField.DescriptionViewConfig
>;
export type ErrorViewConfig = WithClassName<FoldkitField.ErrorViewConfig>;
export type ItemViewConfig = WithClassName<FoldkitField.ItemViewConfig>;

export const rootView = <ParentMessage>({
  className,
  ...config
}: RootViewConfig): Html =>
  FoldkitField.rootView<ParentMessage>({ ...config, classes: className });

export const labelView = <ParentMessage>({
  className,
  ...config
}: LabelViewConfig): Html =>
  FoldkitField.labelView<ParentMessage>({ ...config, classes: className });

export const controlView = <ParentMessage>({
  className,
  ...config
}: ControlViewConfig<ParentMessage>): Html =>
  FoldkitField.controlView<ParentMessage>({ ...config, classes: className });

export const descriptionView = <ParentMessage>({
  className,
  ...config
}: DescriptionViewConfig): Html =>
  FoldkitField.descriptionView<ParentMessage>({
    ...config,
    classes: className,
  });

export const errorView = <ParentMessage>({
  className,
  ...config
}: ErrorViewConfig): Html =>
  FoldkitField.errorView<ParentMessage>({ ...config, classes: className });

export const itemView = <ParentMessage>({
  className,
  ...config
}: ItemViewConfig): Html =>
  FoldkitField.itemView<ParentMessage>({ ...config, classes: className });

export const validityView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => FoldkitField.validityView<ParentMessage>(children, className);
