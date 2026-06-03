import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Tabs from "../../ui/tabs";

type Tab = "Preview" | "Details" | "Billing";
const DemoTabs = Tabs.create<Tab>();
const tabValues: readonly Tab[] = ["Preview", "Details", "Billing"];
const panelContent: Record<Tab, string> = {
  Preview: "Preview remains selected until a tab is explicitly activated.",
  Details: "Details can receive focus before selection in manual mode.",
  Billing: "Billing is unavailable in this example.",
};

export const Model = S.Struct({
  tabs: Tabs.Model,
  status: S.String,
});

export type Model = typeof Model.Type;

export const GotTabsMessage = m("GotTabsMessage", {
  message: Tabs.Message,
});

export const Message = S.Union([GotTabsMessage]);
export type Message = typeof Message.Type;

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [tabs, commands] = Tabs.initialize({
    id: "tabs-manual",
    activationMode: "Manual",
  });

  return [
    { tabs, status: "Selected tab: Preview" },
    Command.mapMessages(commands, (message) => GotTabsMessage({ message })),
  ];
};

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotTabsMessage: ({ message }) => {
        const [tabs, commands, maybeOutMessage] = DemoTabs.update(
          model.tabs,
          message
        );
        const status = Option.match(maybeOutMessage, {
          onNone: () => model.status,
          onSome: M.type<Tabs.OutMessage<Tab>>().pipe(
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

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.tabs.id,
        model: model.tabs,
        view: DemoTabs.view,
        viewInputs: {
          tabs: tabValues,
          ariaLabel: "Account sections",
          isTabDisabled: (value) => value === "Billing",
          toView: (render) => Tabs.tabsView({ render, panelContent }),
        },
        toParentMessage: (message) => GotTabsMessage({ message }),
      }),
      h.p([h.Class("text-sm text-gray-700")], [model.status]),
    ]
  );
});
