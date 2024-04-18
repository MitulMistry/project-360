import { Meta, StoryObj } from "@storybook/react";
import {
  StatusButton,
  StatusButtonSize,
  statusColors,
  priorityColors,
} from ".";

// Storybook CSF3 format

const meta: Meta<typeof StatusButton> = {
  title: "UI/StatusButton",
  component: StatusButton,
};
export default meta;

type Story = StoryObj<typeof StatusButton>;

export const Default: Story = {
  args: { items: statusColors, isDisabled: false, isActive: true },
};

export const Small: Story = {
  ...Default,
  args: { ...Default.args, size: StatusButtonSize.Small },
};

export const Medium: Story = {
  ...Default,
  args: { ...Default.args, size: StatusButtonSize.Medium },
};

export const Large: Story = {
  ...Default,
  args: { ...Default.args, size: StatusButtonSize.Large },
};

export const Priority: Story = {
  ...Default,
  args: { ...Default.args, items: priorityColors },
};
