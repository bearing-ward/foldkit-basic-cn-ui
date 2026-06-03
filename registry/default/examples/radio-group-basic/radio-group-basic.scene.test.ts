import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as RadioGroup from "../../ui/radio-group";
import * as RadioGroupBasicExample from "./main";

describe("RadioGroup Basic example", () => {
  test("updates selected plan feedback", () => {
    Scene.scene(
      {
        update: RadioGroupBasicExample.update,
        view: RadioGroupBasicExample.view,
      },
      Scene.with(RadioGroupBasicExample.init()[0]),
      Scene.expect(Scene.role("radio", { name: "Startup" })).toBeChecked(),
      Scene.expect(Scene.text("Selected plan: Startup")).toExist(),
      Scene.click(Scene.role("radio", { name: "Business" })),
      Scene.Command.expectHas(
        RadioGroup.FocusOption({ id: "radio-group-basic", index: 1 })
      ),
      Scene.Command.resolve(
        RadioGroup.FocusOption({ id: "radio-group-basic", index: 1 }),
        RadioGroup.CompletedFocusOption(),
        (message) => RadioGroupBasicExample.GotRadioGroupMessage({ message })
      ),
      Scene.expect(Scene.role("radio", { name: "Business" })).toBeChecked(),
      Scene.expect(Scene.text("Selected plan: Business")).toExist()
    );
  });
});
