import { Meta, StoryObj } from "@storybook/react";
import { Notification, NotificationColor } from ".";

// Storybook CSF3 format

const meta: Meta<typeof Notification> = {
  title: "UI/Notification",
  component: Notification,
};
export default meta;

type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: { children: "Notification Text" },
  argTypes: {
    color: {
      control: "select",
      options: Object.values(NotificationColor),
    },
  },
};
