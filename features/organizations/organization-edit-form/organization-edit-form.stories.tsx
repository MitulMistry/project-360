import { Meta, StoryObj } from "@storybook/react";
import { OrganizationEditForm } from ".";
import QueryClientWrapper from "@api/query-client-wrapper";
import type { OrganizationWithOwner } from "@/typings/organization.types";

// Storybook CSF3 format

const meta: Meta<typeof OrganizationEditForm> = {
  title: "UI/OrganizationEditForm",
  component: OrganizationEditForm,
};
export default meta;

const date = new Date();

const organization: OrganizationWithOwner = {
  id: "clud0qi6g000008l49ga1g1d9",
  createdAt: new Date(date.getDate()),
  name: "Development Team",
  isOwner: false,
};

type Story = StoryObj<typeof OrganizationEditForm>;

export const Default: Story = {
  args: { organization: organization },
  // Need to wrap component with QueryClientProvider since it needs access to queryClient
  decorators: [
    (Story) => {
      return <QueryClientWrapper>{Story()}</QueryClientWrapper>;
    },
  ],
};
