import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Disclosure from "../../ui/disclosure";
import * as DisclosureBasicExample from "./main";

const resolveFocusButton = () =>
  Scene.Command.resolve(
    Disclosure.FocusButton({ id: "disclosure-basic" }),
    Disclosure.CompletedFocusButton(),
    (message) => DisclosureBasicExample.GotDisclosureMessage({ message })
  );

describe("Disclosure Basic example", () => {
  test("toggles panel content and parent-visible status", () => {
    Scene.scene(
      {
        update: DisclosureBasicExample.update,
        view: DisclosureBasicExample.view,
      },
      Scene.with(DisclosureBasicExample.init()[0]),
      Scene.expect(Scene.text("Disclosure is closed.")).toExist(),
      Scene.expect(
        Scene.text("Foldkit is an Elm-inspired UI framework powered by Effect.")
      ).not.toExist(),
      Scene.click(Scene.role("button", { name: "What is Foldkit?" })),
      Scene.expect(Scene.text("Disclosure is open.")).toExist(),
      Scene.expect(
        Scene.text("Foldkit is an Elm-inspired UI framework powered by Effect.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "What is Foldkit?" })),
      resolveFocusButton(),
      Scene.expect(Scene.text("Disclosure is closed.")).toExist()
    );
  });
});
