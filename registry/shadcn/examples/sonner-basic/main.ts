import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Sonner from "../../ui/sonner";

const ToastVariant = S.Union([
  S.Literal("default"),
  S.Literal("success"),
  S.Literal("info"),
  S.Literal("warning"),
  S.Literal("error"),
]);
const ToastPosition = S.Union([
  S.Literal("top-left"),
  S.Literal("top-center"),
  S.Literal("top-right"),
  S.Literal("bottom-left"),
  S.Literal("bottom-center"),
  S.Literal("bottom-right"),
]);

// MODEL

export const Model = S.Struct({
  visible: S.Boolean,
  variant: ToastVariant,
  position: ToastPosition,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedShowToast = m("ClickedShowToast");
export const ClickedDismissToast = m("ClickedDismissToast");
export const SelectedToastVariant = m("SelectedToastVariant", {
  value: ToastVariant,
});
export const SelectedToastPosition = m("SelectedToastPosition", {
  value: ToastPosition,
});
export const Message = S.Union([
  ClickedShowToast,
  ClickedDismissToast,
  SelectedToastVariant,
  SelectedToastPosition,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ visible: false, variant: "default", position: "bottom-right" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedShowToast: () => [evo(model, { visible: () => true }), []],
      ClickedDismissToast: () => [evo(model, { visible: () => false }), []],
      SelectedToastVariant: ({ value }) => [
        evo(model, { visible: () => true, variant: () => value }),
        [],
      ],
      SelectedToastPosition: ({ value }) => [
        evo(model, { visible: () => true, position: () => value }),
        [],
      ],
    })
  );

// VIEW

const variantLabel = (variant: Model["variant"]): string =>
  ({
    default: "Default",
    success: "Success",
    info: "Info",
    warning: "Warning",
    error: "Error",
  })[variant];

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("min-h-64 space-y-4")],
    [
      h.div(
        [h.Class("flex flex-wrap gap-2")],
        [
          h.button(
            [
              h.Type("button"),
              h.OnClick(ClickedShowToast()),
              h.Class(
                "rounded-md bg-gray-950 px-4 py-2 text-sm font-medium text-white"
              ),
            ],
            ["Show toast"]
          ),
          ...(["default", "success", "info", "warning", "error"] as const).map(
            (variant) =>
              h.button(
                [
                  h.Type("button"),
                  h.OnClick(SelectedToastVariant({ value: variant })),
                  h.Class("rounded-md border px-3 py-2 text-sm"),
                ],
                [variantLabel(variant)]
              )
          ),
        ]
      ),
      h.div(
        [h.Class("flex flex-wrap gap-2")],
        (
            [
              "top-left",
              "top-center",
              "top-right",
              "bottom-left",
              "bottom-center",
              "bottom-right",
            ] as const
          ).map((position) =>
            h.button(
              [
                h.Type("button"),
                h.OnClick(SelectedToastPosition({ value: position })),
                h.Class("rounded-md border px-3 py-2 text-sm"),
              ],
              [position.replace("-", " ")]
            )
          )
      ),
      Sonner.viewportView<Message>({
        position: model.position,
        children: model.visible
          ? [
              Sonner.toastView<Message>({
                title:
                  model.variant === "default"
                    ? "Event has been created"
                    : `${variantLabel(model.variant)} toast`,
                description: "Sunday, December 03, 2023 at 9:00 AM",
                variant: model.variant,
                onClose: ClickedDismissToast(),
              }),
            ]
          : [],
      }),
    ]
  );
});
