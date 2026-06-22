import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { ts } from "foldkit/schema";
import { evo } from "foldkit/struct";

import * as Slider from "../../ui/shadcn-slider";

// MODEL

const Idle = ts("Idle");
const DraggingVerticalSlider = ts("DraggingVerticalSlider", {
  startScreenY: S.Number,
  startValue: S.Number,
});
const VerticalSliderState = S.Union([Idle, DraggingVerticalSlider]);
type VerticalSliderState = typeof VerticalSliderState.Type;

export const Model = S.Struct({
  basicSlider: Slider.Model,
  rangeStartSlider: Slider.Model,
  rangeEndSlider: Slider.Model,
  multipleFirstSlider: Slider.Model,
  multipleSecondSlider: Slider.Model,
  multipleThirdSlider: Slider.Model,
  verticalSlider: Slider.Model,
  verticalSliderState: VerticalSliderState,
  controlledSlider: Slider.Model,
  disabledSlider: Slider.Model,
  rtlSlider: Slider.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotBasicSliderMessage = m("GotBasicSliderMessage", {
  message: Slider.Message,
});
export const GotRangeStartSliderMessage = m("GotRangeStartSliderMessage", {
  message: Slider.Message,
});
export const GotRangeEndSliderMessage = m("GotRangeEndSliderMessage", {
  message: Slider.Message,
});
export const GotMultipleFirstSliderMessage = m("GotMultipleFirstSliderMessage", {
  message: Slider.Message,
});
export const GotMultipleSecondSliderMessage = m("GotMultipleSecondSliderMessage", {
  message: Slider.Message,
});
export const GotMultipleThirdSliderMessage = m("GotMultipleThirdSliderMessage", {
  message: Slider.Message,
});
export const GotVerticalSliderMessage = m("GotVerticalSliderMessage", {
  message: Slider.Message,
});
export const PressedVerticalSliderPointer = m("PressedVerticalSliderPointer", {
  screenY: S.Number,
});
export const MovedVerticalSliderPointer = m("MovedVerticalSliderPointer", {
  screenY: S.Number,
});
export const ReleasedVerticalSliderPointer = m("ReleasedVerticalSliderPointer");
export const PressedVerticalSliderKey = m("PressedVerticalSliderKey", {
  key: S.String,
});
export const GotControlledSliderMessage = m("GotControlledSliderMessage", {
  message: Slider.Message,
});
export const GotDisabledSliderMessage = m("GotDisabledSliderMessage", {
  message: Slider.Message,
});
export const GotRtlSliderMessage = m("GotRtlSliderMessage", {
  message: Slider.Message,
});

export const Message = S.Union([
  GotBasicSliderMessage,
  GotRangeStartSliderMessage,
  GotRangeEndSliderMessage,
  GotMultipleFirstSliderMessage,
  GotMultipleSecondSliderMessage,
  GotMultipleThirdSliderMessage,
  GotVerticalSliderMessage,
  PressedVerticalSliderPointer,
  MovedVerticalSliderPointer,
  ReleasedVerticalSliderPointer,
  PressedVerticalSliderKey,
  GotControlledSliderMessage,
  GotDisabledSliderMessage,
  GotRtlSliderMessage,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [basicSlider, basicCommands] = Slider.init({
    id: "shadcn-slider-basic",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 33,
  });
  const [rangeStartSlider, rangeStartCommands] = Slider.init({
    id: "shadcn-slider-range-start",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 25,
  });
  const [rangeEndSlider, rangeEndCommands] = Slider.init({
    id: "shadcn-slider-range-end",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 75,
  });
  const [multipleFirstSlider, multipleFirstCommands] = Slider.init({
    id: "shadcn-slider-multiple-first",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 25,
  });
  const [multipleSecondSlider, multipleSecondCommands] = Slider.init({
    id: "shadcn-slider-multiple-second",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 50,
  });
  const [multipleThirdSlider, multipleThirdCommands] = Slider.init({
    id: "shadcn-slider-multiple-third",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 75,
  });
  const [verticalSlider, verticalCommands] = Slider.init({
    id: "shadcn-slider-vertical",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 50,
  });
  const [controlledSlider, controlledCommands] = Slider.init({
    id: "shadcn-slider-controlled",
    min: 0,
    max: 1,
    step: 0.1,
    initialValue: 0.3,
  });
  const [disabledSlider, disabledCommands] = Slider.init({
    id: "shadcn-slider-disabled",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 33,
  });
  const [rtlSlider, rtlCommands] = Slider.init({
    id: "shadcn-slider-rtl",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 33,
  });

  return [
    {
      basicSlider,
      rangeStartSlider,
      rangeEndSlider,
      multipleFirstSlider,
      multipleSecondSlider,
      multipleThirdSlider,
      verticalSlider,
      verticalSliderState: Idle(),
      controlledSlider,
      disabledSlider,
      rtlSlider,
    },
    [
      ...Command.mapMessages(basicCommands, (message) =>
        GotBasicSliderMessage({ message })
      ),
      ...Command.mapMessages(rangeStartCommands, (message) =>
        GotRangeStartSliderMessage({ message })
      ),
      ...Command.mapMessages(rangeEndCommands, (message) =>
        GotRangeEndSliderMessage({ message })
      ),
      ...Command.mapMessages(multipleFirstCommands, (message) =>
        GotMultipleFirstSliderMessage({ message })
      ),
      ...Command.mapMessages(multipleSecondCommands, (message) =>
        GotMultipleSecondSliderMessage({ message })
      ),
      ...Command.mapMessages(multipleThirdCommands, (message) =>
        GotMultipleThirdSliderMessage({ message })
      ),
      ...Command.mapMessages(verticalCommands, (message) =>
        GotVerticalSliderMessage({ message })
      ),
      ...Command.mapMessages(controlledCommands, (message) =>
        GotControlledSliderMessage({ message })
      ),
      ...Command.mapMessages(disabledCommands, (message) =>
        GotDisabledSliderMessage({ message })
      ),
      ...Command.mapMessages(rtlCommands, (message) =>
        GotRtlSliderMessage({ message })
      ),
    ],
  ];
};

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotBasicSliderMessage: ({ message }) =>
        updateSlider(
          model.basicSlider,
          message,
          GotBasicSliderMessage,
          (slider) => evo(model, { basicSlider: () => slider })
        ),
      GotRangeStartSliderMessage: ({ message }) =>
        updateSlider(
          model.rangeStartSlider,
          message,
          GotRangeStartSliderMessage,
          (slider) => evo(model, { rangeStartSlider: () => slider })
        ),
      GotRangeEndSliderMessage: ({ message }) =>
        updateSlider(
          model.rangeEndSlider,
          message,
          GotRangeEndSliderMessage,
          (slider) => evo(model, { rangeEndSlider: () => slider })
        ),
      GotMultipleFirstSliderMessage: ({ message }) =>
        updateSlider(
          model.multipleFirstSlider,
          message,
          GotMultipleFirstSliderMessage,
          (slider) => evo(model, { multipleFirstSlider: () => slider })
        ),
      GotMultipleSecondSliderMessage: ({ message }) =>
        updateSlider(
          model.multipleSecondSlider,
          message,
          GotMultipleSecondSliderMessage,
          (slider) => evo(model, { multipleSecondSlider: () => slider })
        ),
      GotMultipleThirdSliderMessage: ({ message }) =>
        updateSlider(
          model.multipleThirdSlider,
          message,
          GotMultipleThirdSliderMessage,
          (slider) => evo(model, { multipleThirdSlider: () => slider })
        ),
      GotVerticalSliderMessage: ({ message }) =>
        updateSlider(
          model.verticalSlider,
          message,
          GotVerticalSliderMessage,
          (slider) => evo(model, { verticalSlider: () => slider })
        ),
      PressedVerticalSliderPointer: ({ screenY }) => [
        evo(model, {
          verticalSliderState: () =>
            DraggingVerticalSlider({
              startScreenY: screenY,
              startValue: model.verticalSlider.value,
            }),
        }),
        [],
      ],
      MovedVerticalSliderPointer: ({ screenY }) =>
        M.value(model.verticalSliderState).pipe(
          M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
          M.tagsExhaustive({
            Idle: () => [model, []],
            DraggingVerticalSlider: ({ startScreenY, startValue }) => [
              evo(model, {
                verticalSlider: (slider) =>
                  evo(slider, {
                    value: () =>
                      clampSliderValue(
                        slider,
                        startValue - (screenY - startScreenY)
                      ),
                  }),
              }),
              [],
            ],
          })
        ),
      ReleasedVerticalSliderPointer: () => [
        evo(model, { verticalSliderState: () => Idle() }),
        [],
      ],
      PressedVerticalSliderKey: ({ key }) => [
        evo(model, {
          verticalSlider: (slider) =>
            evo(slider, { value: () => valueForVerticalKey(slider, key) }),
        }),
        [],
      ],
      GotControlledSliderMessage: ({ message }) =>
        updateSlider(
          model.controlledSlider,
          message,
          GotControlledSliderMessage,
          (slider) => evo(model, { controlledSlider: () => slider })
        ),
      GotDisabledSliderMessage: ({ message }) =>
        updateSlider(
          model.disabledSlider,
          message,
          GotDisabledSliderMessage,
          (slider) => evo(model, { disabledSlider: () => slider })
        ),
      GotRtlSliderMessage: ({ message }) =>
        updateSlider(model.rtlSlider, message, GotRtlSliderMessage, (slider) =>
          evo(model, { rtlSlider: () => slider })
        ),
    })
  );

