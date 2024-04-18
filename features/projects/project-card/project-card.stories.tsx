import { Meta, StoryObj } from "@storybook/react";
import { ProjectCard } from "./project-card";
import { mockProjectWithTasks1 } from "@/__mocks__/project";
import QueryClientWrapper from "@/api/query-client-wrapper";

// Storybook CSF3 format

const meta: Meta<typeof ProjectCard> = {
  title: "UI/ProjectCard",
  component: ProjectCard,
};
export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    project: mockProjectWithTasks1,
    isManagerProp: true,
  },
  // Need to wrap component with QueryClientProvider since it needs access to queryClient
  decorators: [
    (Story) => {
      return <QueryClientWrapper>{Story()}</QueryClientWrapper>;
    },
  ],
};
