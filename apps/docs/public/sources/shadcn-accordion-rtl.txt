import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Accordion from "../../ui/shadcn-accordion";

// MODEL

export const AccordionValue = S.Union([
  S.Literal("password"),
  S.Literal("subscription"),
  S.Literal("payment"),
]);
export type AccordionValue = typeof AccordionValue.Type;

export const Model = S.Struct({
  openValues: S.Array(AccordionValue),
});

export type Model = typeof Model.Type;

// MESSAGE

export const ToggledPanel = m("ToggledPanel", { value: AccordionValue });

export const Message = S.Union([ToggledPanel]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ openValues: ["password"] }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledPanel: ({ value }) => [
        evo(model, {
          openValues: (openValues) =>
            Accordion.includesValue(openValues, value) ? [] : [value],
        }),
        [],
      ],
    })
  );

// VIEW

const panel = (content: string): readonly Html[] => {
  const h = html<Message>();

  return [h.p([], [content])];
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Attribute("dir", "rtl"), h.Class("w-full max-w-2xl")],
    [
      Accordion.rootView<Message>({
        openValues: model.openValues,
        children: [
          Accordion.itemView<Message>({
            value: "password",
            openValues: model.openValues,
            title: "كيف يمكنني إعادة تعيين كلمة المرور؟",
            onValueChange: ToggledPanel({ value: "password" }),
            children: panel(
              "انقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول، أدخل عنوان بريدك الإلكتروني، وسنرسل لك رابطًا لإعادة تعيين كلمة المرور. سينتهي صلاحية الرابط خلال 24 ساعة."
            ),
          }),
          Accordion.itemView<Message>({
            value: "subscription",
            openValues: model.openValues,
            title: "هل يمكنني تغيير خطة الاشتراك الخاصة بي؟",
            onValueChange: ToggledPanel({ value: "subscription" }),
            children: panel(
              "نعم، يمكنك ترقية خطتك أو تخفيضها في أي وقت من صفحة إعدادات الفوترة."
            ),
          }),
          Accordion.itemView<Message>({
            value: "payment",
            openValues: model.openValues,
            title: "ما هي طرق الدفع التي تقبلونها؟",
            onValueChange: ToggledPanel({ value: "payment" }),
            children: panel(
              "نقبل بطاقات الائتمان الرئيسية وطرق الدفع المعتمدة."
            ),
          }),
        ],
        className: Accordion.shadcnAccordionRootClassName,
      }),
    ]
  );
});
