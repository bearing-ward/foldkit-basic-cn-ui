import { Array, Match as M, Option, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Select from "../../ui/shadcn-select";

// MODEL

export const Model = S.Struct({
  openSelect: S.String,
  selectedFruit: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ToggledSelect = m("ToggledSelect", { id: S.String });
export const SelectedFruit = m("SelectedFruit", { value: S.String });

export const Message = S.Union([ToggledSelect, SelectedFruit]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ openSelect: "", selectedFruit: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledSelect: ({ id }) => [
        evo(model, {
          openSelect: (openSelect) => (openSelect === id ? "" : id),
        }),
        [],
      ],
      SelectedFruit: ({ value }) => [
        evo(model, {
          selectedFruit: () => value,
          openSelect: () => "",
        }),
        [],
      ],
    })
  );

// VIEW

type Option = Readonly<{
  value: string;
  label: string;
  disabled?: boolean;
}>;

const fruits: ReadonlyArray<Option> = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];

const timezones: ReadonlyArray<Option> = [
  { value: "gmt", label: "Greenwich Mean Time" },
  { value: "cet", label: "Central European Time" },
  { value: "est", label: "Eastern Standard Time" },
  { value: "cst", label: "Central Standard Time" },
  { value: "mst", label: "Mountain Standard Time" },
  { value: "pst", label: "Pacific Standard Time" },
  { value: "akst", label: "Alaska Standard Time" },
  { value: "hst", label: "Hawaii Standard Time" },
];

const valueLabel = (
  options: ReadonlyArray<Option>,
  value: string,
  placeholder: string
): string =>
  Array.findFirst(options, (option) => option.value === value).pipe(
    Option.match({
      onNone: () => placeholder,
      onSome: (option) => option.label,
    })
  );

const cn = (base: string, classes: string): string =>
  [base, classes].filter((value) => value !== "").join(" ");

const selectItemView = (
  option: Option,
  selectedValue: string,
  onSelect: Message
): Html => {
  const h = html<Message>();

  return Select.itemView<Message>({
    selected: selectedValue === option.value,
    disabled: option.disabled,
    onSelect,
    children: [h.span([], [option.label])],
  });
};

