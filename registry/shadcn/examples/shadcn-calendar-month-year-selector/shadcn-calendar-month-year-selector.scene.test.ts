import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as UiCalendar from "../../ui/shadcn-calendar";
import * as Example from "./main";

describe("shadcn Calendar Month and Year Selector example", () => {
  test("opens month and year selector modes", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Selected date: 1990-07-15")).toExist(),
      Scene.click(Scene.role("button", { name: "Open month selector" })),
      Scene.Command.resolve(
        UiCalendar.FocusGrid,
        UiCalendar.CompletedFocusGrid(),
        (message) => Example.GotCalendarMessage({ message })
      ),
      Scene.expect(Scene.text("Jul")).toExist(),
      Scene.click(Scene.role("button", { name: "Open year selector" })),
      Scene.Command.resolve(
        UiCalendar.FocusGrid,
        UiCalendar.CompletedFocusGrid(),
        (message) => Example.GotCalendarMessage({ message })
      ),
      Scene.expect(Scene.text("1990")).toExist()
    );
  });
});
