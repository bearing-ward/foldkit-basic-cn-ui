import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { ts } from "foldkit/schema";
import { evo } from "foldkit/struct";

import * as Drawer from "../../ui/shadcn-drawer";

// MODEL

const DrawerSide = S.Union([
  S.Literal("top"),
  S.Literal("right"),
  S.Literal("bottom"),
  S.Literal("left"),
]);
type DrawerSide = typeof DrawerSide.Type;

const Closed = ts("Closed");
const Open = ts("Open", {
  side: DrawerSide,
});

export const Model = S.Struct({
  state: S.Union([Closed, Open]),
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedTop = m("ClickedTop");
export const ClickedRight = m("ClickedRight");
export const ClickedBottom = m("ClickedBottom");
export const ClickedLeft = m("ClickedLeft");
export const ClickedCancel = m("ClickedCancel");
export const ClickedSubmit = m("ClickedSubmit");

export const Message = S.Union([
  ClickedTop,
  ClickedRight,
  ClickedBottom,
  ClickedLeft,
  ClickedCancel,
  ClickedSubmit,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ state: Closed({}) }, []];

// UPDATE

const openSide = (side: DrawerSide): Model["state"] => Open({ side });

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedTop: () => [evo(model, { state: () => openSide("top") }), []],
      ClickedRight: () => [evo(model, { state: () => openSide("right") }), []],
      ClickedBottom: () => [
        evo(model, { state: () => openSide("bottom") }),
        [],
      ],
      ClickedLeft: () => [evo(model, { state: () => openSide("left") }), []],
      ClickedCancel: () => [evo(model, { state: () => Closed({}) }), []],
      ClickedSubmit: () => [evo(model, { state: () => Closed({}) }), []],
    })
  );

// VIEW

const drawerSides = ["top", "right", "bottom", "left"] as const;

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const messageForSide = (side: DrawerSide): Message =>
  M.value(side).pipe(
    M.withReturnType<Message>(),
    M.when("top", () => ClickedTop()),
    M.when("right", () => ClickedRight()),
    M.when("bottom", () => ClickedBottom()),
    M.when("left", () => ClickedLeft()),
    M.exhaustive
  );

const viewportClasses = (side: DrawerSide): string =>
  M.value(side).pipe(
    M.withReturnType<string>(),
    M.when("top", () => "items-start justify-stretch"),
    M.when("right", () => "justify-end"),
    M.when("bottom", () => "items-end justify-stretch"),
    M.when("left", () => "justify-start"),
    M.exhaustive
  );

const popupClasses = (side: DrawerSide): string =>
  M.value(side).pipe(
    M.withReturnType<string>(),
    M.when("top", () => "h-auto max-h-[50vh] max-w-none p-0"),
    M.when("right", () => "p-0"),
    M.when("bottom", () => "h-auto max-h-[50vh] max-w-none p-0"),
    M.when("left", () => "p-0"),
    M.exhaustive
  );

const isOpenSide = (model: Model, side: DrawerSide): boolean =>
  model.state._tag === "Open" && model.state.side === side;

const drawerForSide = (model: Model, side: DrawerSide): Html => {
  const h = html<Message>();
  const titleId = `drawer-${side}-title`;
  const descriptionId = `drawer-${side}-description`;

  return Drawer.rootView<Message>({
    children: [
      Drawer.triggerView<Message>({
        onClick: messageForSide(side),
        classes:
          "border border-gray-200 bg-white capitalize text-gray-950 hover:bg-gray-50",
        children: [h.span([], [side])],
      }),
      Drawer.portalView<Message>({
        open: isOpenSide(model, side),
        children: [
          Drawer.backdropView<Message>({ children: [] }),
          Drawer.viewportView<Message>({
            classes: viewportClasses(side),
            children: [
              Drawer.popupView<Message>({
                titleId,
                descriptionId,
                classes: popupClasses(side),
                children: [
                  Drawer.contentView<Message>({
                    classes: "gap-0",
                    children: [
                      h.div(
                        [h.Class("grid gap-1.5 p-4 text-center sm:text-left")],
                        [
                          Drawer.titleView<Message>({
                            id: titleId,
                            children: [h.span([], ["Move Goal"])],
                          }),
                          Drawer.descriptionView<Message>({
                            id: descriptionId,
                            children: [
                              h.span([], ["Set your daily activity goal."]),
                            ],
                          }),
                        ]
                      ),
                      h.div(
                        [h.Class("no-scrollbar overflow-y-auto px-4")],
                        Array.from({ length: 10 }, (_, index) =>
                          h.p(
                            [
                              h.Class(
                                "mb-4 text-sm leading-normal text-gray-700"
                              ),
                            ],
                            [`${index + 1}. ${loremIpsum}`]
                          )
                        )
                      ),
                      h.div(
                        [h.Class("mt-auto grid gap-2 p-4")],
                        [
                          h.button(
                            [
                              h.Type("button"),
                              h.OnClick(ClickedSubmit()),
                              h.Class(Drawer.shadcnDrawerTriggerClasses),
                            ],
                            ["Submit"]
                          ),
                          Drawer.closeView<Message>({
                            onClick: ClickedCancel(),
                            children: [h.span([], ["Cancel"])],
                          }),
                        ]
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-wrap gap-2")],
    drawerSides.map((side) => drawerForSide(model, side))
  );
});
