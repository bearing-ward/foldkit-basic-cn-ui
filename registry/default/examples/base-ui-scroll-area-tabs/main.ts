import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as ScrollArea from "../../ui/base-ui-scroll-area";
import * as Tabs from "../../ui/base-ui-tabs";

type Tab = "Account" | "Password" | "Notifications";
const DemoTabs = Tabs.create<Tab>();
const tabValues: readonly Tab[] = ["Account", "Password", "Notifications"];

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
  const [tabs, commands] = Tabs.initialize({ id: "scroll-area-tabs" });

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

const panelContent = (tab: Tab): readonly Html[] => {
  const h = html<Message>();
  const values: Record<Tab, readonly string[]> = {
    Account: [
      "Profile details",
      "Connected accounts",
      "Public display name",
      "Language and region",
      "Session history",
    ],
    Password: [
      "Current password",
      "New password",
      "Two-factor backup codes",
      "Recovery email",
      "Security devices",
    ],
    Notifications: [
      "Product updates",
      "Billing reminders",
      "Security alerts",
      "Weekly summary",
      "Quiet hours",
    ],
  };

  return values[tab].map((label) =>
    h.div(
      [h.Class("rounded-md border border-gray-100 bg-white px-3 py-2 text-sm")],
      [label]
    )
  );
};

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
          ariaLabel: "Settings sections",
          toView: (render) => {
            const activeTab = render.tabs[render.activeIndex];

            return h.div(
              [h.Class(Tabs.baseUiTabsRootClassName)],
              [
                h.div(
                  [...render.tablist, h.Class(Tabs.baseUiTabsListClassName)],
                  render.tabs.map((tab) =>
                    h.button(
                      [...tab.tab, h.Class(Tabs.baseUiTabsTabClassName)],
                      [tab.value]
                    )
                  )
                ),
                activeTab === undefined
                  ? h.empty
                  : h.div(
                      [
                        ...activeTab.panel,
                        h.Class(Tabs.baseUiTabsPanelClassName),
                      ],
                      [
                        ScrollArea.view<Message>({
                          ariaLabel: `${activeTab.value} settings`,
                          className: "h-40",
                          children: panelContent(activeTab.value),
                        }),
                      ]
                    ),
              ]
            );
          },
        },
        toParentMessage: (message) => GotTabsMessage({ message }),
      }),
    ]
  );
});
