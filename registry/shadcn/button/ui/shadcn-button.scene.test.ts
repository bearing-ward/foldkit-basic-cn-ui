import { Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { describe, expect, test } from "vitest";

import * as Button from "./index";

const ClickedButton = m("ClickedButton");

const Model = S.Struct({
  count: S.Number,
});
type Model = typeof Model.Type;

const Message = S.Union([ClickedButton]);
type Message = typeof Message.Type;

const initialModel: Model = { count: 0 };

const update = (model: Model): readonly [Model, []] => [
  { count: model.count + 1 },
  [],
];

const view = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-2")],
    [
      Button.view<Message>({
        onClick: ClickedButton(),
        children: ["Save changes"],
      }),
      h.p([], [`Clicked ${model.count} times`]),
    ],
  );
};

describe("shadcn Button registry view", () => {
  test("exports the default shadcn variant helper output", () => {
    const className = Button.buttonVariants();

    expect(className).toContain("bg-primary");
    expect(className).toContain("text-primary-foreground");
    expect(className).toContain("h-9");
    expect(className).toContain("px-4");
  });

  test("exports destructive and large variant helper output", () => {
    const className = Button.buttonVariants({
      variant: "destructive",
      size: "lg",
    });

    expect(className).toContain("bg-destructive");
    expect(className).toContain("text-white");
    expect(className).toContain("h-10");
    expect(className).toContain("px-6");
  });

  test("merges custom Tailwind class conflicts with cn", () => {
    const className = Button.buttonVariants({ className: "h-12" });

    expect(className).toContain("h-12");
    expect(className.split(" ")).not.toContain("h-9");
  });

  test("keeps component-local recipes addressable by style", () => {
    expect(Button.defaultButtonStyle).toBe("new-york-v4");
    expect(Button.resolveButtonStyle(undefined)).toBe("new-york-v4");
    expect(Button.resolveButtonStyle("nova")).toBe("base-nova");
    expect(Button.resolveButtonStyle("vega")).toBe(Button.defaultButtonStyle);
    expect(Button.buttonRecipeByStyle["new-york-v4"].variants.variant.default)
      .toContain("bg-primary");
    expect(Button.buttonVariants({ style: "base-nova" })).toContain(
      "group/button",
    );
    expect(Button.buttonVariants({ style: "nova" })).toContain("group/button");
  });

  test("reuses the Foldkit Button functional contract", () => {
    expect(Button.view).toBeTypeOf("function");
    expect(Button.buttonVariants()).toContain("rounded");
    expect(Button.buttonVariants({ variant: "destructive" })).toContain(
      "bg-destructive",
    );
  });

  test("renders shadcn variant props through the Button view", () => {
    const propsView = (): Html =>
      Button.view<Message>({
        variant: "secondary",
        size: "lg",
        style: "base-nova",
        className: "rounded-full",
        children: ["Styled action"],
      });

    Scene.scene(
      { update, view: propsView },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Styled action" })).toHaveAttr(
        "data-variant",
        "secondary",
      ),
      Scene.expect(Scene.role("button", { name: "Styled action" })).toHaveAttr(
        "data-size",
        "lg",
      ),
      Scene.expect(Scene.role("button", { name: "Styled action" })).toHaveAttr(
        "data-style",
        "base-nova",
      ),
    );
  });

  test("renders and dispatches through the Foldkit Button primitive", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Save changes" })).toExist(),
      Scene.expect(Scene.text("Clicked 0 times")).toExist(),
      Scene.click(Scene.role("button", { name: "Save changes" })),
      Scene.expect(Scene.text("Clicked 1 times")).toExist(),
    );
  });
});
