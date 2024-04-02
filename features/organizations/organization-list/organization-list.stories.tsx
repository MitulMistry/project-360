import { Meta, StoryObj } from "@storybook/react";
import type { Organization } from "@prisma/client";
import { OrganizationList } from "./organization-list";

// Storybook CSF3 format

const meta: Meta<typeof OrganizationList> = {
  title: "UI/OrganizationList",
  component: OrganizationList,
};
export default meta;

const date = new Date();

const organizations: Organization[] = [
  {
    id: "clud0qi6g000008l49ga1g1d9",
    createdAt: new Date(date.getDate()),
    name: "Development Team",
  },
  {
    id: "clud0qi6g000008l49ga1g1d4",
    createdAt: new Date(date.getDate()),
    name: "Design Team",
  },
  {
    id: "clud0qi6g000008l49ga1g1d6",
    createdAt: new Date(date.getDate()),
    name: "QA Team",
  },
];

type Story = StoryObj<typeof OrganizationList>;

export const Default: Story = {
  args: {
    organizations: organizations,
  },
};
