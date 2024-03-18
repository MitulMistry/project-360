import { Meta, StoryObj } from "@storybook/react";
import { Selector, SelectorSize } from ".";

// Storybook CSF3 format

const meta: Meta<typeof Selector> = {
  title: "UI/Selector",
  component: Selector,
};
export default meta;

type Story = StoryObj<typeof Selector>;

export const Default: Story = {
  args: { children: "Selector", isDisabled: false, isSelected: false },
};

export const Small: Story = {
  ...Default,
  args: { ...Default.args, size: SelectorSize.Small },
};

export const Medium: Story = {
  ...Default,
  args: { ...Default.args, size: SelectorSize.Medium },
};

export const Large: Story = {
  ...Default,
  args: { ...Default.args, size: SelectorSize.Large },
};
