import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as ToggleGroup from "../../ui/shadcn-toggle-group";

// MODEL

export const Model = S.Struct({
  formatting: S.Array(S.String),
  outline: S.Array(S.String),
  sizeSmall: S.Array(S.String),
  sizeLarge: S.Array(S.String),
  spacing: S.Array(S.String),
  vertical: S.Array(S.String),
  custom: S.Array(S.String),
  rtl: S.Array(S.String),
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedFormatting = m("ClickedFormatting", { value: S.String });
export const ClickedOutline = m("ClickedOutline", { value: S.String });
export const ClickedSizeSmall = m("ClickedSizeSmall", { value: S.String });
export const ClickedSizeLarge = m("ClickedSizeLarge", { value: S.String });
export const ClickedSpacing = m("ClickedSpacing", { value: S.String });
export const ClickedVertical = m("ClickedVertical", { value: S.String });
export const ClickedCustom = m("ClickedCustom", { value: S.String });
export const ClickedRtl = m("ClickedRtl", { value: S.String });
export const Message = S.Union([
  ClickedFormatting,
  ClickedOutline,
  ClickedSizeSmall,
  ClickedSizeLarge,
  ClickedSpacing,
  ClickedVertical,
  ClickedCustom,
  ClickedRtl,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    formatting: [],
    outline: [],
    sizeSmall: [],
    sizeLarge: [],
    spacing: [],
    vertical: [],
    custom: ["normal"],
    rtl: [],
  },
  [],
];

// UPDATE

const toggleSingleValue = (
  pressedValues: readonly string[],
  value: string
): readonly string[] => (pressedValues.includes(value) ? [] : [value]);

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedFormatting: ({ value }) => [
        evo(model, {
          formatting: (formatting) => toggleSingleValue(formatting, value),
        }),
        [],
      ],
      ClickedOutline: ({ value }) => [
        evo(model, { outline: (outline) => toggleSingleValue(outline, value) }),
        [],
      ],
      ClickedSizeSmall: ({ value }) => [
        evo(model, {
          sizeSmall: (sizeSmall) => toggleSingleValue(sizeSmall, value),
        }),
        [],
      ],
      ClickedSizeLarge: ({ value }) => [
        evo(model, {
          sizeLarge: (sizeLarge) => toggleSingleValue(sizeLarge, value),
        }),
        [],
      ],
      ClickedSpacing: ({ value }) => [
        evo(model, { spacing: (spacing) => toggleSingleValue(spacing, value) }),
        [],
      ],
      ClickedVertical: ({ value }) => [
        evo(model, {
          vertical: (vertical) => toggleSingleValue(vertical, value),
        }),
        [],
      ],
      ClickedCustom: ({ value }) => [
        evo(model, { custom: () => [value] }),
        [],
      ],
      ClickedRtl: ({ value }) => [
        evo(model, { rtl: (rtl) => toggleSingleValue(rtl, value) }),
        [],
      ],
    })
  );

// VIEW

const icon = (label: string): Html => {
  const h = html<Message>();

  return h.span([h.Class(ToggleGroup.toggleGroupIconClassName)], [label]);
};

const section = (title: string, children: readonly Html[]): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-2")],
    [h.p([h.Class("text-sm font-medium text-gray-900")], [title]), ...children]
  );
};

const formatGroup = (
  ariaLabel: string,
  pressedValues: readonly string[],
  toMessage: (value: string) => Message,
  className?: string,
  itemClassName?: string
): Html =>
  ToggleGroup.rootView<Message>({
    ariaLabel,
    className,
    children: [
      ToggleGroup.itemView<Message>({
        value: "bold",
        pressedValues,
        ariaLabel: `${ariaLabel} bold`,
        onPressedChange: toMessage("bold"),
        className: itemClassName,
        children: [icon("B")],
      }),
      ToggleGroup.itemView<Message>({
        value: "italic",
        pressedValues,
        ariaLabel: `${ariaLabel} italic`,
        onPressedChange: toMessage("italic"),
        className: itemClassName,
        children: [icon("I")],
      }),
      ToggleGroup.itemView<Message>({
        value: "underline",
        pressedValues,
        ariaLabel: `${ariaLabel} underline`,
        onPressedChange: toMessage("underline"),
        className: itemClassName,
        children: [icon("U")],
      }),
    ],
  });

