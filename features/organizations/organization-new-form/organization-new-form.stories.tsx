import { Meta, StoryObj } from "@storybook/react";
import { OrganizationNewForm } from ".";
import QueryClientWrapper from "@api/query-client-wrapper";

// Storybook CSF3 format

const meta: Meta<typeof OrganizationNewForm> = {
  title: "UI/OrganizationNewForm",
  component: OrganizationNewForm,
};
export default meta;

type Story = StoryObj<typeof OrganizationNewForm>;

export const Default: Story = {
  // Need to wrap component with QueryClientProvider since it needs access to queryClient
  decorators: [
    (Story) => {
      return <QueryClientWrapper>{Story()}</QueryClientWrapper>;
    },
  ],
};
