import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnDrawerResponsiveDialogExample from "./main";

describe("shadcn Drawer Responsive Dialog example", () => {
  test("opens the edit profile drawer, updates fields, and saves", () => {
    Scene.scene(
      {
        update: ShadcnDrawerResponsiveDialogExample.update,
        view: ShadcnDrawerResponsiveDialogExample.view,
      },
      Scene.with(ShadcnDrawerResponsiveDialogExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Edit Profile" })),
      Scene.expect(Scene.role("dialog", { name: "Edit profile" })).toExist(),
      Scene.expect(Scene.label("Name")).toHaveValue("Pedro Duarte"),
      Scene.expect(Scene.label("Username")).toHaveValue("@peduarte"),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Shadcn User"),
      Scene.type(Scene.role("textbox", { name: "Username" }), "@shadcn"),
      Scene.expect(Scene.label("Name")).toHaveValue("Shadcn User"),
      Scene.expect(Scene.label("Username")).toHaveValue("@shadcn"),
      Scene.click(Scene.role("button", { name: "Save changes" })),
      Scene.expect(Scene.role("dialog", { name: "Edit profile" })).not.toExist()
    );
  });
});
