import { Array, Match as M, Option, Schema as S } from "effect";
import type { Command } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

// MODEL

export type XrayAttribute = Readonly<{
  name: string;
  value: string;
}>;

export type XrayStyle = Readonly<{
  name: string;
  value: string;
}>;

export type XrayPart = Readonly<{
  id: string;
  label: string;
  tag: string;
  description: string;
  classes: readonly string[];
  attributes: readonly XrayAttribute[];
  styles: readonly XrayStyle[];
  children: readonly XrayPart[];
}>;

export type XrayConfig = Readonly<{
  title: string;
  summary: string;
  parts: readonly XrayPart[];
}>;

export const Model = S.Struct({
  maybeActivePartId: S.Option(S.String),
});
export type Model = typeof Model.Type;

// MESSAGE

export const HoveredPart = m("HoveredPart", { partId: S.String });
export const FocusedPart = m("FocusedPart", { partId: S.String });
export const SelectedPart = m("SelectedPart", { partId: S.String });
export const ClearedPart = m("ClearedPart");
export const Message = S.Union([
  HoveredPart,
  FocusedPart,
  SelectedPart,
  ClearedPart,
]);
export type Message = typeof Message.Type;

// INIT

type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

const withUpdateReturn = M.withReturnType<UpdateReturn>();

export const init = (): UpdateReturn => [
  { maybeActivePartId: Option.none() },
  [],
];

// UPDATE

const activatePart = (model: Model, partId: string): Model =>
  evo(model, { maybeActivePartId: () => Option.some(partId) });

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    withUpdateReturn,
    M.tagsExhaustive({
      HoveredPart: ({ partId }) => [activatePart(model, partId), []],
      FocusedPart: ({ partId }) => [activatePart(model, partId), []],
      SelectedPart: ({ partId }) => [activatePart(model, partId), []],
      ClearedPart: () => [
        evo(model, { maybeActivePartId: () => Option.none() }),
        [],
      ],
    })
  );

// VIEW

const shellClasses =
  "min-h-screen bg-white px-4 py-6 text-slate-950 [--xray-accent:37_99%_55%] [--xray-border:215_16%_82%] sm:px-6 lg:px-8";
const containerClasses = "mx-auto flex w-full max-w-7xl flex-col gap-6";
const eyebrowClasses =
  "font-mono text-xs font-medium uppercase tracking-[0.08em] text-slate-500";
const panelClasses =
  "rounded-[8px] border border-slate-200 bg-white shadow-sm";
const panelHeaderClasses = "border-b border-slate-200 px-4 py-3";
const panelTitleClasses = "text-sm font-semibold text-slate-950";
const panelBodyClasses = "p-4";
const codeButtonBaseClasses =
  "group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[6px] border px-3 py-2 text-left font-mono text-[12px] leading-5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500";
const previewBoxBaseClasses =
  "flex min-h-12 flex-col gap-2 rounded-[7px] border border-slate-200 bg-slate-50 p-3 transition";
const activeClasses =
  "border-amber-400 bg-amber-50 ring-2 ring-amber-300 ring-offset-2 ring-offset-white";

const findPartById = (
  parts: readonly XrayPart[],
  partId: string
): Option.Option<XrayPart> =>
  Array.findFirst(parts, (part) => part.id === partId).pipe(
    Option.orElse(() =>
      Array.findFirst(
        Array.flatMap(parts, (part) => part.children),
        (part) => Option.isSome(findPartById([part], partId))
      ).pipe(Option.flatMap((part) => findPartById([part], partId)))
    )
  );

const firstPart = (parts: readonly XrayPart[]): Option.Option<XrayPart> =>
  Array.head(parts);

const activePart = (
  config: XrayConfig,
  model: Model
): Option.Option<XrayPart> =>
  model.maybeActivePartId.pipe(
    Option.flatMap((partId) => findPartById(config.parts, partId)),
    Option.orElse(() => firstPart(config.parts))
  );

