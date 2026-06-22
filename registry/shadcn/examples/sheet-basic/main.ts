import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Sheet from "../../ui/sheet";

const sheetTitleId = "sheet-basic-title";
const sheetDescriptionId = "sheet-basic-description";
const SheetSide = S.Union([
  S.Literal("top"),
  S.Literal("right"),
  S.Literal("bottom"),
  S.Literal("left"),
]);

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  side: SheetSide,
});
export type Model = typeof Model.Type;

// MESSAGE

export const OpenedSheet = m("OpenedSheet");
export const ClosedSheet = m("ClosedSheet");
export const SelectedSheetSide = m("SelectedSheetSide", {
  value: SheetSide,
});
export const Message = S.Union([OpenedSheet, ClosedSheet, SelectedSheetSide]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, side: "right" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      OpenedSheet: () => [evo(model, { open: () => true }), []],
      ClosedSheet: () => [evo(model, { open: () => false }), []],
      SelectedSheetSide: ({ value }) => [
        evo(model, { open: () => true, side: () => value }),
        [],
      ],
    })
  );

// VIEW

const sideContentClasses: Record<Model["side"], string> = {
  top: "left-0 right-0 top-0 h-auto max-w-none border-b border-l-0",
  right: "",
  bottom:
    "bottom-0 left-0 right-0 top-auto h-auto max-w-none border-l-0 border-t",
  left: "left-0 right-auto border-l-0 border-r",
};

const contentClasses = (side: Model["side"]): string =>
  sideContentClasses[side];

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return Sheet.rootView<Message>({
    children: [
      h.div(
        [h.Class("flex flex-wrap gap-2")],
        [
          Sheet.triggerView<Message>({
            onOpen: OpenedSheet(),
            children: [h.span([], ["Open"])],
          }),
          h.button(
            [
              h.Type("button"),
              h.OnClick(SelectedSheetSide({ value: "top" })),
              h.Class("rounded-md border px-4 py-2 text-sm"),
            ],
            ["top"]
          ),
          h.button(
            [
              h.Type("button"),
              h.OnClick(SelectedSheetSide({ value: "right" })),
              h.Class("rounded-md border px-4 py-2 text-sm"),
            ],
            ["right"]
          ),
          h.button(
            [
              h.Type("button"),
              h.OnClick(SelectedSheetSide({ value: "bottom" })),
              h.Class("rounded-md border px-4 py-2 text-sm"),
            ],
            ["bottom"]
          ),
          h.button(
            [
              h.Type("button"),
              h.OnClick(SelectedSheetSide({ value: "left" })),
              h.Class("rounded-md border px-4 py-2 text-sm"),
            ],
            ["left"]
          ),
        ]
      ),
      Sheet.portalView<Message>({
        open: model.open,
        children: [
          Sheet.overlayView<Message>({}),
          Sheet.contentView<Message>({
            ariaDescribedBy: sheetDescriptionId,
            ariaLabelledBy: sheetTitleId,
            className: contentClasses(model.side),
            children: [
              Sheet.headerView<Message>({
                children: [
                  Sheet.titleView<Message>({
                    id: sheetTitleId,
                    label: "Edit profile",
                  }),
                  Sheet.descriptionView<Message>({
                    id: sheetDescriptionId,
                    label:
                      "Make changes to your profile here. Click save when you're done.",
                  }),
                ],
              }),
              h.div(
                [h.Class("grid gap-4 py-4")],
                [
                  h.label(
                    [h.For("sheet-name"), h.Class("text-sm font-medium")],
                    ["Name"]
                  ),
                  h.input([
                    h.Id("sheet-name"),
                    h.Value("Pedro Duarte"),
                    h.Class(
                      "h-10 rounded-md border border-gray-300 px-3 text-sm"
                    ),
                  ]),
                  h.label(
                    [h.For("sheet-username"), h.Class("text-sm font-medium")],
                    ["Username"]
                  ),
                  h.input([
                    h.Id("sheet-username"),
                    h.Value("@peduarte"),
                    h.Class(
                      "h-10 rounded-md border border-gray-300 px-3 text-sm"
                    ),
                  ]),
                ]
              ),
              Sheet.footerView<Message>({
                children: [
                  h.p(
                    [h.Class("mr-auto text-sm text-gray-600")],
                    [`Side: ${model.side}`]
                  ),
                  h.button(
                    [
                      h.Type("button"),
                      h.OnClick(ClosedSheet()),
                      h.Class(
                        "rounded-md bg-gray-950 px-4 py-2 text-sm font-medium text-white"
                      ),
                    ],
                    ["Save changes"]
                  ),
                ],
              }),
              Sheet.closeView<Message>({
                onClose: ClosedSheet(),
                children: [h.span([], ["x"])],
              }),
              h.p(
                [h.Class("text-sm text-gray-500")],
                ["No Close Button variant: omit Sheet.closeView from content."]
              ),
              h.p([h.Dir("rtl"), h.Class("text-sm text-gray-700")], ["فتح"]),
            ],
          }),
        ],
      }),
    ],
  });
});
