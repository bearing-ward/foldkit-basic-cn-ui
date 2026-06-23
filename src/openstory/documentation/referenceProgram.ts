import { Array, Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as AnatomyXray from "./anatomyXray";
import * as ApiReference from "./apiReference";
import * as DisplayTemplate from "./displayTemplate";
import type {
  DocumentationCoverageRow,
  DocumentationReference,
} from "./referenceData";

// MODEL

export const Model = S.Struct({
  anatomyXray: AnatomyXray.Model,
  apiReference: ApiReference.Model,
  templateOpenPanelIds: S.Array(S.String),
});
export type Model = typeof Model.Type;

// MESSAGE

export const GotAnatomyXrayMessage = m("GotAnatomyXrayMessage", {
  message: AnatomyXray.Message,
});
export const GotApiReferenceMessage = m("GotApiReferenceMessage", {
  message: ApiReference.Message,
});
export const ClickedTemplatePanel = m("ClickedTemplatePanel", {
  panelId: S.String,
});

export const Message = S.Union([
  GotAnatomyXrayMessage,
  GotApiReferenceMessage,
  ClickedTemplatePanel,
]);
export type Message = typeof Message.Type;

// INIT

type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

const withUpdateReturn = M.withReturnType<UpdateReturn>();

const initForReference = (reference: DocumentationReference): UpdateReturn => {
  const [anatomyXray, anatomyCommands] = AnatomyXray.init();
  const [apiReference, apiCommands] = ApiReference.init(reference.apiReference);

  return [
    { anatomyXray, apiReference, templateOpenPanelIds: ["preview"] },
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
      ClickedTemplatePanel: ({ panelId }) => {
        const panelIsOpen = model.templateOpenPanelIds.includes(panelId);

        return [
          evo(model, {
            templateOpenPanelIds: () =>
              panelIsOpen
                ? model.templateOpenPanelIds.filter(
                    (value) => value !== panelId
                  )
                : [...model.templateOpenPanelIds, panelId],
          }),
          [],
        ];
      },
    })
  );

// VIEW

const renderSection = (heading: string, children: readonly Html[]): Html => {
  return DisplayTemplate.section<Message>(heading, children);
};

const renderCoverageTable = (
  rows: readonly DocumentationCoverageRow[]
): Html => {
  return DisplayTemplate.table<Message, DocumentationCoverageRow>(
    [
      { header: "Path", cell: (row) => row.path, code: true },
      { header: "Purpose", cell: (row) => row.purpose },
    ],
    rows
  );
};

const renderKeyboardSection = (
  keyboardInteractionNotes: readonly string[]
): Html => {
  const h = html<Message>();

  return Array.match(keyboardInteractionNotes, {
    onEmpty: () => h.empty,
    onNonEmpty: (notes) =>
      renderSection("Keyboard interaction", [DisplayTemplate.list(notes)]),
  });
};

const renderPreviewAndSourceSection = (
  reference: DocumentationReference,
  model: Model
): Html => {
  const h = html<Message>();

  return renderSection("Preview and source", [
    DisplayTemplate.callout<Message>(
      "Local source only",
      "Preview and source affordances resolve to generated OpenStory stories and generated source snapshots in this repository."
    ),
    DisplayTemplate.accordion<Message>(
      model.templateOpenPanelIds,
      [
        {
          value: "preview",
          title: "Preview",
          onValueChange: ClickedTemplatePanel({ panelId: "preview" }),
          children: [
            h.ul(
              [h.Class("grid gap-2 text-sm text-slate-600")],
              reference.previewStories.map((story) =>
                h.li(
                  [h.Class("grid gap-1 rounded-[6px] bg-slate-50 p-3")],
                  [
                    h.span(
                      [h.Class("font-medium text-slate-950")],
                      [story.label]
                    ),
                    h.a(
                      [
                        h.Href(`/__story/${story.storyId}`),
                        h.Class(
                          "text-sky-700 underline-offset-4 hover:underline"
                        ),
                      ],
                      [`/__story/${story.storyId}`]
                    ),
                  ]
                )
              )
            ),
          ],
        },
        {
          value: "source",
          title: "Source",
          onValueChange: ClickedTemplatePanel({ panelId: "source" }),
          children: [DisplayTemplate.sourceList(reference.sourceArtifacts)],
        },
      ],
      `${reference.registryItemName}-template`
    ),
  ]);
};

const anatomyXraySubmodelView = (reference: DocumentationReference) =>
  Submodel.defineView<AnatomyXray.Model, AnatomyXray.Message>(
    (model): Html => AnatomyXray.view(reference.anatomyXray)(model)
  );

const apiReferenceSubmodelView = (reference: DocumentationReference) =>
  Submodel.defineView<ApiReference.Model, ApiReference.Message>(
    (model): Html => ApiReference.view(reference.apiReference)(model)
  );

const referenceView = (reference: DocumentationReference) => {
  const anatomyView = anatomyXraySubmodelView(reference);
  const apiReferenceView = apiReferenceSubmodelView(reference);

  return (model: Model): Html => {
    const h = html<Message>();

    return DisplayTemplate.pageShell<Message>([
      h.header(
        [h.Class(`${DisplayTemplate.panelClasses} space-y-4`)],
        [
          h.div(
            [h.Class("space-y-2")],
            [
              DisplayTemplate.eyebrow<Message>(reference.laneLabel),
              DisplayTemplate.heading<Message>(1, reference.title),
            ]
          ),
          DisplayTemplate.metadataGrid<Message>([
            { label: "Source", value: reference.sourcePath },
            { label: "Registry item", value: reference.registryItemName },
            {
              label: "Origin",
              value: reference.originUrl,
              href: reference.originUrl,
            },
            { label: "Artifact", value: reference.artifact },
            { label: "Primitive", value: reference.primitive },
          ]),
        ]
      ),
      renderSection("Description/Overview", [
        ...DisplayTemplate.paragraphs(reference.overview),
      ]),
      renderSection("Installation", [
        DisplayTemplate.commandBlocks(reference.installCommands),
      ]),
      renderSection("Usage", [
        DisplayTemplate.codeBlock(reference.usageSnippet),
      ]),
      renderSection("Foldkit integration", [
        DisplayTemplate.codeBlock(reference.foldkitIntegrationSnippet),
        DisplayTemplate.list(reference.foldkitIntegrationNotes),
      ]),
      renderPreviewAndSourceSection(reference, model),
      renderSection("Anatomy", [
        h.submodel({
          slotId: `${reference.registryItemName}-anatomy-xray`,
          model: model.anatomyXray,
          view: anatomyView,
          toParentMessage: (message) => GotAnatomyXrayMessage({ message }),
        }),
      ]),
      renderSection("Styling", [DisplayTemplate.list(reference.stylingNotes)]),
      renderKeyboardSection(reference.keyboardInteractionNotes),
      renderSection("API", [
        h.submodel({
          slotId: `${reference.registryItemName}-api-reference`,
          model: model.apiReference,
          view: apiReferenceView,
          toParentMessage: (message) => GotApiReferenceMessage({ message }),
        }),
      ]),
      renderSection("Accessibility", [
        DisplayTemplate.list(reference.accessibilityNotes),
      ]),
      renderSection("Existing coverage", [
        renderCoverageTable(reference.coverageRows),
      ]),
    ]);
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
