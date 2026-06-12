import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Toggle from "../../ui/shadcn-toggle";

// MODEL

const PressedState = S.Union([S.Literal("Pressed"), S.Literal("Unpressed")]);
type PressedState = typeof PressedState.Type;

export const Model = S.Struct({
  italic: PressedState,
  outlineItalic: PressedState,
  outlineBold: PressedState,
  withTextItalic: PressedState,
  small: PressedState,
  defaultSize: PressedState,
  large: PressedState,
  rtlBookmark: PressedState,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleItalic = m("ClickedToggleItalic");
export const ClickedToggleOutlineItalic = m("ClickedToggleOutlineItalic");
export const ClickedToggleOutlineBold = m("ClickedToggleOutlineBold");
export const ClickedToggleWithTextItalic = m("ClickedToggleWithTextItalic");
export const ClickedToggleSmall = m("ClickedToggleSmall");
export const ClickedToggleDefaultSize = m("ClickedToggleDefaultSize");
export const ClickedToggleLarge = m("ClickedToggleLarge");
export const ClickedToggleRtlBookmark = m("ClickedToggleRtlBookmark");
export const Message = S.Union([
  ClickedToggleItalic,
  ClickedToggleOutlineItalic,
  ClickedToggleOutlineBold,
  ClickedToggleWithTextItalic,
  ClickedToggleSmall,
  ClickedToggleDefaultSize,
  ClickedToggleLarge,
  ClickedToggleRtlBookmark,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    italic: "Unpressed",
    outlineItalic: "Unpressed",
    outlineBold: "Unpressed",
    withTextItalic: "Unpressed",
    small: "Unpressed",
    defaultSize: "Unpressed",
    large: "Unpressed",
    rtlBookmark: "Unpressed",
  },
  [],
];

// UPDATE

const nextPressedState = (state: PressedState): PressedState =>
  state === "Pressed" ? "Unpressed" : "Pressed";

const isPressed = (state: PressedState): boolean => state === "Pressed";

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleItalic: () => [
        evo(model, { italic: nextPressedState }),
        [],
      ],
      ClickedToggleOutlineItalic: () => [
        evo(model, { outlineItalic: nextPressedState }),
        [],
      ],
      ClickedToggleOutlineBold: () => [
        evo(model, { outlineBold: nextPressedState }),
        [],
      ],
      ClickedToggleWithTextItalic: () => [
        evo(model, { withTextItalic: nextPressedState }),
        [],
      ],
      ClickedToggleSmall: () => [evo(model, { small: nextPressedState }), []],
      ClickedToggleDefaultSize: () => [
        evo(model, { defaultSize: nextPressedState }),
        [],
      ],
      ClickedToggleLarge: () => [evo(model, { large: nextPressedState }), []],
      ClickedToggleRtlBookmark: () => [
        evo(model, { rtlBookmark: nextPressedState }),
        [],
      ],
    })
  );

// VIEW

const italicIcon = (): Html => {
  const h = html<Message>();

  return h.span([h.Class(Toggle.toggleIconClassName)], ["I"]);
};

const boldIcon = (): Html => {
  const h = html<Message>();

  return h.span([h.Class(Toggle.toggleIconClassName)], ["B"]);
};

const bookmarkIcon = (): Html => {
  const h = html<Message>();

  return h.span([h.Class(Toggle.toggleIconClassName)], ["Bookmark"]);
};

const toggleButton = (
  pressed: PressedState,
  ariaLabel: string,
  onPressedChange: Message,
  children: readonly Html[],
  className?: string,
  disabled = false
): Html =>
  Toggle.view<Message>({
    pressed: isPressed(pressed),
    ariaLabel,
    onPressedChange,
    value: ariaLabel,
    disabled,
    className,
    children,
  });

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-6")],
    [
      h.div([h.Class("space-y-2")], [
        h.p([h.Class("text-sm font-medium text-gray-900")], ["Default"]),
        toggleButton(
          model.italic,
          "Toggle italic",
          ClickedToggleItalic(),
          [italicIcon()]
        ),
      ]),
      h.div([h.Class("space-y-2")], [
        h.p([h.Class("text-sm font-medium text-gray-900")], ["Outline"]),
        h.div([h.Class("flex gap-2")], [
          toggleButton(
            model.outlineItalic,
            "Toggle outline italic",
            ClickedToggleOutlineItalic(),
            [italicIcon()],
            "border-gray-300 bg-transparent"
          ),
          toggleButton(
            model.outlineBold,
            "Toggle outline bold",
            ClickedToggleOutlineBold(),
            [boldIcon()],
            "border-gray-300 bg-transparent"
          ),
        ]),
      ]),
      h.div([h.Class("space-y-2")], [
        h.p([h.Class("text-sm font-medium text-gray-900")], ["With Text"]),
        toggleButton(
          model.withTextItalic,
          "Toggle italic with text",
          ClickedToggleWithTextItalic(),
          [italicIcon(), h.span([], ["Italic"])],
          "w-auto gap-2 px-3"
        ),
      ]),
      h.div([h.Class("space-y-2")], [
        h.p([h.Class("text-sm font-medium text-gray-900")], ["Size"]),
        h.div([h.Class("flex items-center gap-2")], [
          toggleButton(
            model.small,
            "Small",
            ClickedToggleSmall(),
            [h.span([], ["Small"])],
            "h-8 w-auto px-2 text-xs"
          ),
          toggleButton(
            model.defaultSize,
            "Default",
            ClickedToggleDefaultSize(),
            [h.span([], ["Default"])],
            "w-auto px-3"
          ),
          toggleButton(
            model.large,
            "Large",
            ClickedToggleLarge(),
            [h.span([], ["Large"])],
            "h-10 w-auto px-4"
          ),
        ]),
      ]),
      h.div([h.Class("space-y-2")], [
        h.p([h.Class("text-sm font-medium text-gray-900")], ["Disabled"]),
        h.div([h.Class("flex gap-2")], [
          toggleButton(
            "Unpressed",
            "Disabled",
            ClickedToggleItalic(),
            [h.span([], ["Disabled"])],
            "w-auto px-3",
            true
          ),
          toggleButton(
            "Pressed",
            "Disabled pressed",
            ClickedToggleItalic(),
            [h.span([], ["Disabled"])],
            "w-auto px-3",
            true
          ),
        ]),
      ]),
      h.div([h.Dir("rtl"), h.Class("space-y-2")], [
        h.p([h.Class("text-sm font-medium text-gray-900")], ["RTL"]),
        toggleButton(
          model.rtlBookmark,
          "إشارة مرجعية",
          ClickedToggleRtlBookmark(),
          [bookmarkIcon()],
          "w-auto px-3"
        ),
      ]),
    ]
  );
});
