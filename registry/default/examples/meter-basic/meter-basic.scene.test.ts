import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as MeterBasicExample from "./main";

describe("Meter Basic example", () => {
  test("matches the Base UI meter hero example content", () => {
    Scene.scene(
      { update: MeterBasicExample.update, view: MeterBasicExample.view },
      Scene.with(MeterBasicExample.init()[0]),
      Scene.expect(Scene.text("Storage Used")).toExist(),
      Scene.expect(Scene.text("24%")).toExist(),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuenow",
        "24"
      ),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuemin",
        "0"
      ),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuemax",
        "100"
      ),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuetext",
        "24%"
      ),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "data-metering",
        ""
      ),
      Scene.expect(Scene.text("Storage Used")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("24%")).not.toHaveHandler("click")
    );
  });
});
