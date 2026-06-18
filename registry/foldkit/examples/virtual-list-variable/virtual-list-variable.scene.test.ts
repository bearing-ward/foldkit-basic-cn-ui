import { Effect } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as VirtualList from "../../ui/virtual-list";
import * as VirtualListVariableExample from "./main";

const toParentMessage = (message: VirtualList.Message) =>
  VirtualListVariableExample.GotVirtualListMessage({ message });

const [measuredModel] = VirtualListVariableExample.update(
  VirtualListVariableExample.init()[0],
  toParentMessage(VirtualList.MeasuredContainer({ containerHeight: 224 }))
);

type ApplyScrollCommand = Readonly<{
  name: string;
  args: Record<string, unknown>;
  effect: Effect.Effect<VirtualList.CompletedApplyScroll>;
}>;

const applyScrollCommand = (
  id: string,
  scrollTop: number,
  version: number
): ApplyScrollCommand => {
  const result = VirtualList.CompletedApplyScroll({ version });

  return {
    name: "ApplyScroll",
    args: { id, scrollTop, version },
    effect: Effect.succeed(result),
  };
};

describe("VirtualList Variable example", () => {
  test("renders tall rows and jumps using variable-height scroll math", () => {
    Scene.scene(
      {
        update: VirtualListVariableExample.update,
        view: VirtualListVariableExample.view,
      },
      Scene.with(measuredModel),
      Scene.expect(Scene.text("CI passing across all browsers")).toExist(),
      Scene.click(Scene.role("button", { name: "Jump to middle" })),
      Scene.expect(Scene.text("Jumping to row 500.")).toExist(),
      Scene.Command.resolve(
        applyScrollCommand("virtual-list-variable", 35_000, 1),
        VirtualList.CompletedApplyScroll({ version: 1 }),
        toParentMessage
      )
    );
  });
});
