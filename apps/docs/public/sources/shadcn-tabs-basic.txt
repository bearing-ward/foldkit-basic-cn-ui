import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Tabs from "../../ui/shadcn-tabs";

type SettingsTab = "Account" | "Password" | "Notifications";

const SettingsTabs = Tabs.create<SettingsTab>();
const tabValues: readonly SettingsTab[] = [
  "Account",
  "Password",
  "Notifications",
];

// MODEL

export const Model = S.Struct({
  tabs: Tabs.Model,
  status: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotTabsMessage = m("GotTabsMessage", {
  message: Tabs.Message,
});

export const Message = S.Union([GotTabsMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [tabs, commands] = Tabs.initialize({ id: "shadcn-tabs-basic" });

  return [
    { tabs, status: "Selected tab: Account" },
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
        const [tabs, commands, maybeOutMessage] = SettingsTabs.update(
          model.tabs,
          message
        );
        const status = Option.match(maybeOutMessage, {
          onNone: () => model.status,
          onSome: M.type<Tabs.OutMessage>().pipe(
            M.tagsExhaustive({
              Selected: ({ value }) => `Selected tab: ${value}`,
            })
          ),
        });

        return [
          evo(model, { tabs: () => tabs, status: () => status }),
          Command.mapMessages(commands, (message) =>
            GotTabsMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

const panelContent: Record<SettingsTab, string> = {
  Account: "Configure account profile preferences.",
  Password: "Update password and security preferences.",
  Notifications: "Configure notification delivery preferences.",
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.tabs.id,
        model: model.tabs,
        view: SettingsTabs.view,
        viewInputs: {
          tabs: tabValues,
          ariaLabel: "Settings sections",
          toView: (render) => Tabs.shadcnTabsView({ render, panelContent }),
        },
        toParentMessage: (message) => GotTabsMessage({ message }),
      }),
      h.p([h.Class("text-sm text-gray-700")], [model.status]),
    ]
  );
});
