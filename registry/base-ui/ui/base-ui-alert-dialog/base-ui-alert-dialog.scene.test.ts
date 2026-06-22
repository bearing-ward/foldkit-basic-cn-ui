import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as AlertDialog from ".";

const view = (open: boolean) => {
  const h = html<boolean>();

  return AlertDialog.rootView<boolean>({
    children: [
      AlertDialog.triggerView({
        onClick: true,
        children: [h.span([], ["Discard draft"])],
      }),
      AlertDialog.portalView({
        open,
        children: [
          AlertDialog.backdropView({ children: [] }),
          AlertDialog.viewportView({
            children: [
              AlertDialog.popupView({
                titleId: "title",
                descriptionId: "description",
                children: [
                  AlertDialog.titleView({
                    id: "title",
                    children: [h.span([], ["Discard draft?"])],
                  }),
                  AlertDialog.descriptionView({
                    id: "description",
                    children: [h.span([], ["You can't undo this action."])],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

describe("AlertDialog registry component", () => {
  test("opens an aria-labelled alert dialog", () => {
    Scene.scene(
      {
        update: (_model: boolean, message: boolean) => [message, []] as const,
        view,
      },
      Scene.with(false),
      Scene.expect(
        Scene.role("alertdialog", { name: "Discard draft?" })
      ).not.toExist(),
      Scene.click(Scene.role("button", { name: "Discard draft" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Discard draft?" })
      ).toHaveAttr("aria-describedby", "description")
    );
  });

  test("exports Base UI alert dialog class hooks", () => {
    expect(AlertDialog.alertDialogPopupClasses).toContain("shadow");
    expect(AlertDialog.alertDialogConfirmClasses).toContain("red");
  });
});
