import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Tabs from "../../ui/base-ui-tabs";

type Tab = "Overview" | "Projects" | "Account";
const DemoTabs = Tabs.create<Tab>();
const tabValues: readonly Tab[] = ["Overview", "Projects", "Account"];
const panelContent: Record<Tab, string> = {
  Overview: "Workspace stats and activity.",
  Projects: "Milestones and deadlines.",
  Account: "Profile and preferences.",
};

// MODEL

export const Model = S.Struct({
  tabs: Tabs.Model,
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
  const [tabs, commands] = Tabs.initialize({ id: "tabs-basic" });

  return [
    { tabs },
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
        const [tabs, commands, maybeOutMessage] = DemoTabs.update(
          model.tabs,
          message
        );
        Option.match(maybeOutMessage, {
          onNone: () => undefined,
          onSome: M.type<Tabs.OutMessage<Tab>>().pipe(
            M.tagsExhaustive({ Selected: () => undefined })
          ),
        });

        return [
          evo(model, { tabs: () => tabs }),
          Command.mapMessages(commands, (message) =>
            GotTabsMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

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
          ariaLabel: "Content sections",
          toView: (render) => Tabs.baseUiTabsView({ render, panelContent }),
        },
        toParentMessage: (message) => GotTabsMessage({ message }),
      }),
    ]
  );
});
