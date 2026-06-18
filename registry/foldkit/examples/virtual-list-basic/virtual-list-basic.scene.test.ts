import { Effect } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as VirtualList from "../../ui/virtual-list";
import * as VirtualListBasicExample from "./main";

const toParentMessage = (message: VirtualList.Message) =>
  VirtualListBasicExample.GotVirtualListMessage({ message });

const [measuredModel] = VirtualListBasicExample.update(
  VirtualListBasicExample.init()[0],
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

describe("VirtualList Basic example", () => {
  test("measures rows and jumps to the middle with the real command", () => {
    Scene.scene(
      {
        update: VirtualListBasicExample.update,
        view: VirtualListBasicExample.view,
      },
      Scene.with(measuredModel),
      Scene.expect(Scene.text("Sarah Chen")).toExist(),
      Scene.click(Scene.role("button", { name: "Jump to middle" })),
      Scene.expect(Scene.text("Jumping to row 500.")).toExist(),
      Scene.Command.resolve(
        applyScrollCommand("virtual-list-basic", 28_000, 1),
        VirtualList.CompletedApplyScroll({ version: 1 }),
        toParentMessage
      )
    );
  });
});
