import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Borders example", () => {
  test("opens the bordered accordion panels", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.text("Workspace identity, billing contact, and owner details.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Exports" })),
      Scene.expect(
        Scene.text("CSV, JSON, and archive exports for compliance workflows.")
      ).toExist()
    );
  });
});
