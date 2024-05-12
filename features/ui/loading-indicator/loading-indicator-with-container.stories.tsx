import { Meta, StoryObj } from "@storybook/react";
import { LoadingIndicatorWithContainer, LoadingIndicatorSize } from ".";

// Storybook CSF3 format

const meta: Meta<typeof LoadingIndicatorWithContainer> = {
  title: "UI/LoadingIndicatorWithContainer",
  component: LoadingIndicatorWithContainer,
  parameters: {
    // Show component without padding
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof LoadingIndicatorWithContainer>;

export const Default: Story = {
  args: { size: LoadingIndicatorSize.Medium },
  argTypes: {
    size: {
      control: "select",
      options: Object.values(LoadingIndicatorSize),
    },
  },
};
