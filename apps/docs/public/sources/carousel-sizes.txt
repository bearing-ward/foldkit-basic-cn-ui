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

  return h.div([h.Class(Carousel.carouselCardClassName)], [label]);
};

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const carouselBody = (
    contentClassName: string,
    itemClassName: string,
    orientation: Carousel.CarouselOrientation,
    rootClassName: string,
    ariaLabel = "Carousel",
    labels: readonly string[] = slides
  ): Html =>
    Carousel.rootView<Message>({
      ariaLabel,
      className: rootClassName,
      children: [
        Carousel.viewportView<Message>({
          children: [
            Carousel.contentView<Message>({
              index: model.index,
              orientation,
              className: contentClassName,
              children: labels.map((slide) =>
                Carousel.itemView<Message>({
                  className: itemClassName,
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

  return carouselBody("", "basis-1/3", "horizontal", "max-w-lg");
});
