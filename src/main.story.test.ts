import { Option } from "effect";
import { Calendar, Story, Ui } from "foldkit";
import { fromString } from "foldkit/url";
import { describe, expect, test } from "vitest";

import * as DialogAnimatedExample from "../registry/default/examples/dialog-animated/main";
import * as DialogBasicExample from "../registry/default/examples/dialog-basic/main";
import * as DialogDestructiveExample from "../registry/default/examples/dialog-destructive/main";
import * as DialogFocusExample from "../registry/default/examples/dialog-focus/main";
import * as DialogScrollableExample from "../registry/default/examples/dialog-scrollable/main";
import * as MenuAnimatedExample from "../registry/default/examples/menu-animated/main";
import * as MenuBasicExample from "../registry/default/examples/menu-basic/main";
import * as PopoverAnimatedExample from "../registry/default/examples/popover-animated/main";
import * as PopoverBasicExample from "../registry/default/examples/popover-basic/main";
import { ChangedUrl, GotUiMessage, HomeRoute, update } from "./main";
import type { Model } from "./main";
import { uiInit } from "./ui/init";
import { GotMobileMenuDialogMessage } from "./ui/message";

const today = Calendar.make(2026, 4, 16);
const [initialUiModel] = uiInit(today);
const [dialogBasicExample] = DialogBasicExample.init();
const [dialogAnimatedExample] = DialogAnimatedExample.init();
const [dialogDestructiveExample] = DialogDestructiveExample.init();
const [dialogFocusExample] = DialogFocusExample.init();
const [dialogScrollableExample] = DialogScrollableExample.init();
const [menuBasicExample] = MenuBasicExample.init();
const [menuAnimatedExample] = MenuAnimatedExample.init();
const [popoverBasicExample] = PopoverBasicExample.init();
const [popoverAnimatedExample] = PopoverAnimatedExample.init();

const initialModel: Model = {
  route: HomeRoute(),
  uiModel: initialUiModel,
  dialogBasicExample,
  dialogAnimatedExample,
  dialogDestructiveExample,
  dialogFocusExample,
  dialogScrollableExample,
  menuBasicExample,
  menuAnimatedExample,
  popoverBasicExample,
  popoverAnimatedExample,
};

const urlOrThrow = (raw: string) =>
  Option.getOrThrowWith(
    fromString(raw),
    () => new Error(`Failed to parse url: ${raw}`)
  );

describe(update, () => {
  describe("routing", () => {
    test("the root URL resolves to Home", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(ChangedUrl({ url: urlOrThrow("http://localhost/") })),
        Story.model((model) => {
          expect(model.route._tag).toBe("Home");
        })
      );
    });

    test("/button resolves to Button", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({ url: urlOrThrow("http://localhost/button") })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("Button");
        })
      );
    });

    test("/calendar resolves to Calendar", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({ url: urlOrThrow("http://localhost/calendar") })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("Calendar");
        })
      );
    });

    test("/date-picker resolves to DatePicker", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({ url: urlOrThrow("http://localhost/date-picker") })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DatePicker");
        })
      );
    });

    test("/docs/components/dialog resolves to DialogDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/dialog"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogDocs");
        })
      );
    });

    test("/docs/components/dialog/examples/basic resolves to DialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dialog/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogBasicExample");
        })
      );
    });

    test("/docs/components/dialog/examples/animated resolves to DialogAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dialog/examples/animated"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogAnimatedExample");
        })
      );
    });

    test("/docs/components/dialog/examples/destructive resolves to DialogDestructiveExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dialog/examples/destructive"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogDestructiveExample");
        })
      );
    });

    test("/docs/components/dialog/examples/focus resolves to DialogFocusExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dialog/examples/focus"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogFocusExample");
        })
      );
    });

    test("/docs/components/dialog/examples/scrollable resolves to DialogScrollableExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dialog/examples/scrollable"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogScrollableExample");
        })
      );
    });

    test("/docs/components/popover resolves to PopoverDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/popover"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PopoverDocs");
        })
      );
    });

    test("/docs/components/menu resolves to MenuDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/menu"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenuDocs");
        })
      );
    });

    test("/docs/components/menu/examples/basic resolves to MenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/menu/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenuBasicExample");
        })
      );
    });

    test("/docs/components/menu/examples/animated resolves to MenuAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/menu/examples/animated"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenuAnimatedExample");
        })
      );
    });

    test("/docs/components/popover/examples/basic resolves to PopoverBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/popover/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PopoverBasicExample");
        })
      );
    });

    test("/docs/components/popover/examples/animated resolves to PopoverAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/popover/examples/animated"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PopoverAnimatedExample");
        })
      );
    });

    test("an unknown path resolves to NotFound", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({ url: urlOrThrow("http://localhost/unknown") })
        ),
        Story.model((model) => {
          if (model.route._tag === "NotFound") {
            expect(model.route.path).toBe("/unknown");
          } else {
            throw new Error("Expected NotFound");
          }
        })
      );
    });

    test("/examples/dialog-basic resolves to DialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dialog-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogBasicExample");
        })
      );
    });

    test("/examples/dialog-animated resolves to DialogAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dialog-animated"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogAnimatedExample");
        })
      );
    });

    test("/examples/dialog-destructive resolves to DialogDestructiveExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dialog-destructive"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogDestructiveExample");
        })
      );
    });

    test("/examples/dialog-focus resolves to DialogFocusExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dialog-focus"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogFocusExample");
        })
      );
    });

    test("/examples/dialog-scrollable resolves to DialogScrollableExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dialog-scrollable"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogScrollableExample");
        })
      );
    });

    test("/examples/popover-basic resolves to PopoverBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/popover-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PopoverBasicExample");
        })
      );
    });

    test("/examples/menu-basic resolves to MenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/menu-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenuBasicExample");
        })
      );
    });

    test("/examples/menu-animated resolves to MenuAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/menu-animated"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenuAnimatedExample");
        })
      );
    });

    test("/examples/popover-animated resolves to PopoverAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/popover-animated"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PopoverAnimatedExample");
        })
      );
    });
  });

  describe("mobile menu", () => {
    test("navigating to a new URL closes the mobile menu dialog", () => {
      const modelWithOpenMenu: Model = {
        ...initialModel,
        uiModel: {
          ...initialModel.uiModel,
          mobileMenuDialog: Ui.Dialog.init({
            id: "mobile-menu",
            isOpen: true,
          }),
        },
      };

      Story.story(
        update,
        Story.with(modelWithOpenMenu),
        Story.message(
          ChangedUrl({ url: urlOrThrow("http://localhost/button") })
        ),
        Story.Command.resolve(
          Ui.Dialog.CloseDialog,
          Ui.Dialog.CompletedCloseDialog(),
          (dialogMessage) =>
            GotUiMessage({
              message: GotMobileMenuDialogMessage({ message: dialogMessage }),
            })
        ),
        Story.model((model) => {
          expect(model.uiModel.mobileMenuDialog.isOpen).toBeFalsy();
        })
      );
    });
  });
});
