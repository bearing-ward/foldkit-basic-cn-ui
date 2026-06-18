import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as Attachments from "./index";

const imageAttachment: Attachments.AttachmentData = {
  id: "mountain",
  type: "file",
  filename: "mountain-landscape.jpg",
  mediaType: "image/jpeg",
  url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E",
  sizeLabel: "1.2 MB",
};

const videoAttachment: Attachments.AttachmentData = {
  id: "demo",
  type: "file",
  filename: "product-demo.mp4",
  mediaType: "video/mp4",
};

const audioAttachment: Attachments.AttachmentData = {
  id: "meeting",
  type: "file",
  filename: "meeting-recording.mp3",
  mediaType: "audio/mpeg",
};

const documentAttachment: Attachments.AttachmentData = {
  id: "report",
  type: "file",
  filename: "quarterly-report-2024.pdf",
  mediaType: "application/pdf",
};

const sourceAttachment: Attachments.AttachmentData = {
  id: "api-docs",
  type: "source",
  title: "API Documentation",
  url: "https://example.com/api",
  description: "Reference page used by the assistant.",
};

const unknownAttachment: Attachments.AttachmentData = {
  id: "archive",
  type: "file",
  mediaType: "chemical/x-pdb",
};

const gridView = (message: string): Html => {
  const h = html<string>();

  return h.div(
    [],
    [
      Attachments.view<string>({
        attachments: [
          imageAttachment,
          sourceAttachment,
          audioAttachment,
          documentAttachment,
          unknownAttachment,
        ],
        variant: "Grid",
        onRemove: (attachment) => `removed:${attachment.id}`,
      }),
      h.p([], [message]),
    ]
  );
};

const inlineView = (): Html =>
  Attachments.view<never>({
    attachments: [imageAttachment, videoAttachment, sourceAttachment],
    variant: "Inline",
  });

const listView = (): Html =>
  Attachments.view<never>({
    attachments: [documentAttachment, sourceAttachment],
    variant: "List",
    showMediaType: true,
  });

describe("AI Elements Attachments registry view", () => {
  test("classifies attachment media categories", () => {
    expect(Attachments.getMediaCategory(imageAttachment)).toBe("Image");
    expect(Attachments.getMediaCategory(videoAttachment)).toBe("Video");
    expect(Attachments.getMediaCategory(audioAttachment)).toBe("Audio");
    expect(Attachments.getMediaCategory(documentAttachment)).toBe("Document");
    expect(Attachments.getMediaCategory(sourceAttachment)).toBe("Source");
    expect(Attachments.getMediaCategory(unknownAttachment)).toBe("Unknown");
  });

  test("returns attachment labels with upstream fallbacks", () => {
    expect(Attachments.getAttachmentLabel(imageAttachment)).toBe(
      "mountain-landscape.jpg"
    );
    expect(Attachments.getAttachmentLabel(sourceAttachment)).toBe(
      "API Documentation"
    );
    expect(Attachments.getAttachmentLabel(unknownAttachment)).toBe(
      "Attachment"
    );
  });

  test("renders grid labels, categories, and parent-owned remove messages", () => {
    Scene.scene(
      {
        update: (_model: string, message: string): readonly [string, []] => [
          message,
          [],
        ],
        view: gridView,
      },
      Scene.with("idle"),
      Scene.expect(
        Scene.role("img", { name: "mountain-landscape.jpg" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Remove mountain-landscape.jpg" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Remove API Documentation" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Remove meeting-recording.mp3" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Remove quarterly-report-2024.pdf" })
      ).toExist(),
      Scene.click(
        Scene.role("button", { name: "Remove mountain-landscape.jpg" })
      ),
      Scene.expect(Scene.text("removed:mountain")).toExist()
    );
  });

  test("renders inline compact labels with hover-card trigger and content", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view: inlineView,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("mountain-landscape.jpg")).toExist(),
      Scene.expect(Scene.text("product-demo.mp4")).toExist(),
      Scene.expect(Scene.text("API Documentation")).toExist(),
      Scene.expect(Scene.role("dialog")).toExist()
    );
  });

  test("renders list labels and media type metadata", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view: listView,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("quarterly-report-2024.pdf")).toExist(),
      Scene.expect(Scene.text("application/pdf")).toExist(),
      Scene.expect(Scene.text("API Documentation")).toExist(),
      Scene.expect(Scene.text("https://example.com/api")).toExist()
    );
  });
});
