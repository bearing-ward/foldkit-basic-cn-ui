import { Array, Match as M } from "effect";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Accordion from "../../../registry/base-ui/ui/base-ui-accordion";
import * as Alert from "../../../registry/shadcn/ui/alert";
import * as Kbd from "../../../registry/shadcn/ui/kbd";

export type DisplayPrimitiveMapping = Readonly<{
  shadcnConcept: string;
  localSource: string;
  fallback: string;
}>;

export const displayPrimitiveMappings = [
  {
    shadcnConcept: "h1-h6, HeadingAnchor",
    localSource: "src/openstory/documentation/displayTemplate.ts",
    fallback: "Foldkit heading helpers with stable slug IDs and anchor links",
  },
  {
    shadcnConcept: "p, strong, lists, blockquote, table",
    localSource: "src/openstory/documentation/displayTemplate.ts",
    fallback: "Foldkit prose and table helpers",
  },
  {
    shadcnConcept: "Callout / Alert",
    localSource: "registry/shadcn/ui/alert",
    fallback: "Local shadcn-lane Alert until a Base UI Alert helper exists",
  },
  {
    shadcnConcept: "Button",
    localSource: "registry/base-ui/ui/base-ui-button",
    fallback: "Base UI button display helper",
  },
  {
    shadcnConcept: "Tabs / CodeTabs",
    localSource: "registry/base-ui/ui/base-ui-tabs",
    fallback: "Base UI tabs display helper for future stateful code tabs",
  },
  {
    shadcnConcept: "Accordion",
    localSource: "registry/base-ui/ui/base-ui-accordion",
    fallback: "Base UI accordion helper",
  },
  {
    shadcnConcept: "Kbd",
    localSource: "registry/shadcn/ui/kbd",
    fallback: "Local shadcn-lane Kbd until a Base UI equivalent exists",
  },
  {
    shadcnConcept: "AspectRatio / image frames",
    localSource: "registry/shadcn/ui/aspect-ratio",
    fallback: "Local shadcn-lane AspectRatio until a Base UI equivalent exists",
  },
  {
    shadcnConcept: "ComponentPreview",
    localSource: "src/openstory/generated",
    fallback: "Generated OpenStory example story links",
  },
  {
    shadcnConcept: "ComponentSource / CodeBlockCommand",
    localSource: "apps/docs/public/sources",
    fallback: "Generated source snapshot links and local source paths",
  },
  {
    shadcnConcept: "ComponentsList",
    localSource: "registry/registry.json",
    fallback: "Local registry metadata and generated OpenStory group index",
  },
] as const satisfies readonly DisplayPrimitiveMapping[];

export type MetadataItem = Readonly<{
  label: string;
  value: string;
  href?: string | undefined;
}>;

export type TableColumn<Row> = Readonly<{
  header: string;
  cell: (row: Row) => Html | string;
  code?: boolean | undefined;
}>;

export type AccordionItem<ParentMessage> = Readonly<{
  value: string;
  title: string;
  children: readonly Html[];
  onValueChange: ParentMessage;
}>;

export const shellClasses =
  "min-h-screen bg-white px-4 py-6 text-slate-950 sm:px-6";
export const containerClasses = "mx-auto flex w-full max-w-6xl flex-col gap-6";
export const panelClasses =
  "rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm";
export const proseClasses = "text-sm leading-6 text-slate-600";
export const sectionHeadingClasses = "text-xl font-semibold text-slate-950";
export const codeClasses =
  "overflow-x-auto rounded-[6px] border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-5 text-slate-50";

export const slugifyHeading = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, "");

const inlineCodeClasses =
  "rounded-[4px] bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800";

const linkClasses = "text-sky-700 underline-offset-4 hover:underline";

export const pageShell = <ParentMessage>(children: readonly Html[]): Html => {
  const h = html<ParentMessage>();

  return h.main(
    [
      h.DataAttribute("openstory-documentation-template", ""),
      h.Class(shellClasses),
    ],
    [h.div([h.Class(containerClasses)], children)]
  );
};

export const heading = <ParentMessage>(
  level: 1 | 2 | 3,
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  const slug = slugifyHeading(label);
  const attributes = [
    h.Id(slug),
    h.Class(
      className ??
        M.value(level).pipe(
          M.when(1, () => "text-4xl font-semibold text-slate-950"),
          M.when(2, () => sectionHeadingClasses),
          M.when(3, () => "text-base font-semibold text-slate-950"),
          M.exhaustive
        )
    ),
  ];
  const children = [
    h.span([], [label]),
    h.a(
      [
        h.Href(`#${slug}`),
        h.Attribute("aria-hidden", "true"),
        h.Class("ml-2 text-slate-300 no-underline hover:text-slate-500"),
      ],
      []
    ),
  ];

  return M.value(level).pipe(
    M.when(1, () => h.h1(attributes, children)),
    M.when(2, () => h.h2(attributes, children)),
    M.when(3, () => h.h3(attributes, children)),
    M.exhaustive
  );
};

