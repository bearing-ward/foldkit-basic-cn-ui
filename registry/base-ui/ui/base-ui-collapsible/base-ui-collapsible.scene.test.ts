import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as Collapsible from ".";

const view = (open: boolean, disabled = false) =>
  Collapsible.rootView<string>({
    open,
    disabled,
    children: [
      Collapsible.triggerView({
        open,
        disabled,
        onOpenChange: "ClickedTrigger",
        ariaLabel: "Recovery keys",
        panelId: "recovery-keys-panel",
        children: [html<string>().span([], ["Recovery keys"])],
      }),
      Collapsible.panelView({
        open,
        id: "recovery-keys-panel",
        children: [
          Collapsible.contentView([
            html<string>().div([], ["alien-bean-pasta"]),
            html<string>().div([], ["wild-irish-burrito"]),
            html<string>().div([], ["horse-battery-staple"]),
          ]),
        ],
      }),
    ],
  });

describe("Collapsible registry component", () => {
  test("renders closed trigger and omits panel content by default", () => {
    Scene.scene(
      {
        update: (model: boolean) => [model, []] as const,
        view,
      },
      Scene.with(false),
      Scene.expect(Scene.role("button", { name: "Recovery keys" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.text("alien-bean-pasta")).not.toExist()
    );
  });

  test("renders open panel state and content", () => {
    Scene.scene(
      {
        update: (model: boolean) => [model, []] as const,
        view,
      },
      Scene.with(true),
      Scene.expect(Scene.role("button", { name: "Recovery keys" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(Scene.text("alien-bean-pasta")).toExist()
    );
  });

  test("does not emit click messages when disabled", () => {
    Scene.scene(
      {
        update: (model: boolean) => [model, []] as const,
        view: (open) => view(open, true),
      },
      Scene.with(false),
      Scene.expect(Scene.role("button", { name: "Recovery keys" })).toHaveAttr(
        "disabled",
        "true"
      )
    );
  });

  test("exports Base UI state class hooks", () => {
    expect(Collapsible.collapsibleRootClasses).toContain("rounded-lg");
    expect(Collapsible.collapsibleTriggerClasses).toContain(
      "data-[panel-open]"
    );
    expect(Collapsible.collapsiblePanelClasses).toContain("data-[closed]");
  });
});