const isActivePart = (model: Model, part: XrayPart): boolean =>
  model.maybeActivePartId.pipe(
    Option.match({
      onNone: () => false,
      onSome: (partId) => partId === part.id,
    })
  );

const classSummary = (part: XrayPart): string =>
  Array.match(part.classes, {
    onEmpty: () => "",
    onNonEmpty: (classes) => ` class="${classes.join(" ")}"`,
  });

const attributeSummary = (part: XrayPart): string =>
  Array.match(part.attributes, {
    onEmpty: () => "",
    onNonEmpty: (attributes) =>
      ` ${attributes
        .map((attribute) => `${attribute.name}="${attribute.value}"`)
        .join(" ")}`,
  });

const formatAttribute = (attribute: XrayAttribute): string =>
  `${attribute.name}="${attribute.value}"`;

const formatStyle = (style: XrayStyle): string =>
  `${style.name}: ${style.value}`;

const renderCodeRow = (model: Model, part: XrayPart, depth: number): Html => {
  const h = html<Message>();
  const active = isActivePart(model, part);
  const branchMarker = Array.match(part.children, {
    onEmpty: () => "/",
    onNonEmpty: () => "...",
  });

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(`Inspect ${part.label} ${part.tag}`),
      h.AriaPressed(active ? "true" : "false"),
      h.OnMouseEnter(HoveredPart({ partId: part.id })),
      h.OnMouseLeave(ClearedPart()),
      h.OnFocus(FocusedPart({ partId: part.id })),
      h.OnBlur(ClearedPart()),
      h.OnClick(SelectedPart({ partId: part.id })),
      h.Class(
        `${codeButtonBaseClasses} ${
          active
            ? "border-amber-300 bg-amber-50 text-slate-950"
            : "border-transparent bg-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"
        }`
      ),
      h.Style({ paddingLeft: `${12 + depth * 18}px` }),
    ],
    [
      h.span(
        [h.Class("min-w-0 truncate")],
        [
          h.span([h.Class("text-slate-400")], ["<"]),
          h.span([h.Class("text-sky-700")], [part.tag]),
          h.span([h.Class("text-emerald-700")], [classSummary(part)]),
          h.span([h.Class("text-violet-700")], [attributeSummary(part)]),
          h.span([h.Class("text-slate-400")], [` ${branchMarker}>`]),
        ]
      ),
      h.span([h.Class("text-xs text-slate-500")], [part.label]),
    ]
  );
};

const renderCodeRows = (
  model: Model,
  parts: readonly XrayPart[],
  depth = 0
): readonly Html[] =>
  Array.flatMap(parts, (part) => [
    renderCodeRow(model, part, depth),
    ...renderCodeRows(model, part.children, depth + 1),
  ]);

const renderPreviewPart = (model: Model, part: XrayPart): Html => {
  const h = html<Message>();
  const active = isActivePart(model, part);

  return h.div(
    [
      h.DataAttribute("xray-part", part.id),
      h.Class(
        `${previewBoxBaseClasses} ${active ? activeClasses : "hover:border-slate-300"}`
      ),
    ],
    [
      h.div(
        [h.Class("flex items-center justify-between gap-3")],
        [
          h.span(
            [h.Class("text-sm font-semibold text-slate-900")],
            [part.label]
          ),
          h.span([h.Class("font-mono text-xs text-slate-500")], [part.tag]),
        ]
      ),
      h.div(
        [h.Class("flex flex-wrap gap-1.5")],
        part.classes
          .slice(0, 4)
          .map((classes) =>
            h.span(
              [
                h.Class(
                  "rounded-[4px] border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[11px] text-slate-600"
                ),
              ],
              [classes]
            )
          )
      ),
      ...Array.match(part.children, {
        onEmpty: () => [],
        onNonEmpty: (children) => [
          h.div(
            [h.Class("grid gap-2 pl-3 sm:grid-cols-2")],
            children.map((child) => renderPreviewPart(model, child))
          ),
        ],
      }),
    ]
  );
};

