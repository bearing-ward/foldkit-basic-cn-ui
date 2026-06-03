import { Match as M, Option, Schema as S } from "effect";
import { Command, Scene, Submodel, Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as Toast from "./index";

const GotToastMessage = m("GotToastMessage", { message: Toast.Message });
const ClickedShowToast = m("ClickedShowToast");
const ClickedDismissAll = m("ClickedDismissAll");

const Model = S.Struct({
  toast: Toast.Model,
  status: S.String,
});
type Model = typeof Model.Type;

const Message = S.Union([GotToastMessage, ClickedShowToast, ClickedDismissAll]);
type Message = typeof Message.Type;

const initialModel: Model = {
  toast: Toast.init({ id: "registry-toast" }),
  status: "No notifications.",
};

const toAnimationMessage =
  (entryId: string) => (message: Ui.Animation.Message) =>
    GotToastMessage({
      message: Toast.GotAnimationMessage({ entryId, message }),
    });

const resolveEntryEnterAnimation = (entryId: string) =>
  Scene.Command.resolveAll(
    [
      Ui.Animation.RequestFrame,
      Ui.Animation.AdvancedAnimationFrame(),
      toAnimationMessage(entryId),
    ],
    [
      Ui.Animation.WaitForAnimationSettled({ id: entryId }),
      Ui.Animation.EndedAnimation(),
      toAnimationMessage(entryId),
    ]
  );

const resolveEntryLeaveAnimation = (entryId: string) =>
  Scene.Command.resolveAll(
    [
      Ui.Animation.RequestFrame,
      Ui.Animation.AdvancedAnimationFrame(),
      toAnimationMessage(entryId),
    ],
    [
      Ui.Animation.WaitForAnimationSettled({ id: entryId }),
      Ui.Animation.EndedAnimation(),
      toAnimationMessage(entryId),
    ]
  );

const updateToast = (
  model: Model,
  toast: Toast.Model,
  commands: readonly Command.Command<Toast.Message>[],
  maybeOutMessage: Option.Option<Toast.OutMessage>
): readonly [Model, readonly Command.Command<Message>[]] => {
  const status = Option.match(maybeOutMessage, {
    onNone: () => model.status,
    onSome: M.type<Toast.OutMessage>().pipe(
      M.tagsExhaustive({
        DismissedToast: ({ payload }) => `Dismissed: ${payload.title}`,
      })
    ),
  });

  return [
    evo(model, {
      toast: () => toast,
      status: () => status,
    }),
    Command.mapMessages(commands, (message) => GotToastMessage({ message })),
  ];
};

const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotToastMessage: ({ message }) => {
        const [toast, commands, maybeOutMessage] = Toast.update(
          model.toast,
          message
        );

        return updateToast(model, toast, commands, maybeOutMessage);
      },
      ClickedShowToast: () => {
        const [toast, commands, maybeOutMessage] = Toast.show(model.toast, {
          variant: "Success",
          sticky: true,
          payload: {
            title: "Saved",
            maybeDescription: Option.some("Settings are up to date."),
          },
        });

        return updateToast(
          evo(model, { status: () => "Showing: Saved" }),
          toast,
          commands,
          maybeOutMessage
        );
      },
      ClickedDismissAll: () => {
        const [toast, commands, maybeOutMessage] = Toast.dismissAll(
          model.toast
        );

        return updateToast(model, toast, commands, maybeOutMessage);
      },
    })
  );

const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [],
    [
      h.button([h.Type("button"), h.OnClick(ClickedShowToast())], ["Show"]),
      h.button(
        [h.Type("button"), h.OnClick(ClickedDismissAll())],
        ["Dismiss all"]
      ),
      h.p([], [model.status]),
      h.submodel({
        slotId: model.toast.id,
        model: model.toast,
        view: Toast.view,
        viewInputs: {
          position: "BottomRight",
          entryToView: Toast.toastEntryView,
          entryClassName: Toast.entryClassName,
          containerClassName: Toast.containerClassName,
        },
        toParentMessage: (message) => GotToastMessage({ message }),
      }),
    ]
  );
});

describe("Toast registry view", () => {
  test("shows and marks toast entries for dismissal", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("region", { name: "Notifications" })).toExist(),
      Scene.click(Scene.role("button", { name: "Show" })),
      resolveEntryEnterAnimation("registry-toast-entry-0"),
      Scene.expect(Scene.role("status")).toExist(),
      Scene.expect(Scene.text("Saved")).toExist(),
      Scene.expect(Scene.text("Settings are up to date.")).toExist(),
      Scene.expect(Scene.text("Showing: Saved")).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss Saved" })),
      Scene.expect(Scene.role("status")).toHaveAttr("data-leave", ""),
      resolveEntryLeaveAnimation("registry-toast-entry-0"),
      Scene.expect(Scene.text("Dismissed: Saved")).toExist()
    );
  });
});
