import { Meta, StoryObj } from "@storybook/react";
import { SidebarNavigation } from ".";

// Storybook CSF3 format

const meta: Meta<typeof SidebarNavigation> = {
  title: "UI/SidebarNavigation",
  component: SidebarNavigation,
  parameters: {
    // Show component without padding
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof SidebarNavigation>;

export const Default: Story = {};

export const CurrentOrganization: Story = {
  ...Default,
  args: { ...Default.args, currentOrgName: "Current Organization" },
};