const renderMetadataList = (label: string, values: readonly string[]): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-2")],
    [
      h.h3(
        [h.Class("text-xs font-semibold uppercase text-slate-500")],
        [label]
      ),
      Array.match(values, {
        onEmpty: () =>
          h.p([h.Class("text-sm text-slate-500")], ["No values declared"]),
        onNonEmpty: (items) =>
          h.div(
            [h.Class("flex flex-wrap gap-1.5")],
            items.map((item) =>
              h.code(
                [
                  h.Class(
                    "rounded-[4px] border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[12px] text-slate-700"
                  ),
                ],
                [item]
              )
            )
          ),
      }),
    ]
  );
};

const renderDetails = (maybePart: Option.Option<XrayPart>): Html => {
  const h = html<Message>();

  return maybePart.pipe(
    Option.match({
      onNone: () =>
        h.div(
          [h.Class(`${panelClasses} p-4 text-sm text-slate-500`)],
          ["No anatomy parts are available."]
        ),
      onSome: (part) =>
        h.aside(
          [
            h.Class(`${panelClasses} lg:sticky lg:top-6`),
            h.AriaLabel("Selected anatomy details"),
          ],
          [
            h.div(
              [h.Class(panelHeaderClasses)],
              [
                h.p([h.Class(eyebrowClasses)], ["Selected part"]),
                h.h2(
                  [h.Class("mt-1 text-lg font-semibold text-slate-950")],
                  [part.label]
                ),
              ]
            ),
            h.div(
              [h.Class(`${panelBodyClasses} space-y-4`)],
              [
                h.p(
                  [h.Class("text-sm leading-6 text-slate-600")],
                  [part.description]
                ),
                renderMetadataList("Tag", [part.tag]),
                renderMetadataList("Classes", part.classes),
                renderMetadataList(
                  "Attributes",
                  part.attributes.map(formatAttribute)
                ),
                renderMetadataList("Styles", part.styles.map(formatStyle)),
              ]
            ),
          ]
        ),
    })
  );
};

export const view =
  (config: XrayConfig) =>
  (model: Model): Html => {
    const h = html<Message>();
    const maybeActivePart = activePart(config, model);

    return h.main(
      [h.Class(shellClasses)],
      [
        h.div(
          [h.Class(containerClasses)],
          [
            h.header(
              [h.Class("max-w-3xl space-y-2")],
              [
                h.p([h.Class(eyebrowClasses)], ["Anatomy x-ray"]),
                h.h1(
                  [h.Class("text-3xl font-semibold text-slate-950")],
                  [config.title]
                ),
                h.p(
                  [h.Class("text-base leading-7 text-slate-600")],
                  [config.summary]
                ),
              ]
            ),
            h.div(
              [
                h.Class(
                  "grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
                ),
              ],
              [
                h.section(
                  [h.Class("grid gap-4 xl:grid-cols-2")],
                  [
                    h.div(
                      [h.Class(panelClasses)],
                      [
                        h.div(
                          [h.Class(panelHeaderClasses)],
                          [
                            h.h2(
                              [h.Class(panelTitleClasses)],
                              ["Rendered HTML map"]
                            ),
                          ]
                        ),
                        h.div(
                          [h.Class(`${panelBodyClasses} space-y-1`)],
                          renderCodeRows(model, config.parts)
                        ),
                      ]
                    ),
                    h.div(
                      [h.Class(panelClasses)],
                      [
                        h.div(
                          [h.Class(panelHeaderClasses)],
                          [
                            h.h2(
                              [h.Class(panelTitleClasses)],
                              ["Preview map"]
                            ),
                          ]
                        ),
                        h.div(
                          [h.Class(`${panelBodyClasses} space-y-3`)],
                          config.parts.map((part) =>
                            renderPreviewPart(model, part)
                          )
                        ),
                      ]
                    ),
                  ]
                ),
                renderDetails(maybeActivePart),
              ]
            ),
          ]
        ),
      ]
    );
  };

export const defineProgram = (config: XrayConfig) => ({
  Model,
  Message,
  init,
  update,
  view: view(config),
});
