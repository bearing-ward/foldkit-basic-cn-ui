import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnFieldBasicExample from "./main";

describe("Shadcn Field Basic example", () => {
  test("matches the origin payment method form content", () => {
    Scene.scene(
      {
        update: ShadcnFieldBasicExample.update,
        view: ShadcnFieldBasicExample.view,
      },
      Scene.with(ShadcnFieldBasicExample.init()[0]),
      Scene.expect(Scene.text("Payment Method")).toExist(),
      Scene.expect(
        Scene.text("All transactions are secure and encrypted")
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Name on Card" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Card Number" })).toExist(),
      Scene.expect(Scene.text("Enter your 16-digit card number")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Month" })).toHaveAttr(
        "placeholder",
        "MM"
      ),
      Scene.expect(Scene.role("textbox", { name: "Year" })).toHaveAttr(
        "placeholder",
        "YYYY"
      ),
      Scene.expect(Scene.role("textbox", { name: "CVV" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Billing Address" })).toExist(),
      Scene.expect(
        Scene.text("The billing address associated with your payment method")
      ).toExist(),
      Scene.expect(Scene.text("Same as shipping address")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Comments" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Submit" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Cancel" })).toExist()
    );
  });

  test("keeps form state parent owned", () => {
    Scene.scene(
      {
        update: ShadcnFieldBasicExample.update,
        view: ShadcnFieldBasicExample.view,
      },
      Scene.with(ShadcnFieldBasicExample.init()[0]),
      Scene.type(Scene.role("textbox", { name: "Name on Card" }), "Ada"),
      Scene.type(
        Scene.role("textbox", { name: "Card Number" }),
        "4242424242424242"
      ),
      Scene.click(Scene.text("Same as shipping address")),
      Scene.expect(Scene.role("textbox", { name: "Name on Card" })).toHaveAttr(
        "value",
        "Ada"
      ),
      Scene.expect(Scene.role("textbox", { name: "Card Number" })).toHaveAttr(
        "value",
        "4242424242424242"
      )
    );
  });
});