// VIEW

const updateSlider = (
  sliderModel: Slider.Model,
  message: Slider.Message,
  toMessage: (value: { readonly message: Slider.Message }) => Message,
  setSlider: (slider: Slider.Model) => Model
): readonly [Model, readonly Command.Command<Message>[]] => {
  const [slider, commands] = Slider.update(sliderModel, message);

  return [
    setSlider(slider),
    Command.mapMessages(commands, (message) => toMessage({ message })),
  ];
};

const sliderView = (
  model: Slider.Model,
  slotId: string,
  name: string,
  toParentMessage: (message: Slider.Message) => Message,
  options: Readonly<{
    classes?: string | undefined;
    thumbClasses?: string | undefined;
    isDisabled?: boolean | undefined;
    dir?: string | undefined;
  }> = {}
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: Slider.view,
    viewInputs: {
      name,
      ariaLabel: name,
      ...(options.isDisabled === undefined
        ? {}
        : { isDisabled: options.isDisabled }),
      toView: (attributes) =>
        h.div(
          [
            ...attributes.root,
            ...(options.dir === undefined ? [] : [h.Dir(options.dir)]),
            h.Class(
              [Slider.shadcnSliderRootClasses, options.classes]
                .filter((value): value is string => value !== undefined)
                .join(" ")
            ),
          ],
          [
            h.div(
              [
                ...attributes.track,
                h.Class(Slider.shadcnSliderTrackClasses),
              ],
              [
                h.div(
                  [
                    ...attributes.filledTrack,
                    h.Class(Slider.shadcnSliderFilledTrackClasses),
                  ],
                  []
                ),
              ]
            ),
            h.div(
              [
                ...attributes.thumb,
                h.AriaLabel(name),
                h.Class(
                  [Slider.shadcnSliderThumbClasses, options.thumbClasses]
                    .filter((value): value is string => value !== undefined)
                    .join(" ")
                ),
              ],
              []
            ),
            h.input(attributes.hiddenInput),
          ]
        ),
    },
    toParentMessage,
  });
};

