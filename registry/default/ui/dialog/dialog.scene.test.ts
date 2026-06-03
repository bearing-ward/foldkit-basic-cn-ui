import { Option } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Dialog from "./index";

const dialogId = "account-dialog";
const titleText = "Edit account";
const descriptionText = "Make changes to your account details.";

const [initialModel] = Dialog.init({ id: dialogId });

const ShowAccountDialog = Dialog.ShowDialog({
  id: dialogId,
  maybeFocusSelector: Option.none(),
});

const CloseAccountDialog = Dialog.CloseDialog({ id: dialogId });

const view = (model: Dialog.Model): Html => {
  const h = html<Dialog.Message>();

  return h.div(
    [],
    [
      Dialog.trigger<Dialog.Message>({
        label: "Open account dialog",
        onClick: Dialog.RequestedOpen(),
      }),
      h.submodel({
        slotId: model.id,
        model,
        view: Dialog.view,
        viewInputs: {
          toView: (render) =>
            Dialog.root<Dialog.Message>({
              render,
              children: [
                Dialog.backdrop<Dialog.Message>(render),
                Dialog.panel<Dialog.Message>({
                  render,
                  children: [
                    Dialog.title<Dialog.Message>({
                      model,
                      children: [titleText],
                    }),
                    Dialog.description<Dialog.Message>({
                      model,
                      children: [descriptionText],
                    }),
                    Dialog.footer<Dialog.Message>({
                      children: [
                        Dialog.cancelButton<Dialog.Message>({
                          label: "Cancel",
                          onClick: Dialog.RequestedClose(),
                        }),
                        Dialog.confirmButton<Dialog.Message>({
                          label: "Save changes",
                          onClick: Dialog.RequestedClose(),
                        }),
                        Dialog.closeButton<Dialog.Message>({
                          label: "Close",
                          onClick: Dialog.RequestedClose(),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
        },
        toParentMessage: (message) => message,
      }),
    ]
  );
};

describe("Dialog registry view helpers", () => {
  test("opens a labelled dialog from the trigger", () => {
    Scene.scene(
      { update: Dialog.update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("button", { name: "Open account dialog" })
      ).toExist(),
      Scene.expect(Scene.text(titleText)).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open account dialog" })),
      Scene.Command.expectExact(ShowAccountDialog),
      Scene.Command.resolve(ShowAccountDialog, Dialog.CompletedShowDialog()),
      Scene.expect(Scene.role("dialog", { name: titleText })).toExist(),
      Scene.expect(
        Scene.role("dialog", { name: titleText })
      ).toHaveAccessibleDescription(descriptionText),
      Scene.expect(Scene.role("button", { name: "Cancel" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Save changes" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Close" })).toExist()
    );
  });

  test("cancel closes the dialog", () => {
    Scene.scene(
      { update: Dialog.update, view },
      Scene.with(initialModel),
      Scene.click(Scene.role("button", { name: "Open account dialog" })),
      Scene.Command.resolve(ShowAccountDialog, Dialog.CompletedShowDialog()),
      Scene.click(Scene.role("button", { name: "Cancel" })),
      Scene.Command.expectExact(CloseAccountDialog),
      Scene.Command.resolve(CloseAccountDialog, Dialog.CompletedCloseDialog()),
      Scene.expect(Scene.text(titleText)).not.toExist()
    );
  });

  test("confirm closes the dialog", () => {
    Scene.scene(
      { update: Dialog.update, view },
      Scene.with(initialModel),
      Scene.click(Scene.role("button", { name: "Open account dialog" })),
      Scene.Command.resolve(ShowAccountDialog, Dialog.CompletedShowDialog()),
      Scene.click(Scene.role("button", { name: "Save changes" })),
      Scene.Command.expectExact(CloseAccountDialog),
      Scene.Command.resolve(CloseAccountDialog, Dialog.CompletedCloseDialog()),
      Scene.expect(Scene.text(titleText)).not.toExist()
    );
  });
});
