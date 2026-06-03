import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as RadioGroup from "../../ui/radio-group";
import * as RadioGroupHorizontalExample from "./main";

describe("RadioGroup Horizontal example", () => {
  test("updates selected density and keeps disabled option locked", () => {
    Scene.scene(
      {
        update: RadioGroupHorizontalExample.update,
        view: RadioGroupHorizontalExample.view,
      },
      Scene.with(RadioGroupHorizontalExample.init()[0]),
      Scene.expect(Scene.role("radio", { name: "Comfortable" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "Spacious" })).toBeDisabled(),
      Scene.click(Scene.role("radio", { name: "Compact" })),
      Scene.Command.expectHas(
        RadioGroup.FocusOption({ id: "radio-group-horizontal", index: 0 })
      ),
      Scene.Command.resolve(
        RadioGroup.FocusOption({ id: "radio-group-horizontal", index: 0 }),
        RadioGroup.CompletedFocusOption(),
        (message) =>
          RadioGroupHorizontalExample.GotRadioGroupMessage({ message })
      ),
      Scene.expect(Scene.role("radio", { name: "Compact" })).toBeChecked(),
      Scene.expect(Scene.text("Selected density: Compact")).toExist()
    );
  });
});
