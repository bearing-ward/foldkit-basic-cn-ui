import { Match as M, Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, expect, test } from "vitest";

import * as Accordion from "./index";

const ToggledPanel = m("ToggledPanel", { value: S.String });
const Message = S.Union([ToggledPanel]);
type Message = typeof Message.Type;

type Model = Readonly<{
  openValues: readonly string[];
}>;

const update = (
  model: Model,
  message: Message
): readonly [Model, readonly []] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly []]>(),
    M.tagsExhaustive({
      ToggledPanel: ({ value }) => [
        evo(model, {
          openValues: (openValues) => Accordion.toggleValue(openValues, value),
        }),
        [],
      ],
    })
  );

const view = (model: Model): Html => {
  const h = html<Message>();

  return Accordion.rootView<Message>({
    openValues: model.openValues,
    children: [
      Accordion.itemView<Message>({
        value: "base-ui",
        openValues: model.openValues,
        title: "What is Base UI?",
        onValueChange: ToggledPanel({ value: "base-ui" }),
        children: [h.p([], ["Base UI is a component library."])],
      }),
      Accordion.itemView<Message>({
        value: "getting-started",
        openValues: model.openValues,
        title: "How do I get started?",
        onValueChange: ToggledPanel({ value: "getting-started" }),
        children: [h.p([], ["Install the registry item."])],
      }),
      Accordion.itemView<Message>({
        value: "disabled",
        openValues: model.openValues,
        title: "Locked panel",
        onValueChange: ToggledPanel({ value: "disabled" }),
        disabled: true,
        children: [h.p([], ["This should not open."])],
      }),
    ],
  });
};

describe("Base UI Accordion registry view", () => {
  test("renders Base UI accordion parts and toggles multiple panels", () => {
    Scene.scene(
      { update, view },
      Scene.with({ openValues: ["base-ui"] }),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(Scene.text("Base UI is a component library.")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "How do I get started?" })
      ).toHaveAttr("aria-expanded", "false"),
      Scene.click(Scene.role("button", { name: "How do I get started?" })),
      Scene.expect(
        Scene.role("button", { name: "How do I get started?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(Scene.text("Install the registry item.")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.click(Scene.role("button", { name: "What is Base UI?" })),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "false")
    );
  });

  test("computes next open value arrays", () => {
    expect(Accordion.toggleValue(["base-ui"], "getting-started")).toEqual([
      "base-ui",
      "getting-started",
    ]);
    expect(Accordion.toggleValue(["base-ui"], "base-ui")).toEqual([]);
  });
});