const sliderPercent = (model: Slider.Model): number =>
  ((model.value - model.min) / (model.max - model.min)) * 100;

const clampSliderValue = (model: Slider.Model, value: number): number =>
  Math.min(model.max, Math.max(model.min, value));

const stepSliderValue = (model: Slider.Model, direction: number): number =>
  clampSliderValue(model, model.value + model.step * direction);

const valueForVerticalKey = (model: Slider.Model, key: string): number =>
  M.value(key).pipe(
    M.when("ArrowUp", () => stepSliderValue(model, 1)),
    M.when("ArrowRight", () => stepSliderValue(model, 1)),
    M.when("ArrowDown", () => stepSliderValue(model, -1)),
    M.when("ArrowLeft", () => stepSliderValue(model, -1)),
    M.when("Home", () => model.min),
    M.when("End", () => model.max),
    M.orElse(() => model.value)
  );

const thumbOnlySliderView = (
  model: Slider.Model,
  slotId: string,
  name: string,
  toParentMessage: (message: Slider.Message) => Message
): Html => {
  const h = html<Message>();
  const percent = sliderPercent(model);

  return h.submodel({
    slotId,
    model,
    view: Slider.view,
    viewInputs: {
      name,
      ariaLabel: name,
      toView: (attributes) =>
        h.div(
          [
            ...attributes.root,
            h.Style({
              bottom: "0",
              left: "0",
              position: "absolute",
              right: "0",
              top: "0",
              width: "100%",
            }),
            h.Class(`${Slider.shadcnSliderRootClasses} pointer-events-none inset-0`),
          ],
          [
            h.div(
              [
                ...attributes.track,
                h.Class(`${Slider.shadcnSliderTrackClasses} opacity-0`),
              ],
              [
                h.div(
                  [
                    ...attributes.filledTrack,
                    h.Class(`${Slider.shadcnSliderFilledTrackClasses} opacity-0`),
                  ],
                  []
                ),
              ]
            ),
            h.div(
              [
                ...attributes.thumb,
                h.AriaLabel(name),
                h.Style({ left: `${percent}%` }),
                h.Class(
                  `${Slider.shadcnSliderThumbClasses} pointer-events-auto absolute top-1/2 -translate-x-1/2 -translate-y-1/2`
                ),
              ],
              []
            ),
            h.input(attributes.hiddenInput),
          ]
        ),
    },
    toParentMessage,
  });
};

