import { Meta, StoryObj } from "@storybook/react";
// import { Button, ButtonIcon, ButtonSize, ButtonColor, ButtonVariant } from ".";
import { Button, ButtonSize, ButtonColor } from ".";

// Storybook CSF3 format

const meta: Meta<typeof Button> = { title: "UI/Button", component: Button };
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button CTA", disabled: false },
  argTypes: {
    color: {
      control: "select",
      options: Object.values(ButtonColor),
    },
  },
};

export const Small: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Small },
};

export const Medium: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Medium },
};

export const Large: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Large },
};

export const Primary: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Primary },
};

export const Secondary: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Secondary },
};

export const Destructive: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Destructive },
};

export const DestructiveSecondary: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.DestructiveSecondary },
};
