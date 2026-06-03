import { Match as M, Option, Schema as S } from "effect";
import { Command, Scene, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as Tabs from "./index";

type Tab = "One" | "Two";
const DemoTabs = Tabs.create<Tab>();
const tabValues: readonly Tab[] = ["One", "Two"];

const GotTabsMessage = m("GotTabsMessage", { message: Tabs.Message });
const Model = S.Struct({ tabs: Tabs.Model, status: S.String });
type Model = typeof Model.Type;
const Message = S.Union([GotTabsMessage]);
type Message = typeof Message.Type;

const initialModel: Model = {
  tabs: Tabs.initialize({ id: "registry-tabs" })[0],
  status: "Selected: One",
};

const update = (
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
              Selected: ({ value }) => `Selected: ${value}`,
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

const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [],
    [
      h.submodel({
        slotId: model.tabs.id,
        model: model.tabs,
        view: DemoTabs.view,
        viewInputs: {
          tabs: tabValues,
          ariaLabel: "Registry tabs",
          toView: (render) =>
            Tabs.tabsView({
              render,
              panelContent: {
                One: "Panel one",
                Two: "Panel two",
              },
            }),
        },
        toParentMessage: (message) => GotTabsMessage({ message }),
      }),
      h.p([], [model.status]),
    ]
  );
});

describe("Tabs registry view", () => {
  test("selects tabs and resolves focus command", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("tab", { name: "One" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.click(Scene.role("tab", { name: "Two" })),
      Scene.Command.resolve(
        Tabs.FocusTab({ id: "registry-tabs", index: 1 }),
        Tabs.CompletedFocusTab(),
        (message) => GotTabsMessage({ message })
      ),
      Scene.expect(Scene.text("Selected: Two")).toExist()
    );
  });
});