const directionsGroup = (
  ariaLabel: string,
  pressedValues: readonly string[],
  toMessage: (value: string) => Message,
  className?: string,
  itemClassName?: string
): Html =>
  ToggleGroup.rootView<Message>({
    ariaLabel,
    className,
    children: ["Top", "Bottom", "Left", "Right"].map((label) =>
      ToggleGroup.itemView<Message>({
        value: label.toLowerCase(),
        pressedValues,
        ariaLabel: `${ariaLabel} ${label}`,
        onPressedChange: toMessage(label.toLowerCase()),
        className: itemClassName,
        children: [html<Message>().span([], [label])],
      })
    ),
  });

const fontWeights: ReadonlyArray<readonly [string, string]> = [
  ["light", "Aa Light"],
  ["normal", "Aa Normal"],
  ["medium", "Aa Medium"],
  ["bold", "Aa Bold"],
];

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-6")],
    [
      section("Basic", [
        formatGroup("Text formatting", model.formatting, (value) =>
          ClickedFormatting({ value })
        ),
      ]),
      section("Outline", [
        directionsGroup(
          "Outline filters",
          model.outline,
          (value) => ClickedOutline({ value }),
          "gap-2 border-0 bg-transparent p-0 shadow-none",
          "w-auto border border-gray-200 px-3"
        ),
      ]),
      section("Size", [
        directionsGroup(
          "Small directions",
          model.sizeSmall,
          (value) => ClickedSizeSmall({ value }),
          undefined,
          "h-7 w-auto px-2 text-xs"
        ),
        directionsGroup(
          "Large directions",
          model.sizeLarge,
          (value) => ClickedSizeLarge({ value }),
          undefined,
          "h-10 w-auto px-3"
        ),
      ]),
      section("Spacing", [
        directionsGroup(
          "Spaced directions",
          model.spacing,
          (value) => ClickedSpacing({ value }),
          "gap-2 border-0 bg-transparent p-0 shadow-none",
          "w-auto border border-gray-200 px-3"
        ),
      ]),
      section("Vertical", [
        formatGroup(
          "Vertical formatting",
          model.vertical,
          (value) => ClickedVertical({ value }),
          "flex-col",
          undefined
        ),
      ]),
      section("Disabled", [
        ToggleGroup.rootView<Message>({
          ariaLabel: "Disabled formatting",
          children: [
            ToggleGroup.itemView<Message>({
              value: "bold",
              pressedValues: [],
              ariaLabel: "Disabled bold",
              onPressedChange: ClickedFormatting({ value: "bold" }),
              disabled: true,
              children: [icon("B")],
            }),
            ToggleGroup.itemView<Message>({
              value: "italic",
              pressedValues: ["italic"],
              ariaLabel: "Disabled italic",
              onPressedChange: ClickedFormatting({ value: "italic" }),
              disabled: true,
              children: [icon("I")],
            }),
            ToggleGroup.itemView<Message>({
              value: "underline",
              pressedValues: [],
              ariaLabel: "Disabled underline",
              onPressedChange: ClickedFormatting({ value: "underline" }),
              disabled: true,
              children: [icon("U")],
            }),
          ],
        }),
      ]),
      section("Custom", [
        h.div([h.Class("space-y-3")], [
          h.p([h.Class("text-sm text-gray-600")], ["Font Weight"]),
          ToggleGroup.rootView<Message>({
            ariaLabel: "Font weight",
            className: "gap-2 border-0 bg-transparent p-0 shadow-none",
            children: fontWeights.map(([value, label]) =>
              ToggleGroup.itemView<Message>({
                value,
                pressedValues: model.custom,
                ariaLabel: label,
                onPressedChange: ClickedCustom({ value }),
                className: "h-auto w-auto border border-gray-200 px-3 py-2",
                children: [h.span([], [label])],
              })
            ),
          }),
          h.p([h.Class("text-sm text-gray-600")], [
            `Use font-${model.custom[0] ?? "normal"} to set the font weight.`,
          ]),
        ]),
      ]),
      section("RTL", [
        h.div([h.Dir("rtl")], [
          directionsGroup("قائمة شبكة بطاقات", model.rtl, (value) =>
            ClickedRtl({ value })
          ),
        ]),
      ]),
    ]
  );
});
