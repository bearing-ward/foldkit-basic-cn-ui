import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Carousel from "../../ui/carousel";

const slideCount = 5;
const slides = ["1", "2", "3", "4", "5"] as const;

// MODEL

export const Model = S.Struct({ index: S.Number });
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedPreviousSlide = m("ClickedPreviousSlide");
export const ClickedNextSlide = m("ClickedNextSlide");

export const Message = S.Union([ClickedPreviousSlide, ClickedNextSlide]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ index: 0 }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedPreviousSlide: () => [
        evo(model, {
          index: (index) => Carousel.previousIndex(index, slideCount),
        }),
        [],
      ],
      ClickedNextSlide: () => [
        evo(model, { index: (index) => Carousel.nextIndex(index, slideCount) }),
        [],
      ],
    })
  );

const slideCard = <ParentMessage>(label: string): Html => {
  const h = html<ParentMessage>();

  return h.div([h.Class(Carousel.carouselCardClasses)], [label]);
};

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  const carouselBody = (
    contentClasses: string,
    itemClasses: string,
    orientation: Carousel.CarouselOrientation,
    rootClasses: string,
    ariaLabel = "Carousel",
    labels: readonly string[] = slides
  ): Html =>
    Carousel.rootView<Message>({
      ariaLabel,
      classes: rootClasses,
      children: [
        Carousel.viewportView<Message>({
          children: [
            Carousel.contentView<Message>({
              index: model.index,
              orientation,
              classes: contentClasses,
              children: labels.map((slide) =>
                Carousel.itemView<Message>({
                  classes: itemClasses,
                  children: [slideCard<Message>(slide)],
                })
              ),
            }),
          ],
        }),
        Carousel.buttonView<Message>({
          label: "Previous slide",
          direction: "previous",
          onClick: ClickedPreviousSlide(),
        }),
        Carousel.buttonView<Message>({
          label: "Next slide",
          direction: "next",
          onClick: ClickedNextSlide(),
        }),
      ],
    });

  return h.div(
    [h.Class("space-y-3")],
    [
      carouselBody("", "", "horizontal", "max-w-xs"),
      Carousel.statusView<Message>({
        current: model.index + 1,
        count: slideCount,
      }),
    ]
  );
});
