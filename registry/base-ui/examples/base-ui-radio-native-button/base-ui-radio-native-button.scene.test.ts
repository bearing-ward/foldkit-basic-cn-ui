import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Radio from "../../ui/base-ui-radio";
import * as BaseUiRadioNativeButtonExample from "./main";

describe("Base UI radio Native Button example", () => {
  test("renders sibling labels with native button radio controls", () => {
    Scene.scene(
      {
        update: BaseUiRadioNativeButtonExample.update,
        view: BaseUiRadioNativeButtonExample.view,
      },
      Scene.with(BaseUiRadioNativeButtonExample.init()[0]),
      Scene.expect(Scene.text("Storage type")).toExist(),
      Scene.expect(Scene.role("radio", { name: "SSD" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "HDD" })).not.toBeChecked(),
      Scene.expect(Scene.text("Best apple")).not.toExist(),
      Scene.click(Scene.role("radio", { name: "HDD" })),
      Scene.Command.expectHas(
        Radio.FocusOption({ id: "radio-native-button", index: 1 })
      ),
      Scene.Command.resolve(
        Radio.FocusOption({ id: "radio-native-button", index: 1 }),
        Radio.CompletedFocusOption(),
        (message) =>
          BaseUiRadioNativeButtonExample.GotRadioGroupMessage({ message })
      ),
      Scene.expect(Scene.role("radio", { name: "HDD" })).toBeChecked()
    );
  });
});
