import { Meta, StoryObj } from "@storybook/react";
import { OrganizationList } from "./organization-list";
import { OrganizationWithOwner } from "@/typings/organization.types";
import QueryClientWrapper from "@api/query-client-wrapper";

// Storybook CSF3 format

const meta: Meta<typeof OrganizationList> = {
  title: "UI/OrganizationList",
  component: OrganizationList,
};
export default meta;

const date = new Date();

const organizations: OrganizationWithOwner[] = [
  {
    id: "clud0qi6g000008l49ga1g1d9",
    createdAt: new Date(date.getDate()),
    name: "Development Team",
    isOwner: false,
  },
  {
    id: "clud0qi6g000008l49ga1g1d4",
    createdAt: new Date(date.getDate()),
    name: "Design Team",
    isOwner: false,
  },
  {
    id: "clud0qi6g000008l49ga1g1d6",
    createdAt: new Date(date.getDate()),
    name: "QA Team",
    isOwner: true,
  },
];

type Story = StoryObj<typeof OrganizationList>;

export const Default: Story = {
  args: {
    organizations: organizations,
  },
  // Need to wrap component with QueryClientProvider since it needs access to queryClient
  decorators: [
    (Story) => {
      return <QueryClientWrapper>{Story()}</QueryClientWrapper>;
    },
  ],
};
