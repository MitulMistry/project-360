import { Meta, StoryObj } from "@storybook/react";
import { ProjectEditForm } from ".";
import QueryClientWrapper from "@api/query-client-wrapper";
import type { ProjectWithTasks } from "@/typings/project.types";
import { mockProjectWithTasks1 } from "@/__mocks__/project";

// Storybook CSF3 format

const meta: Meta<typeof ProjectEditForm> = {
  title: "UI/ProjectEditForm",
  component: ProjectEditForm,
};
export default meta;

const project: ProjectWithTasks = mockProjectWithTasks1;

type Story = StoryObj<typeof ProjectEditForm>;

export const Default: Story = {
  args: { project: project },
  // Need to wrap component with QueryClientProvider since it needs access to queryClient
  decorators: [
    (Story) => {
      return <QueryClientWrapper>{Story()}</QueryClientWrapper>;
    },
  ],
};
