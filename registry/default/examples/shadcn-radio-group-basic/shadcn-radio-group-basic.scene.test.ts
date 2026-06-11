import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as RadioGroup from "../../ui/shadcn-radio-group";
import * as ShadcnRadioGroupBasicExample from "./main";

describe("shadcn Radio Group Basic example", () => {
  test("matches the shadcn radio group demo selection", () => {
    Scene.scene(
      {
        update: ShadcnRadioGroupBasicExample.update,
        view: ShadcnRadioGroupBasicExample.view,
      },
      Scene.with(ShadcnRadioGroupBasicExample.init()[0]),
      Scene.expect(Scene.role("radio", { name: "Default" })).not.toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "Comfortable" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "Compact" })).not.toBeChecked(),
      Scene.click(Scene.role("radio", { name: "Compact" })),
      Scene.Command.resolve(
        RadioGroup.FocusOption({ id: "shadcn-radio-group-basic", index: 2 }),
        RadioGroup.CompletedFocusOption(),
        (message) =>
          ShadcnRadioGroupBasicExample.GotRadioGroupMessage({ message })
      ),
      Scene.expect(Scene.role("radio", { name: "Compact" })).toBeChecked(),
      Scene.expect(Scene.text("Selected density: Compact")).not.toExist()
    );
  });
});
