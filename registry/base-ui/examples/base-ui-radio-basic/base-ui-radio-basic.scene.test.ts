import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Radio from "../../ui/base-ui-radio";
import * as BaseUiRadioBasicExample from "./main";

describe("Base UI radio Basic example", () => {
  test("updates selected apple", () => {
    Scene.scene(
      {
        update: BaseUiRadioBasicExample.update,
        view: BaseUiRadioBasicExample.view,
      },
      Scene.with(BaseUiRadioBasicExample.init()[0]),
      Scene.expect(Scene.text("Best apple")).toExist(),
      Scene.expect(Scene.role("radio", { name: "Fuji" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "Gala" })).not.toBeChecked(),
      Scene.expect(
        Scene.role("radio", { name: "Granny Smith" })
      ).not.toBeChecked(),
      Scene.expect(Scene.text("Sweet and crisp.")).not.toExist(),
      Scene.click(Scene.role("radio", { name: "Gala" })),
      Scene.Command.expectHas(
        Radio.FocusOption({ id: "radio-group-basic", index: 1 })
      ),
      Scene.Command.resolve(
        Radio.FocusOption({ id: "radio-group-basic", index: 1 }),
        Radio.CompletedFocusOption(),
        (message) => BaseUiRadioBasicExample.GotRadioGroupMessage({ message })
      ),
      Scene.expect(Scene.role("radio", { name: "Gala" })).toBeChecked()
    );
  });
});
