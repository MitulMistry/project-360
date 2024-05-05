import { Meta, StoryObj } from "@storybook/react";
import { TaskNewForm } from ".";
import QueryClientWrapper from "@api/query-client-wrapper";

// Storybook CSF3 format

const meta: Meta<typeof TaskNewForm> = {
  title: "UI/TaskNewForm",
  component: TaskNewForm,
};
export default meta;

type Story = StoryObj<typeof TaskNewForm>;

export const Default: Story = {
  // Need to wrap component with QueryClientProvider since it needs access to queryClient
  decorators: [
    (Story) => {
      return <QueryClientWrapper>{Story()}</QueryClientWrapper>;
    },
  ],
};
