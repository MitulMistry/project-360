import { Meta, StoryObj } from "@storybook/react";
import { UserAvatar } from "./user-avatar";

// Storybook CSF3 format

const meta: Meta<typeof UserAvatar> = {
  title: "UI/UserAvatar",
  component: UserAvatar,
};
export default meta;

type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {};

export const UrlAvatar: Story = {
  ...Default,
  args: {
    ...Default.args,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Avatar_Jitrixis.png/240px-Avatar_Jitrixis.png",
  },
};
