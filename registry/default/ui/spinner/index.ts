import type { Attribute, Html } from "foldkit/html";
import { html } from "foldkit/html";

import { spinnerClassName } from "./view";

export { spinnerClassName } from "./view";

export type ViewConfig<ParentMessage> = Readonly<{
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[] | undefined;
}>;

export const view = <ParentMessage>({
  attributes = [],
  className,
}: ViewConfig<ParentMessage> = {}): Html => {
  const h = html<ParentMessage>();
  const classNames = [spinnerClassName, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.svg(
    [
      ...attributes,
      h.Attribute("role", "status"),
      h.AriaLabel("Loading"),
      h.Class(classNames),
      h.Xmlns("http://www.w3.org/2000/svg"),
      h.ViewBox("0 0 24 24"),
      h.Fill("none"),
    ],
    [
      h.path(
        [
          h.D("M21 12a9 9 0 1 1-6.219-8.56"),
          h.Stroke("currentColor"),
          h.StrokeWidth("2"),
          h.StrokeLinecap("round"),
          h.StrokeLinejoin("round"),
        ],
        []
      ),
    ]
  );
};
