import clsx from "clsx";
import { Effect, Match as M, Schema as S, pipe } from "effect";
import type { Runtime, Submodel } from "foldkit";
import { Calendar, Command, Route, Subscription, Ui } from "foldkit";
import type { Document, Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { UrlRequest, load, pushUrl } from "foldkit/navigation";
import { literal, r, slash } from "foldkit/route";
import { evo } from "foldkit/struct";
import { Url, toString as urlToString } from "foldkit/url";

import * as DialogAnimatedExample from "../registry/default/examples/dialog-animated/main";
import * as DialogBasicExample from "../registry/default/examples/dialog-basic/main";
import * as Icon from "./icon";
import { uiInit } from "./ui/init";
import { GotMobileMenuDialogMessage, UiMessage } from "./ui/message";
import { UiModel } from "./ui/model";
import * as UiSubscriptions from "./ui/subscriptions";
import { uiUpdate } from "./ui/update";
import * as View from "./ui/view";

// ROUTE

export const HomeRoute = r("Home");
export const ButtonRoute = r("Button");
export const CalendarRoute = r("Calendar");
export const CheckboxRoute = r("Checkbox");
export const ComboboxRoute = r("Combobox");
export const DatePickerRoute = r("DatePicker");
export const DialogRoute = r("Dialog");
export const DialogDocsRoute = r("DialogDocs");
export const DialogBasicExampleRoute = r("DialogBasicExample");
export const DialogAnimatedExampleRoute = r("DialogAnimatedExample");
export const DisclosureRoute = r("Disclosure");
export const DragAndDropRoute = r("DragAndDrop");
export const FieldsetRoute = r("Fieldset");
export const FileDropRoute = r("FileDrop");
export const InputRoute = r("Input");
export const ListboxRoute = r("Listbox");
export const MenuRoute = r("Menu");
export const PopoverRoute = r("Popover");
export const RadioGroupRoute = r("RadioGroup");
export const SelectRoute = r("Select");
export const SliderRoute = r("Slider");
export const SwitchRoute = r("Switch");
export const TabsRoute = r("Tabs");
export const TextareaRoute = r("Textarea");
export const ToastRoute = r("Toast");
export const TooltipRoute = r("Tooltip");
export const AnimationRoute = r("Animation");
export const VirtualListRoute = r("VirtualList");
export const NotFoundRoute = r("NotFound", { path: S.String });

const AppRoute = S.Union([
  HomeRoute,
  ButtonRoute,
  CalendarRoute,
  CheckboxRoute,
  ComboboxRoute,
  DatePickerRoute,
  DialogRoute,
  DialogDocsRoute,
  DialogBasicExampleRoute,
  DialogAnimatedExampleRoute,
  DisclosureRoute,
  DragAndDropRoute,
  FieldsetRoute,
  FileDropRoute,
  InputRoute,
  ListboxRoute,
  MenuRoute,
  PopoverRoute,
  RadioGroupRoute,
  SelectRoute,
  SliderRoute,
  SwitchRoute,
  TabsRoute,
  TextareaRoute,
  ToastRoute,
  TooltipRoute,
  AnimationRoute,
  VirtualListRoute,
  NotFoundRoute,
]);

type AppRoute = typeof AppRoute.Type;

const homeRouter = pipe(Route.root, Route.mapTo(HomeRoute));
const buttonRouter = pipe(literal("button"), Route.mapTo(ButtonRoute));
const calendarRouter = pipe(literal("calendar"), Route.mapTo(CalendarRoute));
const checkboxRouter = pipe(literal("checkbox"), Route.mapTo(CheckboxRoute));
const comboboxRouter = pipe(literal("combobox"), Route.mapTo(ComboboxRoute));
const datePickerRouter = pipe(
  literal("date-picker"),
  Route.mapTo(DatePickerRoute)
);
const dialogRouter = pipe(literal("dialog"), Route.mapTo(DialogRoute));
const dialogDocsRouter = pipe(
  literal("docs"),
  slash(literal("dialog")),
  Route.mapTo(DialogDocsRoute)
);
const dialogBasicExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-basic")),
  Route.mapTo(DialogBasicExampleRoute)
);
const dialogAnimatedExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-animated")),
  Route.mapTo(DialogAnimatedExampleRoute)
);
const disclosureRouter = pipe(
  literal("disclosure"),
  Route.mapTo(DisclosureRoute)
);
const dragAndDropRouter = pipe(
  literal("drag-and-drop"),
  Route.mapTo(DragAndDropRoute)
);
const fieldsetRouter = pipe(literal("fieldset"), Route.mapTo(FieldsetRoute));
const fileDropRouter = pipe(literal("file-drop"), Route.mapTo(FileDropRoute));
const inputRouter = pipe(literal("input"), Route.mapTo(InputRoute));
const listboxRouter = pipe(literal("listbox"), Route.mapTo(ListboxRoute));
const menuRouter = pipe(literal("menu"), Route.mapTo(MenuRoute));
const popoverRouter = pipe(literal("popover"), Route.mapTo(PopoverRoute));
const radioGroupRouter = pipe(
  literal("radio-group"),
  Route.mapTo(RadioGroupRoute)
);
const selectRouter = pipe(literal("select"), Route.mapTo(SelectRoute));
const sliderRouter = pipe(literal("slider"), Route.mapTo(SliderRoute));
const switchRouter = pipe(literal("switch"), Route.mapTo(SwitchRoute));
const tabsRouter = pipe(literal("tabs"), Route.mapTo(TabsRoute));
const textareaRouter = pipe(literal("textarea"), Route.mapTo(TextareaRoute));
const toastRouter = pipe(literal("toast"), Route.mapTo(ToastRoute));
const tooltipRouter = pipe(literal("tooltip"), Route.mapTo(TooltipRoute));
const animationRouter = pipe(literal("animation"), Route.mapTo(AnimationRoute));
const virtualListRouter = pipe(
  literal("virtual-list"),
  Route.mapTo(VirtualListRoute)
);

