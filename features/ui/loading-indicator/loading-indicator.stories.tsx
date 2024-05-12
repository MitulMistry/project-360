import { Meta, StoryObj } from "@storybook/react";
import { LoadingIndicator, LoadingIndicatorSize } from ".";

// Storybook CSF3 format

const meta: Meta<typeof LoadingIndicator> = {
  title: "UI/LoadingIndicator",
  component: LoadingIndicator,
};
export default meta;

type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
  args: { size: LoadingIndicatorSize.Medium },
  argTypes: {
    size: {
      control: "select",
      options: Object.values(LoadingIndicatorSize),
    },
  },
};
