import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Tabs from "../../ui/shadcn-tabs";

type SettingsTab = "Account" | "Password";

const SettingsTabs = Tabs.create<SettingsTab>();
const tabValues: readonly SettingsTab[] = ["Account", "Password"];

// MODEL

export const Model = S.Struct({
  tabs: Tabs.Model,
  name: S.String,
  username: S.String,
  currentPassword: S.String,
  newPassword: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotTabsMessage = m("GotTabsMessage", {
  message: Tabs.Message,
});
export const UpdatedName = m("UpdatedName", { value: S.String });
export const UpdatedUsername = m("UpdatedUsername", { value: S.String });
export const UpdatedCurrentPassword = m("UpdatedCurrentPassword", {
  value: S.String,
});
export const UpdatedNewPassword = m("UpdatedNewPassword", { value: S.String });

export const Message = S.Union([
  GotTabsMessage,
  UpdatedName,
  UpdatedUsername,
  UpdatedCurrentPassword,
  UpdatedNewPassword,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [tabs, commands] = Tabs.initialize({ id: "shadcn-tabs-basic" });

  return [
    {
      tabs,
      name: "Pedro Duarte",
      username: "@peduarte",
      currentPassword: "",
      newPassword: "",
    },
    Command.mapMessages(commands, (message) => GotTabsMessage({ message })),
  ];
};

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotTabsMessage: ({ message }) => {
        const [tabs, commands] = SettingsTabs.update(
          model.tabs,
          message
        );

        return [
          evo(model, { tabs: () => tabs }),
          Command.mapMessages(commands, (message) =>
            GotTabsMessage({ message })
          ),
        ];
      },
      UpdatedName: ({ value }) => [evo(model, { name: () => value }), []],
      UpdatedUsername: ({ value }) => [
        evo(model, { username: () => value }),
        [],
      ],
      UpdatedCurrentPassword: ({ value }) => [
        evo(model, { currentPassword: () => value }),
        [],
      ],
      UpdatedNewPassword: ({ value }) => [
        evo(model, { newPassword: () => value }),
        [],
      ],
    })
  );

// VIEW

const cardClasses =
  "rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm";
const cardHeaderClasses = "flex flex-col space-y-1.5 p-6";
const cardTitleClasses = "font-semibold leading-none tracking-normal";
const cardDescriptionClasses = "text-sm text-gray-500";
const cardContentClasses = "space-y-2 p-6 pt-0";
const cardFooterClasses = "flex items-center p-6 pt-0";
const fieldClasses = "space-y-1";
const labelClasses = "text-sm font-medium leading-none text-gray-950";
const inputClasses =
  "flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-base text-gray-950 shadow-xs transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
const buttonClasses =
  "inline-flex h-9 items-center justify-center rounded-md bg-gray-950 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-600 disabled:pointer-events-none disabled:opacity-50";

const tabClasses =
  "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium text-gray-600 transition-all hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-white data-[selected]:text-gray-950 data-[selected]:shadow";

const input = (
  h: ReturnType<typeof html<Message>>,
  label: string,
  value: string,
  message: (value: string) => Message,
  type = "text"
): Html => {
  const id = `shadcn-tabs-${label.toLowerCase().replaceAll(" ", "-")}`;

  return h.div(
    [h.Class(fieldClasses)],
    [
      h.label([h.For(id), h.Class(labelClasses)], [label]),
      h.input([
        h.Id(id),
        h.Type(type),
        h.Value(value),
        h.OnInput((value) => message(value)),
        h.Class(inputClasses),
      ]),
    ]
  );
};

const accountPanel = (h: ReturnType<typeof html<Message>>, model: Model): Html =>
  h.div(
    [h.Class(cardClasses)],
    [
      h.div(
        [h.Class(cardHeaderClasses)],
        [
          h.div([h.Class(cardTitleClasses)], ["Account"]),
          h.p(
            [h.Class(cardDescriptionClasses)],
            [
              "Make changes to your account here. Click save when you're done.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class(cardContentClasses)],
        [
          input(h, "Name", model.name, (value) => UpdatedName({ value })),
          input(h, "Username", model.username, (value) =>
            UpdatedUsername({ value })
          ),
        ]
      ),
      h.div([h.Class(cardFooterClasses)], [
        h.button([h.Class(buttonClasses)], ["Save changes"]),
      ]),
    ]
  );

const passwordPanel = (
  h: ReturnType<typeof html<Message>>,
  model: Model
): Html =>
  h.div(
    [h.Class(cardClasses)],
    [
      h.div(
        [h.Class(cardHeaderClasses)],
        [
          h.div([h.Class(cardTitleClasses)], ["Password"]),
          h.p(
            [h.Class(cardDescriptionClasses)],
            [
              "Change your password here. After saving, you'll be logged out.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class(cardContentClasses)],
        [
          input(
            h,
            "Current password",
            model.currentPassword,
            (value) => UpdatedCurrentPassword({ value }),
            "password"
          ),
          input(
            h,
            "New password",
            model.newPassword,
            (value) => UpdatedNewPassword({ value }),
            "password"
          ),
        ]
      ),
      h.div([h.Class(cardFooterClasses)], [
        h.button([h.Class(buttonClasses)], ["Save password"]),
      ]),
    ]
  );

const panel = (
  h: ReturnType<typeof html<Message>>,
  model: Model,
  activeTab: SettingsTab | undefined
): Html => {
  if (activeTab === undefined) {
    return h.empty;
  }

  return M.value(activeTab).pipe(
    M.withReturnType<Html>(),
    M.when("Account", () => accountPanel(h, model)),
    M.when("Password", () => passwordPanel(h, model)),
    M.orElse(() => h.empty)
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("w-full max-w-sm")],
    [
      h.submodel({
        slotId: model.tabs.id,
        model: model.tabs,
        view: SettingsTabs.view,
        viewInputs: {
          tabs: tabValues,
          ariaLabel: "Manage your account",
          toView: (render) =>
            h.div(
              [h.Class("flex w-full flex-col gap-6")],
              [
                h.div(
                  [
                    ...render.tablist,
                    h.Class(
                      "grid h-9 w-full grid-cols-2 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500"
                    ),
                  ],
                  render.tabs.map((tab) =>
                    h.button([...tab.tab, h.Class(tabClasses)], [tab.value])
                  )
                ),
                panel(h, model, render.tabs[render.activeIndex]?.value),
              ]
            ),
        },
        toParentMessage: (message) => GotTabsMessage({ message }),
      }),
    ]
  );
});