const compositeSliderView = (
  sliders: ReadonlyArray<
    readonly [
      Slider.Model,
      string,
      string,
      (message: Slider.Message) => Message,
    ]
  >
): Html => {
  const h = html<Message>();
  const percents = sliders.map(([model]) => sliderPercent(model));
  const start = Math.min(...percents);
  const end = Math.max(...percents);

  return h.div(
    [
      h.Style({ width: "100%" }),
      h.Class(`${Slider.shadcnSliderRootClasses} relative`),
    ],
    [
      h.div(
        [
          h.Style({
            left: "0",
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
          }),
          h.Class(`${Slider.shadcnSliderTrackClasses} relative overflow-hidden`),
        ],
        [
          h.div(
            [
              h.Style({ left: `${start}%`, width: `${end - start}%` }),
              h.Class(`${Slider.shadcnSliderFilledTrackClasses} absolute`),
            ],
            []
          ),
        ]
      ),
      ...sliders.map(([model, slotId, name, toParentMessage]) =>
        thumbOnlySliderView(model, slotId, name, toParentMessage)
      ),
    ]
  );
};

const verticalSliderView = (model: Slider.Model): Html => {
  const h = html<Message>();
  const percent = sliderPercent(model);

  return h.div(
    [
      h.DataAttribute("testid", "shadcn-slider-vertical-frame"),
      h.Class("relative h-40 w-6 touch-none select-none"),
      h.OnPointerMove((_screenX, screenY) =>
        Option.some(MovedVerticalSliderPointer({ screenY }))
      ),
      h.OnPointerUp(() => Option.some(ReleasedVerticalSliderPointer())),
    ],
    [
      h.div(
        [
          h.Class(
            "absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 rounded-full bg-gray-200"
          ),
        ],
        [
          h.div(
            [
              h.Style({ height: `${percent}%` }),
              h.Class(
                "absolute bottom-0 left-0 w-full rounded-full bg-accent-600"
              ),
            ],
            []
          ),
        ]
      ),
      h.div(
        [
          h.Attribute("role", "slider"),
          h.Attribute("aria-orientation", "vertical"),
          h.Attribute("aria-valuemin", String(model.min)),
          h.Attribute("aria-valuemax", String(model.max)),
          h.Attribute("aria-valuenow", String(model.value)),
          h.AriaLabel("Vertical slider"),
          h.Attribute("tabindex", "0"),
          h.Style({ bottom: `${percent}%` }),
          h.Class(
            `${Slider.shadcnSliderThumbClasses} absolute left-1/2 -translate-x-1/2 translate-y-1/2`
          ),
          h.OnPointerDown((_pointerType, _button, _screenX, screenY) =>
            Option.some(PressedVerticalSliderPointer({ screenY }))
          ),
          h.OnKeyDownPreventDefault((key) =>
            Option.some(PressedVerticalSliderKey({ key }))
          ),
        ],
        []
      ),
      h.input([
        h.Type("hidden"),
        h.Name("Vertical slider"),
        h.Value(String(model.value)),
      ]),
    ]
  );
};

