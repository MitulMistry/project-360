import { Meta, StoryObj } from "@storybook/react";
import { ProjectNewForm } from ".";
import QueryClientWrapper from "@api/query-client-wrapper";

// Storybook CSF3 format

const meta: Meta<typeof ProjectNewForm> = {
  title: "UI/ProjectNewForm",
  component: ProjectNewForm,
};
export default meta;

type Story = StoryObj<typeof ProjectNewForm>;

export const Default: Story = {
  // Need to wrap component with QueryClientProvider since it needs access to queryClient
  decorators: [
    (Story) => {
      return <QueryClientWrapper>{Story()}</QueryClientWrapper>;
    },
  ],
};
