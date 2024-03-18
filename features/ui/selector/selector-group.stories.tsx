import { Meta, StoryObj } from "@storybook/react";
import { SelectorSize, SelectorGroup } from ".";

// Storybook CSF3 format

const meta: Meta<typeof SelectorGroup> = {
  title: "UI/SelectorGroup",
  component: SelectorGroup,
};
export default meta;

type Story = StoryObj<typeof SelectorGroup>;

export const Default: Story = {
  args: {
    size: SelectorSize.Medium,
    items: ["Button 1", "Button 2", "Button 3"],
    isDisabled: false,
  },
};

export const Initialized: Story = {
  ...Default,
  args: { ...Default.args, initializedId: 0 },
};
