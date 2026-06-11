import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Drawer from "../../ui/shadcn-drawer";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  name: S.String,
  username: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedEditProfile = m("ClickedEditProfile");
export const UpdatedName = m("UpdatedName", { value: S.String });
export const UpdatedUsername = m("UpdatedUsername", { value: S.String });
export const ClickedCancel = m("ClickedCancel");
export const ClickedSaveChanges = m("ClickedSaveChanges");

export const Message = S.Union([
  ClickedEditProfile,
  UpdatedName,
  UpdatedUsername,
  ClickedCancel,
  ClickedSaveChanges,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, name: "Pedro Duarte", username: "@peduarte" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedEditProfile: () => [evo(model, { open: () => true }), []],
      UpdatedName: ({ value }) => [evo(model, { name: () => value }), []],
      UpdatedUsername: ({ value }) => [
        evo(model, { username: () => value }),
        [],
      ],
      ClickedCancel: () => [evo(model, { open: () => false }), []],
      ClickedSaveChanges: () => [evo(model, { open: () => false }), []],
    })
  );

// VIEW

const fieldView = (
  label: string,
  value: string,
  onInput: (value: string) => Message
): Html => {
  const h = html<Message>();
  const id = `drawer-responsive-${label.toLowerCase()}`;

  return h.div(
    [h.Class("grid gap-2")],
    [
      h.label(
        [h.For(id), h.Class("text-sm font-medium text-gray-950")],
        [label]
      ),
      h.input([
        h.Id(id),
        h.Value(value),
        h.OnInput((value) => onInput(value)),
        h.Class(
          "h-9 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-950 shadow-sm outline-none focus:border-gray-950"
        ),
      ]),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "drawer-responsive-title";
  const descriptionId = "drawer-responsive-description";

  return h.div(
    [h.Class("flex flex-wrap gap-2")],
    [
      Drawer.rootView<Message>({
        children: [
          Drawer.triggerView<Message>({
            onClick: ClickedEditProfile(),
            className:
              "border border-gray-200 bg-white text-gray-950 hover:bg-gray-50",
            children: [h.span([], ["Edit Profile"])],
          }),
          Drawer.portalView<Message>({
            open: model.open,
            children: [
              Drawer.backdropView<Message>({ children: [] }),
              Drawer.viewportView<Message>({
                children: [
                  Drawer.popupView<Message>({
                    titleId,
                    descriptionId,
                    children: [
                      Drawer.contentView<Message>({
                        children: [
                          h.div(
                            [h.Class("grid gap-1.5 text-center sm:text-left")],
                            [
                              Drawer.titleView<Message>({
                                id: titleId,
                                children: [h.span([], ["Edit profile"])],
                              }),
                              Drawer.descriptionView<Message>({
                                id: descriptionId,
                                children: [
                                  h.span(
                                    [],
                                    [
                                      "Make changes to your profile here. Click save when you're done.",
                                    ]
                                  ),
                                ],
                              }),
                            ]
                          ),
                          h.div(
                            [h.Class("grid gap-4 py-4")],
                            [
                              fieldView("Name", model.name, (value) =>
                                UpdatedName({ value })
                              ),
                              fieldView("Username", model.username, (value) =>
                                UpdatedUsername({ value })
                              ),
                            ]
                          ),
                        ],
                      }),
                      h.div(
                        [h.Class("mt-auto grid gap-2")],
                        [
                          h.button(
                            [
                              h.Type("button"),
                              h.OnClick(ClickedSaveChanges()),
                              h.Class(Drawer.shadcnDrawerTriggerClassName),
                            ],
                            ["Save changes"]
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
    ]
  );
});