const routeParser = Route.oneOf(
  buttonRouter,
  calendarRouter,
  checkboxRouter,
  comboboxRouter,
  datePickerRouter,
  dialogRouter,
  dialogDocsRouter,
  dialogBasicExampleRouter,
  dialogAnimatedExampleRouter,
  disclosureRouter,
  dragAndDropRouter,
  fieldsetRouter,
  fileDropRouter,
  inputRouter,
  listboxRouter,
  menuRouter,
  popoverRouter,
  radioGroupRouter,
  selectRouter,
  sliderRouter,
  switchRouter,
  tabsRouter,
  textareaRouter,
  toastRouter,
  tooltipRouter,
  animationRouter,
  virtualListRouter,
  homeRouter
);

const urlToAppRoute = Route.parseUrlWithFallback(routeParser, NotFoundRoute);

// MODEL

export const Model = S.Struct({
  route: AppRoute,
  uiModel: UiModel,
  dialogBasicExample: DialogBasicExample.Model,
  dialogAnimatedExample: DialogAnimatedExample.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const CompletedNavigateInternal = m("CompletedNavigateInternal");
export const CompletedLoadExternal = m("CompletedLoadExternal");
export const ClickedLink = m("ClickedLink", {
  request: UrlRequest,
});
export const ChangedUrl = m("ChangedUrl", { url: Url });
export const GotUiMessage = m("GotUiMessage", {
  message: UiMessage,
});
export const GotDialogBasicExampleMessage = m("GotDialogBasicExampleMessage", {
  message: DialogBasicExample.Message,
});
export const GotDialogAnimatedExampleMessage = m(
  "GotDialogAnimatedExampleMessage",
  {
    message: DialogAnimatedExample.Message,
  }
);

export const Message = S.Union([
  CompletedNavigateInternal,
  CompletedLoadExternal,
  ClickedLink,
  ChangedUrl,
  GotUiMessage,
  GotDialogBasicExampleMessage,
  GotDialogAnimatedExampleMessage,
]);
export type Message = typeof Message.Type;

// COMMAND

const NavigateInternal = Command.define(
  "NavigateInternal",
  { url: S.String },
  CompletedNavigateInternal
)(({ url }) => pushUrl(url).pipe(Effect.as(CompletedNavigateInternal())));

const LoadExternal = Command.define(
  "LoadExternal",
  { href: S.String },
  CompletedLoadExternal
)(({ href }) => load(href).pipe(Effect.as(CompletedLoadExternal())));

// INIT

export const Flags = S.Struct({
  today: Calendar.CalendarDate,
});

export type Flags = typeof Flags.Type;

export const flags: Effect.Effect<Flags> = Effect.gen(function* flags() {
  const today = yield* Calendar.today.local;
  return { today };
});

export const init: Runtime.RoutingProgramInit<Model, Message, Flags> = (
  flags: Flags,
  url: Url
) => {
  const [initialUiModel, uiCommands] = uiInit(flags.today);
  const [dialogBasicExample, dialogBasicExampleCommands] =
    DialogBasicExample.init();
  const [dialogAnimatedExample, dialogAnimatedExampleCommands] =
    DialogAnimatedExample.init();

  return [
    {
      route: urlToAppRoute(url),
      uiModel: initialUiModel,
      dialogBasicExample,
      dialogAnimatedExample,
    },
    [
      ...Command.mapMessages(uiCommands, (message) =>
        GotUiMessage({ message })
      ),
      ...Command.mapMessages(dialogBasicExampleCommands, (message) =>
        GotDialogBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(dialogAnimatedExampleCommands, (message) =>
        GotDialogAnimatedExampleMessage({ message })
      ),
    ],
  ];
};

// UPDATE

const toUiMessage = (message: typeof UiMessage.Type): Message =>
  GotUiMessage({ message });

const toMobileMenuDialogMessage = (message: Ui.Dialog.Message): Message =>
  GotUiMessage({ message: GotMobileMenuDialogMessage({ message }) });

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      CompletedNavigateInternal: () => [model, []],
      CompletedLoadExternal: () => [model, []],

      ClickedLink: ({ request }) =>
        M.value(request).pipe(
          M.tagsExhaustive({
            Internal: ({
              url,
            }): [
              Model,
              readonly Command.Command<typeof CompletedNavigateInternal>[],
            ] => [model, [NavigateInternal({ url: urlToString(url) })]],
            External: ({
              href,
            }): [
              Model,
              readonly Command.Command<typeof CompletedLoadExternal>[],
            ] => [model, [LoadExternal({ href })]],
          })
        ),

      ChangedUrl: ({ url }) => {
        const [closedDialog, closeDialogCommands] = Ui.Dialog.close(
          model.uiModel.mobileMenuDialog
        );

        return [
          evo(model, {
            route: () => urlToAppRoute(url),
            uiModel: (uiModel) =>
              evo(uiModel, {
                mobileMenuDialog: () => closedDialog,
              }),
          }),
          Command.mapMessages(closeDialogCommands, (message) =>
            toMobileMenuDialogMessage(message)
          ),
        ];
      },

      GotUiMessage: ({ message }) => {
        const [nextUiModel, uiCommands] = uiUpdate(model.uiModel, message);

        return [
          evo(model, { uiModel: () => nextUiModel }),
          Command.mapMessages(uiCommands, (message) =>
            GotUiMessage({ message })
          ),
        ];
      },

      GotDialogBasicExampleMessage: ({ message }) => {
        const [dialogBasicExample, dialogBasicExampleCommands] =
          DialogBasicExample.update(model.dialogBasicExample, message);

        return [
          evo(model, { dialogBasicExample: () => dialogBasicExample }),
          Command.mapMessages(dialogBasicExampleCommands, (message) =>
            GotDialogBasicExampleMessage({ message })
          ),
        ];
      },

      GotDialogAnimatedExampleMessage: ({ message }) => {
        const [dialogAnimatedExample, dialogAnimatedExampleCommands] =
          DialogAnimatedExample.update(model.dialogAnimatedExample, message);

        return [
          evo(model, { dialogAnimatedExample: () => dialogAnimatedExample }),
          Command.mapMessages(dialogAnimatedExampleCommands, (message) =>
            GotDialogAnimatedExampleMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

type NavItem = Readonly<{
  label: string;
  routeTag: string;
  href: string;
}>;

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Animation", routeTag: "Animation", href: animationRouter() },
  { label: "Button", routeTag: "Button", href: buttonRouter() },
  { label: "Calendar", routeTag: "Calendar", href: calendarRouter() },
  { label: "Checkbox", routeTag: "Checkbox", href: checkboxRouter() },
  { label: "Combobox", routeTag: "Combobox", href: comboboxRouter() },
  { label: "Date Picker", routeTag: "DatePicker", href: datePickerRouter() },
  { label: "Dialog", routeTag: "Dialog", href: dialogRouter() },
  { label: "Dialog Docs", routeTag: "DialogDocs", href: dialogDocsRouter() },
  {
    label: "Dialog Basic Example",
    routeTag: "DialogBasicExample",
    href: dialogBasicExampleRouter(),
  },
  {
    label: "Dialog Animated Example",
    routeTag: "DialogAnimatedExample",
    href: dialogAnimatedExampleRouter(),
  },
  { label: "Disclosure", routeTag: "Disclosure", href: disclosureRouter() },
  {
    label: "Drag and Drop",
    routeTag: "DragAndDrop",
    href: dragAndDropRouter(),
  },
  { label: "Fieldset", routeTag: "Fieldset", href: fieldsetRouter() },
  { label: "File Drop", routeTag: "FileDrop", href: fileDropRouter() },
  { label: "Input", routeTag: "Input", href: inputRouter() },
  { label: "Listbox", routeTag: "Listbox", href: listboxRouter() },
  { label: "Menu", routeTag: "Menu", href: menuRouter() },
  { label: "Popover", routeTag: "Popover", href: popoverRouter() },
  { label: "Radio Group", routeTag: "RadioGroup", href: radioGroupRouter() },
  { label: "Select", routeTag: "Select", href: selectRouter() },
  { label: "Slider", routeTag: "Slider", href: sliderRouter() },
  { label: "Switch", routeTag: "Switch", href: switchRouter() },
  { label: "Tabs", routeTag: "Tabs", href: tabsRouter() },
  { label: "Textarea", routeTag: "Textarea", href: textareaRouter() },
  { label: "Toast", routeTag: "Toast", href: toastRouter() },
  { label: "Tooltip", routeTag: "Tooltip", href: tooltipRouter() },
  {
    label: "Virtual List",
    routeTag: "VirtualList",
    href: virtualListRouter(),
  },
];

const navLinkClassName = (isActive: boolean): string =>
  clsx(
    "block px-3 py-1.5 rounded-md text-sm transition-colors",
    isActive
      ? "bg-accent-100 text-accent-700"
      : "text-gray-700 hover:bg-gray-200"
  );

const mobileNavLinkClassName = (isActive: boolean): string =>
  clsx(
    "block px-4 py-2.5 rounded-md text-base transition-colors",
    isActive
      ? "bg-accent-100 text-accent-700"
      : "text-gray-700 hover:bg-gray-200"
  );

const sidebarView = (currentRoute: AppRoute): Html => {
  const h = html<Message>();

  return h.nav(
    [
      h.Class(
        "hidden md:flex w-56 shrink-0 border-r border-gray-200 bg-gray-50 p-4 flex-col"
      ),
    ],
    [
      h.div(
        [h.Class("mb-6")],
        [
          h.a(
            [h.Href(homeRouter()), h.Class("block")],
            [h.h1([h.Class("text-lg font-bold text-gray-900")], ["Foldkit UI"])]
          ),
          h.span([h.Class("text-xs text-gray-500")], ["Component Showcase"]),
        ]
      ),
      h.ul(
        [h.Class("flex flex-col gap-0.5")],
        NAV_ITEMS.map((navItem) =>
          h.li(
            [],
            [
              h.a(
                [
                  h.Href(navItem.href),
                  h.Class(
                    navLinkClassName(currentRoute._tag === navItem.routeTag)
                  ),
                ],
                [navItem.label]
              ),
            ]
          )
        )
      ),
    ]
  );
};

const mobileMenuContent = (currentRoute: AppRoute): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col h-full")],
    [
      h.div(
        [
          h.Class(
            "flex items-center justify-between border-b border-gray-200 px-4 py-3"
          ),
        ],
        [
          h.a(
            [h.Href(homeRouter()), h.Class("block")],
            [
              h.div(
                [h.Class("flex flex-col")],
                [
                  h.span(
                    [h.Class("text-base font-bold text-gray-900")],
                    ["Foldkit UI"]
                  ),
                  h.span(
                    [h.Class("text-xs text-gray-500")],
                    ["Component Showcase"]
                  ),
                ]
              ),
            ]
          ),
          h.button(
            [
              h.Class(
                "p-2 rounded-md hover:bg-gray-200 transition text-gray-700 cursor-pointer"
              ),
              h.AriaLabel("Close menu"),
              h.OnClick(toMobileMenuDialogMessage(Ui.Dialog.RequestedClose())),
            ],
            [Icon.xMark("w-6 h-6")]
          ),
        ]
      ),
      h.nav(
        [
          h.Class("flex-1 overflow-y-auto min-h-0 p-4"),
          h.Tabindex(-1),
          h.Autofocus(true),
        ],
        [
          h.ul(
            [h.Class("flex flex-col gap-0.5")],
            NAV_ITEMS.map((navItem) =>
              h.li(
                [],
                [
                  h.a(
                    [
                      h.Href(navItem.href),
                      h.Class(
                        mobileNavLinkClassName(
                          currentRoute._tag === navItem.routeTag
                        )
                      ),
                    ],
                    [navItem.label]
                  ),
                ]
              )
            )
          ),
        ]
      ),
    ]
  );
};

const mobileHeaderView = (model: Model): Html => {
  const h = html<Message>();

  return h.header(
    [
      h.Class(
        "md:hidden sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3"
      ),
    ],
    [
      h.a(
        [h.Href(homeRouter()), h.Class("block")],
        [
          h.div(
            [h.Class("flex flex-col")],
            [
              h.span(
                [h.Class("text-base font-bold text-gray-900")],
                ["Foldkit UI"]
              ),
              h.span(
                [h.Class("text-xs text-gray-500")],
                ["Component Showcase"]
              ),
            ]
          ),
        ]
      ),
      h.button(
        [
          h.Class(
            "p-2 rounded-md hover:bg-gray-200 transition text-gray-700 cursor-pointer"
          ),
          h.AriaExpanded(model.uiModel.mobileMenuDialog.isOpen),
          h.AriaLabel("Toggle menu"),
          h.OnClick(toMobileMenuDialogMessage(Ui.Dialog.RequestedOpen())),
        ],
        [Icon.menu("w-6 h-6")]
      ),
    ]
  );
};

const mobileMenuView = (model: Model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.uiModel.mobileMenuDialog.id,
    model: model.uiModel.mobileMenuDialog,
    view: Ui.Dialog.view,
    viewInputs: {
      toView: ({ dialog, backdrop, panel, isVisible }) =>
        h.dialog(
          [...dialog, h.Class("md:hidden")],
          isVisible
            ? [
                h.div([...backdrop, h.Class("fixed inset-0 z-[59]")], []),
                h.div(
                  [
                    ...panel,
                    h.Class("fixed inset-0 z-[60] bg-white flex flex-col"),
                  ],
                  [mobileMenuContent(model.route)]
                ),
              ]
            : []
        ),
    },
    toParentMessage: (message) => toMobileMenuDialogMessage(message),
  });
};

const homeView = (): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-2xl")],
    [
      h.h1(
        [h.Class("text-2xl md:text-3xl font-bold text-gray-900 mb-4")],
        ["Foldkit UI Showcase"]
      ),
      h.p(
        [h.Class("text-gray-600 mb-4")],
        [
          "This is a showcase of every Foldkit UI component. Select a component from the menu to see it in action.",
        ]
      ),
      h.p(
        [h.Class("text-gray-600")],
        [
          "Each component is headless. You provide the markup and styling via a callback, and Foldkit handles accessibility, keyboard navigation, and state management.",
        ]
      ),
    ]
  );
};

