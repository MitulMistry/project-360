import { Meta, StoryObj } from "@storybook/react";
import { TaskNewForm } from ".";
import QueryClientWrapper from "@api/query-client-wrapper";
import { mockProjectWithTasks1 } from "@/__mocks__/project";
import { mockUsersSimple1 } from "@/__mocks__/user";

// Storybook CSF3 format

const meta: Meta<typeof TaskNewForm> = {
  title: "UI/TaskNewForm",
  component: TaskNewForm,
};
export default meta;

type Story = StoryObj<typeof TaskNewForm>;

export const Default: Story = {
  args: {
    project: mockProjectWithTasks1,
    users: mockUsersSimple1,
  },
  // Need to wrap component with QueryClientProvider since it needs access to queryClient
  decorators: [
    (Story) => {
      return <QueryClientWrapper>{Story()}</QueryClientWrapper>;
    },
  ],
};
