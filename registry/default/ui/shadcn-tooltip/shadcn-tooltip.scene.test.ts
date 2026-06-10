import { Match as M, Option, Schema as S } from "effect";
import { Command, Scene, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as Tooltip from "./index";

const tooltipId = "registry-tooltip";
const GotTooltipMessage = m("GotTooltipMessage", {
  message: Tooltip.Message,
});
const Model = S.Struct({ tooltip: Tooltip.Model, status: S.String });
type Model = typeof Model.Type;
const Message = S.Union([GotTooltipMessage]);
type Message = typeof Message.Type;

const [tooltip] = Tooltip.init({ id: tooltipId, showDelay: 0 });
const initialModel: Model = {
  tooltip,
  status: "Tooltip hidden.",
};

const toParentMessage = (message: Tooltip.Message): Message =>
  GotTooltipMessage({ message });

const AnchorTooltip = Tooltip.AnchorTooltip({
  buttonId: `${tooltipId}-trigger`,
  anchor: Tooltip.tooltipAnchor,
});

const resolveTooltipMount = () =>
  Scene.Mount.resolve(
    AnchorTooltip,
    Tooltip.CompletedAnchorTooltip(),
    toParentMessage
  );

const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotTooltipMessage: ({ message }) => {
        const [tooltip, commands, maybeOutMessage] = Tooltip.update(
          model.tooltip,
          message
        );
        const status = Option.match(maybeOutMessage, {
          onNone: () => model.status,
          onSome: M.type<Tooltip.OutMessage>().pipe(
            M.tagsExhaustive({
              Hidden: () => "Tooltip hidden.",
              Shown: () => "Tooltip shown.",
            })
          ),
        });

        return [
          evo(model, { tooltip: () => tooltip, status: () => status }),
          Command.mapMessages(commands, toParentMessage),
        ];
      },
    })
  );

const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.tooltip.id,
        model: model.tooltip,
        view: Tooltip.view,
        viewInputs: {
          anchor: Tooltip.tooltipAnchor,
          toView: (render) =>
            Tooltip.tooltipView({
              render,
              triggerLabel: "Hover details",
              panelText: "Helpful details",
            }),
        },
        toParentMessage,
      }),
      h.p([], [model.status]),
    ]
  );
});

describe("Tooltip registry view", () => {
  test("shows after hover delay and resolves panel mount", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Hover details" })).toHaveAttr(
        "aria-describedby",
        `${tooltipId}-panel`
      ),
      Scene.expect(Scene.text("Helpful details")).not.toExist(),
      Scene.hover(Scene.role("button", { name: "Hover details" })),
      Scene.Command.resolve(
        Tooltip.ShowAfterDelay({
          delay: initialModel.tooltip.showDelay,
          version: 1,
        }),
        Tooltip.ElapsedShowDelay({ version: 1 }),
        toParentMessage
      ),
      resolveTooltipMount(),
      Scene.expect(Scene.role("tooltip")).toExist(),
      Scene.expect(Scene.text("Helpful details")).toExist(),
      Scene.expect(Scene.text("Tooltip shown.")).toExist()
    );
  });

  test("opens on keyboard focus and hides on blur", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.focus(Scene.role("button", { name: "Hover details" })),
      resolveTooltipMount(),
      Scene.expect(Scene.text("Helpful details")).toExist(),
      Scene.expect(Scene.text("Tooltip shown.")).toExist(),
      Scene.blur(Scene.role("button", { name: "Hover details" })),
      Scene.Mount.expectEnded(AnchorTooltip),
      Scene.expect(Scene.text("Helpful details")).not.toExist(),
      Scene.expect(Scene.text("Tooltip hidden.")).toExist()
    );
  });
});
