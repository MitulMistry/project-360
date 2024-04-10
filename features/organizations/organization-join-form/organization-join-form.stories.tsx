import { Meta, StoryObj } from "@storybook/react";
import { OrganizationJoinForm } from ".";
import QueryClientWrapper from "@/api/query-client-wrapper";

// Storybook CSF3 format

const meta: Meta<typeof OrganizationJoinForm> = {
  title: "UI/OrganizationJoinForm",
  component: OrganizationJoinForm,
};
export default meta;

type Story = StoryObj<typeof OrganizationJoinForm>;

export const Default: Story = {
  // Need to wrap component with QueryClientProvider since it needs access to queryClient
  decorators: [
    (Story) => {
      return <QueryClientWrapper>{Story()}</QueryClientWrapper>;
    },
  ],
};
