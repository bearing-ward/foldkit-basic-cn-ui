import type { Meta, StoryObj } from "openstory/foldkit";

import * as ThemeStudio from "../themeStudio";

const meta = {
  title: "shadcn/Theme Studio",
  parameters: { shadcn: true },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Studio: Story = {
  name: "Studio",
  render: () => ThemeStudio,
};
