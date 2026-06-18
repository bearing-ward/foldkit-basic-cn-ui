import type { Meta, StoryObj } from "openstory/foldkit";

import * as AnatomyXrayDemo from "./anatomy-xray/main";

const meta = {
  title: "wipSpace/Anatomy Xray",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Avatar: Story = {
  name: "Avatar",
  render: () => AnatomyXrayDemo,
};
