import { Array, Match as M, Option, Schema as S } from "effect"
import type { Command } from "foldkit"
import type { Attribute, Html } from "foldkit/html"
import { html } from "foldkit/html"
import { m } from "foldkit/message"
import { evo } from "foldkit/struct"

// MODEL

export type XrayAttribute = Readonly<{
  name: string
  value: string
}>

export type XrayStyle = Readonly<{
  name: string
  value: string
}>

export type XrayPart = Readonly<{
  id: string
  label: string
  tag: string
  description: string
  classes: readonly string[]
  attributes: readonly XrayAttribute[]
  styles: readonly XrayStyle[]
  children: readonly XrayPart[]
}>

export type XrayPreviewContext = Readonly<{
  model: Model
  activePart: Option.Option<XrayPart>
  partAttributes: (
    partId: string,
    classes?: string
  ) => ReadonlyArray<Attribute<Message>>
}>

export type XrayConfig = Readonly<{
  title: string
  summary: string
  parts: readonly XrayPart[]
  preview: (context: XrayPreviewContext) => Html
}>

export const Model = S.Struct({
  maybeActivePartId: S.Option(S.String),
})
export type Model = typeof Model.Type

// MESSAGE

export const HoveredPart = m("HoveredPart", { partId: S.String })
export const FocusedPart = m("FocusedPart", { partId: S.String })
export const SelectedPart = m("SelectedPart", { partId: S.String })
export const ClearedPart = m("ClearedPart")
export const Message = S.Union([
  HoveredPart,
  FocusedPart,
  SelectedPart,
  ClearedPart,
])
export type Message = typeof Message.Type

// INIT

type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]]

const withUpdateReturn = M.withReturnType<UpdateReturn>()

export const init = (): UpdateReturn => [
  { maybeActivePartId: Option.none() },
  [],
]

// UPDATE

const activatePart = (model: Model, partId: string): Model =>
  evo(model, { maybeActivePartId: () => Option.some(partId) })

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
  )

// VIEW

const shellClasses =
  " bg-white px-4 py-6 text-slate-950 [--xray-accent:37_99%_55%] [--xray-border:215_16%_82%] sm:px-6 lg:px-8"
const containerClasses = "mx-auto flex w-full max-w-7xl flex-col gap-6"
const eyebrowClasses =
  "font-mono text-xs font-medium uppercase tracking-[0.08em] text-slate-500"
const panelHeaderClasses = "px-4 py-3"
const panelTitleClasses = "text-sm font-semibold text-slate-950"
const panelBodyClasses = "p-4"
const codeButtonBaseClasses =
  "group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[6px] border px-3 py-2 text-left font-mono text-[12px] leading-5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
const previewHighlightClasses =
  "ring-2 ring-amber-300 ring-offset-2 ring-offset-white outline outline-1 outline-amber-400"
const overlayBoxClasses =
  "pointer-events-auto rounded-[6px] bg-white/90 px-3 py-2 font-mono text-[11px] leading-5 text-slate-700"
const overlayEmptyClasses = "text-slate-400"

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
  )

const firstPart = (parts: readonly XrayPart[]): Option.Option<XrayPart> =>
  Array.head(parts)

const activePart = (
  config: XrayConfig,
  model: Model
): Option.Option<XrayPart> =>
  model.maybeActivePartId.pipe(
    Option.flatMap((partId) => findPartById(config.parts, partId)),
    Option.orElse(() => firstPart(config.parts))
  )

const isDisplayedPart = (
  maybePart: Option.Option<XrayPart>,
  part: XrayPart
): boolean =>
  maybePart.pipe(
    Option.match({
      onNone: () => false,
      onSome: (active) => active.id === part.id,
    })
  )

const isDisplayedPartId = (
  maybePart: Option.Option<XrayPart>,
  partId: string
): boolean =>
  maybePart.pipe(
    Option.match({
      onNone: () => false,
      onSome: (active) => active.id === partId,
    })
  )

const previewPartAttributes =
  (maybeActivePart: Option.Option<XrayPart>) =>
    (partId: string, classes = ""): ReadonlyArray<Attribute<Message>> => {
      const h = html<Message>()
      const active = isDisplayedPartId(maybeActivePart, partId)
      const className = [classes, active ? previewHighlightClasses : ""]
        .filter((value) => value !== "")
        .join(" ")
      const attributes: ReadonlyArray<Attribute<Message>> = [
        h.DataAttribute("xray-preview-part", partId),
        h.DataAttribute("xray-preview-active", active ? "true" : "false"),
        h.Tabindex(0),
        h.OnMouseEnter(HoveredPart({ partId })),
        h.OnMouseLeave(ClearedPart()),
        h.OnFocus(FocusedPart({ partId })),
        h.OnBlur(ClearedPart()),
        h.OnClick(SelectedPart({ partId })),
      ]

      if (className === "") {
        return attributes
      }

      return [...attributes, h.Class(className)]
    }

const classSummary = (part: XrayPart): string =>
  Array.match(part.classes, {
    onEmpty: () => "",
    onNonEmpty: (classes) => ` class="${classes.join(" ")}"`,
  })

const attributeSummary = (part: XrayPart): string =>
  Array.match(part.attributes, {
    onEmpty: () => "",
    onNonEmpty: (attributes) =>
      ` ${attributes
        .map((attribute) => `${attribute.name}="${attribute.value}"`)
        .join(" ")}`,
  })

const formatAttribute = (attribute: XrayAttribute): string =>
  `${attribute.name}="${attribute.value}"`

