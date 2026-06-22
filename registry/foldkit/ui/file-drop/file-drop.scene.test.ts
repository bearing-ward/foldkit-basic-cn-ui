import { Match as M, Option, Schema as S } from "effect";
import { Command, File, Scene, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as FileDrop from "./index";

const GotFileDropMessage = m("GotFileDropMessage", {
  message: FileDrop.Message,
});

const Model = S.Struct({
  fileDrop: FileDrop.Model,
  files: S.Array(File.File),
  status: S.String,
});

type Model = typeof Model.Type;

const Message = S.Union([GotFileDropMessage]);
type Message = typeof Message.Type;

const initialModel: Model = {
  fileDrop: FileDrop.init({ id: "documents-file-drop" }),
  files: [],
  status: "Waiting for files.",
};

const update = (
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

        const nextModel = Option.match(maybeOutMessage, {
          onNone: () => evo(model, { fileDrop: () => fileDrop }),
          onSome: M.type<FileDrop.OutMessage>().pipe(
            M.tagsExhaustive({
              ReceivedFiles: ({ files }) =>
                evo(model, {
                  fileDrop: () => fileDrop,
                  files: () => [...model.files, ...files],
                  status: () => `Received ${files.length} file(s).`,
                }),
              RejectedNonFiles: () =>
                evo(model, {
                  fileDrop: () => fileDrop,
                  status: () => "Only files can be dropped.",
                }),
            })
          ),
        });

        return [
          nextModel,
          Command.mapMessages(commands, (message) =>
            GotFileDropMessage({ message })
          ),
        ];
      },
    })
  );

const fileDropView = (
  model: Model,
  inputs: Omit<FileDrop.ViewInputs, "toView"> = {}
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.fileDrop.id,
        model: model.fileDrop,
        view: FileDrop.view,
        viewInputs: {
          ...inputs,
          toView: (attributes) =>
            h.label(
              [
                ...attributes.root,
                h.Class(FileDrop.dropZoneClasses),
                h.DataAttribute("testid", "file-drop-zone"),
              ],
              [
                h.span(
                  [h.Class(FileDrop.primaryTextClasses)],
                  ["Drop files or click to browse"]
                ),
                h.span(
                  [h.Class(FileDrop.secondaryTextClasses)],
                  ["Documents, images, or other local files."]
                ),
                h.input([
                  ...attributes.input,
                  h.AriaLabel("Upload files"),
                  h.Class(FileDrop.fileInputClasses),
                ]),
              ]
            ),
        },
        toParentMessage: (message) => GotFileDropMessage({ message }),
      }),
      h.p([], [model.status]),
      h.ul(
        [h.Class(FileDrop.fileListClasses)],
        model.files.map((file) =>
          h.li(
            [h.Class(FileDrop.fileRowClasses)],
            [
              h.span([h.Class(FileDrop.fileNameClasses)], [File.name(file)]),
              h.span(
                [h.Class(FileDrop.fileSizeClasses)],
                [FileDrop.formatFileSize(File.size(file))]
              ),
            ]
          )
        )
      ),
    ]
  );
};

const view = Submodel.defineView<Model, Message>(
  (model): Html => fileDropView(model, { multiple: true })
);

const disabledView = Submodel.defineView<Model, Message>(
  (model): Html => fileDropView(model, { isDisabled: true })
);

describe("FileDrop registry view", () => {
  test("receives dropped files and renders file metadata", () => {
    const file = new globalThis.File(["hello"], "report.txt", {
      type: "text/plain",
    });

    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.text("Waiting for files.")).toExist(),
      Scene.dropFiles(Scene.testId("file-drop-zone"), [file]),
      Scene.expect(Scene.text("Received 1 file(s).")).toExist(),
      Scene.expect(Scene.text("report.txt")).toExist(),
      Scene.expect(Scene.text("5 B")).toExist()
    );
  });

  test("receives input-selected files", () => {
    const file = new globalThis.File(["image"], "photo.png", {
      type: "image/png",
    });

    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.changeFiles(Scene.label("Upload files"), [file]),
      Scene.expect(Scene.text("photo.png")).toExist()
    );
  });

  test("supports disabled state", () => {
    Scene.scene(
      { update, view: disabledView },
      Scene.with(initialModel),
      Scene.expect(Scene.text("Drop files or click to browse")).toExist(),
      Scene.expect(Scene.label("Upload files")).toBeDisabled()
    );
  });
});
