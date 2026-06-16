import clsx from "clsx";
import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel, Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import {
  createScaffoldPlan,
  sliceOrigins,
  type ScaffoldFile,
  type SliceOrigin,
} from "./componentSliceManifest";

const Origin = S.Union([
  S.Literal("foldkit"),
  S.Literal("base-ui"),
  S.Literal("shadcn"),
]);

// MODEL

export const Model = S.Struct({
  origin: Origin,
  name: S.String,
  primitiveName: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const SelectedNewComponentOrigin = m("SelectedNewComponentOrigin", {
  value: S.String,
});
export const UpdatedNewComponentName = m("UpdatedNewComponentName", {
  value: S.String,
});
export const UpdatedNewComponentPrimitiveName = m(
  "UpdatedNewComponentPrimitiveName",
  {
    value: S.String,
  }
);

export const Message = S.Union([
  SelectedNewComponentOrigin,
  UpdatedNewComponentName,
  UpdatedNewComponentPrimitiveName,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    origin: "foldkit",
    name: "example-panel",
    primitiveName: "",
  },
  [],
];

// UPDATE

const originFromValue = (
  currentOrigin: SliceOrigin,
  value: string
): SliceOrigin => {
  if (value === "foldkit") {
    return value;
  }

  if (value === "base-ui") {
    return value;
  }

  if (value === "shadcn") {
    return value;
  }

  return currentOrigin;
};

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      SelectedNewComponentOrigin: ({ value }) => [
        evo(model, {
          origin: () => originFromValue(model.origin, value),
        }),
        [],
      ],
      UpdatedNewComponentName: ({ value }) => [
        evo(model, { name: () => value }),
        [],
      ],
      UpdatedNewComponentPrimitiveName: ({ value }) => [
        evo(model, { primitiveName: () => value }),
        [],
      ],
    })
  );

// VIEW

const planForModel = (model: Model) =>
  createScaffoldPlan({
    origin: model.origin,
    name: model.name,
    primitiveName: model.primitiveName,
  });

const labelClassName = "block text-sm font-medium text-gray-800";
const fieldClassName = "grid gap-1.5";
const inputClassName =
  "h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-950 shadow-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500";
const panelClassName =
  "rounded-md border border-gray-200 bg-white p-4 shadow-sm";

const originLabel = (origin: SliceOrigin): string =>
  M.value(origin).pipe(
    M.when("foldkit", () => "Foldkit"),
    M.when("base-ui", () => "Base UI"),
    M.when("shadcn", () => "shadcn"),
    M.exhaustive
  );

const fileModeClassName = (mode: ScaffoldFile["mode"]): string =>
  clsx(
    "rounded px-1.5 py-0.5 text-xs font-medium",
    mode === "create" && "bg-accent-100 text-accent-700",
    mode === "update" && "bg-amber-100 text-amber-700",
    mode === "generated" && "bg-gray-100 text-gray-600"
  );

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const plan = planForModel(model);

  return h.div(
    [h.Class("mx-auto max-w-5xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Authoring"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], [
            "New component interface",
          ]),
          h.p([h.Class("max-w-3xl text-sm leading-6 text-gray-600")], [
            "Generate the same component-slice checklist used by the CLI before writing any registry files.",
          ]),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-4 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          ),
        ],
        [
          h.div(
            [h.Class(`${panelClassName} space-y-4`)],
            [
              h.div(
                [h.Class(fieldClassName)],
                [
                  h.label(
                    [h.For("new-component-origin"), h.Class(labelClassName)],
                    ["Origin"]
                  ),
                  Ui.Select.view<Message>({
                    id: "new-component-origin",
                    value: model.origin,
                    onChange: (value) => SelectedNewComponentOrigin({ value }),
                    toView: (attributes) =>
                      h.select(
                        [...attributes.select, h.Class(inputClassName)],
                        sliceOrigins.map((origin) =>
                          h.option([h.Value(origin)], [originLabel(origin)])
                        )
                      ),
                  }),
                ]
              ),
              h.div(
                [h.Class(fieldClassName)],
                [
                  h.label(
                    [h.For("new-component-name"), h.Class(labelClassName)],
                    ["Component name"]
                  ),
                  h.input([
                    h.Id("new-component-name"),
                    h.Type("text"),
                    h.Value(model.name),
                    h.Placeholder("example-panel"),
                    h.OnInput((value) => UpdatedNewComponentName({ value })),
                    h.OnChange((value) => UpdatedNewComponentName({ value })),
                    h.Class(inputClassName),
                  ]),
                ]
              ),
              h.div(
                [h.Class(fieldClassName)],
                [
                  h.label(
                    [h.For("new-component-primitive"), h.Class(labelClassName)],
                    ["Primitive name"]
                  ),
                  h.input([
                    h.Id("new-component-primitive"),
                    h.Type("text"),
                    h.Value(model.primitiveName),
                    h.Placeholder("Optional primitive name"),
                    h.OnInput((value) =>
                      UpdatedNewComponentPrimitiveName({ value })
                    ),
                    h.OnChange((value) =>
                      UpdatedNewComponentPrimitiveName({ value })
                    ),
                    h.Class(inputClassName),
                  ]),
                ]
              ),
            ]
          ),
          h.div(
            [h.Class(`${panelClassName} space-y-4`)],
            [
              h.div(
                [h.Class("grid gap-1")],
                [
                  h.h2([h.Class("text-xl font-semibold text-gray-950")], [
                    plan.manifest.publicName,
                  ]),
                  h.p([h.Class("text-sm text-gray-600")], [
                    `Registry name: ${plan.manifest.name}`,
                  ]),
                ]
              ),
              h.div(
                [h.Class("grid gap-2")],
                [
                  h.h3([h.Class("text-sm font-semibold text-gray-950")], [
                    "Planned files",
                  ]),
                  h.ul(
                    [h.Class("grid gap-2")],
                    plan.files.map((file) =>
                      h.li(
                        [
                          h.Class(
                            "flex items-start gap-2 text-sm text-gray-700"
                          ),
                        ],
                        [
                          h.span([h.Class(fileModeClassName(file.mode))], [
                            file.mode,
                          ]),
                          h.span([h.Class("min-w-0 break-words")], [
                            file.path,
                          ]),
                        ]
                      )
                    )
                  ),
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [h.Class(`${panelClassName} grid gap-4 md:grid-cols-2`)],
        [
          h.div(
            [h.Class("space-y-2")],
            [
              h.h2([h.Class("text-lg font-semibold text-gray-950")], [
                "Checklist",
              ]),
              h.ul(
                [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
                plan.manifest.checklistItems.map((item) => h.li([], [item]))
              ),
            ]
          ),
          h.div(
            [h.Class("space-y-2")],
            [
              h.h2([h.Class("text-lg font-semibold text-gray-950")], [
                "Validation",
              ]),
              h.ul(
                [h.Class("space-y-1 text-sm text-gray-700")],
                plan.validationCommands.map((command) =>
                  h.li(
                    [
                      h.Class(
                        "rounded bg-gray-950 px-2 py-1 font-mono text-xs text-white"
                      ),
                    ],
                    [command]
                  )
                )
              ),
              h.p([h.Class("text-sm text-gray-600")], [
                plan.sceneTestGuidance,
              ]),
            ]
          ),
        ]
      ),
    ]
  );
});