const formatStyle = (style: XrayStyle): string =>
  `${style.name}: ${style.value}`

const renderCodeRow = (
  maybeActivePart: Option.Option<XrayPart>,
  part: XrayPart,
  depth: number
): Html => {
  const h = html<Message>()
  const active = isDisplayedPart(maybeActivePart, part)
  const branchMarker = Array.match(part.children, {
    onEmpty: () => "/",
    onNonEmpty: () => "...",
  })

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
        `${codeButtonBaseClasses} ${active
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
  )
}

const renderCodeRows = (
  maybeActivePart: Option.Option<XrayPart>,
  parts: readonly XrayPart[],
  depth = 0
): readonly Html[] =>
  Array.flatMap(parts, (part) => [
    renderCodeRow(maybeActivePart, part, depth),
    ...renderCodeRows(maybeActivePart, part.children, depth + 1),
  ])

const renderOverlayIdentity = (part: XrayPart): Html => {
  const h = html<Message>()

  return h.div(
    [
      h.DataAttribute("testid", "anatomy-xray-overlay-identity"),
      h.Class(overlayBoxClasses),
    ],
    [
      h.div([h.Class("font-semibold text-slate-950")], [part.tag]),
      Array.match(part.classes, {
        onEmpty: () => h.div([h.Class(overlayEmptyClasses)], ["No classes"]),
        onNonEmpty: (classes) =>
          h.div(
            // [h.Class("mt-1 grid gap-0.5")],
            [],
            classes.map((className) => h.div([], [`.${className}`]))
          ),
      }),
    ]
  )
}

const renderOverlayStyles = (part: XrayPart): Html => {
  const h = html<Message>()

  return h.div(
    [
      h.DataAttribute("testid", "anatomy-xray-overlay-styles"),
      h.Class(`${overlayBoxClasses} text-right`),
    ],
    [
      Array.match(part.styles.map(formatStyle), {
        onEmpty: () => h.div([h.Class(overlayEmptyClasses)], ["No styles"]),
        onNonEmpty: (items) =>
          h.div(
            [h.Class("grid gap-0.5")],
            items.map((item) => h.div([], [item]))
          ),
      }),
    ]
  )
}

const renderOverlayAttributes = (part: XrayPart): Html => {
  const h = html<Message>()

  return h.div(
    [
      h.DataAttribute("testid", "anatomy-xray-overlay-attributes"),
      h.Class(overlayBoxClasses),
    ],
    [
      Array.match(part.attributes.map(formatAttribute), {
        onEmpty: () => h.div([h.Class(overlayEmptyClasses)], ["No attributes"]),
        onNonEmpty: (items) =>
          h.div(
            [h.Class("grid gap-0.5")],
            items.map((item) => h.div([], [item]))
          ),
      }),
    ]
  )
}

const renderSelectedPartOverlay = (
  maybePart: Option.Option<XrayPart>
): Html => {
  const h = html<Message>()

  return maybePart.pipe(
    Option.match({
      onNone: () =>
        h.div(
          [
            h.DataAttribute("testid", "anatomy-xray-overlay"),
            h.Class(
              "pointer-events-none absolute inset-3 z-10 flex items-start justify-between gap-3"
            ),
          ],
          [
            h.div(
              [h.Class(overlayBoxClasses)],
              [h.div([h.Class(overlayEmptyClasses)], ["No anatomy parts"])]
            ),
          ]
        ),
      onSome: (part) =>
        h.div(
          [
            h.DataAttribute("testid", "anatomy-xray-overlay"),
            h.Class("pointer-events-none absolute inset-3 z-10"),
          ],
          [
            h.div(
              [h.Class("absolute top-0 left-0")],
              [renderOverlayIdentity(part)]
            ),
            h.div(
              [h.Class("absolute top-0 right-0")],
              [renderOverlayStyles(part)]
            ),
            h.div(
              [h.Class("absolute right-0 bottom-0 left-0")],
              [renderOverlayAttributes(part)]
            ),
          ]
        ),
    })
  )
}

export const view =
  (config: XrayConfig) =>
    (model: Model): Html => {
      const h = html<Message>()
      const maybeActivePart = activePart(config, model)

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
                // [h.Class(panelClasses)],
                [],
                [
                  h.div(
                    [h.Class(panelHeaderClasses)],
                    // [],
                    [h.h2([h.Class(panelTitleClasses)], ["X-ray"])]
                  ),
                  h.div(
                    [h.Class(`${panelBodyClasses} space-y-1`)],
                    renderCodeRows(maybeActivePart, config.parts)
                  ),
                  h.div(
                    [
                      h.DataAttribute("testid", "anatomy-xray-preview"),
                      h.Class(
                        `${panelBodyClasses} relative  overflow-hidden border-t border-slate-200 bg-white`
                      ),
                    ],
                    [
                      h.div(
                        [
                          h.Class(
                            "flex items-center justify-center pt-28 pb-24 sm:pt-24 sm:pb-20"
                          ),
                        ],
                        [
                          config.preview({
                            model,
                            activePart: maybeActivePart,
                            partAttributes:
                              previewPartAttributes(maybeActivePart),
                          }),
                        ]
                      ),
                      renderSelectedPartOverlay(maybeActivePart),
                    ]
                  ),
                ]
              ),
            ]
          ),
        ]
      )
    }

export const defineProgram = (config: XrayConfig) => ({
  Model,
  Message,
  init,
  update,
  view: view(config),
})
