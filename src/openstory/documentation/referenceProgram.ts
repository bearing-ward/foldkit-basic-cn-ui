import { Array, Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as AnatomyXray from "./anatomyXray";
import * as ApiReference from "./apiReference";
import type {
  DocumentationCoverageRow,
  DocumentationReference,
} from "./referenceData";

// MODEL

export const Model = S.Struct({
  anatomyXray: AnatomyXray.Model,
  apiReference: ApiReference.Model,
});
export type Model = typeof Model.Type;

// MESSAGE

export const GotAnatomyXrayMessage = m("GotAnatomyXrayMessage", {
  message: AnatomyXray.Message,
});
export const GotApiReferenceMessage = m("GotApiReferenceMessage", {
  message: ApiReference.Message,
});

export const Message = S.Union([GotAnatomyXrayMessage, GotApiReferenceMessage]);
export type Message = typeof Message.Type;

// INIT

type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

const withUpdateReturn = M.withReturnType<UpdateReturn>();

const initForReference = (reference: DocumentationReference): UpdateReturn => {
  const [anatomyXray, anatomyCommands] = AnatomyXray.init();
  const [apiReference, apiCommands] = ApiReference.init(reference.apiReference);

  return [
    { anatomyXray, apiReference },
    [
      ...Command.mapMessages(anatomyCommands, (message) =>
        GotAnatomyXrayMessage({ message })
      ),
      ...Command.mapMessages(apiCommands, (message) =>
        GotApiReferenceMessage({ message })
      ),
    ],
  ];
};

// UPDATE

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    withUpdateReturn,
    M.tagsExhaustive({
      GotAnatomyXrayMessage: ({ message }) => {
        const [anatomyXray, commands] = AnatomyXray.update(
          model.anatomyXray,
          message
        );

        return [
          evo(model, { anatomyXray: () => anatomyXray }),
          Command.mapMessages(commands, (message) =>
            GotAnatomyXrayMessage({ message })
          ),
        ];
      },
      GotApiReferenceMessage: ({ message }) => {
        const [apiReference, commands] = ApiReference.update(
          model.apiReference,
          message
        );

        return [
          evo(model, { apiReference: () => apiReference }),
          Command.mapMessages(commands, (message) =>
            GotApiReferenceMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

const shellClasses = "min-h-screen bg-white px-4 py-6 text-slate-950 sm:px-6";
const containerClasses = "mx-auto flex w-full max-w-6xl flex-col gap-6";
const panelClasses =
  "rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm";
const eyebrowClasses =
  "font-mono text-xs font-medium uppercase text-slate-500";
const sectionHeadingClasses = "text-xl font-semibold text-slate-950";
const proseClasses = "text-sm leading-6 text-slate-600";
const codeClasses =
  "overflow-x-auto rounded-[6px] border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-5 text-slate-50";

const renderMetadata = (
  label: string,
  value: string,
  href?: string
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-1")],
    [
      h.dt([h.Class("text-xs font-semibold uppercase text-slate-500")], [
        label,
      ]),
      h.dd([h.Class("min-w-0 text-sm text-slate-800")], [
        href === undefined
          ? h.code([h.Class("break-words font-mono text-xs")], [value])
          : h.a(
              [
                h.Href(href),
                h.Class("break-words text-sky-700 underline-offset-4 hover:underline"),
              ],
              [value]
            ),
      ]),
    ]
  );
};

const renderSection = (heading: string, children: readonly Html[]): Html => {
  const h = html<Message>();

  return h.section(
    [h.Class(`${panelClasses} space-y-4`)],
    [h.h2([h.Class(sectionHeadingClasses)], [heading]), ...children]
  );
};

const renderParagraphs = (paragraphs: readonly string[]): readonly Html[] => {
  const h = html<Message>();

  return paragraphs.map((paragraph) =>
    h.p([h.Class(proseClasses)], [paragraph])
  );
};

const renderList = (items: readonly string[]): Html => {
  const h = html<Message>();

  return h.ul(
    [h.Class("list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600")],
    items.map((item) => h.li([], [item]))
  );
};

const renderCode = (source: string): Html => {
  const h = html<Message>();

  return h.pre([h.Class(codeClasses)], [h.code([], [source])]);
};

const renderInstallCommands = (commands: readonly string[]): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-2")],
    commands.map((command) =>
      h.pre(
        [h.Class("overflow-x-auto rounded-[6px] bg-slate-100 p-3")],
        [h.code([h.Class("font-mono text-xs text-slate-800")], [command])]
      )
    )
  );
};

const renderCoverageTable = (
  rows: readonly DocumentationCoverageRow[]
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("overflow-x-auto")],
    [
      h.table(
        [h.Class("w-full border-collapse text-left text-sm")],
        [
          h.thead([], [
            h.tr(
              [h.Class("border-b border-slate-200 text-slate-500")],
              [
                h.th([h.Class("py-2 pr-4 font-semibold")], ["Path"]),
                h.th([h.Class("py-2 font-semibold")], ["Purpose"]),
              ]
            ),
          ]),
          h.tbody(
            [],
            rows.map((row) =>
              h.tr([h.Class("border-b border-slate-100 align-top")], [
                h.td([h.Class("py-3 pr-4")], [
                  h.code([h.Class("font-mono text-xs text-slate-950")], [
                    row.path,
                  ]),
                ]),
                h.td([h.Class("py-3 text-slate-600")], [row.purpose]),
              ])
            )
          ),
        ]
      ),
    ]
  );
};

const renderKeyboardSection = (
  keyboardInteractionNotes: readonly string[]
): Html => {
  const h = html<Message>();

  return Array.match(keyboardInteractionNotes, {
    onEmpty: () => h.empty,
    onNonEmpty: (notes) =>
      renderSection("Keyboard interaction", [renderList(notes)]),
  });
};

const anatomyXraySubmodelView = (reference: DocumentationReference) =>
  Submodel.defineView<AnatomyXray.Model, AnatomyXray.Message>((model): Html =>
    AnatomyXray.view(reference.anatomyXray)(model)
  );

const apiReferenceSubmodelView = (reference: DocumentationReference) =>
  Submodel.defineView<ApiReference.Model, ApiReference.Message>((model): Html =>
    ApiReference.view(reference.apiReference)(model)
  );

const referenceView = (reference: DocumentationReference) => {
  const anatomyView = anatomyXraySubmodelView(reference);
  const apiReferenceView = apiReferenceSubmodelView(reference);

  return (model: Model): Html => {
    const h = html<Message>();

    return h.main(
      [h.Class(shellClasses)],
      [
        h.div(
          [h.Class(containerClasses)],
          [
            h.header([h.Class(`${panelClasses} space-y-4`)], [
              h.div([h.Class("space-y-2")], [
                h.p([h.Class(eyebrowClasses)], [reference.laneLabel]),
                h.h1([h.Class("text-4xl font-semibold text-slate-950")], [
                  reference.title,
                ]),
              ]),
              h.dl(
                [h.Class("grid gap-4 md:grid-cols-2 lg:grid-cols-3")],
                [
                  renderMetadata("Source", reference.sourcePath),
                  renderMetadata("Registry item", reference.registryItemName),
                  renderMetadata(
                    "Origin",
                    reference.originUrl,
                    reference.originUrl
                  ),
                  renderMetadata("Artifact", reference.artifact),
                  renderMetadata("Primitive", reference.primitive),
                ]
              ),
            ]),
            renderSection("Description/Overview", [
              ...renderParagraphs(reference.overview),
            ]),
            renderSection("Installation", [
              renderInstallCommands(reference.installCommands),
            ]),
            renderSection("Usage", [renderCode(reference.usageSnippet)]),
            renderSection("Foldkit integration", [
              renderCode(reference.foldkitIntegrationSnippet),
              renderList(reference.foldkitIntegrationNotes),
            ]),
            renderSection("Anatomy", [
              h.submodel({
                slotId: `${reference.registryItemName}-anatomy-xray`,
                model: model.anatomyXray,
                view: anatomyView,
                toParentMessage: (message) =>
                  GotAnatomyXrayMessage({ message }),
              }),
            ]),
            renderSection("Styling", [renderList(reference.stylingNotes)]),
            renderKeyboardSection(reference.keyboardInteractionNotes),
            renderSection("API", [
              h.submodel({
                slotId: `${reference.registryItemName}-api-reference`,
                model: model.apiReference,
                view: apiReferenceView,
                toParentMessage: (message) =>
                  GotApiReferenceMessage({ message }),
              }),
            ]),
            renderSection("Accessibility", [
              renderList(reference.accessibilityNotes),
            ]),
            renderSection("Existing coverage", [
              renderCoverageTable(reference.coverageRows),
            ]),
          ]
        ),
      ]
    );
  };
};

export const createDocumentationReferenceProgram = (
  reference: DocumentationReference
) => ({
  Model,
  Message,
  init: () => initForReference(reference),
  update,
  view: referenceView(reference),
});
