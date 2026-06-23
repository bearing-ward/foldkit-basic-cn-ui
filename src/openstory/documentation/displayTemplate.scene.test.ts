import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, expect, test } from "vitest";

import * as DisplayTemplate from "./displayTemplate";

const ClickedPanel = m("ClickedPanel", { panelId: S.String });
const Message = S.Union([ClickedPanel]);
type Message = typeof Message.Type;

const Model = S.Struct({
  openPanelIds: S.Array(S.String),
});
type Model = typeof Model.Type;

const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedPanel: ({ panelId }) => [
        evo(model, {
          openPanelIds: () =>
            model.openPanelIds.includes(panelId)
              ? model.openPanelIds.filter((value) => value !== panelId)
              : [...model.openPanelIds, panelId],
        }),
        [],
      ],
    })
  );

const view = (model: Model) => {
  const h = html<Message>();

  return DisplayTemplate.pageShell<Message>([
    DisplayTemplate.section<Message>("Template Basics", [
      DisplayTemplate.heading<Message>(3, "Source Panels"),
      DisplayTemplate.callout<Message>(
        "Local source only",
        "This callout uses the local shadcn alert helper."
      ),
      DisplayTemplate.codeBlock<Message>("bun run openstory:generate"),
      DisplayTemplate.kbd<Message>("Enter"),
      DisplayTemplate.accordion<Message>(
        model.openPanelIds,
        [
          {
            value: "source",
            title: "Source",
            onValueChange: ClickedPanel({ panelId: "source" }),
            children: [
              DisplayTemplate.sourceList<Message>([
                {
                  label: "Generated source snapshot",
                  path: "/sources/base-ui-alert-dialog-basic.txt",
                  href: "/sources/base-ui-alert-dialog-basic.txt",
                },
              ]),
            ],
          },
        ],
        "template-test"
      ),
      DisplayTemplate.table<
        Message,
        Readonly<{ path: string; purpose: string }>
      >(
        [
          { header: "Path", cell: (row) => row.path, code: true },
          { header: "Purpose", cell: (row) => row.purpose },
        ],
        [{ path: "registry/base-ui/ui/base-ui-button", purpose: "Button" }]
      ),
      h.p([], [DisplayTemplate.slugifyHeading("Usage & Source Panels")]),
    ]),
  ]);
};

describe("OpenStory documentation display template", () => {
  test("maps shadcn display concepts to local sources", () => {
    expect(
      DisplayTemplate.displayPrimitiveMappings.map(
        (mapping) => mapping.shadcnConcept
      )
    ).toEqual([
      "h1-h6, HeadingAnchor",
      "p, strong, lists, blockquote, table",
      "Callout / Alert",
      "Button",
      "Tabs / CodeTabs",
      "Accordion",
      "Kbd",
      "AspectRatio / image frames",
      "ComponentPreview",
      "ComponentSource / CodeBlockCommand",
      "ComponentsList",
    ]);
    expect(
      DisplayTemplate.displayPrimitiveMappings.find(
        (mapping) => mapping.shadcnConcept === "Accordion"
      )?.localSource
    ).toBe("registry/base-ui/ui/base-ui-accordion");
    expect(
      DisplayTemplate.displayPrimitiveMappings.find(
        (mapping) => mapping.shadcnConcept === "Callout / Alert"
      )?.fallback
    ).toContain("Local shadcn-lane Alert");
  });

  test("renders headings, anchors, code, accordion, callout, kbd, and table helpers", () => {
    Scene.scene(
      { update, view },
      Scene.with({ openPanelIds: [] }),
      Scene.expect(
        Scene.role("heading", { name: "Template Basics" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Source Panels" })).toExist(),
      Scene.expect(Scene.text("usage-source-panels")).toExist(),
      Scene.expect(Scene.text("Local source only")).toExist(),
      Scene.expect(Scene.text("bun run openstory:generate")).toExist(),
      Scene.expect(Scene.text("Enter")).toExist(),
      Scene.expect(Scene.role("button", { name: "Source" })).toExist(),
      Scene.expect(
        Scene.text("/sources/base-ui-alert-dialog-basic.txt")
      ).not.toExist(),
      Scene.click(Scene.role("button", { name: "Source" })),
      Scene.expect(
        Scene.text("/sources/base-ui-alert-dialog-basic.txt")
      ).toExist(),
      Scene.expect(Scene.text("registry/base-ui/ui/base-ui-button")).toExist()
    );
  });
});
