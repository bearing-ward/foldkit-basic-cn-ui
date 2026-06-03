import { Calendar, Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DialogAnimatedExample from "../registry/default/examples/dialog-animated/main";
import * as DialogBasicExample from "../registry/default/examples/dialog-basic/main";
import * as DialogDestructiveExample from "../registry/default/examples/dialog-destructive/main";
import * as DialogFocusExample from "../registry/default/examples/dialog-focus/main";
import * as DialogScrollableExample from "../registry/default/examples/dialog-scrollable/main";
import * as ListboxAnimatedExample from "../registry/default/examples/listbox-animated/main";
import * as ListboxBasicExample from "../registry/default/examples/listbox-basic/main";
import * as MenuAnimatedExample from "../registry/default/examples/menu-animated/main";
import * as MenuBasicExample from "../registry/default/examples/menu-basic/main";
import * as PopoverAnimatedExample from "../registry/default/examples/popover-animated/main";
import * as PopoverBasicExample from "../registry/default/examples/popover-basic/main";
import {
  AnimationRoute,
  ButtonRoute,
  CheckboxRoute,
  DialogAnimatedExampleRoute,
  DialogBasicExampleRoute,
  DialogDestructiveExampleRoute,
  DialogDocsRoute,
  DialogFocusExampleRoute,
  DialogScrollableExampleRoute,
  DisclosureRoute,
  FieldsetRoute,
  HomeRoute,
  InputRoute,
  ListboxAnimatedExampleRoute,
  ListboxBasicExampleRoute,
  ListboxDocsRoute,
  MenuAnimatedExampleRoute,
  MenuBasicExampleRoute,
  MenuDocsRoute,
  NotFoundRoute,
  PopoverAnimatedExampleRoute,
  PopoverBasicExampleRoute,
  PopoverDocsRoute,
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
const [dialogFocusExample] = DialogFocusExample.init();
const [dialogScrollableExample] = DialogScrollableExample.init();
const [listboxBasicExample] = ListboxBasicExample.init();
const [listboxAnimatedExample] = ListboxAnimatedExample.init();
const [menuBasicExample] = MenuBasicExample.init();
const [menuAnimatedExample] = MenuAnimatedExample.init();
const [popoverBasicExample] = PopoverBasicExample.init();
const [popoverAnimatedExample] = PopoverAnimatedExample.init();

const modelForRoute = (route: Model["route"]): Model => ({
  route,
  uiModel: initialUiModel,
  dialogBasicExample,
  dialogAnimatedExample,
  dialogDestructiveExample,
  dialogFocusExample,
  dialogScrollableExample,
  listboxBasicExample,
  listboxAnimatedExample,
  menuBasicExample,
  menuAnimatedExample,
  popoverBasicExample,
  popoverAnimatedExample,
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
      Scene.expect(
        Scene.role("link", { name: "Dialog Focus Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Dialog Scrollable Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Listbox Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Listbox Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Listbox Animated Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Menu Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Menu Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Menu Animated Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Popover Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Popover Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Popover Animated Example" })
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
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Composition policy" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "RTL policy" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "AlertDialog policy" })
      ).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Command Dialog policy" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Drawer policy" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Browser focus proof" })
      ).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Traceability checklist" })
      ).toExist(),
      Scene.expect(Scene.testId("docs-example-block-dialog-basic")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-animated")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-animated-actions")
      ).toHaveClass("border-t"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-destructive")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-focus-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-scrollable-preview")
      ).toHaveClass("pt-6"),
      Scene.expect(Scene.role("button", { name: "Open dialog" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated dialog" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open delete dialog" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open focus dialog" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Review permissions" })
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
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Dialog Focus example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Dialog Scrollable example",
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

  test("the Dialog Focus example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogFocusExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Dialog Focus" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open focus dialog" })
      ).toExist()
    );
  });

  test("the Dialog Scrollable example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogScrollableExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dialog Scrollable" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Review permissions" })
      ).toExist()
    );
  });

  test("the Menu docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(MenuDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Menu" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open menu" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated menu" })
      ).toExist(),
      Scene.expect(Scene.testId("docs-example-block-menu-basic")).toHaveClass(
        "flex"
      ),
      Scene.expect(Scene.testId("docs-example-block-menu-basic")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-menu-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-basic-preview")
      ).toHaveClass("pt-6"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-basic-actions")
      ).toHaveClass("border-t"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-animated")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-animated-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-animated-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Menu Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Menu Animated example",
        })
      ).toExist()
    );
  });

  test("the Listbox docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ListboxDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Listbox" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Choose person" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Choose animated person" })
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-listbox-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-listbox-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-listbox-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-listbox-animated")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-listbox-animated-actions")
      ).toHaveClass("border-t"),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Listbox Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Listbox Animated example",
        })
      ).toExist()
    );
  });

  test("the Listbox Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ListboxBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Listbox Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Choose person" })).toExist()
    );
  });

  test("the Listbox Animated example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ListboxAnimatedExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Listbox Animated" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Choose animated person" })
      ).toExist()
    );
  });

  test("the Menu Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(MenuBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Menu Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open menu" })).toExist()
    );
  });

  test("the Menu Animated example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(MenuAnimatedExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Menu Animated" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated menu" })
      ).toExist()
    );
  });

  test("the Popover docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(PopoverDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Popover" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open popover" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated popover" })
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-popover-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-popover-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-popover-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-popover-animated")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-popover-animated-actions")
      ).toHaveClass("border-t"),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Popover Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Popover Animated example",
        })
      ).toExist()
    );
  });

  test("the Popover Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(PopoverBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Popover Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open popover" })).toExist()
    );
  });

  test("the Popover Animated example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(PopoverAnimatedExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Popover Animated" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated popover" })
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
