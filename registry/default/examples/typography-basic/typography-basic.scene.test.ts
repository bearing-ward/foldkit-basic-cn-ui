import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as TypographyBasicExample from "./main";

describe("Typography Basic example", () => {
  test("renders the upstream joke tax typography sample", () => {
    Scene.scene(
      {
        update: TypographyBasicExample.update,
        view: TypographyBasicExample.view,
      },
      Scene.with(TypographyBasicExample.init()[0]),
      Scene.expect(
        Scene.role("heading", {
          name: "Taxing Laughter: The Joke Tax Chronicles",
        })
      ).toExist(),
      Scene.expect(Scene.text("The king's subjects were not amused. They grumbled and complained, but the king was firm:")).toExist(),
      Scene.expect(Scene.text("1st level of puns: 5 gold coins")).toExist(),
      Scene.expect(Scene.text("King's Treasury")).toExist(),
      Scene.expect(Scene.text("People stopped telling jokes")).toExist(),
      Scene.expect(Scene.text("@radix-ui/react-alert-dialog")).toExist(),
      Scene.expect(Scene.text("A modal dialog that interrupts the user with important content and expects a response.")).toExist(),
      Scene.expect(Scene.text("Are you absolutely sure?")).toExist(),
      Scene.expect(Scene.text("Email address")).toExist(),
      Scene.expect(Scene.text("Enter your email address.")).toExist(),
      Scene.expect(Scene.text("فرض الضرائب على الضحك: سجلات ضريبة النكتة")).toExist(),
      Scene.expect(Scene.text("المستوى الأول من التورية: 5 قطع ذهبية")).toExist(),
      Scene.expect(Scene.text("The Joke Tax")).not.toHaveHandler("click")
    );
  });
});
