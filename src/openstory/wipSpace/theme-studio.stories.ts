import type { Meta, StoryContext, StoryObj } from "openstory/foldkit";

import * as ThemeStudio from "../themeStudio";

const meta = {
  title: "shadcn/Theme Studio",
  parameters: { layout: "fullscreen", shadcn: true },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Studio: Story = {
  name: "Studio",
  render: (_args: unknown, context: StoryContext<unknown>) =>
    ThemeStudio.programForGlobals(context.globals),
};
