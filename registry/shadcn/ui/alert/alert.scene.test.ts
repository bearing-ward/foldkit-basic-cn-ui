import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Alert from "./index";

describe("alert", () => {
  test("renders default alert anatomy and role", () => {
    const view = (): Html =>
      Alert.rootView<never>({
        children: [
          Alert.iconView<never>({ children: ["i"] }),
          Alert.contentView<never>({
            children: [
              Alert.titleView<never>({ children: ["Heads up!"] }),
              Alert.descriptionView<never>({
                children: ["You can add components using the cli."],
              }),
            ],
          }),
        ],
      });

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("alert")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Heads up!" })).toExist(),
      Scene.expect(
        Scene.text("You can add components using the cli.")
      ).toExist(),
      Scene.expect(Scene.text("i")).toExist(),
      Scene.expect(Scene.role("alert")).toHaveClass("border-gray-200")
    );
  });

  test("renders destructive variant and action slot", () => {
    const h = html<never>();

    const view = (): Html =>
      Alert.view<never>({
        title: "Error",
        description: "Your session has expired. Please log in again.",
        icon: "!",
        variant: "Destructive",
        action: h.button([h.Type("button")], ["Log in"]),
      });

    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.role("alert")).toHaveAttr(
        "data-variant",
        "Destructive"
      ),
      Scene.expect(Scene.role("alert")).toHaveClass("border-red-200"),
      Scene.expect(Scene.role("button", { name: "Log in" })).toExist()
    );
  });
});