const exampleBlock = (title: string, children: readonly Html[]): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [h.p([h.Class("text-sm font-medium text-gray-900")], [title]), ...children]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid w-full max-w-2xl gap-8")],
    [
      exampleBlock("Default", [
        sliderView(model.basicSlider, "shadcn-slider-basic", "slider-demo", (message) =>
          GotBasicSliderMessage({ message })
        ),
      ]),
      exampleBlock("Range", [
        compositeSliderView([
          [
            model.rangeStartSlider,
            "shadcn-slider-range-start",
            "Range minimum",
            (message) => GotRangeStartSliderMessage({ message }),
          ],
          [
            model.rangeEndSlider,
            "shadcn-slider-range-end",
            "Range maximum",
            (message) => GotRangeEndSliderMessage({ message }),
          ],
        ]),
      ]),
      exampleBlock("Multiple Thumbs", [
        compositeSliderView([
          [
            model.multipleFirstSlider,
            "shadcn-slider-multiple-first",
            "First thumb",
            (message) => GotMultipleFirstSliderMessage({ message }),
          ],
          [
            model.multipleSecondSlider,
            "shadcn-slider-multiple-second",
            "Second thumb",
            (message) => GotMultipleSecondSliderMessage({ message }),
          ],
          [
            model.multipleThirdSlider,
            "shadcn-slider-multiple-third",
            "Third thumb",
            (message) => GotMultipleThirdSliderMessage({ message }),
          ],
        ]),
      ]),
      exampleBlock("Vertical", [
        verticalSliderView(model.verticalSlider),
      ]),
      exampleBlock("Controlled", [
        h.div([h.Class("space-y-2")], [
          h.p([h.Class("text-sm text-gray-600")], [
            `Temperature ${model.controlledSlider.value.toFixed(1)}`,
          ]),
          sliderView(
            model.controlledSlider,
            "shadcn-slider-controlled",
            "Temperature",
            (message) => GotControlledSliderMessage({ message })
          ),
        ]),
      ]),
      exampleBlock("Disabled", [
        sliderView(
          model.disabledSlider,
          "shadcn-slider-disabled",
          "Disabled slider",
          (message) => GotDisabledSliderMessage({ message }),
          { isDisabled: true }
        ),
      ]),
      exampleBlock("RTL", [
        h.div([h.Dir("rtl"), h.Class("space-y-2")], [
          h.p([h.Class("text-sm text-gray-600")], ["العربية"]),
          sliderView(
            model.rtlSlider,
            "shadcn-slider-rtl",
            "شريط تمرير",
            (message) => GotRtlSliderMessage({ message }),
            { dir: "rtl" }
          ),
        ]),
      ]),
    ]
  );
});
