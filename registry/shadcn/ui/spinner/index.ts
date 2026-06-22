import type { Attribute, Html } from "foldkit/html";
import { html } from "foldkit/html";

import { spinnerClasses } from "./view";

export { spinnerClasses } from "./view";

export type ViewConfig<ParentMessage> = Readonly<{
  classes?: string;
  attributes?: readonly Attribute<ParentMessage>[] | undefined;
}>;

export const view = <ParentMessage>({
  attributes = [],
  classes,
}: ViewConfig<ParentMessage> = {}): Html => {
  const h = html<ParentMessage>();
  const cn = [spinnerClasses, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.svg(
    [
      ...attributes,
      h.Attribute("role", "status"),
      h.AriaLabel("Loading"),
      h.Class(cn),
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
