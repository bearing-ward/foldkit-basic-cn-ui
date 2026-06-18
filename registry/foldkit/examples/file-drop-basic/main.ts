import { Array, Match as M, Option, Schema as S } from "effect";
import { Command, File, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as FileDrop from "../../ui/file-drop";

// MODEL

export const Model = S.Struct({
  fileDrop: FileDrop.Model,
  files: S.Array(File.File),
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotFileDropMessage = m("GotFileDropMessage", {
  message: FileDrop.Message,
});
export const ClickedRemoveFile = m("ClickedRemoveFile", {
  fileIndex: S.Number,
});

export const Message = S.Union([GotFileDropMessage, ClickedRemoveFile]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    fileDrop: FileDrop.init({ id: "file-drop-basic" }),
    files: [],
  },
  [],
];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotFileDropMessage: ({ message }) => {
        const [fileDrop, commands, maybeOutMessage] = FileDrop.update(
          model.fileDrop,
          message
        );

        const files = Option.match(maybeOutMessage, {
          onNone: () => model.files,
          onSome: M.type<FileDrop.OutMessage>().pipe(
            M.tagsExhaustive({
              ReceivedFiles: ({ files }) => [...model.files, ...files],
              RejectedNonFiles: () => model.files,
            })
          ),
        });

        return [
          evo(model, {
            fileDrop: () => fileDrop,
            files: () => files,
          }),
          Command.mapMessages(commands, (message) =>
            GotFileDropMessage({ message })
          ),
        ];
      },
      ClickedRemoveFile: ({ fileIndex }) => [
        evo(model, {
          files: (files) => Array.remove(files, fileIndex),
        }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-md space-y-3")],
    [
      h.submodel({
        slotId: model.fileDrop.id,
        model: model.fileDrop,
        view: FileDrop.view,
        viewInputs: {
          multiple: true,
          toView: (attributes) =>
            h.label(
              [...attributes.root, h.Class(FileDrop.dropZoneClassName)],
              [
                h.span(
                  [h.Class(FileDrop.primaryTextClassName)],
                  ["Drop files or click to browse"]
                ),
                h.span(
                  [h.Class(FileDrop.secondaryTextClassName)],
                  ["Any file type. This example lists selected files."]
                ),
                h.input([
                  ...attributes.input,
                  h.AriaLabel("Upload files"),
                  h.Class(FileDrop.fileInputClassName),
                ]),
              ]
            ),
        },
        toParentMessage: (message) => GotFileDropMessage({ message }),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected files: ${model.files.length}`]
      ),
      h.ul(
        [h.Class(FileDrop.fileListClassName)],
        model.files.map((file, fileIndex) =>
          h.li(
            [h.Class(FileDrop.fileRowClassName)],
            [
              h.div(
                [h.Class("min-w-0")],
                [
                  h.p([h.Class(FileDrop.fileNameClassName)], [File.name(file)]),
                  h.p(
                    [h.Class(FileDrop.fileSizeClassName)],
                    [FileDrop.formatFileSize(File.size(file))]
                  ),
                ]
              ),
              h.button(
                [
                  h.Type("button"),
                  h.OnClick(ClickedRemoveFile({ fileIndex })),
                  h.Class(
                    "text-sm font-medium text-gray-500 hover:text-red-600"
                  ),
                ],
                ["Remove"]
              ),
            ]
          )
        )
      ),
    ]
  );
});
