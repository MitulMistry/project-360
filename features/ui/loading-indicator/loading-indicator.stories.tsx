import { Meta, StoryObj } from "@storybook/react";
import { LoadingIndicator, LoadingIndicatorSize } from ".";

// Storybook CSF3 format

const meta: Meta<typeof LoadingIndicator> = {
  title: "UI/LoadingIndicator",
  component: LoadingIndicator,
  parameters: {
    // Show component without padding
    layout: "fullscreen",
  },
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