const notFoundView = (path: string): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-2xl")],
    [
      h.h1(
        [h.Class("text-2xl md:text-3xl font-bold text-red-600 mb-4")],
        ["404 — Page Not Found"]
      ),
      h.p(
        [h.Class("text-gray-600 mb-4")],
        [`The path "${path}" was not found.`]
      ),
      h.a(
        [h.Href(homeRouter()), h.Class("text-accent-600 hover:underline")],
        ["Go Home"]
      ),
    ]
  );
};

const codeBlock = (code: string): Html => {
  const h = html<Message>();

  return h.pre(
    [
      h.Class(
        "overflow-x-auto rounded-lg border border-gray-200 bg-gray-950 px-4 py-3 text-sm text-gray-50"
      ),
    ],
    [h.code([], [code])]
  );
};

const dialogBasicExamplePreview = (
  model: DialogBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogBasicExample.view,
    toParentMessage: (message) => GotDialogBasicExampleMessage({ message }),
  });
};

const dialogAnimatedExamplePreview = (
  model: DialogAnimatedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogAnimatedExample.view,
    toParentMessage: (message) => GotDialogAnimatedExampleMessage({ message }),
  });
};

const dialogDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Dialog"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Dialog slice built on the official Foldkit Ui.Dialog primitive. It preserves the Elm-style model, message, command, and OutMessage flow while adding a shadcn-style source layout.",
            ]
          ),
          h.p(
            [h.Class("max-w-2xl text-sm text-gray-500")],
            [
              "Foldkit CN is a third-party registry and does not replace the official Foldkit UI documentation at foldkit.dev/ui/overview.",
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-3 border-y border-gray-200 py-4 text-sm text-gray-700 sm:grid-cols-3"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-1")],
            [
              h.p([h.Class("font-medium text-gray-950")], ["Source"]),
              h.p([], ["registry/default/ui/dialog"]),
            ]
          ),
          h.div(
            [h.Class("space-y-1")],
            [
              h.p([h.Class("font-medium text-gray-950")], ["Examples"]),
              h.p([], ["basic, animated"]),
            ]
          ),
          h.div(
            [h.Class("space-y-1")],
            [
              h.p([h.Class("font-medium text-gray-950")], ["Proof"]),
              h.p([], ["story tests, scene tests, generated registry JSON"]),
            ]
          ),
        ]
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.div(
            [h.Class("space-y-2")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Examples"]
              ),
              h.p(
                [h.Class("max-w-2xl text-sm text-gray-600")],
                [
                  "The docs page renders the same registry examples that install as standalone source.",
                ]
              ),
            ]
          ),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              h.div(
                [
                  h.Class(
                    "space-y-3 rounded-lg border border-gray-200 bg-white p-4"
                  ),
                ],
                [
                  h.h3(
                    [h.Class("text-sm font-semibold text-gray-900")],
                    ["Basic"]
                  ),
                  h.p(
                    [h.Class("text-sm text-gray-600")],
                    [
                      "A parent-owned trigger sends RequestedOpen and receives close results through OutMessage.",
                    ]
                  ),
                  dialogBasicExamplePreview(
                    model.dialogBasicExample,
                    "dialog-docs-basic-preview"
                  ),
                  h.a(
                    [
                      h.Href(dialogBasicExampleRouter()),
                      h.Class(
                        "inline-flex text-sm font-medium text-accent-700 hover:underline"
                      ),
                    ],
                    ["Open standalone Dialog Basic example"]
                  ),
                ]
              ),
              h.div(
                [
                  h.Class(
                    "space-y-3 rounded-lg border border-gray-200 bg-white p-4"
                  ),
                ],
                [
                  h.h3(
                    [h.Class("text-sm font-semibold text-gray-900")],
                    ["Animated"]
                  ),
                  h.p(
                    [h.Class("text-sm text-gray-600")],
                    [
                      "The animated variant keeps the dialog surface mounted while Foldkit animation state settles.",
                    ]
                  ),
                  dialogAnimatedExamplePreview(
                    model.dialogAnimatedExample,
                    "dialog-docs-animated-preview"
                  ),
                  h.a(
                    [
                      h.Href(dialogAnimatedExampleRouter()),
                      h.Class(
                        "inline-flex text-sm font-medium text-accent-700 hover:underline"
                      ),
                    ],
                    ["Open standalone Dialog Animated example"]
                  ),
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Installation"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "Install the component source first, then add any examples you want to keep in your app.",
                ]
              ),
            ]
          ),
          h.div(
            [h.Class("space-y-3")],
            [
              codeBlock(
                "bunx shadcn@latest add <registry-url>/dialog.json\nbunx shadcn@latest add <registry-url>/dialog-basic.json\nbunx shadcn@latest add <registry-url>/dialog-animated.json"
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "The generated files are served from apps/docs/public/r during local docs development.",
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Usage"]),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "Dialog state stays in the parent model. The parent sends Dialog.RequestedOpen and maps child messages back through GotDialogMessage.",
                ]
              ),
            ]
          ),
          codeBlock(`import * as Dialog from "./ui/dialog";

const [dialogModel, dialogCommands] = Dialog.init({
  id: "settings-dialog",
});

Dialog.view({
  model: dialogModel,
  trigger: h.button([h.OnClick(Dialog.RequestedOpen())], ["Open dialog"]),
  title: "Edit settings",
  children: [...]
});`),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["API reference"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "The registry wrapper intentionally exposes the Foldkit primitive shape instead of inventing a separate component protocol.",
                ]
              ),
            ]
          ),
          codeBlock(`import * as Dialog from "./ui/dialog";

Dialog.Model;
Dialog.Message;
Dialog.OutMessage;
Dialog.init;
Dialog.update;
Dialog.open;
Dialog.close;
Dialog.view;
Dialog.titleId;
Dialog.descriptionId;`),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Accessibility"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "The component delegates native dialog semantics to Ui.Dialog and exposes helpers for title and description wiring.",
                ]
              ),
            ]
          ),
          h.ul(
            [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
            [
              h.li(
                [],
                [
                  "Native dialog role and backdrop behavior come from Ui.Dialog.view.",
                ]
              ),
              h.li([], ["Escape and backdrop close emit RequestedClose."]),
              h.li(
                [],
                [
                  "titleId and descriptionId connect visible copy to the dialog surface.",
                ]
              ),
              h.li(
                [],
                ["focusSelector can direct initial focus for custom flows."]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Coverage"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "The first Dialog slice is covered at the wrapper, example, route, and registry-output levels.",
                ]
              ),
            ]
          ),
          h.ul(
            [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
            [
              h.li(
                [],
                [
                  "Story tests cover init, open, close, commands, and OutMessage.",
                ]
              ),
              h.li(
                [],
                [
                  "Scene tests cover trigger, accessible dialog labelling, cancel, confirm, and animated open.",
                ]
              ),
              h.li(
                [],
                [
                  "Generated registry JSON includes source and test files for installation.",
                ]
              ),
            ]
          ),
        ]
      ),
    ]
  );
};

const dialogBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Dialog Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable dialog-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          dialogBasicExamplePreview(
            model.dialogBasicExample,
            "dialog-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const dialogAnimatedExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Dialog Animated"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable dialog-animated registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          dialogAnimatedExamplePreview(
            model.dialogAnimatedExample,
            "dialog-animated-standalone"
          ),
        ]
      ),
    ]
  );
};

const contentView = (model: Model): Html => {
  const h = html<Message>();

  const embedUi = (id: string, view: Submodel.View<UiModel, UiMessage>): Html =>
    h.submodel({
      slotId: id,
      model: model.uiModel,
      view,
      toParentMessage: toUiMessage,
    });

  return M.value(model.route).pipe(
    M.tagsExhaustive({
      Home: homeView,
      Button: () => embedUi("ui-button", View.button),
      Calendar: () => embedUi("ui-calendar", View.calendar),
      Checkbox: () => embedUi("ui-checkbox", View.checkbox),
      Combobox: () => embedUi("ui-combobox", View.combobox),
      DatePicker: () => embedUi("ui-date-picker", View.datePicker),
      Dialog: () => embedUi("ui-dialog", View.dialog),
      DialogDocs: () => dialogDocsView(model),
      DialogBasicExample: () => dialogBasicExampleRouteView(model),
      DialogAnimatedExample: () => dialogAnimatedExampleRouteView(model),
      Disclosure: () => embedUi("ui-disclosure", View.disclosure),
      DragAndDrop: () => embedUi("ui-drag-and-drop", View.dragAndDrop),
      Fieldset: () => embedUi("ui-fieldset", View.fieldset),
      FileDrop: () => embedUi("ui-file-drop", View.fileDrop),
      Input: () => embedUi("ui-input", View.input),
      Listbox: () => embedUi("ui-listbox", View.listbox),
      Menu: () => embedUi("ui-menu", View.menu),
      Popover: () => embedUi("ui-popover", View.popover),
      RadioGroup: () => embedUi("ui-radio-group", View.radioGroup),
      Select: () => embedUi("ui-select", View.select),
      Slider: () => embedUi("ui-slider", View.slider),
      Switch: () => embedUi("ui-switch", View.switch_),
      Tabs: () => embedUi("ui-tabs", View.tabs),
      Textarea: () => embedUi("ui-textarea", View.textarea),
      Toast: () => embedUi("ui-toast", View.toast),
      Tooltip: () => embedUi("ui-tooltip", View.tooltip),
      Animation: () => embedUi("ui-animation", View.animation),
      VirtualList: () => embedUi("ui-virtual-list", View.virtualList),
      NotFound: ({ path }) => notFoundView(path),
    })
  );
};

const routeTitle = (route: Model["route"]): string =>
  M.value(route).pipe(
    M.tag("Home", () => "Foldkit UI Showcase"),
    M.orElse(({ _tag }) => `${_tag} — Foldkit UI Showcase`)
  );

export const view = (model: Model): Document => {
  const h = html<Message>();

  return {
    title: routeTitle(model.route),
    body: h.div(
      [h.Class("flex flex-col md:flex-row min-h-screen bg-white")],
      [
        mobileHeaderView(model),
        mobileMenuView(model),
        sidebarView(model.route),
        h.main(
          [h.Class("flex-1 p-4 md:p-8 overflow-auto")],
          [h.keyed("div")(model.route._tag, [], [contentView(model)])]
        ),
      ]
    ),
  };
};

// SUBSCRIPTION

export const subscriptions = Subscription.lift(UiSubscriptions.subscriptions)<
  Model,
  Message
>({
  toChildModel: (model) => model.uiModel,
  toParentMessage: (message) => GotUiMessage({ message }),
});