const fruitSelectView = (model: Model): Html => {
  const h = html<Message>();
  const open = model.openSelect === "fruit";
  const placeholder = model.selectedFruit === "";

  return Select.rootView<Message>({
    children: [
      Select.triggerView<Message>({
        open,
        onToggle: ToggledSelect({ id: "fruit" }),
        ariaLabel: "Fruit",
        children: [
          Select.valueView<Message>({
            placeholder,
            children: [
              valueLabel(fruits, model.selectedFruit, "Select a fruit"),
            ],
          }),
          Select.iconView<Message>({ open }),
        ],
      }),
      Select.contentView<Message>({
        open,
        children: [
          Select.viewportView<Message>({
            children: [
              Select.groupView<Message>({
                children: [
                  Select.labelView<Message>({ children: ["Fruits"] }),
                  ...Array.map(fruits, (option) =>
                    selectItemView(
                      option,
                      model.selectedFruit,
                      SelectedFruit({ value: option.value })
                    )
                  ),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const staticSelectView = (
  title: string,
  value: string,
  options: ReadonlyArray<Option>,
  classes: string
): Html => {
  const h = html<Message>();

  return h.div([h.Class("space-y-2")], [
    h.h3([h.Class("text-base font-semibold text-gray-950")], [title]),
    Select.rootView<Message>({
      classes,
      children: [
        Select.triggerView<Message>({
          open: true,
          onToggle: ToggledSelect({ id: title }),
          ariaLabel: title,
          children: [
            Select.valueView<Message>({
              children: [valueLabel(options, value, "Select an option")],
            }),
            Select.iconView<Message>({ open: true }),
          ],
        }),
        Select.contentView<Message>({
          open: true,
          children: [
            Select.viewportView<Message>({
              children: Array.map(options, (option) =>
                selectItemView(option, value, ToggledSelect({ id: title }))
              ),
            }),
          ],
        }),
      ],
    }),
  ]);
};

const groupedSelectView = (): Html => {
  const h = html<Message>();
  const eastern = { value: "est", label: "Eastern Standard Time" };
  const central = { value: "cst", label: "Central Standard Time" };
  const pacific = { value: "pst", label: "Pacific Standard Time" };
  const greenwich = { value: "gmt", label: "Greenwich Mean Time" };
  const european = { value: "cet", label: "Central European Time" };

  return h.div([h.Class("space-y-2")], [
    h.h3([h.Class("text-base font-semibold text-gray-950")], ["Groups"]),
    Select.rootView<Message>({
      children: [
        Select.triggerView<Message>({
          open: true,
          onToggle: ToggledSelect({ id: "groups" }),
          ariaLabel: "Grouped timezone",
          children: [
            Select.valueView<Message>({ children: ["Eastern Standard Time"] }),
            Select.iconView<Message>({ open: true }),
          ],
        }),
        Select.contentView<Message>({
          open: true,
          children: [
            Select.groupView<Message>({
              children: [
                Select.labelView<Message>({ children: ["North America"] }),
                selectItemView(eastern, "est", ToggledSelect({ id: "groups" })),
                selectItemView(central, "est", ToggledSelect({ id: "groups" })),
                selectItemView(pacific, "est", ToggledSelect({ id: "groups" })),
              ],
            }),
            Select.separatorView<Message>({}),
            Select.groupView<Message>({
              children: [
                Select.labelView<Message>({ children: ["Europe"] }),
                selectItemView(greenwich, "est", ToggledSelect({ id: "groups" })),
                selectItemView(european, "est", ToggledSelect({ id: "groups" })),
              ],
            }),
          ],
        }),
      ],
    }),
  ]);
};

const disabledSelectView = (): Html => {
  const h = html<Message>();

  return h.div([h.Class("space-y-2")], [
    h.h3([h.Class("text-base font-semibold text-gray-950")], ["Disabled"]),
    Select.rootView<Message>({
      children: [
        Select.triggerView<Message>({
          open: false,
          disabled: true,
          onToggle: ToggledSelect({ id: "disabled" }),
          ariaLabel: "Disabled fruit",
          children: [
            Select.valueView<Message>({ children: ["Select a fruit"] }),
            Select.iconView<Message>({ open: false }),
          ],
        }),
      ],
    }),
  ]);
};

const invalidSelectView = (): Html => {
  const h = html<Message>();

  return h.div([h.Class("space-y-2")], [
    h.h3([h.Class("text-base font-semibold text-gray-950")], ["Invalid"]),
    Select.rootView<Message>({
      children: [
        Select.triggerView<Message>({
          open: false,
          invalid: true,
          onToggle: ToggledSelect({ id: "invalid" }),
          ariaLabel: "Invalid fruit",
          children: [
            Select.valueView<Message>({
              placeholder: true,
              children: ["Select a fruit"],
            }),
            Select.iconView<Message>({ open: false }),
          ],
        }),
      ],
    }),
    h.p([h.Class("text-sm text-red-600")], ["Please select a fruit."]),
  ]);
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div([h.Class("grid max-w-3xl gap-8")], [
    h.section([h.Class("space-y-3")], [
      h.h2([h.Class("text-lg font-semibold text-gray-950")], ["Basic"]),
      h.div([h.Class("w-[220px]")], [fruitSelectView(model)]),
    ]),
    h.section([h.Class("grid gap-6 md:grid-cols-2")], [
      groupedSelectView(),
      staticSelectView(
        "Scrollable",
        "pst",
        timezones,
        "max-h-96"
      ),
      disabledSelectView(),
      invalidSelectView(),
      h.div([h.Dir("rtl")], [
        staticSelectView(
          "RTL",
          "banana",
          fruits,
          "text-right"
        ),
      ]),
      staticSelectView(
        "Align Item With Trigger",
        "blueberry",
        fruits,
        cn("min-w-[220px]", "origin-top-left")
      ),
    ]),
  ]);
});
