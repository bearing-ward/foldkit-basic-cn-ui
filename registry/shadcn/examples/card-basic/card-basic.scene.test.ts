import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as CardBasicExample from "./main";

describe("Card Basic example", () => {
  test("renders the origin login card content", () => {
    Scene.scene(
      { update: CardBasicExample.update, view: CardBasicExample.view },
      Scene.with(CardBasicExample.init()[0]),
      Scene.expect(Scene.text("Login to your account")).toExist(),
      Scene.expect(
        Scene.text("Enter your email below to login to your account")
      ).toExist(),
      Scene.expect(Scene.label("Email")).toExist(),
      Scene.expect(Scene.placeholder("m@example.com")).toExist(),
      Scene.expect(Scene.label("Password")).toExist(),
      Scene.expect(Scene.role("link", { name: "Sign Up" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Forgot your password?" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Login" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Login with Google" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Login" })).not.toHaveHandler(
        "click"
      ),
      Scene.expect(
        Scene.role("button", { name: "Login with Google" })
      ).not.toHaveHandler("click")
    );
  });
});
