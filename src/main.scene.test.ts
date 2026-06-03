import { Calendar, Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DialogAnimatedExample from "../registry/default/examples/dialog-animated/main";
import * as DialogBasicExample from "../registry/default/examples/dialog-basic/main";
import * as DialogDestructiveExample from "../registry/default/examples/dialog-destructive/main";
import {
  AnimationRoute,
  ButtonRoute,
  CheckboxRoute,
  DialogAnimatedExampleRoute,
  DialogBasicExampleRoute,
  DialogDestructiveExampleRoute,
  DialogDocsRoute,
  DisclosureRoute,
  FieldsetRoute,
  HomeRoute,
  InputRoute,
  NotFoundRoute,
  RadioGroupRoute,
  SelectRoute,
  SwitchRoute,
  TextareaRoute,
  update,
  view,
} from "./main";
import type { Model } from "./main";
import { uiInit } from "./ui/init";

const today = Calendar.make(2026, 4, 16);
const [initialUiModel] = uiInit(today);
const [dialogBasicExample] = DialogBasicExample.init();
const [dialogAnimatedExample] = DialogAnimatedExample.init();
const [dialogDestructiveExample] = DialogDestructiveExample.init();

const modelForRoute = (route: Model["route"]): Model => ({
  route,
  uiModel: initialUiModel,
  dialogBasicExample,
  dialogAnimatedExample,
  dialogDestructiveExample,
});

const homeModel = modelForRoute(HomeRoute());

describe("scene", () => {
  test("the sidebar nav lists a sample of every component link", () => {
    Scene.scene(
      { update, view },
      Scene.with(homeModel),
      Scene.expect(Scene.role("link", { name: "Button" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Calendar" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Dialog" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Dialog Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Dialog Animated Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Dialog Destructive Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Toast" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Virtual List" })).toExist()
    );
  });

  test("the Home route shows the showcase heading and description", () => {
    Scene.scene(
      { update, view },
      Scene.with(homeModel),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit UI Showcase" })
      ).toExist(),
      Scene.expect(
        Scene.text("This is a showcase of every Foldkit UI component.", {
          exact: false,
        })
      ).toExist()
    );
  });

  test("simple component routes render the sidebar nav", () => {
    const routes: readonly Model["route"][] = [
      ButtonRoute(),
      CheckboxRoute(),
      DisclosureRoute(),
      FieldsetRoute(),
      InputRoute(),
      RadioGroupRoute(),
      SelectRoute(),
      SwitchRoute(),
      TextareaRoute(),
      AnimationRoute(),
    ];

    routes.forEach((route) => {
      Scene.scene(
        { update, view },
        Scene.with(modelForRoute(route)),
        Scene.expect(Scene.role("link", { name: "Button" })).toExist()
      );
    });
  });

  test("the Dialog docs route renders docs and the inline preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Dialog" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open dialog" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated dialog" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open delete dialog" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Dialog Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Dialog Animated example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Dialog Destructive example",
        })
      ).toExist()
    );
  });

  test("the Dialog Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Dialog Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open dialog" })).toExist()
    );
  });

  test("the Dialog Animated example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogAnimatedExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dialog Animated" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated dialog" })
      ).toExist()
    );
  });

  test("the Dialog Destructive example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogDestructiveExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dialog Destructive" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open delete dialog" })
      ).toExist()
    );
  });

  test("the NotFound route renders the 404 panel and a Go Home link", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NotFoundRoute({ path: "/oops" }))),
      Scene.expect(
        Scene.role("heading", { name: "404 — Page Not Found" })
      ).toExist(),
      Scene.expect(Scene.text('The path "/oops" was not found.')).toExist(),
      Scene.expect(Scene.role("link", { name: "Go Home" })).toExist()
    );
  });
});