export const eyebrow = <ParentMessage>(label: string): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [h.Class("font-mono text-xs font-medium uppercase text-slate-500")],
    [label]
  );
};

export const metadataGrid = <ParentMessage>(
  items: readonly MetadataItem[]
): Html => {
  const h = html<ParentMessage>();

  return h.dl(
    [h.Class("grid gap-4 md:grid-cols-2 lg:grid-cols-3")],
    items.map((item) =>
      h.div(
        [h.Class("grid gap-1")],
        [
          h.dt(
            [h.Class("text-xs font-semibold uppercase text-slate-500")],
            [item.label]
          ),
          h.dd(
            [h.Class("min-w-0 text-sm text-slate-800")],
            [
              item.href === undefined
                ? h.code(
                    [h.Class("break-words font-mono text-xs")],
                    [item.value]
                  )
                : h.a(
                    [h.Href(item.href), h.Class(`break-words ${linkClasses}`)],
                    [item.value]
                  ),
            ]
          ),
        ]
      )
    )
  );
};

export const section = <ParentMessage>(
  label: string,
  children: readonly Html[]
): Html => {
  const h = html<ParentMessage>();

  return h.section(
    [h.Class(`${panelClasses} space-y-4`)],
    [heading<ParentMessage>(2, label), ...children]
  );
};

export const paragraphs = <ParentMessage>(
  values: readonly string[]
): readonly Html[] => {
  const h = html<ParentMessage>();

  return values.map((value) => h.p([h.Class(proseClasses)], [value]));
};

export const list = <ParentMessage>(items: readonly string[]): Html => {
  const h = html<ParentMessage>();

  return h.ul(
    [h.Class("list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600")],
    items.map((item) => h.li([], [item]))
  );
};

export const codeBlock = <ParentMessage>(source: string): Html => {
  const h = html<ParentMessage>();

  return h.pre([h.Class(codeClasses)], [h.code([], [source])]);
};

export const commandBlocks = <ParentMessage>(
  commands: readonly string[]
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class("grid gap-2")],
    commands.map((command) =>
      h.pre(
        [h.Class("overflow-x-auto rounded-[6px] bg-slate-100 p-3")],
        [h.code([h.Class("font-mono text-xs text-slate-800")], [command])]
      )
    )
  );
};

export const table = <ParentMessage, Row>(
  columns: readonly TableColumn<Row>[],
  rows: readonly Row[]
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class("overflow-x-auto")],
    [
      h.table(
        [h.Class("w-full border-collapse text-left text-sm")],
        [
          h.thead(
            [],
            [
              h.tr(
                [h.Class("border-b border-slate-200 text-slate-500")],
                columns.map((column) =>
                  h.th([h.Class("py-2 pr-4 font-semibold")], [column.header])
                )
              ),
            ]
          ),
          h.tbody(
            [],
            rows.map((row) =>
              h.tr(
                [h.Class("border-b border-slate-100 align-top")],
                [
                  ...columns.map((column) =>
                    h.td(
                      [h.Class("py-3 pr-4 text-slate-600")],
                      [
                        column.code === true
                          ? h.code(
                              [h.Class("font-mono text-xs text-slate-950")],
                              [column.cell(row)]
                            )
                          : column.cell(row),
                      ]
                    )
                  ),
                ]
              )
            )
          ),
        ]
      ),
    ]
  );
};

export const callout = <ParentMessage>(
  title: string,
  description: string
): Html =>
  Alert.view<ParentMessage>({
    title,
    description,
    variant: "Default",
    className: "border-amber-200 bg-amber-50",
  });

export const kbd = <ParentMessage>(label: string): Html =>
  Kbd.view<ParentMessage>({ label, size: "Small" });

export const accordion = <ParentMessage>(
  openValues: readonly string[],
  items: readonly AccordionItem<ParentMessage>[],
  idPrefix: string
): Html =>
  Accordion.rootView<ParentMessage>({
    openValues,
    className: "rounded-[8px] border border-slate-200",
    children: items.map((item) =>
      Accordion.itemView<ParentMessage>({
        value: item.value,
        openValues,
        onValueChange: item.onValueChange,
        title: item.title,
        idPrefix,
        children: item.children,
      })
    ),
  });

export const sourceList = <ParentMessage>(
  rows: readonly Readonly<{
    label: string;
    path: string;
    href?: string | undefined;
  }>[]
): Html => {
  const h = html<ParentMessage>();

  return Array.match(rows, {
    onEmpty: () => h.empty,
    onNonEmpty: (items) =>
      h.ul(
        [h.Class("grid gap-2 text-sm text-slate-600")],
        items.map((item) =>
          h.li(
            [h.Class("grid gap-1 rounded-[6px] bg-slate-50 p-3")],
            [
              h.span([h.Class("font-medium text-slate-950")], [item.label]),
              item.href === undefined
                ? h.code([h.Class(inlineCodeClasses)], [item.path])
                : h.a([h.Href(item.href), h.Class(linkClasses)], [item.path]),
            ]
          )
        )
      ),
  });
};
