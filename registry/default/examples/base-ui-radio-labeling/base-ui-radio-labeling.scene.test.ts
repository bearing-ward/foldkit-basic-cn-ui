import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Radio from "../../ui/base-ui-radio";
import * as BaseUiRadioLabelingExample from "./main";

describe("Base UI radio Labeling example", () => {
  test("labels the group and each radio", () => {
    Scene.scene(
      {
        update: BaseUiRadioLabelingExample.update,
        view: BaseUiRadioLabelingExample.view,
      },
      Scene.with(BaseUiRadioLabelingExample.init()[0]),
      Scene.expect(Scene.text("Storage type")).toExist(),
      Scene.expect(Scene.role("radio", { name: "SSD" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "HDD" })).not.toBeChecked(),
      Scene.expect(Scene.text("Best apple")).not.toExist(),
      Scene.click(Scene.role("radio", { name: "HDD" })),
      Scene.Command.expectHas(
        Radio.FocusOption({ id: "radio-labeling", index: 1 })
      ),
      Scene.Command.resolve(
        Radio.FocusOption({ id: "radio-labeling", index: 1 }),
        Radio.CompletedFocusOption(),
        (message) =>
          BaseUiRadioLabelingExample.GotRadioGroupMessage({ message })
      ),
      Scene.expect(Scene.role("radio", { name: "HDD" })).toBeChecked()
    );
  });
});
