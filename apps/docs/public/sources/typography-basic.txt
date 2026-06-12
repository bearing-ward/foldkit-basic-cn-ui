import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Typography from "../../ui/typography";

// MODEL

export const Model = S.Struct({});

export type Model = typeof Model.Type;

// MESSAGE

export const Message = S.Never;
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-3xl space-y-8")],
    [
      h.article(
        [h.Class("space-y-6")],
        [
          Typography.h1<Message>(
            "Taxing Laughter: The Joke Tax Chronicles",
            "text-center text-balance"
          ),
          Typography.p<Message>(
            "Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money."
          ),
          Typography.h2<Message>("The King's Plan"),
          Typography.p<Message>(
            "The king thought long and hard, and finally came up with a brilliant plan: he would tax the jokes in the kingdom."
          ),
          Typography.blockquote<Message>(
            "\"After all,\" he said, \"everyone enjoys a good joke, so it's only fair that they should pay for the privilege.\""
          ),
          Typography.h3<Message>("The Joke Tax"),
          Typography.p<Message>(
            "The king's subjects were not amused. They grumbled and complained, but the king was firm:"
          ),
          Typography.ul<Message>([
            "1st level of puns: 5 gold coins",
            "2nd level of jokes: 10 gold coins",
            "3rd level of one-liners: 20 gold coins",
          ]),
          Typography.h3<Message>("Jokester's Revolt"),
          Typography.p<Message>(
            "Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place."
          ),
          Typography.h3<Message>("The People's Rebellion"),
          Typography.table<Message>(
            ["King's Treasury", "People's happiness"],
            [
              ["Empty", "Overflowing"],
              ["Modest", "Satisfied"],
              ["Full", "Ecstatic"],
            ]
          ),
          Typography.p<Message>(
            "The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas."
          ),
        ]
      ),
      h.section(
        [h.Class("grid gap-4 rounded-lg border border-gray-200 p-4")],
        [
          Typography.h2<Message>("Individual examples"),
          Typography.h4<Message>("People stopped telling jokes"),
          Typography.p<Message>(
            "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax."
          ),
          Typography.inlineCode<Message>("@radix-ui/react-alert-dialog"),
          Typography.lead<Message>(
            "A modal dialog that interrupts the user with important content and expects a response."
          ),
          Typography.large<Message>("Are you absolutely sure?"),
          Typography.small<Message>("Email address"),
          Typography.muted<Message>("Enter your email address."),
        ]
      ),
      h.article(
        [
          h.Dir("rtl"),
          h.Class("space-y-6 rounded-lg border border-gray-200 p-4 text-right"),
        ],
        [
          Typography.h1<Message>(
            "فرض الضرائب على الضحك: سجلات ضريبة النكتة"
          ),
          Typography.p<Message>(
            "في قديم الزمان، في أرض بعيدة، كان هناك ملك كسول جداً يقضي يومه كله مستلقياً على عرشه."
          ),
          Typography.h2<Message>("خطة الملك"),
          Typography.p<Message>(
            "فكر الملك طويلاً وبجد، وأخيراً توصل إلى خطة عبقرية: سيفرض ضريبة على النكات في المملكة."
          ),
          Typography.blockquote<Message>(
            "\"في النهاية،\" قال، \"الجميع يستمتع بنكتة جيدة، لذا من العدل أن يدفعوا مقابل هذا الامتياز.\""
          ),
          Typography.h3<Message>("ضريبة النكتة"),
          Typography.ul<Message>([
            "المستوى الأول من التورية: 5 قطع ذهبية",
            "المستوى الثاني من النكات: 10 قطع ذهبية",
            "المستوى الثالث من النكات القصيرة: 20 قطعة ذهبية",
          ]),
        ]
      ),
    ]
  );
});
