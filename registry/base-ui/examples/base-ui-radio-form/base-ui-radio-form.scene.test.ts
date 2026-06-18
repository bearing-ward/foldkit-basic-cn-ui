import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Radio from "../../ui/base-ui-radio";
import * as BaseUiRadioFormExample from "./main";

describe("Base UI radio Form example", () => {
  test("renders the origin form integration structure", () => {
    Scene.scene(
      {
        update: BaseUiRadioFormExample.update,
        view: BaseUiRadioFormExample.view,
      },
      Scene.with(BaseUiRadioFormExample.init()[0]),
      Scene.expect(Scene.text("Storage type")).toExist(),
      Scene.expect(Scene.role("radio", { name: "SSD" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "HDD" })).not.toBeChecked(),
      Scene.expect(Scene.text("Best apple")).not.toExist(),
      Scene.click(Scene.role("radio", { name: "HDD" })),
      Scene.Command.expectHas(
        Radio.FocusOption({ id: "radio-form", index: 1 })
      ),
      Scene.Command.resolve(
        Radio.FocusOption({ id: "radio-form", index: 1 }),
        Radio.CompletedFocusOption(),
        (message) => BaseUiRadioFormExample.GotRadioGroupMessage({ message })
      ),
      Scene.expect(Scene.role("radio", { name: "HDD" })).toBeChecked()
    );
  });
});
